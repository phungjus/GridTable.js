"use strict";
const log = console.log

//TODO: Check for incorrect inputs
//TODO: Add data filtering
//TODO: Add color coding
//TODO: Add information storage (td:hover)
//TODO: Add import/export object

function GridTable() {
    
    this.row = 0
    this.col = 0
    this.rowData = []
    this.colData = []

}

    GridTable.prototype = {

        makeGridTable: function(numRows, numCols, selector) {

            this.row = numRows
            this.col = numCols
            const GridTable = document.createElement('table')
            GridTable.id = 'GridTable'
            GridTable.style = ''
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
                firstRow.appendChild(tableHead)

            }

            for (let row = 1; row < this.rowData.length; row++) {
                
                for (let col = 0; col < numCols; col++) {

                    const tableData = document.createElement('td')
                    tableData.id = 'GridTableDataRow-' + (row+1) + '-Col-' + (col+1)
                    const text = document.createTextNode('Row'+(row+1)+"-Col"+(col+1))
                    tableData.appendChild(text)
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

        },

        checkInitialization: function() {

            return (this.rowData.length === 0 || this.colData.length === 0)

        },

        updateRow: function(rowNum, updatedList) {

            if (this.checkInitialization() || updatedList.length !== this.col) {
                Error("Create Table First or Size List != Number of Columns")
            }

            for (let col = 0; col < this.col; col++) {

                const cell = document.getElementById("GridTableDataRow-"+rowNum+'-Col-'+(col+1))
                cell.innerText = updatedList[col]

            }

        },

        updateCol: function(colNum, updatedList) {

            if (this.checkInitialization() || colNum > this.col || colNum < 1 || updatedList.length > this.rowData.length) {
                Error(("Create Table First or Size List != Number of Rows or colNum > Number of Columcs or colNum < 1"))
            }

            for (let row = 1; row < this.row; row++) {

                const cell = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+colNum)
                cell.innerText = updatedList[row-1]

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
            
            for (let row = 0; row < this.row; row++) {

                const cellToDelete = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+colNum)
                cellToDelete.parentNode.removeChild(cellToDelete)

                for (let col = colNum; col < this.col; col++) {

                    const cellUpdate = document.getElementById("GridTableDataRow-"+(row+1)+'-Col-'+(col+1))
                    cellUpdate.id = "GridTableDataRow-"+(row+1)+'-Col-'+(col)

                }

            }

            this.col -= 1

        }

    }
