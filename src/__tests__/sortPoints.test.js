const sortPoints = require('./../lib/sortPoints.js')

/*------- UNIT TESTS FOR FUNCTION sortPoints() in sortPoints.js -------
*   
*    Tests a small variety of basic and edge cases for the sortPoints()
* function. For simplicity's sake, each test instantiates its own input
* array and a separate hand-sorted version of the array to test against. 
*----------------------------------------------------------------------
*/
test("Sort of simple array", function () {
    //arrange
    var testArr = new Array(
        { x: 17, y: 10},
        { x: 11, y: 5},
        { x: 3, y: 4},
    )

    var handsort = new Array(
        { x: 3, y: 4},
        { x: 11, y: 5},
        { x: 17, y: 10},
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})

test("Array with pair of duplicate points", function () {
    //arrange
    var testArr = new Array(
        { x: 17, y: 10},
        { x: 17, y: 10},
        { x: 3, y: 4},
    )

    var handsort = new Array(
        { x: 3, y: 4},
        { x: 17, y: 10},
        { x: 17, y: 10},
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})

test("Array with zero point", function () {
    //arrange
    var testArr = new Array(
        { x: 0, y: 0},
        { x: 17, y: 10},
        { x: 3, y: 4},
    )

    var handsort = new Array(
        { x: 0, y: 0},
        { x: 3, y: 4},
        { x: 17, y: 10},
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})

test("Array with negative x values", function () {
    //arrange
    var testArr = new Array(
        { x: -7, y: 0},
        { x: -13, y: 10},
        { x: 3, y: 4},
    )

    var handsort = new Array(
        { x: -13, y: 10},
        { x: -7, y: 0},
        { x: 3, y: 4},
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})

test("Array that is already in sort order", function () {
    //arrange
    var testArr = new Array(
        { x: 3, y: 4},
        { x: 11, y: 5},
        { x: 17, y: 10},
    )

    var handsort = new Array(
        { x: 3, y: 4},
        { x: 11, y: 5},
        { x: 17, y: 10},
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})

test("Empty array", function () {
    //arrange
    var testArr = new Array(
        
    )

    var handsort = new Array(
        
    )
    //act
    var result = sortPoints(testArr)
    //assert
    expect(result).toEqual(handsort)
})