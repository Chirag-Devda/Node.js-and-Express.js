// Exercise 15
// Write node.js programm to clear clutter inside of a directory and organize the contents of that directory into different folders

// 1 Chirag.jpg
// 2 khushal.png
// 3 Rahul.pdf
// 4 sahil.svg

// this:
// jpg/chirag.jpg
// png/khushal.png
// pdf/ Rahul.pdf
// svg/sahil.svg

import fs from "fs/promises";
import fsn from "fs";
import path from "path";

let basepath =
  "C:\\Users\\Rahul\\Documents\\web development\\Node.js and Express.js\\Express Ex-1";
let files = await fs.readdir(basepath);

for (const item of files) {
  let ext = item.split(".")[item.split(".").length - 1];
  if (ext !== "json" && ext !== "js" && item.split(".").length > 1) {
    if (fsn.existsSync(path.join(basepath, ext))) {
      fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
    } else {
      fs.mkdir(ext);
      fs.rename(path.join(basepath, item), path.join(basepath, ext));
    }
  }
}
