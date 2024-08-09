#!/usr/bin/env node
import { Command  } from "commander";
import * as os from "node:os";
import {printCpuInfo, printSystemInfo} from "./lib/system/os.js";

const program = new Command()

program.name('os-detector')
    .description('os related tools')
    .version('1.0.1')

const osCommand = program.command('os')

// 平台信息
osCommand.command('system')
    .option('-v, --verbose', 'verbose output', false)
    .action((options) => {
        const { verbose } = options
        if (verbose) {
            printSystemInfo()
        } else {
            console.log(os.platform())
        }
    })

// cpu信息
osCommand.command('cpu')
    .action(() => {
        printCpuInfo()
    })

program.parse(process.argv);

