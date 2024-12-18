
# Universal Image Optimizer

**Universal Image Optimizer** is a CLI tool for optimizing images with advanced features. It supports multiple image formats and provides fine-grained control over various image processing operations.

---

## Features

- Supports multiple image formats: JPEG, PNG
- Offers advanced image processing features:
  - Quality
  - Grayscale conversion
  - Metadata stripping
  - Tinting
  - Blurring
  - Rotations, flips, and flops
  - Affine transformations
  - Image sharpening
  - Thresholding, convolution, and more
- Highly configurable via a JavaScript configuration file
- Easy-to-use CLI commands

---

## Installation

Install the Universal Image Optimizer globally using npm:

```bash
npm install -g universal-image-optimizer
```

---

## Usage

Universal Image Optimizer works with two primary commands:

### 1. Initialize Configuration File

To create a default configuration file in your project directory, run:

```bash
npx universal-image-optimizer init
```

This will generate a file named `image-optimizer-config.js` in your project directory with the following content:

### Configuration File Structure

| Property        | Type         | Description                                                                                     |
|------------------|--------------|-------------------------------------------------------------------------------------------------|
| `source`        | `string`     | The directory containing the images to optimize.                                               |
| `destination`   | `string`     | The target directory where the optimized images will be saved.                                 |
| `images`        | `array`      | An array of objects defining image processing operations.                                      |
| `type`          | `string`     | The image format (e.g., `jpeg`, `png`).                                                        |
| `quality`       | `number`     | The quality level for the optimized images.                                                   |
| `grayscale`     | `boolean`    | Whether to apply a grayscale filter.                                                          |
| `stripMetadata` | `boolean`    | Whether to strip metadata from the images.                                                    |
| `tint`          | `string`     | Apply a tint color in hexadecimal format (e.g., `#FF0000`).                                   |
| `blur`          | `number`     | Apply Gaussian blur with a specified sigma value.                                             |
| `rotate`        | `number`     | Rotate the image by the specified degrees (e.g., 90, 180).                                    |
| `flip`          | `boolean`    | Mirror the image vertically.                                                                  |
| `flop`          | `boolean`    | Mirror the image horizontally.                                                                |
| `affine`        | `object`     | Perform affine transformation with `matrix` and optional `options` (e.g., background color).  |
| `sharpen`       | `object`     | Apply sharpening with options like `sigma`.                                                  |
| `median`        | `number`     | Apply a median filter with a specified size.                                                 |
| `flatten`       | `boolean`    | Flatten the image by merging alpha transparency with a background color.                      |
| `gamma`         | `object`     | Apply gamma correction with options like `gamma`.                                            |
| `negate`        | `boolean`    | Produce the negative of the image.                                                           |
| `normalise`     | `boolean`    | Enhance image contrast by stretching its luminance.                                          |
| `clahe`         | `object`     | Apply contrast-limited adaptive histogram equalization.                                       |
| `convolve`      | `object`     | Convolve the image with a specified kernel.                                                  |
| `threshold`     | `number`     | Apply a pixel threshold.                                                                     |
| `boolean`       | `object`     | Perform bitwise operations with `operand` and `operator`.                                    |
| `linear`        | `object`     | Adjust image levels with linear transformations.                                             |
| `recomb`        | `array`      | Apply a recombination matrix (e.g., for sepia effects).                                      |
| `modulate`      | `object`     | Adjust brightness, saturation, hue, and lightness.                                           |

#### Example Configuration File

```javascript
export default {
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
          tint: '#FF0000',
          blur: 5,
          rotate: 90,
          flip: true,
          flop: false,
          affine: {
            matrix: [[1, 0], [0.3, 1]],
            options: { background: '#ffffff' }
          },
          sharpen: { sigma: 2 },
          median: 3,
          flatten: true,
          gamma: { gamma: 2.2 },
          negate: true,
          normalise: true,
          clahe: { width: 3, height: 3, maxSlope: 3 },
          convolve: {
            width: 3,
            height: 3,
            kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
          },
          threshold: 128,
          boolean: {
            operand: 'src/operand.png',
            operator: 'and'
          },
          linear: { a: 0.5, b: 2 },
          recomb: [
            [0.3588, 0.7044, 0.1368],
            [0.2990, 0.5870, 0.1140],
            [0.2392, 0.4696, 0.0912]
          ],
          modulate: {
            brightness: 1.2,
            saturation: 0.8,
            hue: 180,
            lightness: 10
          }
        }
      ]
    }
  ]
};
```

### 2. Optimize Images

After setting up the configuration file, run the following command to optimize your images:

```bash
npx universal-image-optimizer run
```

This will process images based on the configuration file and save them to the specified destination.

---

## Logs and Messages

This tool uses color-coded messages for better clarity, powered by `picocolors`:

- **Success (Green)**: Indicates successful image optimizations.
- **Warnings (Yellow)**: Alerts you to potential issues, such as missing directories.
- **Errors (Red)**: Displays issues with configuration or file processing.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Created By

This project was developed by Kenan Gündoğan. Contributions and feedback are welcome!

---

## Contribution

Contributions are welcome! If you have ideas or find bugs, feel free to open an issue or create a pull request on the GitHub repository.
