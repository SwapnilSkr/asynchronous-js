const fs = require("fs");
const superagent = require("superagent");
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    //creating a promise to read a file....
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not find file");
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    //creating a promise to write a file.....
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("success");
    });
  });
};
const dogpic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    const x = res.body.message;

    await writeFilePro("dog-img.txt", x);
    console.log(
      "Random image of a cute dog should have been written in the file"
    );
  } catch (err) {
    console.log(err);
  }
};
dogpic();
