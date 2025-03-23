import { Logger } from '../shared/libs/logger/logger-interface.js';
import { Component } from '../shared/types/component.enum.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { injectable, inject } from 'inversify';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/utils/database.js';
import express, { Express } from 'express';
import { Controller } from './controller/controller.interface.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
  ) {
    this.server = express();
  }

  private async _initMiddleware() {
    this.logger.info('Init app-level middleware');
    this.server.use(express.json());
    this.logger.info('App-level middleware initialization completed');
  }


  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initServer() {
    this.logger.info('Try to init server…');
    const port = this.config.get('PORT');
    this.server.listen(port);
    this.logger.info(
      `🚀 Server started on http://localhost:${this.config.get('PORT')}`
    );
  }

  private async initDb() {
    this.logger.info('Init database…');
    const mongoUri = getMongoURI(
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    await this.databaseClient.connect(mongoUri);
    this.logger.info('Init database completed');
  }


  public async init() {
    this.logger.info('Application initialization');
    await this.initDb();
    await this._initMiddleware();
    await this._initControllers();
    await this._initServer();
  }
}

