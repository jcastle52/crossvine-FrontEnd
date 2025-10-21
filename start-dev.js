#!/usr/bin/env node
process.argv = ["node", "vite", "--host"];
import("./node_modules/vite/dist/node/cli.js");
