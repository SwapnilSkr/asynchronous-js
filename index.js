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
readFilePro(`${__dirname}/dog.txt`)
  .then((res) => {
    console.log(`Breed: ${res}`);
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`); //here in order to chain promises each promise is getting returned to use in the next then block....
  })
  .then((data) => {
    console.log(data.body.message);
    return writeFilePro("dog-img.txt", data.body.message);
  })
  .then(() => {
    console.log(
      "Random image of a cute dog should have been written in the file"
    );
  })
  .catch((err) => {
    console.log(err);
  });
