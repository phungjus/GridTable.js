
function examples() {

    const createTable = document.querySelector('#createTable')
    createTable.addEventListener('submit', createTableFunction)

    function createTableFunction(e) {

        e.preventDefault()

        document.querySelector('#exampleDiv').innerHTML = ''

        const numRows = document.querySelector('#numRows').value
        const numCols = document.querySelector('#numCols').value

        const exampleTable = new GridTable()
        exampleTable.makeGridTable(parseInt(numRows), parseInt(numCols), 'exampleDiv', 'example', 'table')

        document.querySelector('#numRows').value = ''
        document.querySelector('#numCols').value = ''


    }


    const exampleTable2 = new GridTable()
    exampleTable2.makeGridTable(4, 4, 'example2Div', 'example2', 'table')
    exampleTable2.updateHeader(['Header 1', 'Header 2', 'Header 3', 'Header 4'])
    const insertData = document.querySelector("#insertData")
    insertData.addEventListener('submit', insertDataFunction)

    function insertDataFunction(e) {

        e.preventDefault()

        const row = document.querySelector('#insertRow').value
        const col = document.querySelector('#insertCol').value
        const data = document.querySelector('#insertText').value

        exampleTable2.insertData(parseInt(row), parseInt(col), data)

    }
    
    const exampleTable3 = new GridTable()
    exampleTable3.makeGridTable(4, 4, 'example3Div', 'example3', 'table')
    const updateRow = document.querySelector('#updateRow')
    updateRow.addEventListener('submit', updateRowFunction)

    function updateRowFunction(e) {

        e.preventDefault()

        const row = document.querySelector('#rowUpdate').value
        const valueOne = document.querySelector('#columnOne').value
        const valueTwo = document.querySelector('#columnTwo').value
        const valueThree = document.querySelector('#columnThree').value
        const valueFour = document.querySelector('#columnFour').value

        exampleTable3.updateRow(parseInt(row), [valueOne, valueTwo, valueThree, valueFour])

    }

    const exampleTable4 = new GridTable()
    exampleTable4.makeGridTable(4, 4, 'example4Div', 'example4', 'table')
    exampleTable4.updateHeader(['Header 1', 'Header 2', 'Header 3', 'Header 4'])
    const updateCol = document.querySelector('#updateCol')
    updateCol.addEventListener('submit', updateColFunction)

    function updateColFunction(e) {

        e.preventDefault()

        const col = document.querySelector('#colUpdate').value
        const valueOne = document.querySelector('#rowOne').value
        const valueTwo = document.querySelector('#rowTwo').value
        const valueThree = document.querySelector('#rowThree').value

        exampleTable4.updateCol(parseInt(col), [valueOne, valueTwo, valueThree])

    }

    const exampleTable5 = new GridTable()
    exampleTable5.makeGridTable(2, 3, 'example5Div', 'example5', 'table')
    exampleTable5.updateHeader(['Header 1', 'Header 2', 'Header 3'])
    const deleteRow = document.querySelector('#deleteRow')
    deleteRow.addEventListener('submit', deleteRowFunction)

    function deleteRowFunction(e) {

        e.preventDefault()

        const row = document.querySelector('#rowNumDelete').value
        exampleTable5.deleteRow(parseInt(row))

        document.querySelector('#deleteRowSubmit').disabled = true
    }

    const exampleTable6 = new GridTable()
    exampleTable6.makeGridTable(1, 2, 'example6Div', 'example6', 'table')
    exampleTable6.updateHeader(['Header 1', 'Header 2'])
    const addRow = document.querySelector('#addRow')
    addRow.addEventListener('submit', addRowFunction)

    function addRowFunction(e) {

        e.preventDefault()

        const cellOne = document.querySelector('#firstCell').value
        const cellTwo = document.querySelector('#secondCell').value

        exampleTable6.addRow([cellOne, cellTwo])

    }

    const exampleTable7 = new GridTable()
    exampleTable7.makeGridTable(2, 2, 'example7Div', 'example7', 'table')
    exampleTable7.updateHeader(['Header 1', "Header 2"])
    const addColumn = document.querySelector("#addCol")
    addColumn.addEventListener('submit', addColumnFunction)

    function addColumnFunction(e) {

        e.preventDefault()

        const header = document.querySelector('#rowOneCell').value
        const cell = document.querySelector("#rowTwoCell").value

        exampleTable7.addCol([header, cell])

    }

    const warehouseInventory = new GridTable()
    warehouseInventory.makeGridTable(5, 4, 'example8Div', 'warehouseInventoryTable', 'table')
    warehouseInventory.updateHeader(['Item ID', 'Item Name', 'Item Quantity', 'Item Price ($)'])
    warehouseInventory.updateRow(2, ['001', 'PS5 Digital Edition Console', '699', '499.99'])
    warehouseInventory.updateRow(3, ['002', 'PS5 Console', '378', '629.99'])
    warehouseInventory.updateRow(4, ['003', 'Xbox Series X', '981', '599.99'])
    warehouseInventory.updateRow(5, ['004', 'Xbox Series S', '467', '379.99'])

    const filterTable = new GridTable()
    filterTable.makeGridTable(5, 4, 'filterTable', 'filterTable', 'table')
    filterTable.updateHeader(['Item ID', 'Item Name', 'Item Quantity', 'Item Price ($)'])
    filterTable.updateRow(2, ['001', 'PS5 Digital Edition Console', '699', '499.99'])
    filterTable.updateRow(3, ['002', 'PS5 Console', '378', '629.99'])
    filterTable.updateRow(4, ['003', 'Xbox Series X', '981', '599.99'])
    filterTable.updateRow(5, ['004', 'Xbox Series S', '467', '379.99'])
    const queryEvent = document.querySelector('#queryEvent')
    queryEvent.addEventListener('submit', queryEventFunction)

    function queryEventFunction(e) {

        e.preventDefault()

        const queryVariable = document.querySelector('#queryVariable').value
        const queryOperator = document.querySelector('#queryOperator').value
        const queryComparison = document.querySelector('#queryComparison').value

        filterTable.filter(queryVariable, queryOperator, queryComparison, 'filterResult')

    }


    const exampleGrid = new GridTable()
    exampleGrid.makeGridTable(3, 3, 'example9Div', 'example9', 'grid')
    exampleGrid.updateHeader(['Day 1', 'Day 2', 'Day 3'])
    const addEvent = document.querySelector('#addEvent')
    addEvent.addEventListener('submit', addEventFunction)

    function addEventFunction(e) {

        e.preventDefault()

        const eventName = document.querySelector('#eventName').value
        const eventDetails = document.querySelector('#eventDetails').value
        const eventTag = document.querySelector('#eventTag').value

        const eventRow = parseInt(document.querySelector('#eventRow').value)
        const eventCol = parseInt(document.querySelector('#eventCol').value)
        
        exampleGrid.addEvent({name: eventName, details: eventDetails, tag: eventTag}, eventRow, eventCol)

    }

    const exampleGrid2 = new GridTable()
    exampleGrid2.makeGridTable(10, 6, 'example10Div', 'exampleGrid2Grid', 'grid')
    exampleGrid2.updateHeader(['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    exampleGrid2.updateCol(1, ['9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM'])
    exampleGrid2.addEvent({name: 'CSC309 Exercise 1', details: 'Create a Basic Twitter Page using HTML and CSS!', 'tag': 'CSC309'}, 3, 2)
    exampleGrid2.addEvent({name: 'CSC301 Assignment 1', details: 'Create a Basic Shopping Cart app with a Front-end and Back-end', 'tag': 'CSC301'}, 8, 2)
    exampleGrid2.addEvent({name: 'Basketball Game', details: 'Pick-Up Basketball Game @ Hart House', 'tag': 'Basketball'}, 6, 3)
    exampleGrid2.addEvent({name: 'CSC324 Exercise 1', details: 'Learn the evaluation order of each function', 'tag': 'CSC324'}, 9, 3)
    exampleGrid2.addEvent({name: 'CSC309 Exercise 2', details: 'Create a Basic Library Webpage using Vanilla JS', 'tag': 'CSC309'}, 4, 3)
    exampleGrid2.addEvent({name: 'CSC301 Assignment 2', details: 'Create a Basic Pizza Parlour CLI using Python and Flask', 'tag': 'CSC301'}, 2, 4)
    exampleGrid2.addEvent({name: 'Basketball Practice', details: 'Basketball Practice @ Goldring', 'tag': 'Basketball'}, 5, 4)
    exampleGrid2.addEvent({name: 'CSC309 Exercise 3', details: 'Create a Basic Restaurant Reservation System with Node and Express', 'tag': 'CSC309'}, 7, 4)
    exampleGrid2.addEvent({name: 'Basketball Practice', details: 'Basketball Practice @ Athletic Centre', 'tag': 'Basketball'}, 3, 5)
    exampleGrid2.addEvent({name: 'CSC309 Exercise 4', details: 'Create an advanced Restaurant Reservation System with API routes', 'tag': 'CSC309'}, 10, 5)
    exampleGrid2.addEvent({name: 'CSC324 Midterm 1', details: 'Midterm online via Zoom', 'tag': 'CSC324'}, 8, 5)
    exampleGrid2.addEvent({name: 'Rest', details: 'Sleep In FINALLY'}, 5, 6)
    const displayTag = document.querySelector('#displayTag')
    displayTag.addEventListener('submit', displayTagFunction)

    function displayTagFunction(e) {

        e.preventDefault()

        const tagName = document.querySelector('#tagName').value

        exampleGrid2.groupTags(tagName, 'example11Div')

    }

    const exampleGrid3 = new GridTable()
    exampleGrid3.makeGridTable(10, 6, 'example12Div', 'exampleGrid3Grid', 'grid')
    exampleGrid3.updateHeader(['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    exampleGrid3.updateCol(1, ['9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM'])
    exampleGrid3.addEvent({name: 'CSC309 Exercise 1', details: 'Create a Basic Twitter Page using HTML and CSS!', 'tag': 'CSC309'}, 3, 2)
    exampleGrid3.addEvent({name: 'CSC301 Assignment 1', details: 'Create a Basic Shopping Cart app with a Front-end and Back-end', 'tag': 'CSC301'}, 8, 2)
    exampleGrid3.addEvent({name: 'Basketball Game', details: 'Pick-Up Basketball Game @ Hart House', 'tag': 'Basketball'}, 6, 3)
    exampleGrid3.addEvent({name: 'CSC324 Exercise 1', details: 'Learn the evaluation order of each function', 'tag': 'CSC324'}, 9, 3)
    exampleGrid3.addEvent({name: 'CSC309 Exercise 2', details: 'Create a Basic Library Webpage using Vanilla JS', 'tag': 'CSC309'}, 4, 3)
    exampleGrid3.addEvent({name: 'CSC301 Assignment 2', details: 'Create a Basic Pizza Parlour CLI using Python and Flask', 'tag': 'CSC301'}, 2, 4)
    exampleGrid3.addEvent({name: 'Basketball Practice', details: 'Basketball Practice @ Goldring', 'tag': 'Basketball'}, 5, 4)
    exampleGrid3.addEvent({name: 'CSC309 Exercise 3', details: 'Create a Basic Restaurant Reservation System with Node and Express', 'tag': 'CSC309'}, 7, 4)
    exampleGrid3.addEvent({name: 'Basketball Practice', details: 'Basketball Practice @ Athletic Centre', 'tag': 'Basketball'}, 3, 5)
    exampleGrid3.addEvent({name: 'CSC309 Exercise 4', details: 'Create an advanced Restaurant Reservation System with API routes', 'tag': 'CSC309'}, 10, 5)
    exampleGrid3.addEvent({name: 'CSC324 Midterm 1', details: 'Midterm online via Zoom', 'tag': 'CSC324'}, 8, 5)
    exampleGrid3.addEvent({name: 'Rest', details: 'Sleep In FINALLY'}, 5, 6)




//     exampleGrid2.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 4, 2)
//     exampleGrid2.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 5, 3)
//     exampleGrid2.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 6, 4)
//     exampleGrid2.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 7, 5)

// }
}

examples()
