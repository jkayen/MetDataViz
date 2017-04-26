// const d3 = require('d3')
let metObjects;
d3.csv("./MetObjects.csv", convertStringToNumber, data => {
  // console.log(lostKeys(data))

  const artifact = findOldestArtifact(data);
  const depts = allDepartments(data)
  const largestDept = findTheLargestDept(depts);

  d3.select(".museum")
    .append("p")
      .text(`The oldest artifact in the collection is ${artifact["Object Name"]} from ${artifact['Object Date']}`)
    .append("p")
      .text(`The department with the most artifacts is ${largestDept} with ${depts[largestDept]} artifacts`)
})

