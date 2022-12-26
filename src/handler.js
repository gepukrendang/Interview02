import { average, min, max, median } from "../math/math.js";

function dayData(type, date, average, min, max, median) {
  this.type = type;
  this.date = date;
  this.average = average;
  this.min = min;
  this.max = max;
  this.median = median;
}

export const formatDate = (array) => {
  array.forEach(function (item) {
    let date = new Date(item.timestamp);
    let dateString = date.toLocaleDateString("en-US");
    item.timestamp = dateString;
  });
  return array;
};

export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const groupByDate = (array) => {
  return array.reduce(function (acc, cur) {
    let date = cur.timestamp;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});
};

export const getMetrics = (array) => {
  let tempArray = [];
  let humidArray = [];
  for (const key in array) {
    let temp = [];
    let humid = [];

    for (const element in array[key]) {
      temp.push(array[key][element].temperature);
      humid.push(array[key][element].humidity);
    }

    let avgTemp = average(temp);
    let minTemp = min(temp);
    let maxTemp = max(temp);
    let medTemp = median(temp);

    let avgHumid = average(humid);
    let minHumid = min(humid);
    let maxHumid = max(humid);
    let medHumid = median(humid);

    const dataTemp = new dayData(
      "Temperature Data",
      key,
      avgTemp,
      minTemp,
      maxTemp,
      medTemp
    );
    const dataHumid = new dayData(
      "Humidity Data",
      key,
      avgHumid,
      minHumid,
      maxHumid,
      medHumid
    );
    tempArray.push(dataTemp);
    humidArray.push(dataHumid);
  }
  return { tempArray, humidArray };
};
