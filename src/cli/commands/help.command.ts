import { Command, CommandNames } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  name = CommandNames.Help;
  public async execute() {
    console.info(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
