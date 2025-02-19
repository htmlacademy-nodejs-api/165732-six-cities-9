import { CommandNames } from './commands/command.interface.js';

export class CommandParser {
  static parse(cliArguments: string[]): {[key in CommandNames]: string[]}{
    const parsedCommand = {} as {[key in CommandNames]: string[]};
    let currentCommand = '';

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        parsedCommand[argument as CommandNames] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand as CommandNames].push(argument);
      }
    }

    return parsedCommand;
  }
}
