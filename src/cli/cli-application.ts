import { Command, CommandNames } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';

export class CliApplication {
  constructor(
    private readonly defaultCommand = CommandNames.Help
  ) {}

  private commands: {[key in CommandNames]: Command} = {} as {[key in CommandNames]: Command};

  public getDefaultCommand(): Command {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: CommandNames): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (this.commands[command.name as CommandNames]) {
        throw new Error(`${command.name} is already exists`);
      }
      this.commands[command.name as CommandNames] = command;
    });

  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName as CommandNames);
    const commandArguments = parsedCommand[commandName as CommandNames] ?? [];
    command.execute(...commandArguments);
  }
}
