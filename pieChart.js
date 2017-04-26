d3.csv('./MetObjects.csv', convertStringToNumber, data => {
  data = allDepartments(data)
  console.log(data)
})
