#!/usr/bin/env node

const execa = require("execa");
const display = require("./views").display;

let conda, user, hostname, home, directory, hex, git;

(async () => {
  try {
    conda = process.env["CONDA_DEFAULT_ENV"];
    user = process.env["USER"];
    home = process.env["HOME"];
    hostname = (await execa("hostname")).stdout;
    directory = (await execa("pwd")).stdout;
    hex = (await execa(`${__dirname}/hex.sh`)).stdout;
    git = (await execa("git", ["status", "--porcelain=2", "--branch"])).stdout;
    display(conda, user, hostname, home, directory, hex, git);
  } catch (err) {
    display(conda, user, hostname, home, directory, hex);
  }
})();
