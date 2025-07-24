#!/usr/bin/env node
import { Command } from 'commander';
import { suggestCommitMessage } from './commands/suggest.js';

const program = new Command();

program
  .name('gitbuddy')
  .description('Assistant Git basé sur IA')
  .version('1.0.0');

program
  .command('suggest')
  .description('Suggère un message de commit basé sur les fichiers staged')
  .action(async () => {
    await suggestCommitMessage();
  });

program.parse(process.argv);
