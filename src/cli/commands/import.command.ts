import { Command, CommandNames } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  name = CommandNames.Import;

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
