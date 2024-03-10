import chalk from 'chalk';
import Jimp from 'jimp';
import { DEFAULT_TERMINAL_WIDTH, DEFAULT_TERMINAL_HEIGHT } from './constants';

type Options = {
    width: number | string;
    height: number | string;
};

class Terimage {
    readonly options: Options = {
        width: '100%',
        height: '100%',
    };

    async image(buffer: Buffer, options = this.options) {
        if (!options.width || !options.height) {
            options = this.options;
        }

        return await this._renderImage(buffer, options);
    }

    private async _renderImage(buffer: Buffer, options: Options) {
        const image = await Jimp.read(buffer);
        const { bitmap } = image;
        const { width, height } = await this._calculateImageSize(bitmap.width, bitmap.height, options);
        console.log(width, height);
        image.resize(width, height);

        let result = '';

        for (let y = 0; y < image.bitmap.height - 1; y += 2) {
            for (let x = 0; x < image.bitmap.width; x++) {
                const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
                const { r: r2, g: g2, b: b2, a: a2 } = Jimp.intToRGBA(image.getPixelColor(x, y + 1));
                result += a === 0 ? chalk.reset(' ') : chalk.bgRgb(r, g, b).rgb(r2, g2, b2)('\u2584');
            }
            result += '\n';
        }

        return result;
    }

    private async _calculateImageSize(imgWidth: number, imgHeight: number, options: Options) {
        const terminalSize = this._getTerminalSize();
        let width: number;
        let height: number;

        if (options?.width && options?.height) {
            width = this._validateDimensions(options.width, terminalSize.width);
            height = this._validateDimensions(options.height, terminalSize.height) * 2;
        } else if (options?.width) {
            width = this._validateDimensions(options.width, terminalSize.width);
            height = imgHeight * (width / imgWidth);
        } else if (options?.height) {
            height = this._validateDimensions(options.height, terminalSize.height) * 2;
            width = imgWidth * (height / imgHeight);
        } else {
            ({ width, height } = this._scaleImage(terminalSize.width, terminalSize.height * 2, imgWidth, imgHeight));
        }

        if (width && height && width > terminalSize.width) {
            ({ width, height } = this._scaleImage(terminalSize.width, terminalSize.height * 2, width, height));
        }

        return {
            width: Math.round(width),
            height: Math.round(height),
        };
    }

    private _getTerminalSize() {
        return {
            width: process.stdout.columns || DEFAULT_TERMINAL_WIDTH,
            height: process.stdout.rows - 2 || DEFAULT_TERMINAL_HEIGHT,
        };
    }

    private _validateDimensions(value: number | string, terminalBase: number) {
        if (typeof value === 'string') {
            const percent = parseFloat(value);
            if (!Number.isNaN(percent)) {
                if (value.includes('%')) {
                    if (percent > 0 && percent <= 100) {
                        return Math.floor((percent / 100) * terminalBase);
                    }
                } else {
                    return percent;
                }
            }
        }

        if (typeof value === 'number') {
            return value;
        }

        throw new Error('Invalid value for width or height');
    }

    private _scaleImage(scaleWidth: number, scaleHeight: number, width: number, height: number) {
        const scaleRatio = scaleWidth / scaleHeight;
        const newRatio = width / height;
        // Use ternary operator for concise factor calculation
        const factor = newRatio > scaleRatio ? width / scaleWidth : height / scaleHeight;

        return {
            width: Math.round(factor * scaleWidth),
            height: Math.round(factor * scaleHeight),
        };
    }
}

export default Terimage;
