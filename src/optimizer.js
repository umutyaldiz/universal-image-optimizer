import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimizeImage } from './image-processor.js';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function optimizer() {
    const configPath = path.join(process.cwd(), 'image-optimizer-config.js');
    if (!fs.existsSync(configPath)) {
        console.error(pc.red('Configuration file not found. Please run `my-image-optimizer init` to create one.'));
        process.exit(1);
    }

    const { default: config } = await import('file://' + configPath);
    const { imageOptimize } = config;

    for (const item of imageOptimize) {
        const { source, destination, images } = item;

        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
            console.log(pc.green(`Created directory: ${destination}`));
        }

        const files = fs.readdirSync(source).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
        });

        for (const file of files) {
            const inputPath = path.join(source, file);
            const outputPath = path.join(destination, file);
            const ext = path.extname(file).toLowerCase();

            let matchedConfig;
            if (ext === '.jpg' || ext === '.jpeg') {
                matchedConfig = images.find(img => img.type === 'jpeg');
            } else if (ext === '.png') {
                matchedConfig = images.find(img => img.type === 'png');
            }

            try {
                if (matchedConfig && matchedConfig.quality) {
                    console.log(pc.cyan(`Processing file: ${file} using format ${matchedConfig.type.toUpperCase()}`));
                    await optimizeImage(inputPath, outputPath, matchedConfig);
                    console.log(pc.green(`Optimized: ${file} -> ${outputPath}`));
                } else {
                    fs.copyFileSync(inputPath, outputPath);
                    console.log(pc.yellow(`No matching config found for ${file}, copied as-is.`));
                }
            } catch (error) {
                console.error(pc.red(`Error occurred while optimizing ${file}: ${error.message}`));
            }
        }

        console.log(pc.blue(`${source} images have been successfully processed and saved to ${destination}!`));
    }
}
