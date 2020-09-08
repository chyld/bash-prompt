const boxen = require('boxen');
const chalk = require('chalk');
const gradient = require('gradient-string');
const stringLength = require('string-length');

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewGit(git) {
  const lines = git.split('\n');
  const lookup = {};
  let modifications = 0;

  for (let line of lines) {
    if (line[0] === '#') {
      words = line.split(' ');
      lookup[words[1]] = words.slice(2);
    } else {
      modifications += 1;
    }
  }

  const [oid] = lookup['branch.oid'] || ['OID'];
  const [head] = lookup['branch.head'] || ['HEAD'];
  const [upstream] = lookup['branch.upstream'] || ['???'];

  let [a, b] = lookup['branch.ab'] || ['+0', '-0'];
  a = Math.abs(parseInt(a));
  b = Math.abs(parseInt(b));
  total = modifications + a + b;

  if (total > 0) {
    flag = '🔸';
  } else {
    flag = '🔹';
  }

  //return `[${chalk.blue(modifications, a, b)}] ${flag} local: ${chalk.underline.yellow(head)} upstream: ${chalk.underline.yellow(upstream)} commit: ${chalk.underline.yellow(oid.slice(0, 7))}`;
  return ` ${chalk.yellow(head)}  ${chalk.green(upstream)}  ${chalk.yellow(total)}`;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewConda(conda) {
  return ' ' + chalk.yellow(conda);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewUser(user) {
  return chalk.hex('#33ffcc')(user);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewHostname(hostname) {
  return chalk.dim.white.inverse(hostname);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewHex(hex) {
  return chalk.hex('#4a3f35').italic(hex);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewNodeVer(nodever) {
  return chalk.yellow(nodever);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewDirectory(home, directory) {
  if (directory.startsWith(home)) directory = directory.replace(home, '~');
  return ' ' + chalk.hex('#ff33cc').underline(directory);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

module.exports.display = (conda, user, hostname, home, directory, hex, nodever, git) => {
  // ARCHIVE
  // https://en.wikipedia.org/wiki/Box-drawing_character
  // let line2 = '';
  // const line1 = `${viewConda(conda)} / ${viewNodeVer(nodever)} ⚡ *${viewUser(user)}* ${viewHostname(hostname)} ${viewDirectory(home, directory)}`;
  // if (git) line2 = `\n${viewGit(git)}`;
  // const line3 = '─'.repeat(stringLength(line2.length ? line2 : line1) + (line2.length ? 0 : 1));
  // const line4 = `✚ `;
  //const output = `\n${line1}${line2}\n${chalk.blue(line3)}\n${line4}`;
  // LIVE
  let output = `\n${viewConda(conda)} ${viewDirectory(home, directory)}`;
  if (git) output += ` ${viewGit(git)}`;
  output += '\n ';
  process.stdout.write(output);
};

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
