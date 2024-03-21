/**
* @jest-environment ./src/fixjsdomenvironment.js
*/
require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom") 
//const searchRepositoriesResult = require("./searchRepositoriesResult.json")
const generateChartImg = require('./../lib/generateChartImg.js')

 
/*------- UNIT TESTS FOR FUNCTION generateChartImg() in generateChartImg.js -------
*   
*   This test is incredibly simple. All it does is check that generateChartImg() 
* returns anything.      
*----------------------------------------------------------------------------------
*/
test("generateChartImg correctly returns a url given chart data", async function () {
    //arrange    
    //act
    var x = await generateChartImg(
        "line",
        [ {"x":"8","y":"5"}, {"x":"14","y":"7"}, {"x":"13","y":"9"} ], 
        "Goofy",
        "Goofy Goober",
        "#cb5125"
    )
    //assert
    expect(x).toBeDefined();
})
