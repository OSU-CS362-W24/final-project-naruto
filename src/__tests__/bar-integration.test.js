/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
const { userEvent } = require('@testing-library/user-event');

function getXyInputs() {
    const x = screen.getAllByLabelText('X');
    const y = screen.getAllByLabelText('Y');
    inputs = { x, y };
    return inputs;
}

function loadDOM() {
    user = userEvent.setup();
    const htmlPath = path.join(__dirname, '../bar/bar.html');
    const jsPath = path.join(__dirname, '../bar/bar.js');
    const html = fs.readFileSync(htmlPath, 'utf8');
    document.body.innerHTML = html;
    require(jsPath);
}

describe('Bar chart integration tests', () => {
    let user;

    beforeEach(async () => {
        jest.resetModules();
        user = userEvent.setup();
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Adding values', async () => {
        // Load the DOM
        loadDOM();

        // Get the plus button
        const plusButton = screen.getByText('+');

        // Initial state if js is loaded correctly
        expect(getXyInputs().x.length).toBe(1);
        expect(getXyInputs().y.length).toBe(1);

        // Add a new point
        await user.type(getXyInputs().x[0], '0');
        await user.type(getXyInputs().y[0], '0');
        await user.click(plusButton);

        // Check if a new point is added
        expect(getXyInputs().x.length).toBe(2);
        expect(getXyInputs().y.length).toBe(2);

        // Add a new point
        await user.type(getXyInputs().x[1], '1');
        await user.type(getXyInputs().y[1], '2');
        await user.click(plusButton);

        // Check if a new point is added
        expect(getXyInputs().x.length).toBe(3);
        expect(getXyInputs().y.length).toBe(3);

        // Add a new point
        await user.type(getXyInputs().x[2], '2');
        await user.type(getXyInputs().y[2], '5');
        await user.click(plusButton);

        // Check if a new point is added
        expect(getXyInputs().x.length).toBe(4);
        expect(getXyInputs().y.length).toBe(4);

        // Add a new point
        await user.type(getXyInputs().x[3], '3');
        await user.type(getXyInputs().y[3], '11');
        await user.click(plusButton);

        // Check if a new point is added
        expect(getXyInputs().x.length).toBe(5);
        expect(getXyInputs().y.length).toBe(5);

        // Add an empty point
        await user.click(plusButton);

        // Assert all fields have correct values
        expect(getXyInputs().x[0].value).toBe('0');
        expect(getXyInputs().y[0].value).toBe('0');
        expect(getXyInputs().x[1].value).toBe('1');
        expect(getXyInputs().y[1].value).toBe('2');
        expect(getXyInputs().x[2].value).toBe('2');
        expect(getXyInputs().y[2].value).toBe('5');
        expect(getXyInputs().x[3].value).toBe('3');
        expect(getXyInputs().y[3].value).toBe('11');
        expect(getXyInputs().x[4].value).toBe('');
        expect(getXyInputs().y[4].value).toBe('');
    });

    test('Display alert if missing chart data', async () => {
        // Load the DOM
        loadDOM();

        // Mock the alert function
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Click the generate button
        const generateButton = screen.getByText('Generate chart');
        await user.click(generateButton);

        // The alert should be called once
        expect(window.alert).toHaveBeenCalledTimes(1);

        // Remove the mock
        window.alert.mockRestore();
    });

    test('Display alert if missing label data', async () => {
        // Load the DOM
        loadDOM();

        // Mock the alert function
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Add a new point
        const plusButton = screen.getByText('+');
        await user.type(getXyInputs().x[0], '0');
        await user.type(getXyInputs().y[0], '0');
        await user.click(plusButton);

        // Click the generate button
        const generateButton = screen.getByText('Generate chart');
        await user.click(generateButton);

        // The alert should be called once
        expect(window.alert).toHaveBeenCalledTimes(1);

        // Remove the mock
        window.alert.mockRestore();
    });

    test('Clearing chart data', async () => {
        // Load the DOM
        loadDOM();

        // Add a new point
        const plusButton = screen.getByText('+');
        await user.type(getXyInputs().x[0], '0');
        await user.type(getXyInputs().y[0], '0');
        await user.click(plusButton);

        // Add chart labels
        const xLabel = screen.getByLabelText('X label');
        const yLabel = screen.getByLabelText('Y label');
        const titleLabel = screen.getByLabelText('Chart title');
        await user.type(xLabel, 'X label');
        await user.type(yLabel, 'Y label');
        await user.type(titleLabel, 'Title');

        // Check if the point is added
        expect(getXyInputs().x.length).toBe(2);
        expect(getXyInputs().y.length).toBe(2);

        // Check if the labels have values
        expect(xLabel.value).toBe('X label');
        expect(yLabel.value).toBe('Y label');
        expect(titleLabel.value).toBe('Title');

        // Click the clear button
        const clearButton = screen.getByText('Clear chart data');
        await user.click(clearButton);

        // Check if there is only one point
        expect(getXyInputs().x.length).toBe(1);
        expect(getXyInputs().y.length).toBe(1);

        // Check if the labels have no values
        expect(xLabel.value).toBe('');
        expect(yLabel.value).toBe('');
        expect(titleLabel.value).toBe('');
    });

    test('Data correctly sent', async () => {
        // Load the DOM
        loadDOM();

        // Mock the generateChartImg function
        jest.mock('../lib/generateChartImg');
        const generateChartImg = require('../lib/generateChartImg');
        generateChartImg.mockImplementation(() => {
            return 'http://placekitten.com/480/480';
        });

        // Add a new point
        const plusButton = screen.getByText('+');
        await user.type(getXyInputs().x[0], '0');
        await user.type(getXyInputs().y[0], '0');
        await user.click(plusButton);

        // Add a new point
        await user.type(getXyInputs().x[1], '1');
        await user.type(getXyInputs().y[1], '2');
        await user.click(plusButton);

        // Add chart labels
        const xLabel = screen.getByLabelText('X label');
        const yLabel = screen.getByLabelText('Y label');
        const titleLabel = screen.getByLabelText('Chart title');
        await user.type(xLabel, 'X label');
        await user.type(yLabel, 'Y label');
        await user.type(titleLabel, 'Title');

        // Set chart color
        const colorInput = screen.getByLabelText('Chart color');
        fireEvent.input(colorInput, { target: { value: '#45ff01' } });

        // Click the generate button
        const generateButton = screen.getByText('Generate chart');
        await user.click(generateButton);

        // The generateChartImg function should be called once
        expect(generateChartImg).toHaveBeenCalled();

        // The generateChartImg function should be called with the correct data
        expect(generateChartImg).toHaveBeenCalledWith(
            'bar',
            [
                { x: '0', y: '0' },
                { x: '1', y: '2' },
            ],
            'X label',
            'Y label',
            'Title',
            '#45ff01'
        );
    });
});
