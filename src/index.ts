import Terimage from './Terimage';
import fs from 'fs';
import path from 'path';

const terImage = new Terimage();
const image = fs.readFileSync(path.join(__dirname, 'images/cat.jpg'));

(async () => {
    console.log(await terImage.image(image, {width: '50%', height: '50%'}));
})();
