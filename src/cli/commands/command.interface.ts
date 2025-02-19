export interface Command {
    readonly name: string;
    execute(...parameters: string[]): void;
  }

export enum CommandNames {
 Help = '--help',
 Version = '--version',
 Import = '--import',
}
