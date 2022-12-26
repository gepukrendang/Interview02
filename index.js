import fs from "fs";

import { formatDate, groupBy, groupByDate, getMetrics } from "./src/handler.js";

let fileString = fs.readFileSync("./data/sensor_data.json").toString();
let fileObj = JSON.parse(fileString);

let dataFormatDate = groupBy(formatDate(fileObj.array), "roomArea");

let sensorByDateRoom1 = groupByDate(dataFormatDate.roomArea1);
let sensorByDateRoom2 = groupByDate(dataFormatDate.roomArea2);
let sensorByDateRoom3 = groupByDate(dataFormatDate.roomArea3);

let sensorDataRoom1 = getMetrics(sensorByDateRoom1);
let sensorDataRoom2 = getMetrics(sensorByDateRoom2);
let sensorDataRoom3 = getMetrics(sensorByDateRoom3);

console.log(sensorDataRoom1);
console.log(sensorDataRoom2);
console.log(sensorDataRoom3);
