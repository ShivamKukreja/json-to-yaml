const fs = require('fs'),
    path = require('path'),
    yaml = require('write-yaml'),
    paths = {
        READ_JSON: path.resolve('./data/data.json'),
        WRITE_JSON: path.resolve('./data/results.json'),
        WRITE_YAML: path.resolve('./data/data.yml')
    };
const addKeyValue = (dataArray) => {
    let length = dataArray.length,
        index = 0;
    for (; index < length; index++) {
        dataArray[index]["size"] = JSON.stringify(dataArray[index]).length;
    }
    return dataArray;
}
const readFile = (path, callback) => {
    let dataArray = [];
    fs.readFile(path, (err, data) => {
        if (err) {
            //callback(err);
            throw err;
        }
        dataArray = addKeyValue(JSON.parse(data));
        writeFile(dataArray);
    })
}
const writeFile = (data) => {
    fs.writeFile(paths.WRITE_JSON, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('results are being written in json format');
        
    })
    toYaml(data);
}
const toYaml = (data) => {
    yaml(paths.WRITE_YAML, data, (err) => {
        if (err) throw err;
        console.log('results are being written in yaml format');
    });
}
const jsonToYaml = () => {
    readFile(paths.READ_JSON);
}

module.exports = {
    jsonToYaml : jsonToYaml,
    readFile : readFile,
    addKeyValue : addKeyValue
}
/* module.exports = jsonToYaml; */