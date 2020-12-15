"use strict";

// const { text } = require("express");

const log = console.log

//Take examples from examples.html add eventListeners to each thing or not??
//Remove all case-sensitivty in the code change all keys and such to lowercase

//TABLE TASKS:
//TODO: Button Click to Swap Rows and Columns?

//GRID TASKS:
//TODO: Edit the tooltip to be clickable once clicked it will show event details?

//Go through file to double check all places with tag: CHECK

function GridTable() {
    
    this.row = 0
    this.col = 0
    this.rowData = []
    this.cellData = []
    this.uniqueID = undefined
    this.selector = undefined
    this.gridOrTable = undefined
    this.sortAsc = undefined
    this.queryOperators = ['==', '!=', '<', '<=', '>', '>=']
    this.eventTag = {}
}

    GridTable.prototype = {

        makeGridTable: function(numRows, numCols, selector, uniqueID, gridOrTable) {

            /**
            * @param {Number} numRows
            * @param {Number} numCols
            * @param {String} selector
            * @param {String} uniqueID 
            * @param {String} gridOrTable
            * 
            * Description:
            * This function takes in 4 parameters: numRows, numCols, selector, uniqueID, and 
            * gridOrTable. It then creates an HTML table with 'numRows' rows and 'numCols' columns and 
            * id: 'GridTable' + uniqueID, then adds that table to the HTML element with id: 'selector'.
            * Then depending on whether a grid or table was selected different functions can be used 
            */

            this.selector = selector
            this.uniqueID = uniqueID
            this.row = numRows
            this.col = numCols
            this.gridOrTable = gridOrTable.toLowerCase()

            const GridTable = document.createElement('table')
            GridTable.id = 'GridTable' + uniqueID
            const insert = document.getElementById(selector)

            this.sortAsc = new Array(numCols).fill(true)

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
                tableHead.addEventListener('click', (e => this.sortColumn(e, this.sortAsc)))
                firstRow.appendChild(tableHead)

            }


            for (let row = 1; row < this.rowData.length; row++) {
                
                for (let col = 0; col < numCols; col++) {

                    const tableData = document.createElement('td')
                    if (this.gridOrTable === 'grid') {

                        tableData.ondrop = (ev) => this.drop(ev)
                        tableData.ondragover = (ev) => this.allowDrop(ev)

                    }
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

        sortColumn: function(e, sortAsc) {

            const id = e.target.id
            const idLength = id.length
            const colNumber = parseInt(id[idLength-1])

            if (sortAsc[colNumber-1]) {
                this.sortData(colNumber, 'asc')
                sortAsc[colNumber-1] = !sortAsc[colNumber-1]
            } else {
                this.sortData(colNumber, 'desc')
                sortAsc[colNumber-1] = !sortAsc[colNumber-1]
            }
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

        rowFinder: function(colNum, cellData) {

            /**
            * @param {Number} colNum
            * @param {String} cellData
            * 
            * @return {Number}
            * 
            * Description:
            * This function returns the row the cellData is located in based on the column number
            * input: colNum
            */

            return parseInt(this.cellData.filter(cell => cell.col === colNum && cell.data === cellData)[0].row)

        },

        colFinder: function(colHeader) {

            /**
            * @param {String} colHeader
            * 
            * @return {Number}
            * 
            * Description:
            * This function returns the column number given the name of the column header provided
            * by the input colHeader
            */

            return parseInt(this.cellData.filter(cell => cell.row === 1 && cell.data.toLowerCase() === colHeader.toLowerCase())[0].col)

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

            if (this.gridOrTable === 'grid') {
                log('This function can only be used on Tables not Grids ')
                return
            }

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

        drag: function(event) {

            event.dataTransfer.setData('text', event.target.id)

        },

        allowDrop: function(event) {

            event.preventDefault()

        },

        drop: function(event) {

            event.preventDefault()
            var data = event.dataTransfer.getData("text")
            const dataLength = data.length
            const dataRow = parseInt(data[dataLength-5])
            const dataCol = parseInt(data[dataLength-1])

            if (event.target.tagName === 'TD') {
                const targetLength = event.target.id.length
                const newRow = parseInt(event.target.id[targetLength-7])
                const newCol = parseInt(event.target.id[targetLength-1])
                event.target.appendChild(document.getElementById(data))

                const oldToolTip = document.getElementById(data)
                const oldCellInfo = this.cellData.filter(cell => cell.row === dataRow && cell.col === dataCol)[0]
                oldCellInfo.data = oldCellInfo.data.replace(oldToolTip.outerHTML, "")

                oldToolTip.id = oldToolTip.id.slice(0, oldToolTip.id.length-8) + "Row" + newRow + "Col" + newCol

                const newCellInfo = this.cellData.filter(cell => cell.row === newRow && cell.col === newCol)[0]
                newCellInfo.data += oldToolTip.outerHTML

            } else {
                const targetLength = event.target.parentNode.id.length
                const newRow = parseInt(event.target.parentNode.id[targetLength-7])
                const newCol = parseInt(event.target.parentNode.id[targetLength-1])
                event.target.parentNode.appendChild(document.getElementById(data))

                const oldToolTip = document.getElementById(data)

                const oldCellInfo = this.cellData.filter(cell => cell.row === dataRow && cell.col === dataCol)[0]
                oldCellInfo.data = oldCellInfo.data.replace(oldToolTip.outerHTML, "")

                oldToolTip.id = oldToolTip.id.slice(0, oldToolTip.id.length-8) + "Row" + newRow + "Col" + newCol

                const newCellInfo = this.cellData.filter(cell => cell.row === newRow && cell.col === newCol)[0]
                newCellInfo.data += oldToolTip.outerHTML
            }

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
            
            if (this.gridOrTable === 'table') {
                log('This function can only be used on Grids not Tables')
                return
            }

            if (eventObj.tag !== undefined) {
                const cellDataClone = Array.from(this.cellData)
                eventObj.rowInfo = cellDataClone.filter(cell => cell.col === 1 && cell.row === cellRow)[0].data
                eventObj.colInfo = cellDataClone.filter(cell => cell.col === cellCol && cell.row === 1)[0].data
                if (eventObj.tag in this.eventTag) {
                    this.eventTag[eventObj.tag].push(eventObj)
                } else {
                    this.eventTag[eventObj.tag] = [eventObj]
                }
            }

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)

            const tooltipDiv = document.createElement('div')
            tooltipDiv.draggable = true
            tooltipDiv.ondragstart = (ev) => this.drag(ev)
            tooltipDiv.className = 'tooltip'
            tooltipDiv.innerText = eventObj.name
            tooltipDiv.id = ('tooltipDiv'+eventObj.name+'Row'+cellRow+'Col'+cellCol).toLowerCase()
            tooltipDiv.onclick = (ev) => this.display(ev)
            //MAKE IT SO THE USER MUST CLICK THE DIV INORDER FOR THE TOOLTIP TO DISPLAY

            const tooltipText = document.createElement('span')
            tooltipText.className = 'tooltiptext'
            tooltipText.innerText = eventObj.details
            tooltipText.style.display = 'none' 

            tooltipDiv.appendChild(tooltipText)

            cell.appendChild(tooltipDiv)

            this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data = cell.innerHTML
        },

        display: function(event) {

            const docElement = event.target.childNodes[1]
            if (docElement.style.display === 'none') {
                docElement.style.display = 'block'
            } else {
                docElement.style.display = 'none'
            }

        },

        deleteEvent: function(eventName, cellRow, cellCol) {

            /**
            * @param {String} eventName
            * @param {Number} cellRow
            * @param {Number} cellCol 
            * 
            * Description:
            * This function takes in two integers called cellRow and cellCol and a string called eventName, it then deletes
            * the event located at that position based on eventName.
            */

            if (this.gridOrTable === 'table') {
                log('This function can only be used on Grids not Tables')
                return
            }

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)
            const event = document.getElementById("tooltipdiv"+ eventName.toLowerCase() + "row" + cellRow + "col" + cellCol)
            cell.removeChild(event)

            this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data = this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data.replace(event.outerHTML, "")


        },

        modifyEvent: function(updatedEventObj, cellRow, cellCol) {

            /**
            * @param {Object} updatedEventObj 
            * 
            * Description:
            * This function takes in an object called updatedEventObj, it must contain the keys:
            * name and details. It will then update the event at the specified row and column.
            */

            if (this.gridOrTable === 'table') {
                log('This function can only be used on Grids not Tables')
                return
            }

            if (updatedEventObj.tag !== undefined) {
                const cellDataClone = Array.from(this.cellData)
                updatedEventObj.rowInfo = cellDataClone.filter(cell => cell.col === 1 && cell.row === cellRow)[0].data
                updatedEventObj.colInfo = cellDataClone.filter(cell => cell.col === cellCol && cell.row === 1)[0].data
                if (updatedEventObj.tag in this.eventTag) {
                    this.eventTag[updatedEventObj.tag].push(updatedEventObj)
                } else {
                    this.eventTag[updatedEventObj.tag] = [updatedEventObj]
                }
            }

            const cell = document.getElementById("GridTable"+this.uniqueID+"DataRow-"+cellRow+'-Col-'+cellCol)
            const event = document.getElementById("tooltipdiv"+ updatedEventObj.name.toLowerCase() + "row" + cellRow + "col" + cellCol)
            cell.removeChild(event)

            this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data = this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data.replace(event.outerHTML, "")
        
            const tooltipDiv = document.createElement('div')
            tooltipDiv.draggable = true
            tooltipDiv.ondragstart = (ev) => this.drag(ev)
            tooltipDiv.className = 'tooltip'
            tooltipDiv.innerText = updatedEventObj.name
            tooltipDiv.id = ('tooltipDiv'+updatedEventObj.name+'Row'+cellRow+'Col'+cellCol).toLowerCase()

            const tooltipText = document.createElement('span')
            tooltipText.className = 'tooltiptext'
            tooltipText.innerText = updatedEventObj.details

            tooltipDiv.appendChild(tooltipText)

            cell.appendChild(tooltipDiv)

            this.cellData.filter(cell => cell.row === cellRow && cell.col === cellCol)[0].data = cell.innerHTML


        },

        exportGridTable: function() {

            /**
            * @return {Object} 
            * 
            * Description:
            * This function takes no inputs, it will return a Object which represents the 
            * GridTableJS object.
            */

            const GridTableJsObj = {numRows: this.row, numCols: this.col, uniqueID: this.uniqueID, selector: this.selector, cellData: this.cellData}
            
            return GridTableJsObj

        },

        importGridTable: function(GridTableObject) {

            /**
            * @param {Object} GridTableObject 
            * 
            * Description:
            * This function takes in an object called GridTableObject, it is an object which has been
            * exported by the GridTableJS library to specifically re-create the previously saved
            * GridTable.
            */

            this.row = GridTableObject.numRows
            this.col = GridTableObject.numCols
            this.uniqueID = GridTableObject.uniqueID
            this.cellData = GridTableObject.cellData
            this.selector = GridTableObject.selector

            const GridTable = document.createElement('table')
            GridTable.id = "GridTable" + this.uniqueID

            for (let rowCounter = 0; rowCounter < this.row; rowCounter++) {

                const rowData = this.cellData.filter(cell => cell.row === rowCounter + 1)
                const rowHTML = document.createElement('tr')
                rowHTML.id = "GridTable" + this.uniqueID + 'Row' + (rowCounter+1)

                for (let colCounter = 0; colCounter < rowData.length; colCounter++) {

                    if (rowCounter === 0) {

                        const tableHeadHTML = document.createElement('th')
                        tableHeadHTML.id = 'GridTable' + this.uniqueID + 'DataRow-' + (rowCounter + 1) + '-Col-' + (colCounter+1)
                        tableHeadHTML.innerHTML = rowData[colCounter].data

                        rowHTML.appendChild(tableHeadHTML)

                    } else {

                        const tableDataHTML = document.createElement('td')
                        tableDataHTML.id = 'GridTable' + this.uniqueID + 'DataRow-' + (rowCounter + 1) + '-Col-' + (colCounter+1)
                        tableDataHTML.innerHTML = rowData[colCounter].data

                        rowHTML.appendChild(tableDataHTML)

                    }

                }

                GridTable.appendChild(rowHTML)

            }

            const insert = document.getElementById(this.selector)

            insert.appendChild(GridTable)

        },

        filter: function(queryVariable, queryOperator, queryComparison, insertID) {

            if (! (this.queryOperators.includes(queryOperator))) {
                console.log("not a valid operator")
                return
            }

            if (this.gridOrTable === 'grid') {
                console.log("this function is only meant to be used for tables")
                return
            }

            const filterData = Array.from(this.cellData)
            const insertAt = document.getElementById(insertID)
            insertAt.innerHTML = ''
            const header = filterData.filter(cell => cell.row === 1)
            const columnToCheckNumber = header.filter(header => header.data.toLowerCase() == queryVariable.toLowerCase())[0].col
            const column = filterData.filter(cell => cell.col == columnToCheckNumber)
            console.log(filterData)
            const textNode = document.createElement('p')
            textNode.innerText = "Query Result: "
            insertAt.append(textNode)
            const queryTable = document.createElement('table')


            if (queryOperator === '==') {

                const similarRow = column.filter(cell => cell.data.toLowerCase() == queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < similarRow.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = filterData.filter(cell => cell.row === similarRow[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable)

            } else if (queryOperator === '!=') {

                const differentRow = column.filter(cell => cell.data.toLowerCase() !== queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < differentRow.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = this.cellData.filter(cell => cell.row === differentRow[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable)                

            } else if (queryOperator === '<=') {

                const LE_Row = column.filter(cell => cell.data.toLowerCase() <= queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < LE_Row.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = this.cellData.filter(cell => cell.row === LE_Row[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable) 

            } else if (queryOperator === '>=') {
                
                const GE_Row = column.filter(cell => cell.data.toLowerCase() >= queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < GE_Row.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = this.cellData.filter(cell => cell.row === GE_Row[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable) 

            } else if (queryOperator == '>') {

                const greaterRow = column.filter(cell => cell.data.toLowerCase() > queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < greaterRow.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = this.cellData.filter(cell => cell.row === greaterRow[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable) 

            } else if (queryOperator === '<') {

                const lessRow = column.filter(cell => cell.data.toLowerCase() < queryComparison.toLowerCase()).filter(cell => cell.row !== 1)
                const queryTableHeadRow = document.createElement('tr')
                for (let i = 0; i < header.length; i++) {
                    const queryTableHead = document.createElement('th')
                    const queryTableHeadText = document.createTextNode(header[i].data)
                    queryTableHead.appendChild(queryTableHeadText)
                    queryTableHeadRow.appendChild(queryTableHead)
                }

                queryTable.appendChild(queryTableHeadRow)

                for (let j = 0; j < lessRow.length; j++) {

                    const queryRow = document.createElement('tr')
                    const queryRowData = this.cellData.filter(cell => cell.row === lessRow[j].row)

                    for (let k = 0; k < queryRowData.length; k++) {

                        const queryRowElement = document.createElement('td')
                        queryRowElement.innerText = queryRowData[k].data
                        queryRow.appendChild(queryRowElement)

                    }

                    queryTable.appendChild(queryRow)
                }

                insertAt.appendChild(queryTable) 

            } 

        },

        groupTags: function(tag, insertValue) {

            if (this.gridOrTable === 'table') {
                console.log("This function is only for Grids")
                return
            }

            const insert = document.getElementById(insertValue)
            insert.innerHTML = ''
            const tagTable = document.createElement('table')

            if (tag.toLowerCase() === 'all') {
                
                const tagTableRowHead = document.createElement('tr')
                const tagKeys = Object.keys(this.eventTag)
                const tagObjects = Object.values(this.eventTag)
                const tagObjectsLengthMax = Math.max(...tagObjects.map(obj => obj.length))

                for (let i = 0; i < tagKeys.length; i++) {
                    const tagTableHead = document.createElement('th')
                    const tagTextNode = document.createTextNode(tagKeys[i])
                    tagTableHead.appendChild(tagTextNode)
                    tagTableRowHead.appendChild(tagTableHead)
                }

                tagTable.appendChild(tagTableRowHead)

                for (let j = 0; j < tagObjectsLengthMax; j++) {

                    const tagTableDataRow = document.createElement('tr')

                    for (let k = 0; k < tagObjects.length; k++) {

                        const tagTableData = document.createElement('td')

                        if (tagObjects[k][j] !== undefined) {

                            const tagName = document.createElement('div')
                            const tagDetails = document.createElement('div')
                            const tagRowCol = document.createElement('div')
                            tagName.innerHTML = "<b><u>Event Name:</u> </b>" + tagObjects[k][j].name
                            tagDetails.innerHTML = "<b><u>Event Details:</u> </b>" + tagObjects[k][j].details
                            tagRowCol.innerHTML = "<b><u>Event Occurence:</u> </b>" + tagObjects[k][j].colInfo + " " + tagObjects[k][j].rowInfo

                            tagTableData.appendChild(tagName)
                            tagTableData.appendChild(tagDetails)
                            tagTableData.appendChild(tagRowCol)

                        } 

                        tagTableDataRow.appendChild(tagTableData)

                    }

                    tagTable.appendChild(tagTableDataRow)

                }

                insert.appendChild(tagTable)

            } else if (tag in this.eventTag) {

                const tagTableRowHead = document.createElement('tr')
                const tagArray = this.eventTag[tag]

                const tagTableHead = document.createElement('th')
                const tagTextNode = document.createTextNode(tag.toUpperCase())
                tagTableHead.appendChild(tagTextNode)
                tagTableRowHead.appendChild(tagTableHead)
                tagTable.appendChild(tagTableRowHead)

                for (let i = 0; i < tagArray.length; i++) {

                    const tagTableDataRow = document.createElement('tr')
                    const tagTableData = document.createElement('td')

                    const tagName = document.createElement('div')
                    const tagDetails = document.createElement('div')
                    const tagRowCol = document.createElement('div')
                    tagName.innerHTML = "<b><u>Event Name:</u> </b>" + tagArray[i].name
                    tagDetails.innerHTML = "<b><u>Event Details:</u> </b>" + tagArray[i].details
                    tagRowCol.innerHTML = "<b><u>Event Occurence:</u> </b>" + tagArray[i].colInfo + " " + tagArray[i].rowInfo

                    tagTableData.appendChild(tagName)
                    tagTableData.appendChild(tagDetails)
                    tagTableData.appendChild(tagRowCol)

                    tagTableDataRow.appendChild(tagTableData)
                    tagTable.appendChild(tagTableDataRow)

                }

                insert.appendChild(tagTable)

            } else {
                console.log("No events with that tag")
                return
            }

        }

    }
