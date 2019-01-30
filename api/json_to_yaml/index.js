const fs = require("fs"),
  path = require("path"),
  yaml = require("write-yaml"),
  paths = {
    READ_JSON: path.resolve("./data/data.json"),
    WRITE_JSON: path.resolve("./data/results.json"),
    WRITE_YAML: path.resolve("./data/data.yml")
  };
const addKeyValue = dataArray => {
  let length = dataArray.length,
    index = 0;
  for (; index < length; index++) {
    dataArray[index]["size"] = JSON.stringify(dataArray[index]).length;
  }
  return dataArray;
};
const readFile = path =>
  new Promise((resolve, reject) => {
    let dataArray = [];
    fs.readFile(path, (err, data) => {
      if (err) {
        //callback(err);
        // throw err;
        reject(err);
      }
      dataArray = addKeyValue(JSON.parse(data));
      //writeFile(dataArray);
      resolve(dataArray);
    });
  });
const writeFile = data =>
  new Promise((resolve, reject) => {
    fs.writeFile(paths.WRITE_JSON, JSON.stringify(data, null, 2), err => {
      if (err) {
        // throw err;
        reject(err);
      }
      console.log("results are being written in json format");
      resolve(data);
    });
    //toYaml(data);
  });
const toYaml = data =>
  new Promise((resolve, reject) => {
    yaml(paths.WRITE_YAML, data, err => {
      if (err) {
        // throw err;
        reject(err);
      }
      console.log("results are being written in yaml format");
      resolve(true);
    });
  });
const jsonToYaml = () =>
  readFile(paths.READ_JSON)
  .then(data => writeFile(data).then(data => toYaml(data)));

// module.exports = {
//     jsonToYaml : jsonToYaml,
//     readFile : readFile,
//     addKeyValue : addKeyValue
// }
module.exports = {
  jsonToYaml,
  addKeyValue
};
