// const d3 = require('d3')
let metObjects;
d3.csv("./MetObjects.csv", convertStringToNumber, data => {
  // console.log(lostKeys(data))

  const artifact = findOldestArtifact(data);
  const depts = allDepartments(data)
  const largestDept = findTheLargestDept(depts);
  const bigYear = abundantYear(data)

  let museumFact = d3.select(".museum")
    .append("ul")
  museumFact.append("li")
      .text(`The oldest artifact in the collection is ${artifact["Object Name"]} from ${artifact['Object Date']}.`)
  museumFact.append("li")
      .text(`The department with the most artifacts is ${largestDept} with ${depts[largestDept]} artifacts.`)
  museumFact.append("li")
      .text(`The year in which the most artifacts at the Met were created was ${bigYear.year} with ${bigYear.amt}.`)
})

