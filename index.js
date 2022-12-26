import fs from "fs";

import { formatDate, groupBy, groupByDate, getMetrics } from "./src/handler.js";

let savedData = [];

let fileString = fs.readFileSync("./data/sensor_data.json").toString();
let fileObj = JSON.parse(fileString);

let dataFormatDate = groupBy(formatDate(fileObj.array), "roomArea");

let sensorByDateRoom1 = groupByDate(dataFormatDate.roomArea1);
let sensorByDateRoom2 = groupByDate(dataFormatDate.roomArea2);
let sensorByDateRoom3 = groupByDate(dataFormatDate.roomArea3);

let sensorDataRoom1 = getMetrics(sensorByDateRoom1);
let sensorDataRoom2 = getMetrics(sensorByDateRoom2);
let sensorDataRoom3 = getMetrics(sensorByDateRoom3);

savedData.push(
  "room1",
  sensorDataRoom1,
  "room2",
  sensorDataRoom2,
  "room3",
  sensorDataRoom3
);

fs.writeFile("sensorData.json", JSON.stringify(savedData, null, 2), (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully to sensorData.json\n");
  }
});
