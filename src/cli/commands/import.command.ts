import { Command, CommandNames } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import chalk from 'chalk';
import { Offer } from '../../shared/types/index.js';
import { DefaultOfferService } from '../../shared/models/offer/default-offer.service.js';
import { OfferService } from '../../shared/models/offer/dto/offer-service.interface.js';
import { PinoLogger } from '../../shared/libs/logger/pino-logger.js';
import { OfferModel } from '../../shared/models/offer/offer.entity.js';
import { UserModel } from '../../shared/models/user/user.entity.js';
import { DefaultUserService } from '../../shared/models/user/default-user.service.js';
import { Logger } from '../../shared/libs/logger/logger-interface.js';
import { UserService } from '../../shared/models/user/dto/user-service.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { DEFAULT_URI } from '../../shared/constants.js';

export class ImportCommand implements Command {
  private logger: Logger;
  private offerService: OfferService;
  private userService: UserService;
  private databaseClient: DatabaseClient;
  private salt: string;

  constructor() {
    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  readonly name = CommandNames.Import;

  private async onImportedOffer(offer: Offer) {
    const createdUser = await this.userService.findOrCreate({
      ...offer.user,
      password: '1234'
    }, this.salt);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {user, ...rest} = offer;

    if (createdUser) {
      await this.offerService.create({
        author: createdUser.id,
        ...rest,

      });
    }
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows created.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, salt, uri] = parameters;

    const uriToConnect = uri ?? DEFAULT_URI;
    await this.databaseClient.connect(uriToConnect);

    this.salt = salt;

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
