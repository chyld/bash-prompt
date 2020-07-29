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
  const [upstream] = lookup['branch.upstream'] || ['???'];

  let [a, b] = lookup['branch.ab'] || ['+0', '-0'];
  a = Math.abs(parseInt(a));
  b = Math.abs(parseInt(b));
  total = modifications + a + b;
  if (total > 0) flag = "🔸"; else flag = "🔹";

  return `[${chalk.blue(modifications, a, b)}] ${flag} local: ${chalk.underline.yellow(head)} upstream: ${chalk.underline.yellow(upstream)} commit: ${chalk.underline.yellow(oid.slice(0, 7))}`;
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

function viewNodeVer(nodever) {
  return chalk.yellow(nodever);
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

module.exports.display = (conda, user, hostname, home, directory, hex, nodever, git) => {
  output = `(${viewConda(conda)}, ${viewNodeVer(nodever)}) ⚡ ${viewUser(user)}-${viewHostname(hostname)} [${viewDirectory(home, directory)}]`;
  if (git) output += `\n${viewGit(git)}`;
  process.stdout.write(boxen(output, {borderColor:'#777777', padding:0, borderStyle:'single', margin:{top:1}}));

  output = `\n✚ `;
  process.stdout.write(output);
};

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
