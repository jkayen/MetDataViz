// convert data values to numbers from strings
const convertStringToNumber = d => {
  d["Object End Date"] = +d["Object End Date"]; // coerce to number
  return d;
}
// get number of artifacts for each year
const getArtifactsByYear = data => {
  let years = {};
  let yearsArr = [];
  data.forEach(d => {
    if (years[d["Object End Date"]]) {
      years[d["Object End Date"]]++
    } else {
      years[d["Object End Date"]] = 1
    }
  })
  for (let year in years) {
    yearsArr.push({year: year, num: years[year]})
  }
  return yearsArr;
}

// return the year that has the most artifacts
const abundantYear = data => {
  data = getArtifactsByYear(data)
  let year;
  let amt = 100;
  for (let i = 0; i < data.length; i++) {
    if (data[i].num > amt) {
      year = data[i].year;
      amt = data[i].num
    }
  }
  return {year, amt}
}

// find number of gold objects in the collection
const howMuchGold = data => {
  let iLoveGold = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]["Medium"] === "Gold") iLoveGold++
  }
  return iLoveGold
}

// find the oldest object in the collection
const findOldestArtifact = data => {
  let oldest;
  let year = 0;
  data.forEach(d => {
    if (d["Object End Date"] < year) {
      year = d["Object End Date"];
      oldest = d;
    }
  })
  return oldest;
}
// find all column titles in csv
const lostKeys = data => {
  return Object.keys(data[0])
}

// find all depts in the collection, as an object
const allDepartments = data => {
  let deptObj = {};
  data.forEach(d => {
    if (!deptObj[d.Department]) {
      deptObj[d.Department] = 1;
    } else {
      deptObj[d.Department]++;
    }
  })
  return deptObj;
}

// convert deptObj in an array with name & value keys
const deptArr = coll => {
  let deptArr = [];
  for (let dept in coll) {
    if (coll.hasOwnProperty(dept)) {
      deptArr.push({name: dept, value: coll[dept]})
    }
  }
  return deptArr;
}
// find the largest dept from the deptObj
const findTheLargestDept = coll => {
  let max = 0;
  let largest;
  for (let dept in coll) {
    if (coll[dept] > max) {
      largest = dept;
      max = coll[dept];
    }
  }
  return largest;
}



/********************/


