Terimage: Print Images in Your Terminal
---------------------------------------

Terimage is a Node.js tool that allows you to convert and display images directly within your terminal window.

### Features

-   Supports various image formats like JPG, PNG, etc. (through Jimp library)
-   Resizes images to fit your terminal dimensions
-   Utilizes colors and characters to represent image details

### Installation

1.  Make sure you have Node.js and npm (or yarn) installed on your system.
2.  Navigate to your project directory in the terminal.
3.  Run the following command to install Terimage:

```shell
npm install terimage
```

### Usage

Import the Terimage class in your Node.js script:

``` javascript
import Terimage from 'terimage';
```

Create a new Terimage instance:

``` javascript
const terimage = new Terimage();
```

Provide the image buffer and optional resize options to the `image` method:

```javascript
const fs = require('fs');

const imageBuffer = fs.readFileSync('path/to/your/image.jpg');

// Print the image with default size (100% width and height)
terimage.image(imageBuffer)
  .then((result) => console.log(result));

// Print the image with a specific width (50%) and scaled height
terimage.image(imageBuffer, { width: '50%' })
  .then((result) => console.log(result));

```

Options:

-   `width`: Accepts a number (pixels) or a string percentage (e.g., "50%").
-   `height`: Accepts a number (pixels) or a string percentage (e.g., "75%"). If not provided, the height will be automatically scaled based on the width and original image ratio.

### Contributing

Feel free to submit a pull request if you have any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.