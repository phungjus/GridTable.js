"use strict";
const log = console.log


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
                tableHead.id = 'GridTableHead' + (col + 1)
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

            if (rowNum === 1) {

                const row = document.getElementById("GridTableHead"+colNum)
                row.innerText = data

            } else {

                const cell = document.getElementById("GridTableDataRow-"+rowNum+'-Col-'+colNum)
                cell.innerText = data

            }

        },

        checkInitialization: function() {

            return (this.rowData.length === 0 || this.colData.length === 0)

        },

        updateRow: function(rowNum, updatedList) {

            if (this.checkInitialization() || updatedList.length !== this.col) {
                Error("Create Table First or Size List != Number of Columns")
            }

            if (rowNum === 1) {
                this.updateHeader(updatedList)
            } else {

                for (let col = 0; col < this.col; col++) {

                    const cell = document.getElementById("GridTableDataRow-"+rowNum+'-Col-'+(col+1))
                    cell.innerText = updatedList[col]

                }

            }

        },

        updateHeader: function(listOfNewHeaders) {


            if (this.checkInitialization() || listOfNewHeaders.length !== this.col) {
                Error("Create Table First or Size of Headers List != Number of Columns")
            }


            for (let col = 0; col < this.col; col++) {

                const cell = document.getElementById("GridTableHead"+(col + 1))
                cell.innerText = listOfNewHeaders[col]

            }

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

        }

    }
