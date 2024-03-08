"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const jimp_1 = __importDefault(require("jimp"));
const constants_1 = require("./constants");
class Terimage {
    constructor() { }
    image(buffer, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.options = options;
            return yield this._renderImage(buffer, options);
        });
    }
    _renderImage(buffer, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield jimp_1.default.read(buffer);
            const { bitmap } = image;
            const { width, height } = yield this._calculateImageSize(bitmap.width, bitmap.height, options);
            console.log(width, height);
            image.resize(width, height);
            let result = '';
            for (let y = 0; y < image.bitmap.height - 1; y += 2) {
                for (let x = 0; x < image.bitmap.width; x++) {
                    const { r, g, b, a } = jimp_1.default.intToRGBA(image.getPixelColor(x, y));
                    const { r: r2, g: g2, b: b2, a: a2 } = jimp_1.default.intToRGBA(image.getPixelColor(x, y + 1));
                    result += a === 0 ? chalk_1.default.reset(' ') : chalk_1.default.bgRgb(r, g, b).rgb(r2, g2, b2)('\u2584');
                }
                result += '\n';
            }
            return result;
        });
    }
    _calculateImageSize(imgWidth, imgHeight, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const terminalSize = this._getTerminalSize();
            let width;
            let height;
            if ((options === null || options === void 0 ? void 0 : options.width) && (options === null || options === void 0 ? void 0 : options.height)) {
                width = this._validateDimensions(options.width, terminalSize.width);
                height = this._validateDimensions(options.height, terminalSize.height) * 2;
            }
            else if (options === null || options === void 0 ? void 0 : options.width) {
                width = this._validateDimensions(options.width, terminalSize.width);
                height = imgHeight * (width / imgWidth);
            }
            else if (options === null || options === void 0 ? void 0 : options.height) {
                height = this._validateDimensions(options.height, terminalSize.height) * 2;
                width = imgWidth * (height / imgHeight);
            }
            else {
                ({ width, height } = this._scaleImage(terminalSize.width, terminalSize.height * 2, imgWidth, imgHeight));
            }
            if (width && height && width > terminalSize.width) {
                ({ width, height } = this._scaleImage(terminalSize.width, terminalSize.height * 2, width, height));
            }
            return {
                width: Math.round(width),
                height: Math.round(height),
            };
        });
    }
    _getTerminalSize() {
        return {
            width: process.stdout.columns || constants_1.DEFAULT_TERMINAL_WIDTH,
            height: process.stdout.rows - 2 || constants_1.DEFAULT_TERMINAL_HEIGHT,
        };
    }
    _validateDimensions(value, terminalBase) {
        if (typeof value === 'string') {
            const percent = parseFloat(value);
            if (!Number.isNaN(percent)) {
                if (value.includes('%')) {
                    if (percent > 0 && percent <= 100) {
                        return Math.floor((percent / 100) * terminalBase);
                    }
                }
                else {
                    return percent;
                }
            }
        }
        if (typeof value === 'number') {
            return value;
        }
        throw new Error('Invalid value for width or height');
    }
    _scaleImage(scaleWidth, scaleHeight, width, height) {
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
exports.default = Terimage;
