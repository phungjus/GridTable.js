const warehouseInventory = new GridTable()
const warehouseDeliverySchedule = new GridTable()

warehouseInventory.makeGridTable(5, 4, 'warehouseInventoryTable', 'warehouseInventoryTable', 'table')
warehouseInventory.updateHeader(['Item ID', 'Item Name', 'Item Quantity', 'Item Price ($)'])
warehouseInventory.updateRow(2, ['001', 'PS5 Digital Edition Console', '699', '499.99'])
warehouseInventory.updateRow(3, ['002', 'PS5 Console', '378', '629.99'])
warehouseInventory.updateRow(4, ['003', 'Xbox Series X', '981', '599.99'])
warehouseInventory.updateRow(5, ['004', 'Xbox Series S', '467', '379.99'])

warehouseDeliverySchedule.makeGridTable(10, 6, 'warehouseDeliverySchedule', 'warehouseDeliveryScheduleGrid', 'grid')
warehouseDeliverySchedule.updateHeader(['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
warehouseDeliverySchedule.updateCol(1, ['9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM'])
warehouseDeliverySchedule.addEvent({name: 'Sony Delivery', details: '550 units of PS5 consoles being shipped from Sony'}, 3, 2)

let ascCol1 = false
let ascCol2 = false
let ascCol3 = false
let ascCol4 = false

const inventoryAdd = document.querySelector('#inventoryAdd')
inventoryAdd.addEventListener('submit', addNewItemToInventory)

const inventoryDelete = document.querySelector('#inventoryDelete')
inventoryDelete.addEventListener('submit', deleteItemInventory)

const inventoryModify = document.querySelector("#inventoryModify")
inventoryModify.addEventListener('submit', modifyItemInventory)

const sortCol1 = document.querySelector('#GridTablewarehouseInventoryTableDataRow-1-Col-1')
sortCol1.addEventListener('click', sortColumn)

const sortCol2 = document.querySelector('#GridTablewarehouseInventoryTableDataRow-1-Col-2')
sortCol2.addEventListener('click', sortColumn)

const sortCol3 = document.querySelector('#GridTablewarehouseInventoryTableDataRow-1-Col-3')
sortCol3.addEventListener('click', sortColumn)

const sortCol4 = document.querySelector('#GridTablewarehouseInventoryTableDataRow-1-Col-4')
sortCol4.addEventListener('click', sortColumn)

const scheduleAdd = document.querySelector('#scheduleAdd')
scheduleAdd.addEventListener('submit', addNewShipment)

const scheduleDelete = document.querySelector('#scheduleDelete')
scheduleDelete.addEventListener('submit', deleteShipment)

const scheduleUpdate = document.querySelector('#scheduleUpdate')
scheduleUpdate.addEventListener('submit', updateShipment)

function addNewItemToInventory(e) {
    
    e.preventDefault()

    const itemID = document.querySelector('#itemID').value
    const itemName = document.querySelector('#itemName').value
    const itemQuantity = document.querySelector('#itemQuantity').value
    const itemPrice = document.querySelector('#itemPrice').value

    warehouseInventory.addRow([itemID, itemName, itemQuantity, itemPrice])

    document.querySelector('#itemID').value = ''
    document.querySelector('#itemName').value = ''
    document.querySelector('#itemQuantity').value = ''
    document.querySelector('#itemPrice').value = ''

}

function deleteItemInventory(e) {

    e.preventDefault()

    const itemID = document.querySelector("#deleteItemID").value

    warehouseInventory.deleteRow(warehouseInventory.rowFinder(1, itemID))

    document.querySelector("#deleteItemID").value = ''

}

function modifyItemInventory(e) {

    e.preventDefault()

    const itemID = document.querySelector('#modifyItemID').value
    const itemProperty = document.querySelector("#modifyItemProperty").value
    const itemNewValue = document.querySelector("#modifyItemNewValue").value

    const colNum = warehouseInventory.colFinder(itemProperty)

    const rowNum = warehouseInventory.rowFinder(1, itemID)

    warehouseInventory.insertData(rowNum, colNum, itemNewValue)

    document.querySelector('#modifyItemID').value = ''
    document.querySelector("#modifyItemProperty").value = ''
    document.querySelector("#modifyItemNewValue").value = ''

}

function sortColumn(e) {

    const id = e.target.id
    const idLength = id.length
    const colNumber = parseInt(id[idLength-1])

    if (colNumber === 1) {
        if (ascCol1) {
            warehouseInventory.sortData(colNumber, 'asc')
            ascCol1 = !ascCol1
        } else {
            warehouseInventory.sortData(colNumber, 'desc')
            ascCol1 = !ascCol1
        }
    } else if (colNumber === 2) {
        if (ascCol2) {
            warehouseInventory.sortData(colNumber, 'asc')
            ascCol2 = !ascCol2
        } else {
            warehouseInventory.sortData(colNumber, 'desc')
            ascCol2 = !ascCol2
        }
    } else if (colNumber === 3) {
        if (ascCol3) {
            warehouseInventory.sortData(colNumber, 'asc')
            ascCol3 = !ascCol3
        } else {
            warehouseInventory.sortData(colNumber, 'desc')
            ascCol3 = !ascCol3
        }
    } else if (colNumber === 4) {
        if (ascCol4) {
            warehouseInventory.sortData(colNumber, 'asc')
            ascCol4 = !ascCol4
        } else {
            warehouseInventory.sortData(colNumber, 'desc')
            ascCol4 = !ascCol4
        }
    } else {
        console.log("error wrong column")
    }

}

function addNewShipment(e) {

    e.preventDefault()

    const shipmentName = document.querySelector('#eventName').value
    const shipmentDetails = document.querySelector('#eventDetails').value
    const shipmentDate = document.querySelector('#eventDate').value
    const shipmentTime = document.querySelector('#eventTime').value

    const shipmentObj = {name: shipmentName, details: shipmentDetails}

    const row = warehouseDeliverySchedule.rowFinder(1, shipmentTime)
    const col = warehouseDeliverySchedule.colFinder(shipmentDate)

    warehouseDeliverySchedule.addEvent(shipmentObj, row, col)

    document.querySelector('#eventName').value = ''
    document.querySelector('#eventDetails').value = ''
    document.querySelector('#eventDate').value = '' 
    document.querySelector('#eventTime').value = ''
}

function deleteShipment(e) {

    e.preventDefault()

    const eventName = document.querySelector('#eventDeleteName').value
    const eventDate = document.querySelector('#eventDeleteDate').value
    const eventTime = document.querySelector('#eventDeleteTime').value

    const row = warehouseDeliverySchedule.rowFinder(1, eventTime)
    const col = warehouseDeliverySchedule.colFinder(eventDate)

    warehouseDeliverySchedule.deleteEvent(row, col)

    document.querySelector('#eventDeleteName').value = ''
    document.querySelector('#eventDeleteDate').value = ''
    document.querySelector('#eventDeleteTime').value = ''
}

function updateShipment(e) {

    e.preventDefault()

    const eventName = document.querySelector('#eventUpdateName').value
    const eventDetails = document.querySelector("#eventUpdateDetails").value
    const eventDate = document.querySelector("#eventUpdateDate").value
    const eventTime = document.querySelector('#eventUpdateTime').value

    const updatedObj = {name: eventName, details: eventDetails}

    const row = warehouseDeliverySchedule.rowFinder(1, eventTime)
    const col = warehouseDeliverySchedule.colFinder(eventDate)

    warehouseDeliverySchedule.modifyEvent(updatedObj, row, col)

    document.querySelector('#eventUpdateName').value = ''
    document.querySelector("#eventUpdateDetails").value = ''
    document.querySelector("#eventUpdateDate").value = ''
    document.querySelector('#eventUpdateTime').value = ''

}