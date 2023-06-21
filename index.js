// Your code here

let employee =     
{   
    firstName: '',
    familyName: '',
    title: '',
    payPerHour: 0,
    timeInEvents: [],
    timeOutEvents: [],
};

function createEmployeeRecord(data)
{
    let e = [...employee];

    e.firstName     = data[0];
    e.familyName    = data[1]
    e.title         = data[2];
    e.payPerHour    = data[3];
    e.timeInEvents  = [];
    e.timeOutEvents = []

    return e;
}

function createEmployeeRecords(allEmployees)
{   
    let employeeRecords = [];
    for (let i = 0; i < allEmployees.length; i++)
    {
        let e = [...employee];//Object.assign({}, employee);

        e.firstName  = allEmployees[i][0];
        e.familyName = allEmployees[i][1];
        e.title      = allEmployees[i][2];
        e.payPerHour = allEmployees[i][3];

        employeeRecords.push(e);
    }

    return employeeRecords;
}

function createTimeInEvent(employee, timeStamp)
{
    let splitStamp = timeStamp.split(' ');
    let dateStamp  = splitStamp[0];
    let hourStamp  = splitStamp[1];

    let timeIn =
    {
        type: "TimeIn",
        hour: (Number(hourStamp)),
        date: dateStamp,
    }
    
    employee.timeInEvents.push(timeIn);
    
    return employee;
}

function createTimeOutEvent(employee, timeStamp)
{
    let splitStamp = timeStamp.split(' ');
    let dateStamp  = splitStamp[0];
    let hourStamp  = splitStamp[1];

    let timeOut =
    {
        type: "TimeOut",
        hour: (Number(hourStamp)),
        date: dateStamp,
    }

    employee.timeOutEvents.push(timeOut);
    
    return employee;
}

function hoursWorkedOnDate(employeeRecord, date)
{
    let startTime = 0;
    let endTime = 0;

    // Get start time on date
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++)
    {
        if (employeeRecord.timeInEvents[i].date != date)
            continue;

        startTime = employeeRecord.timeInEvents[i].hour;
        break;
    }

    // Get start time on given date
    for(let i = 0; i < employeeRecord.timeOutEvents.length; i++)
    {
        if (employeeRecord.timeOutEvents[i].date != date)
            continue;

        endTime = employeeRecord.timeOutEvents[i].hour;
        break;
    }

    return ((Math.abs(endTime -startTime))/100);
}

function wagesEarnedOnDate(employeeRecord, date)
{
    let hourWorked = hoursWorkedOnDate(employeeRecord, date);

    return (hourWorked * employeeRecord.payPerHour);
}

function allWagesFor(employeeRecord) 
{
    let allWages = 0;

    for(let i = 0; i < employeeRecord.timeInEvents.length; i++)
    {
        allWages += wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date);
    }

    return allWages;
}

function calculatePayroll(employeeRecordArray)
{
    let grandtotal = 0;
    for(let i = 0; i < employeeRecordArray.length; i++)
    {
        grandtotal += allWagesFor(employeeRecordArray[i]);
    }
    
    console.log(`grandtotal`, grandtotal);

    return grandtotal;
}