const ansi = require("ansi-styles");

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function c(fg, text) {
  const open = "\001" + fg.open + "\002";
  const close = "\001" + fg.close + "\002";
  return open + text + close;
}

function u(fg, text) {
  const open = "\001" + ansi.underline.open + fg.open + "\002";
  const close = "\001" + fg.close + ansi.underline.close + "\002";
  return open + text + close;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewGit(git) {
  if (!git) return "🚀";

  const lines = git.split("\n");

  let local = "";
  let upstream = "";
  let ahead = 0;
  let behind = 0;
  let dirty = "🤖";

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
      dirty = "🎭";
    }
  });

  return `${c(ansi.green, local)}/${c(ansi.white, upstream)} {${u(ansi.yellow, ahead)}/${u(ansi.yellow, behind)}} ${dirty}`;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewConda(conda) {
  return c(ansi.yellow, conda);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewUser(user) {
  return c(ansi.cyan, user);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewHostname(hostname) {
  return c(ansi.cyan, hostname);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function viewDirectory(home, directory) {
  if (directory.startsWith(home)) directory = directory.replace(home, "~");
  return u(ansi.yellow, directory);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

module.exports.display = (conda, user, hostname, home, directory, git) => {
  let output = `${viewConda(conda)} ⚡ ${viewUser(user)}@${viewHostname(hostname)}`;
  output += ` ${viewDirectory(home, directory)} ${viewGit(git)} \n>>> `;
  process.stdout.write(output);
};

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
