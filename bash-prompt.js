#!/usr/bin/env node

const execa = require("execa");
const display = require('./views').display

let conda, user, hostname, directory, git;

(async () => { 
    try {
        conda = process.env["CONDA_DEFAULT_ENV"];
        user = process.env["USER"];
        hostname = (await execa("hostname")).stdout;
        directory = (await execa("pwd")).stdout;
        git = (await execa("git", [
            "status",
            "--porcelain=2",
            "--branch"
        ])).stdout;
        display(conda, user, hostname, directory, git);
    } catch (error) {
        display(conda, user, hostname, directory);
    }
})();
