import { Command, CommandNames } from './command.interface.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';

type PackageJson = {
    version: string
}

export const isPackageJsonType = (content: unknown): content is PackageJson =>
  typeof content === 'object' && content !== null && Object.hasOwn(content, 'version');

export class VersionCommand implements Command {
  constructor(private readonly filePath = 'package.json') {}

  readonly name = CommandNames.Version;

  private readVersion(): string {
    // Read the content of package.json
    const packageJsonContent = readFileSync(resolve(this.filePath), 'utf8');
    // Parse the JSON data
    const packageInfo = JSON.parse(packageJsonContent);
    if (!isPackageJsonType(packageInfo)) {
      throw new Error('Failed to parse json content');
    }
    return packageInfo.version;
  }

  public async execute() {
    try {
      const version = this.readVersion();
      console.info(chalk.yellow(version));
    } catch(error) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }

}
