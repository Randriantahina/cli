import { suggestCommitMessage } from './commands/suggest';

async function main() {
  const arg = process.argv[2];

  switch (arg) {
    case 'suggest':
      await suggestCommitMessage();
      break;
    default:
      console.log('Usage : gitbuddy [suggest]');
  }
}

main();
