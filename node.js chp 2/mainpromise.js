import fs from "fs/promises";
let a = await fs.readFile("chirag.txt");
let b = await fs.appendFile("chirag.txt", "\n\n\n\n i was adding new para ");

console.log(a.toString(), fs);
