import fs from "fs";

const BASE_PATH = "./database/";

export const FILES = {
  ENQUIRIES: "enquiries.json",
};

export const readFile = (fileName) => {
  const data = fs.readFileSync(BASE_PATH + fileName);
  return JSON.parse(data);
};

export const writeFile = (data, fileName) => {
  fs.writeFileSync(BASE_PATH + fileName, JSON.stringify(data));
};

export const updateFile = (newData, fileName) => {
  const myArr = readFile(fileName);
  myArr.push(newData);
  writeFile(myArr, fileName);
};
