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
import Terimage from "terimage";
import fs from "fs";

const terimage = new Terimage();

const image = fs.readFileSync("./PATH_TO_IMAGE");

terimage.image(image).then((result) => {
    console.log(result);
});
```

Options:

-   `width`: Accepts a number (pixels) or a string percentage (e.g., "50%").
-   `height`: Accepts a number (pixels) or a string percentage (e.g., "75%"). If not provided, the height will be automatically scaled based on the width and original image ratio.

### Contributing

Feel free to submit a pull request if you have any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Note

>  This project is still in its early stages, and there are many improvements to be made. Feel free to contribute or provide feedback.
