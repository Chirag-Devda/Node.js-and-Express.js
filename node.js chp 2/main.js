/** This is example how we have an callback hell when creates and reads the so many files one after other  */

const fs = require("fs");
console.log(fs);
console.log("starting");

/**
 * fs.writeFile(
  "chirag2.txt",
  "This function will run Asynchronously and hav callback ",
  () => {
    console.log("Done");
    fs.readFile("chirag2.txt", (error, data) => {
      console.log(error, data.toString());
    });
  }
);
fs.appendFile("chirag.txt", "this new data", (e, d) => {
  console.log("hello");
});

 */
// fs.writeFileSync("chirag.txt", "creating this file fs module "); // This will Synchronous
////////this will run as Asynchronous which is good and callback in which read the file
console.log("Ending");
