// src/init.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initConfig() {
    const configPath = path.join(process.cwd(), 'image-optimizer-config.js');

    // Default config content
    const defaultConfig = `export default {
    imageOptimize: [
        {
            source: 'src/images',
            destination: 'dist/images',
            images: [
                {
                    type: 'jpeg',
                    quality: 80,
                    grayscale: true,
                    stripMetadata: false,
                },
                {
                    type: 'png',
                    quality: 80,
                    grayscale: false,
                    stripMetadata: true,
                }
            ]
        }
    ]
};\n`;

    if (fs.existsSync(configPath)) {
        console.error(pc.red('image-optimizer-config.js already exists. Please remove it first if you want to overwrite.'));
        process.exit(1);
    }

    fs.writeFileSync(configPath, defaultConfig, 'utf-8');
    console.log(pc.green('image-optimizer-config.js has been successfully created!'));
}
