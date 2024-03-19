describe('template spec', () => {
  it('passes', () => {
    //build and save a chart, then move to the gallery as
    //detailed in the saveChartToGallery test
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
    cy.findByText("Generate chart").click();
    cy.findByText("Save chart").click();
    cy.findByText("Gallery").click();

    //open the saved chart
    cy.findByText("The Scientific Method").click();

    //assert that the chart is visible
    cy.get('img').should('be.visible');

    //assert that the title and labels are identical
    cy.findByLabelText('Chart title').should('have.value', 'The Scientific Method');
    cy.findByLabelText('X label').should('have.value', 'Amount of f***ing around');
    cy.findByLabelText('Y label').should('have.value', 'Amount of finding out');

    //assert that the number of X and Y fields is identical
    //take the extra blank field into account
    cy.findAllByLabelText('X').should('have.length', 6);

    //assert that all fields are identical
    cy.findAllByLabelText('X').eq(0).should('have.value', '1');
    cy.findAllByLabelText('Y').eq(0).should('have.value', '0.25');
    cy.findAllByLabelText('X').eq(1).should('have.value', '3');
    cy.findAllByLabelText('Y').eq(1).should('have.value', '1');
    cy.findAllByLabelText('X').eq(2).should('have.value', '4');
    cy.findAllByLabelText('Y').eq(2).should('have.value', '2');
    cy.findAllByLabelText('X').eq(3).should('have.value', '6');
    cy.findAllByLabelText('Y').eq(3).should('have.value', '10');
    cy.findAllByLabelText('X').eq(4).should('have.value', '7');
    cy.findAllByLabelText('Y').eq(4).should('have.value', '20');
  });
});