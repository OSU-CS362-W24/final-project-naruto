/**
* @jest-environment jsdom
*/

require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")

/*------- UNIT TESTS FOR FUNCTION generateChartImg() in generateChartImg.js -------
*   
*   This test is incredibly simple. All it does is check that generateChartImg()
* returns anything. It seems like any method for testing the actual
* viability of the image url would require full dom loading, user input, 
* and essentially turns this test into a ui integration test. 
*----------------------------------------------------------------------------------
*/
test("correctly renders GitHub search results", async function () {
    //arrange
    //act
    var x = generateChartImg(
        "line",
        [ {"x":"8","y":"5"}, {"x":"14","y":"7"}, {"x":"13","y":"9"} ], 
        "Goofy",
        "Goofy Goober",
        "#cb5125"
    )
    //assert
    expect(x).toBeDefined()
})
