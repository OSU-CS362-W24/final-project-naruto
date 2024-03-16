describe("chart image generation check”.", () => {
  it("should generate a chart image", () => {
      //navigate to the home page
      cy.visit('/');
      //click on the chart button
      cy.contains('Line').click();
      //add a title and the x and y labels
      cy.findByLabelText('Chart title').type("The Scientific Method");
      cy.findByLabelText('X label').type("Amount of f***ing around");
      cy.findByLabelText('Y label').type("Amount of finding out");
      
      //enter some values for the chart
      cy.findByLabelText('X').type("1");
      cy.findByLabelText('Y').type("0.25");
      cy.findByText("+").click();

      //since there are several fields for the different x and y
      //values, we need to find the last one and type only in that one
      cy.findAllByLabelText('X').last().type('3');
      cy.findAllByLabelText('Y').last().type('1');
      //and move on to the next field
      cy.findByText("+").click();

      //do that 3 or 4 more times to have a reasonable number
      //of points on the chart
      cy.findAllByLabelText('X').last().type('4');
      cy.findAllByLabelText('Y').last().type('2');
      cy.findByText("+").click();
      cy.findAllByLabelText('X').last().type('6');
      cy.findAllByLabelText('Y').last().type('10');
      cy.findByText("+").click();
      cy.findAllByLabelText('X').last().type('7');
      cy.findAllByLabelText('Y').last().type('20');
      
      cy.findByText("Generate chart").click();

      //assert that the chart image is generated
      cy.get('img').should('be.visible');
  })
});