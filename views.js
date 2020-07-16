const boxen = require("boxen");
const chalk = require("chalk")

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewGit(git) {
  const lines = git.split('\n');
  const lookup = {};
  let modifications = 0;

  for (let line of lines){
    if (line[0] === '#'){
      words = line.split(' ');
      lookup[words[1]] = words.slice(2);
    } else {
      modifications += 1;
    }
  }

  const [oid] = lookup['branch.oid'] || ['OID'];
  const [head] = lookup['branch.head'] || ['HEAD'];
  const [upstream] = lookup['branch.upstream'] || ['UPSTREAM'];
  const [a, b] = lookup['branch.ab'] || ['+0', '-0'];

  return `[${chalk.blue(modifications, a, b)}] local: ${chalk.underline.yellow(head)} upstream: ${chalk.underline.yellow(upstream)} commit: ${chalk.underline.yellow(oid.slice(0, 7))}`;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewConda(conda) {
  return chalk.yellow(conda);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewUser(user) {
  return chalk.italic.white(user);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewHostname(hostname) {
  return chalk.italic.white(hostname);
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

function viewDirectory(home, directory) {
  if (directory.startsWith(home)) directory = directory.replace(home, "~");
  return chalk.hex('#fa7d09').underline(directory);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

module.exports.display = (conda, user, hostname, home, directory, hex, git) => {
  let output = `${viewHex(hex)}`;
  process.stdout.write(boxen(output, {borderColor:'#A99787', padding:0, borderStyle:'single', margin:{top:1}}));

  output = `\n${viewConda(conda)} ⚡ ${viewUser(user)}/${viewHostname(hostname)} ${viewDirectory(home, directory)}`;
  if (git) output += `\n${viewGit(git)}`;
  output += `\n+ `;
  process.stdout.write(output);
};

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
