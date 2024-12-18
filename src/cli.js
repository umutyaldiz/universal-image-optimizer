#!/usr/bin/env node
import { initConfig } from './init.js';
import { optimizer } from './optimizer.js';
import pc from 'picocolors';

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'init':
        initConfig();
        break;
    case 'start':
        optimizer();
        break;
    default:
        console.log(pc.error('Command usage: my-image-optimizer init | my-image-optimizer run'));
        process.exit(0);
}
