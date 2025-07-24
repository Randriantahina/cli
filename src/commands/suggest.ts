import 'dotenv/config';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import ora from 'ora';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error(
    chalk.red(
      "Erreur : La variable d'environnement GEMINI_API_KEY n'est pas définie."
    )
  );
  process.exit(1);
}

const git = simpleGit();
const genAI = new GoogleGenerativeAI(apiKey);

export async function suggestCommitMessage() {
  const spinner = ora('Analyse des changements Git...').start();

  const diff = await git.diff(['--cached']);
  if (!diff) {
    spinner.fail('Aucun fichier staged. Faites `git add` d’abord.');
    return;
  }

  spinner.text = 'Envoi à Gemini...';

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const result = await model.generateContent([
    {
      text: `Tu es un assistant Git. Analyse le diff suivant et propose un message de commit clair, concis et conventionnel :\n\n${diff}`,
    },
  ]);

  const response = await result.response;
  const msg = response.text();

  spinner.stop();

  console.log(chalk.greenBright('\n💬 Suggestion de commit :'));
  console.log(chalk.white(msg.trim()));
}
