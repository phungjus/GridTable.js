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
warehouseDeliverySchedule.addEvent({name: 'Sony Delivery', details: '550 units of PS5 consoles being shipped from Sony', 'tag': 'Sony'}, 3, 2)
warehouseDeliverySchedule.addEvent({name: 'Sony Delivery', details: '550 units of PS5 consoles being shipped from Sony', 'tag': 'Sony'}, 4, 3)
warehouseDeliverySchedule.addEvent({name: 'Sony Delivery', details: '550 units of PS5 consoles being shipped from Sony', 'tag': 'Sony'}, 5, 4)
warehouseDeliverySchedule.addEvent({name: 'Sony Delivery', details: '550 units of PS5 consoles being shipped from Sony', 'tag': 'Sony'}, 6, 5)
warehouseDeliverySchedule.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 4, 2)
warehouseDeliverySchedule.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 5, 3)
warehouseDeliverySchedule.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 6, 4)
warehouseDeliverySchedule.addEvent({name: 'Microsoft Delivery', details: '550 units of Xbox consoles being shipped from Microsoft', 'tag': 'Microsoft'}, 7, 5)

// warehouseDeliverySchedule.groupTags('Nintendo', 'test')

const inventoryAdd = document.querySelector('#inventoryAdd')
inventoryAdd.addEventListener('submit', addNewItemToInventory)

const inventoryDelete = document.querySelector('#inventoryDelete')
inventoryDelete.addEventListener('submit', deleteItemInventory)

const inventoryModify = document.querySelector("#inventoryModify")
inventoryModify.addEventListener('submit', modifyItemInventory)

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

    warehouseDeliverySchedule.deleteEvent(eventName, row, col)

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
