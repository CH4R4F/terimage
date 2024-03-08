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
const Terimage_1 = __importDefault(require("./Terimage"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const terImage = new Terimage_1.default();
const image = fs_1.default.readFileSync(path_1.default.join(__dirname, 'images/cat.jpg'));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield terImage.image(image, { width: '50%', height: '50%' }));
}))();
