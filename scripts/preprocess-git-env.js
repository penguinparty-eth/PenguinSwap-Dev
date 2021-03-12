const child_process = require("child_process")
const fs = require("fs")

const gitCommands = {
    git_commit_hash: "git rev-parse HEAD",
    git_branch: "git branch --show-current"
}

function getGitInfo(gitCommand) {
    return child_process.execSync(gitCommand).toString().trim()
}

var output = {};
for(const [k,v] of Object.entries(gitCommands)) {
    output[k] = getGitInfo(v);
}

var outputJson = JSON.stringify(output);

fs.writeFileSync("./src/.parsed-git.json", outputJson);