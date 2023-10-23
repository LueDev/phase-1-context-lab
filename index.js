/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(arrays){
    let employeeRecords = [];
    arrays.map((arr) => {employeeRecords.push(createEmployeeRecord(arr))})
    return employeeRecords
}


function createTimeInEvent(dateStamp){
    let timeObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    this.timeInEvents.push(timeObject)
    return this
}


function createTimeOutEvent(dateStamp){
    let timeObject = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }

    this.timeOutEvents.push(timeObject)
    return this
}


function hoursWorkedOnDate(date){ 
    const timeIn = this.timeInEvents.filter(timeInStamp => timeInStamp.date === date)
    const timeOut = this.timeOutEvents.filter(timeOutStamp => timeOutStamp.date === date)
    return (timeOut[0].hour - timeIn[0].hour) / 100
}

function wagesEarnedOnDate(date){
    // console.log("THIS FROM wagesEarnedOnDate: ", this)
    //NOTE: Since we are calling hoursWorkedOnDate, we must use .call to pass this to the function
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName){
    // console.log(srcArray)
    return srcArray.filter(e => {return e.firstName === firstName})[0]
}

function calculatePayroll(array){
    
    //explanation: for all empObjs within the passed arr, map and 
    //reduce the wages owed for all into the totalPayroll accumulator

    let totalPayroll = 0;
    
    array.map(empObj => {
        totalPayroll += allWagesFor.call(empObj)
    })

    return totalPayroll
}

let emp = {
    firstName: 'Bart',
    familyName: 'Simpson',
    title: 'Scamp',
    payPerHour: 100,
    timeInEvents: [ { type: 'TimeIn', hour: 1300, date: '2018-01-01' } ],
    timeOutEvents: [ { type: 'TimeOut', hour: 2300, date: '2018-01-01' } ]
  }
  
//Since the date and hour are one string, we can use call rather than array
// console.log("TIME IN: ", createTimeInEvent.call(emp, "2018-01-01 1300")) //pass
// console.log("TIME OUT: ", createTimeOutEvent.call(emp, "2018-01-01 2300")) //pass
// console.log("HOURS WORKED ON DATE: ", hoursWorkedOnDate.call(emp, '2018-01-01'))
// console.log("WAGES EARNED ON DATE: ", wagesEarnedOnDate.call(emp, '2018-01-01'))