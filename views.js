const boxen = require("boxen");
const chalk = require("chalk")

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewGit(git) {
  if (!git) return "";

  const lines = git.split("\n");

  let local = "";
  let upstream = "";
  let ahead = 0;
  let behind = 0;
  let dirty = "🔹";

  lines.forEach(line => {
    if (line[0] == "#") {
      const sections = line.split(" ");

      switch (sections[1]) {
        case "branch.head":
          local = sections[2];
          break;
        case "branch.upstream":
          upstream = sections[2];
          break;
        case "branch.ab":
          ahead = parseInt(sections[2]);
          behind = Math.abs(parseInt(sections[3]));
      }
    } else {
      dirty = "🔸";
    }
  });

  if(upstream === "") upstream = "FIXME";

  return `${dirty} local: ${chalk.underline.green(local)} upstream: ${chalk.underline.green(upstream)} ${chalk.yellowBright(ahead)}/${chalk.yellowBright(behind)}`;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewConda(conda) {
  return chalk.magentaBright(conda);
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
  process.stdout.write(boxen(output, {borderColor:'#4a3f35', padding:0, borderStyle:'single', margin:{top:1}}));

  output = `\n${viewConda(conda)} ⚡ ${viewUser(user)}/${viewHostname(hostname)}`;
  output += ` ${viewDirectory(home, directory)} ${viewGit(git)}\n+ `;
  process.stdout.write(output);
};

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
