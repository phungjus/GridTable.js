"use strict";
const log = console.log

//CURRENT TASKS:
//TODO: Add Filtering Feature it filters according to specifications???

//HOLD OFF FOR NOW:
//TODO: Add color coding
//TODO: Add import/export object

function GridTable() {
    
    this.row = 0
    this.col = 0
    this.rowData = []
    this.cellData = []
    this.uniqueID = undefined

}

    GridTable.prototype = {

        makeGridTable: function(numRows, numCols, selector, uniqueID) {

            /**
            * @param {Number} numRows
            * @param {Number} numCols
            * @param {String} selector
            * @param {String} uniqueID 
            * 
            * Description:
            * This function takes in 4 parameters: numRows, numCols, selector, and uniqueID.
            * It then creates an HTML table with 'numRows' rows and 'numCols' columns and 
            * id: 'GridTable' + uniqueID, then adds that table to the HTML element with id: 'selector' 
            */

            this.uniqueID = uniqueID
            this.row = numRows
            this.col = numCols
            const GridTable = document.createElement('table')
            GridTable.id = 'GridTable' + uniqueID
            const insert = document.getElementById(selector)

            //Generate the Rows

            for (let row = 0; row < numRows; row++) {
                const tableRow = document.createElement('tr')
                tableRow.id = 'GridTable' + uniqueID + 'Row' + (row + 1)
                this.rowData.push(tableRow)
            }

            //Generate the head of the table

            const firstRow = this.rowData[0]

            for (let col = 0; col < numCols; col++) {

                const tableHead = document.createElement('th')
                tableHead.id = 'GridTable'+ uniqueID + 'DataRow-' + 1 + '-Col-' + (col+1)
                const text = document.createTextNode('')
                tableHead.appendChild(text)
                this.cellData.push({'row': 1, 'col': (col+1), 'data': tableHead.innerText})
                firstRow.appendChild(tableHead)

            }

            for (let row = 1; row < this.rowData.length; row++) {
                
                for (let col = 0; col < numCols; col++) {

                    const tableData = document.createElement('td')
                    tableData.id = 'GridTable' + uniqueID + 'DataRow-' + (row+1) + '-Col-' + (col+1)
                    const text = document.createTextNode('')
                    tableData.appendChild(text)
                    this.cellData.push({'row': (row+1), 'col': (col+1), 'data': tableData.innerText})
                    this.rowData[row].appendChild(tableData)
                }

            }

            for (let row = 0; row < numRows; row++) {
                GridTable.appendChild(this.rowData[row])
            }
            insert.append(GridTable)
        },

        insertData: function(rowNum, colNum, data) {

            /**
            * @param {Number} rowNum
            * @param {Number} colNum 
            * @param {String} data
            * 
            * Description:
            * This function takes in three parameters called cellRow, cellCol, data. The function
            * inserts the new data into the cell located at row: cellRow and column: cellCol.
            * 
            * Note: this function will throw an error if the GridTable hasn't been initialized (i.e. no columns or
            * no rows created)
            */

            if (this.checkInitialization()) {
                Error("Please create a table before inserting data")
            }

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+rowNum+'-Col-'+colNum)
            cell.innerText = data

            this.cellData.filter((cell) => cell.row === rowNum && cell.col == colNum)[0].data = data

        },

        checkInitialization: function() {

            /**
            * Description:
            * This function checks whether or not a GridTable object has been created
            */

            return (this.row === 0 || this.col === 0)

        },

        updateRow: function(rowNum, updatedList) {

            /**
            * @param {Number} rowNum
            * @param {Array} updatedList 
            * 
            * Description:
            * This function takes in two parameters rowNum and updatedList. It then updates all
            * the data in the row with the values inside the Array updatedlist.
            * 
            * Note: this function will throw an error if the length of updatedList doesn't match
            * up to the number of columns inside the GridTable.
            */

            if (this.checkInitialization() || updatedList.length !== this.col) {
                Error("Create Table First or Size List != Number of Columns")
            }

            for (let col = 0; col < this.col; col++) {

                const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+rowNum+'-Col-'+(col+1))
                cell.innerText = updatedList[col]

                this.cellData.filter((cell) => cell.row === rowNum && cell.col == (col+1))[0].data = updatedList[col]

            }

        },

        updateCol: function(colNum, updatedList) {

            /**
            * @param {Number} colNum
            * @param {Array} updatedList 
            * 
            * Description:
            * This function takes in two parameters colNum and updatedList. It then updates all
            * the data in the column with the values inside the Array updatedlist.
            * 
            * Note: this function will throw an error if the length of updatedList doesn't match
            * up to the number of rows inside the GridTable.
            */

            if (this.checkInitialization() || colNum > this.col || colNum < 1 || updatedList.length > this.row) {
                Error(("Create Table First or Size List != Number of Rows or colNum > Number of Columcs or colNum < 1"))
            }

            for (let row = 1; row < this.row; row++) {

                const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+(row+1)+'-Col-'+colNum)
                cell.innerText = updatedList[row-1]

                this.cellData.filter((cell) => cell.row === (row+1) && cell.col == colNum)[0].data = updatedList[row-1]
            }

        },

        updateHeader: function(listOfNewHeaders) {

            /**
            * @param {Array} listOfNewHeaders 
            * 
            * Description:
            * This function takes in a parameter listOfNewHeaders. It then updates the header of the GridTable with
            * the data inside the Array listOfNewHeaders.
            * 
            * Note: this function will throw an error if the length of updatedList doesn't match
            * up to the number of columns inside the GridTable.
            */

            if (this.checkInitialization() || listOfNewHeaders.length !== this.col) {
                Error("Create Table First or Size of Headers List != Number of Columns")
            }

            this.updateRow(1, listOfNewHeaders)

        },

        deleteRow: function(rowNum) {

            /**
            * @param {Number} rowNum
            * 
            * Description:
            * This function takes in a parameter rowNum. It then deletes the specified row from the
            * GridTable.
            * 
            * Note: this function throws an error if the rowNum to be deleted is the header, or isn't
            * a valid row number in the GridTable
            */

            if (this.checkInitialization() || rowNum > this.row || rowNum === 1) {
                Error("Create Table First or rowNum > Number of Rows or can't delete header")
            }
            const rowToDelete = document.getElementById("GridTable"+this.uniqueID+"Row"+rowNum)
            rowToDelete.parentNode.removeChild(rowToDelete)


            //Removes all cells from rowNum
            this.cellData = this.cellData.filter(cell => cell.row !== rowNum)

            //Updates all cells
            this.cellData.filter(cell => cell.row > rowNum).map(cell => cell.row = cell.row - 1)

            for (let row = rowNum; row < this.row; row++) {

                const rowUpdate = document.getElementById("GridTable"+this.uniqueID+"Row"+(row+1))

                for (let col = 0; col < this.col; col++) {

                    const cellUpdate = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+(row+1)+'-Col-'+(col+1))
                    cellUpdate.id = "GridTable"+this.uniqueID+"DataRow-"+(row)+'-Col-'+(col+1)

                }

                rowUpdate.id = "GridTable"+this.uniqueID+"Row"+(row)

            }

            this.row -= 1

        },

        deleteCol: function(colNum) {

            /**
            * @param {Number} colNum
            * 
            * Description:
            * This function takes in a parameter colNum. It then deletes the specified column from the
            * GridTable.
            * 
            * Note: this function throws an error if the column to be deleted isn't a valid number (i.e. colNum
            * is negative or colNum isn't in the GridTable object)
            */

            if (this.checkInitialization() || colNum > this.col || colNum < 1) {
                Error("Create Table First or colNum > Number of Cols or colNum < 1")
            }

            this.cellData = this.cellData.filter(cell => cell.col !== colNum)
            this.cellData.filter(cell => cell.col > colNum).map(cell => cell.col = cell.col - 1)

            
            for (let row = 0; row < this.row; row++) {

                const cellToDelete = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+(row+1)+'-Col-'+colNum)
                cellToDelete.parentNode.removeChild(cellToDelete)

                for (let col = colNum; col < this.col; col++) {

                    const cellUpdate = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+(row+1)+'-Col-'+(col+1))
                    cellUpdate.id = "GridTable"+this.uniqueID+"DataRow-"+(row+1)+'-Col-'+(col)

                }

            }

            this.col -= 1

        },

        sortData: function(colNum, direction) {

            /**
            * @param {Number} colNum
            * @param {String} direction
            * 
            * Description:
            * This function takes in two parameters colNum and direction. It then sorts the specified column
            * in accordance to the direction specified which can either be: 'asc' for ascending order or 
            * 'desc' for descending order.
            */

            const colValues = this.cellData.filter(cell => cell.col === colNum && cell.row !== 1)
            const newFilteredArray = []

            const firstCell = this.cellData.filter(cell => cell.col === colNum)[2]

            if (parseFloat(firstCell.data)) {
                if (direction == 'asc') {
                    colValues.sort((a,b) => (a.data-b.data))
                } else if (direction == 'desc') {
                    colValues.sort((a,b) => (b.data-a.data))
                } else {
                    log("error, wrong sorting dir") 
                }
            } else {
                if (direction == 'asc') {
                    colValues.sort(function(a,b) {
                        let valueA = a.data.toLowerCase()
                        let valueB = b.data.toLowerCase()
        
                        if (valueA < valueB) {
                            return -1
                        }
        
                        if (valueB < valueA) {
                            return 1
                        }
        
                        return 0;
                    }) 
                } else if (direction == 'desc') {
                    colValues.sort(function(a,b) {
                        let valueA = a.data.toLowerCase()
                        let valueB = b.data.toLowerCase()
        
                        if (valueA < valueB) {
                            return 1
                        }
        
                        if (valueB < valueA) {
                            return -1
                        }
        
                        return 0;
                    })
                } else {
                    log("error, wrong sorting dir")
                }
            }

            for (let sortedCellIndex = 0; sortedCellIndex < colValues.length; sortedCellIndex++) {

                const newRow = []
                const oldRow = colValues[sortedCellIndex].row

                const oldRowValues = this.cellData.filter(cell => cell.row == oldRow)

                for (let colCounter = 0; colCounter < this.col; colCounter++) {

                    newRow.push(oldRowValues.filter(cell => cell.col == colCounter+1)[0].data)

                }

                newFilteredArray.push(newRow)

            }

            for (let rowCounter = 2; rowCounter < this.row+1; rowCounter++) {

                this.updateRow(rowCounter, newFilteredArray[rowCounter-2])

            }

        },
        
        addRow: function(rowData) {

            /**
            * @param {Array} rowData
            * 
            * Description:
            * This function takes in a parameter rowData. It then adds a row to the GridTable where each
            * entry is taken from the rowData Array.
            * 
            * Note: this function throws an error if the length of rowData is not equal to the number of columns
            * in the GridTable object.
            */

            if (rowData.length !== this.col) {
                Error("Values provided don't match up with number of columns")
            }

            const GridTable = document.getElementById("GridTable" + this.uniqueID)
            const tableRow = document.createElement('tr')
            tableRow.id = 'GridTable'+this.uniqueID+'Row' + (this.row + 1)

            for (let i = 0; i < rowData.length; i++) {
                
                const tableData = document.createElement('td')
                tableData.id = 'GridTable'+this.uniqueID+'DataRow-' + (this.row+1) + '-Col-' + (i+1)
                const text = document.createTextNode(rowData[i])
                tableData.appendChild(text)
                tableRow.appendChild(tableData)

                const newCell = {row: (this.row+1), col: (i+1), data: rowData[i]}
                this.cellData.push(newCell)

            }

            GridTable.appendChild(tableRow)


            this.row += 1

        },

        addCol: function(colData) {

            /**
            * @param {Array} colData
            * 
            * Description:
            * This function takes in a parameter colData. It then adds a column to the GridTable where each entry
            * is taken from the colData Array.
            */

            if (colData.length !== this.row) {
                Error("Number of values in input do not match number of rows in GridTable")
            }

            const tableHead = document.getElementById("GridTable"+this.uniqueID+"Row1")
            const tableDataHead = document.createElement('th')
            tableDataHead.id = 'GridTable'+this.uniqueID+'DataRow-1-Col-' + (this.col+1)
            const textHead = document.createTextNode(colData[0])
            tableDataHead.appendChild(textHead)
            tableHead.appendChild(tableDataHead)
            const newCellHeader = {row: 1, col: (this.col+1), data: colData[0]}
            this.cellData.push(newCellHeader)

            for (let row = 1; row < this.row; row++) {

                const tableRow = document.getElementById("GridTable"+this.uniqueID+"Row"+(row+1))
                const tableData = document.createElement('td')
                tableData.id = 'GridTable'+this.uniqueID+'DataRow-' + (row+1) + '-Col-' + (this.col+1)
                const text = document.createTextNode(colData[row])
                tableData.appendChild(text)
                tableRow.appendChild(tableData)

                const newCell = {row: (row+1), col: (this.col+1), data: colData[row]}
                this.cellData.push(newCell)

            }

            this.col += 1

        },

        addEvent: function(eventObj, cellRow, cellCol) {
            
            /**
            * @param {Object} eventObj
            * 
            * 
            * Description:
            * This function takes in three parameters eventObj, cellRow, and cellCol. This function can only be called
            * with the Grid form of GridTable object, it adds the eventObj to the specified cellRow and cellCol.
            */

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)

            const tooltipDiv = document.createElement('div')
            tooltipDiv.className = 'tooltip'
            tooltipDiv.innerText = eventObj.name
            tooltipDiv.id = 'tooltipDiv'+eventObj.name+'Row'+cellRow+'Col'+cellCol

            const tooltipText = document.createElement('span')
            tooltipText.className = 'tooltiptext'
            tooltipText.innerText = eventObj.details

            tooltipDiv.appendChild(tooltipText)

            cell.appendChild(tooltipDiv)
        },

        deleteEvent: function(cellRow, cellCol) {

            /**
            * @param {Number} cellRow
            * @param {Number} cellCol 
            * 
            * Description:
            * This function takes in two integers called cellRow and cellCol, it then deletes
            * the event located at that position.
            */

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)
            cell.innerHTML = ''

        },

        modifyEvent: function(updatedEventObj, cellRow, cellCol) {

            /**
            * @param {Object} updatedEventObj 
            * 
            * Description:
            * This function takes in an object called updatedEventObj, it must contain the keys:
            * name and details. It will then update the event at the specified row and column.
            */

           const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)
           cell.innerHTML = ''
        
           const tooltipDiv = document.createElement('div')
           tooltipDiv.className = 'tooltip'
           tooltipDiv.innerText = updatedEventObj.name
           tooltipDiv.id = 'tooltipDiv'+updatedEventObj.name+'Row'+cellRow+'Col'+cellCol

           const tooltipText = document.createElement('span')
           tooltipText.className = 'tooltiptext'
           tooltipText.innerText = updatedEventObj.details

           tooltipDiv.appendChild(tooltipText)

           cell.appendChild(tooltipDiv)

        },

        exportGridTable: function() {

        },

        importGridTable: function() {

        }

    }
