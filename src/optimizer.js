import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimizeImage } from './image-processor.js';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            const subFiles = getAllFiles(fullPath);
            files.push(...subFiles);
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

export async function optimizer() {
    const configPath = path.join(process.cwd(), 'image-optimizer-config.js');
    if (!fs.existsSync(configPath)) {
        console.error(pc.red('Configuration file not found. Please run `my-image-optimizer init` to create one.'));
        process.exit(1);
    }

    const { default: config } = await import('file://' + configPath);
    const { imageOptimize } = config;

    for (const item of imageOptimize) {
        const { source, destination, clean, images, preserveFolders } = item;

        if (clean && fs.existsSync(destination)) {
            fs.rmSync(destination, { recursive: true, force: true });
            console.log(pc.yellow(`Hedef klasör temizlendi: ${destination}`));
        }

        const files = getAllFiles(source).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
        });

        for (const file of files) {
            const relativePath = path.relative(source, file);
            const outputPath = preserveFolders
                ? path.join(destination, relativePath)
                : path.join(destination, path.basename(file));

            try {
                // Hedef klasörlerin oluşturulması
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });

                const ext = path.extname(file).toLowerCase();
                const matchedConfig = images.find(img => (ext === '.jpg' || ext === '.jpeg') ? img.type === 'jpeg' : img.type === 'png');

                if (matchedConfig) {
                    console.log(pc.cyan(`Processing file: ${file} using format ${matchedConfig.type.toUpperCase()}`));
                    await optimizeImage(file, outputPath, matchedConfig);
                    console.log(pc.green(`Optimized: ${file} -> ${outputPath}`));
                } else {
                    fs.copyFileSync(file, outputPath);
                    console.log(pc.yellow(`No matching config found for ${file}, copied as-is.`));
                }
            } catch (error) {
                console.error(pc.red(`Error occurred while optimizing ${file}: ${error.message}`));
            }
        }

        console.log(pc.blue(`${source} images have been successfully processed and saved to ${destination}!`));
    }
}
