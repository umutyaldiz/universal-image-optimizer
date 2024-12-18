import sharp from 'sharp';

export async function optimizeImage(input, outputPath, config) {
    let image = sharp(input);

    if (config.boolean) {
        image = image.boolean(config.boolean.operand, config.boolean.operator, config.boolean.options);
    }

    if (config.flip === true) {
        image = image.flip();
    }

    if (config.flop === true) {
        image = image.flop();
    }

    if (typeof config.rotate === 'number') {
        image = image.rotate(config.rotate);
    } else if (config.rotate === true) {
        image = image.rotate();
    }

    if (config.affine) {
        image = image.affine(config.affine.matrix, config.affine.options || {});
    }

    if (config.sharpen) {
        image = (config.sharpen === true) ? image.sharpen() : image.sharpen(config.sharpen);
    }

    if (config.median) {
        image = image.median(config.median === true ? undefined : config.median);
    }

    if (config.blur) {
        image = image.blur(config.blur === true ? undefined : config.blur);
    }

    if (config.flatten) {
        image = (config.flatten === true) ? image.flatten() : image.flatten(config.flatten);
    }

    if (config.unflatten === true) {
        image = image.unflatten();
    }

    if (config.gamma) {
        if (typeof config.gamma === 'object') {
            image = image.gamma(config.gamma.gamma, config.gamma.gammaOut);
        } else {
            image = image.gamma(config.gamma);
        }
    }

    if (config.negate) {
        image = (config.negate === true) ? image.negate() : image.negate(config.negate);
    }

    const normOptions = config.normalise || config.normalize;
    if (normOptions) {
        if (normOptions === true) {
            image = image.normalise();
        } else {
            image = image.normalise(normOptions);
        }
    }

    if (config.clahe) {
        image = image.clahe(config.clahe);
    }

    if (config.convolve) {
        image = image.convolve(config.convolve);
    }

    if (config.threshold) {
        if (typeof config.threshold === 'object') {
            image = image.threshold(config.threshold.threshold || 128, config.threshold);
        } else {
            image = image.threshold(config.threshold);
        }
    }

    if (config.linear) {
        const a = config.linear.a || 1;
        const b = config.linear.b || 0;
        image = image.linear(a, b);
    }

    if (config.recomb) {
        image = image.recomb(config.recomb);
    }

    if (config.modulate) {
        image = image.modulate(config.modulate);
    }

    if (config.stripMetadata === false) {
        image = image.withMetadata();
    }

    if (config.grayscale === true) {
        image = image.grayscale();
    }

    if (config.tint) {
        image = image.tint(config.tint);
    }

    if (config.type === 'jpeg') {
        await image.jpeg({ quality: config.quality || 80 }).toFile(outputPath);
    } else if (config.type === 'png') {
        await image.png({ quality: config.quality || 80 }).toFile(outputPath);
    } else {
        throw new Error(`Unsupported format type: ${config.type}`);
    }
}
