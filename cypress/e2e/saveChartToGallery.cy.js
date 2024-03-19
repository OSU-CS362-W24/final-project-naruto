describe('Saving a chart to the “gallery”', () => {
  it('passes', () => {
    //fill in the line chart form as detailed in the generateChart test
    cy.visit('/');
    cy.contains('Line').click();
    cy.findByLabelText('Chart title').type("The Scientific Method");
    cy.findByLabelText('X label').type("Amount of f***ing around");
    cy.findByLabelText('Y label').type("Amount of finding out");
    cy.findByLabelText('X').type("1");
    cy.findByLabelText('Y').type("0.25");
    cy.findByText("+").click();
    cy.findAllByLabelText('X').last().type('3');
    cy.findAllByLabelText('Y').last().type('1');
    cy.findByText("+").click();
    cy.findAllByLabelText('X').last().type('4');
    cy.findAllByLabelText('Y').last().type('2');
    cy.findByText("+").click();
    cy.findAllByLabelText('X').last().type('6');
    cy.findAllByLabelText('Y').last().type('10');
    cy.findByText("+").click();
    cy.findAllByLabelText('X').last().type('7');
    cy.findAllByLabelText('Y').last().type('20');

    //generate the chart
    cy.findByText("Generate chart").click();

    //save the chart to the gallery
    cy.findByText("Save chart").click();

    //navigate to the gallery
    cy.findByText("Gallery").click();

    //assert that the card for the chart is visible
    cy.get('.chart-card').should('be.visible');
    //that it has an image
    cy.get('img').should('be.visible');
    //and that the title is correct
    cy.findByText("The Scientific Method").should('be.visible');
  });
});
