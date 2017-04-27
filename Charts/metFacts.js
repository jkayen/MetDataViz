// convert csv to object where columns are keys
d3.csv("./MetObjects.csv", convertStringToNumber, data => {
  // loop through data to find artifact with oldest 'object end date'
  const artifact = findOldestArtifact(data);
  // loop to find all departments and how many artifacts in each
  const depts = allDepartments(data);
  // of all those departments, find the largest one
  const largestDept = findTheLargestDept(depts);
  // count artifacts by year and determine which year has the most
  const bigYear = abundantYear(data);
  // determine how many artifacts are of gold
  const goldObjects = howMuchGold(data);
  // access the div with class museum and create an unordered list
  let museumFact = d3.select(".museum")
    .append("ul")
  museumFact.append("li")
      .text(`The oldest artifact in the collection is ${artifact['Object Name']} from ${artifact['Object Date']}.`)
  museumFact.append("li")
      .text(`The department with the most artifacts is ${largestDept} with ${depts[largestDept]} artifacts.`)
  museumFact.append("li")
      .text(`The year in which the most artifacts at the Met were created was ${bigYear.year} with ${bigYear.amt}.`)
  museumFact.append("li")
      .text(`Of the database's 400k+ artifacts, ${goldObjects} of them are gold.`)
})

