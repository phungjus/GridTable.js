"use strict";
const log = console.log

//CURRENT TASKS:
//TODO: Add Search Feature it looks for a value in the table???
//TODO: Add Filtering Feature it filters according to specifications???
//TODO: Join Two Tables???

//HOLD OFF FOR NOW:
//TODO: Add color coding
//TODO: Add information storage (td:hover)
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

            this.uniqueID = uniqueID
            this.row = numRows
            this.col = numCols
            const GridTable = document.createElement('table')
            GridTable.id = 'GridTable' + uniqueID
            const insert = document.getElementById(selector)

            //Generate the Rows

            for (let row = 0; row < numRows; row++) {
                const tableRow = document.createElement('tr')
                tableRow.id = 'GridTableRow' + (row + 1)
                this.rowData.push(tableRow)
            }

            //Generate the head of the table

            const firstRow = this.rowData[0]

            for (let col = 0; col < numCols; col++) {

                const tableHead = document.createElement('th')
                tableHead.id = 'GridTableDataRow-' + 1 + '-Col-' + (col+1)
                const text = document.createTextNode(col+1)
                tableHead.appendChild(text)
                this.cellData.push({'row': 1, 'col': (col+1), 'data': tableHead.innerText})
                firstRow.appendChild(tableHead)

            }

            for (let row = 1; row < this.rowData.length; row++) {
                
                for (let col = 0; col < numCols; col++) {

                    const tableData = document.createElement('td')
                    tableData.id = 'GridTableDataRow-' + (row+1) + '-Col-' + (col+1)
                    const text = document.createTextNode('Row'+(row+1)+"-Col"+(col+1))
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

            if (this.checkInitialization()) {
                Error("Please create a table before inserting data")
            }

            const cell = document.getElementById("GridTableDataRow-"+rowNum+'-Col-'+colNum)
            cell.innerText = data

            this.cellData.filter((cell) => cell.row === rowNum && cell.col == colNum)[0].data = data

        },

        checkInitialization: function() {

            return (this.row === 0 || this.col === 0)

        },

        updateRow: function(rowNum, updatedList) {

            if (this.checkInitialization() || updatedList.length !== this.col) {
                Error("Create Table First or Size List != Number of Columns")
            }

            for (let col = 0; col < this.col; col++) {

                const cell = document.getElementById("GridTableDataRow-"+rowNum+'-Col-'+(col+1))
                cell.innerText = updatedList[col]

                this.cellData.filter((cell) => cell.row === rowNum && cell.col == (col+1))[0].data = updatedList[col]

            }

        },

        updateCol: function(colNum, updatedList) {

            if (this.checkInitialization() || colNum > this.col || colNum < 1 || updatedList.length > this.row) {
                Error(("Create Table First or Size List != Number of Rows or colNum > Number of Columcs or colNum < 1"))
            }

            for (let row = 1; row < this.row; row++) {

                const cell = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+colNum)
                cell.innerText = updatedList[row-1]

                this.cellData.filter((cell) => cell.row === (row+1) && cell.col == colNum)[0].data = updatedList[row-1]
            }

        },

        updateHeader: function(listOfNewHeaders) {


            if (this.checkInitialization() || listOfNewHeaders.length !== this.col) {
                Error("Create Table First or Size of Headers List != Number of Columns")
            }

            this.updateRow(1, listOfNewHeaders)

        },

        deleteRow: function(rowNum) {

            if (this.checkInitialization() || rowNum > this.row || rowNum === 1) {
                Error("Create Table First or rowNum > Number of Rows or can't delete header")
            }
            const rowToDelete = document.getElementById("GridTableRow"+rowNum)
            rowToDelete.parentNode.removeChild(rowToDelete)


            //Removes all cells from rowNum
            this.cellData = this.cellData.filter(cell => cell.row !== rowNum)

            //Updates all cells
            this.cellData.filter(cell => cell.row > rowNum).map(cell => cell.row = cell.row - 1)

            for (let row = rowNum; row < this.row; row++) {

                const rowUpdate = document.getElementById("GridTableRow"+(row+1))

                for (let col = 0; col < this.col; col++) {

                    const cellUpdate = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+(col+1))
                    cellUpdate.id = "GridTableDataRow-"+(row)+'-Col-'+(col+1)

                }

                rowUpdate.id = "GridTableRow"+(row)

            }

            this.row -= 1

        },

        deleteCol: function(colNum) {

            if (this.checkInitialization() || colNum > this.col || colNum < 1) {
                Error("Create Table First or colNum > Number of Cols or colNum < 1")
            }

            this.cellData = this.cellData.filter(cell => cell.col !== colNum)
            this.cellData.filter(cell => cell.col > colNum).map(cell => cell.col = cell.col - 1)

            
            for (let row = 0; row < this.row; row++) {

                const cellToDelete = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+colNum)
                cellToDelete.parentNode.removeChild(cellToDelete)

                for (let col = colNum; col < this.col; col++) {

                    const cellUpdate = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+(col+1))
                    cellUpdate.id = "GridTableDataRow-"+(row+1)+'-Col-'+(col)

                }

            }

            this.col -= 1

        },

        sortData: function(colNum, direction) {

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

            if (rowData.length !== this.col) {
                Error("Values provided don't match up with number of columns")
            }

            const GridTable = document.getElementById("GridTable" + this.uniqueID)
            const tableRow = document.createElement('tr')
            tableRow.id = 'GridTableRow' + (this.row + 1)

            for (let i = 0; i < rowData.length; i++) {
                
                const tableData = document.createElement('td')
                tableData.id = 'GridTableDataRow-' + (this.row+1) + '-Col-' + (i+1)
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

            if (colData.length !== this.row) {
                Error("Number of values in input do not match number of rows in GridTable")
            }

            const tableHead = document.getElementById("GridTableRow1")
            const tableDataHead = document.createElement('th')
            tableDataHead.id = 'GridTableDataRow-1-Col-' + (this.col+1)
            const textHead = document.createTextNode(colData[0])
            tableDataHead.appendChild(textHead)
            tableHead.appendChild(tableDataHead)
            const newCellHeader = {row: 1, col: (this.col+1), data: colData[0]}
            this.cellData.push(newCellHeader)

            for (let row = 1; row < this.row; row++) {

                const tableRow = document.getElementById("GridTableRow"+(row+1))
                const tableData = document.createElement('td')
                tableData.id = 'GridTableDataRow-' + (row+1) + '-Col-' + (this.col+1)
                const text = document.createTextNode(colData[row])
                tableData.appendChild(text)
                tableRow.appendChild(tableData)

                const newCell = {row: (row+1), col: (this.col+1), data: colData[row]}
                this.cellData.push(newCell)

            }

            this.col += 1

        }

    }
