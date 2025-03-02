import { Command, CommandNames } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import got from 'got';
import chalk from 'chalk';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  readonly name = CommandNames.Generate;

  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const fileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      try {
        await fileWriter.write(tsvOfferGenerator.generate());
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        console.error(chalk.red(`Can't import data from file: ${filepath}`));
        console.error(chalk.red(`Details: ${error.message}`));
      }
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);

    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
