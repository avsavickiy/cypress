///<reference types ="Cypress" />
it('',() =>{
    cy.viewport(1800,1800)
    cy.visit('https://www.onliner.by/')
    cy.contains('Вход', {matchCase: false})
});