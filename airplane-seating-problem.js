const log = console.log
let aisleSeats = 0 // current number of aisle seats
let middleSeats= 0 // current number of middle seats
let windowSeats= 0 // current number of window seats

// checks if the input array is a valid one, i.e 2D, rows and columns not zero, etc
function isValid2DArray(input){
    let isNull = input && (input.constructor == Array) ? false : true
    if(isNull){
        return false
    }

    for(let arr of input){
        if(arr.constructor != Array || arr.length !=2){
            return false
        }
        if(arr[0] <=0 || arr[1] <=0){
            return false
        }
    }
    return true
}
// checks if number of passengers is valid, i.e not string, not zero, etc
function isValidPassengersNum(passengersNum){
    return passengersNum >0
}
// checks if aisle seats is full 
function isAisleSeatsFull(){
    return aisleSeats <=0
}
// checks if middle seats is full
function isMiddleSeatsFull(){
    return middleSeats <=0
}
// checks if window seats is full
function isWindowSeatsFull(){
    return windowSeats <=0
}

// this function will populate the plane array with seats whether aisle, middle or window seat
//(arr): the input array to the main function
function fill(arr){
    let result=[]
    if(arr.length==1){
        fillTheOnlyBlock(result, arr[0][0], arr[0][1])
        return result
    }
    for(let i=0; i<arr.length; i++){
        let block=[]
        let blockNum=i
        for(let j=0, blockRows=arr[blockNum][0]; j<blockRows; j++){
            let row= []
            let blockCols= arr[blockNum][1]
            if(blockNum==0){
                fillFirstBlock(row, blockCols)
            }else if(blockNum==arr.length-1){
                fillLastBlock(row, blockCols)
            }
            else{ fillMiddleBlock(row, blockCols)}
            block.push(row)
        }
        result.push(block)
    }
    return result
}

//we use this function if we have only one block into our input array, i.e input.length = 1
// (result): it's actually a reference to the plane array itself
// (blockRows): number of rows of that one block
// (blockCols): number of columns of that one block
function fillTheOnlyBlock(result, blockRows, blockCols){
    let block=[]
    for(let i=0; i<blockRows; i++){
        let row=[]
        for(let j=0, len=blockCols; j<len; j++){
            if(j==0 || j==len-1){
                row.push('window')
                windowSeats++
            }else{
                row.push('middle')
                middleSeats++
            }
        }
        block.push(row)
    }
    result.push(block)
}
//this function fills the last block of the plane
function fillFirstBlock(row, blockCols){
    for(let i=0, len=blockCols; i<len; i++){
        if(i==0){
            row.push('window')
            windowSeats++
        }else if(i==len-1){
            row.push('aisle')
            aisleSeats++
        }else{
            row.push('middle')
            middleSeats++
        }
    }
}
//this function fills the last block of the plane
function fillLastBlock(row, blockCols){
    if(blockCols==1){
        row.push('window')
        windowSeats++
        return
    }
    for(let i=0, len=blockCols; i<len; i++){
        if(i==0){
            row.push('aisle')
            aisleSeats++
        }else if(i==len-1){
            row.push('window')
            windowSeats++
        }else{
            row.push('middle')
            middleSeats++
        }
    }
}
//this function fills any block that is placed into the middle of the plane
function fillMiddleBlock(row, blockCols){
    for(let i=0, len=blockCols; i<len; i++){
        if(i==0 || i==len-1){
            row.push('aisle')
            aisleSeats++
        }else{
            row.push('middle')
            middleSeats++
        }
    }
}
// assing passenger to seat in order, i.e if aisle seats is full, checks window seats. if window seats is full, checks middle seats. if full prints return false
// (plane): the plane array 
// (passengerId): current passenger number we want to assign to seat 
function assignPassengerToSeat(plane, passengerId){
    if(isAisleSeatsFull()){
        if(isWindowSeatsFull()){
            if(isMiddleSeatsFull()){
                return false 
            }
            return assignPassengerToMiddleSeat(plane, passengerId)
        }
        return assignPassengerToWidowSeat(plane, passengerId)
    }
    return assignPassengerToAisleSeat(plane, passengerId)
}
// assing passenger to aisle seat
function assignPassengerToAisleSeat(plane, passengerId){
    assignPassengerToGeneralSeat(plane, passengerId, 'aisle')
    aisleSeats--
}
// assing passenger to window seat
function assignPassengerToWidowSeat(plane, passengerId){
    assignPassengerToGeneralSeat(plane, passengerId, 'window')
    windowSeats--
}
// assing passenger to middle seat
function assignPassengerToMiddleSeat(plane, passengerId){
    assignPassengerToGeneralSeat(plane, passengerId, 'middle')
    middleSeats--
}
// assign passenger to seat according to seatType
// if seatType equals 'aisle', then assign passenger to aisle seat, etc
// (plane): plane array which is populated with seats
// (passengerId): passenger number we want to assign to a seat
// (seatType): type of seat to assign passenger to (aisle, middle, window)
function assignPassengerToGeneralSeat(plane, passengerId, seatType){
    let maxRow = Math.max(...plane.map(arr => arr.length))
    for(let i=0; i<maxRow; i++){
        for(let j=0; j<plane.length; j++){
            let block = plane[j]
            let currentRow=block[i]
            let index= currentRow ? currentRow.indexOf(seatType) : -1
            if(index>=0){
                currentRow[index] = passengerId
                return
            }
        }
    }
}
// the main function
// (arr): the 2d array which specify the each block columns and rows, i.e this array [3,2], [4,3], [2,3], [3,4]
// (passengersNum): specify number of passengers we want to seat into the plane
function assignPassengers(arr, passengersNum){
    if(!isValid2DArray(arr) || !isValidPassengersNum(passengersNum)) return log('this is not valid 2d array or passengers number')
    const plane= fill(arr)
    log('plane array after population with empty seats', plane)
    for(let i=1; i<=passengersNum; i++){
        if(assignPassengerToSeat(plane, i) == false){
            log('no more seats avialable')
            break
        }
    }
    log('plane array after assigning passengers to seats', plane)
}

assignPassengers([[3,2], [4,3], [2,3], [3,4]], 30)