import { Logger } from '../shared/libs/logger/logger-interface.js';
import { Component } from '../shared/types/component.enum.js';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { injectable, inject } from 'inversify';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { getMongoURI } from '../shared/utils/database.js';
import express, { Express } from 'express';
import { Controller } from './controller/controller.interface.js';
import { ExceptionFilter } from '../shared/libs/rest/exception-filter/exception-filter.interface.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';

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
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async initMiddlewares() {
    this.logger.info('Init app-level middleware');
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.logger.info('App-level middleware initialization completed');
  }

  private async initExceptionFilters() {
    this.logger.info('Init exception filters');
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.logger.info('Exception filters initialization compleated');
  }


  private async initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initServer() {
    this.logger.info('Try to init server…');
    const port = this.config.get('PORT');
    this.server.listen(port);
    this.logger.info(
      `🚀 Server started on http://localhost:${port}`
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
    await this.initMiddlewares();
    await this.initControllers();
    await this.initExceptionFilters();
    await this.initServer();
  }
}

