//ADD SOME DYNAMIC EXAMPLES BY ALLOWING THE USER TO ENTER THEIR OWN INPUTS

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

    

}

examples()
