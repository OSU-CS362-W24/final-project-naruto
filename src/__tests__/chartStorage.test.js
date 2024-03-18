/**
* @jest-environment jsdom
*/

//const testLib = require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")

const chartStorage = require('./../lib/chartStorage.js')

/*------------       UNIT TESTS FOR chartStorage.js       ------------
*   
*    Tests each chartStorage function for its most basic functionality.
* All of these tests are forced to make use of the jsdom environment due
* to the heavy use of window.localStorage throughout chartStorage.js.
* However, they are still formatted like contained unit tests and don't
* actually render or simulate a DOM.
*----------------------------------------------------------------------
*/
test("Tests that a saved chart can be found in the localStorage", function () {
    //arrange
    window.localStorage.clear()
    var chart = {
        type: "line",
        data: [
            {"x":"8","y":"5"},
            {"x":"14","y":"7"},
            {"x":"13","y":"9"}
        ],
        xLabel: "Goofy",
        yLabel: "Goobs",
        title: "Goofy Goober",
        color: "#cb5125"
    }
    //act
    chartStorage.saveChart(chart);
    var charts = JSON.parse(window.localStorage.getItem("savedCharts"))
    //assert
    expect(charts[0]).toEqual(chart)
})

test("Tests that a chart in localStorage is returned by loadAllSavedCharts", function () {
    //arrange
    window.localStorage.clear()
    var chart = {
        type: "line",
        data: [
            {"x":"8","y":"5"},
            {"x":"14","y":"7"},
            {"x":"13","y":"9"}
        ],
        xLabel: "Goofy",
        yLabel: "Goobs",
        title: "Goofy Goober",
        color: "#cb5125"
    }
    var c = new Array()
    c = [chart]
    window.localStorage.setItem("savedCharts", JSON.stringify(c))
    //act
    var charts = chartStorage.loadAllSavedCharts()
    //assert
    console.log(charts)
    expect(charts[0]).toEqual(chart)
})

test("Tests that a chart in localStorage is returned by loadSavedChart", function () {
    //arrange
    window.localStorage.clear()
    var chart = {
        type: "line",
        data: [
            {"x":"8","y":"5"},
            {"x":"14","y":"7"},
            {"x":"13","y":"9"}
        ],
        xLabel: "Goofy",
        yLabel: "Goobs",
        title: "Goofy Goober",
        color: "#cb5125"
    }
    var c = new Array()
    c = [chart]
    window.localStorage.setItem("savedCharts", JSON.stringify(c))
    //act
    var chart2 = chartStorage.loadSavedChart(0)
    //assert
    expect(chart2).toEqual(chart)
})

test("Tests that the localStorage is updated by updateCurrentChartData", function () {
    //arrange
    window.localStorage.clear()
    var chart = {
        type: "line",
        data: [
            {"x":"8","y":"5"},
            {"x":"14","y":"7"},
            {"x":"13","y":"9"}
        ],
        xLabel: "Goofy",
        yLabel: "Goobs",
        title: "Goofy Goober",
        color: "#cb5125"
    }
    //act
    chartStorage.updateCurrentChartData(chart)
    //assert
    expect(JSON.parse(window.localStorage.getItem("currentChartData"))).toEqual(chart)
})

test("Tests that the chart in localStorage is returned by loadCurrentChartData", function () {
    //arrange
    window.localStorage.clear()
    var chart = {
        type: "line",
        data: [
            {"x":"8","y":"5"},
            {"x":"14","y":"7"},
            {"x":"13","y":"9"}
        ],
        xLabel: "Goofy",
        yLabel: "Goobs",
        title: "Goofy Goober",
        color: "#cb5125"
    }
    window.localStorage.setItem("currentChartData", JSON.stringify(chart))
    //act
    var chart2 = chartStorage.loadCurrentChartData(chart)
    //assert
    expect(chart2).toEqual(chart)
})

