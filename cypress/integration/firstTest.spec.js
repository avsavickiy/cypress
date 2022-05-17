///<reference types ="Cypress" />


// it('By ID', () =>{
//     cy.visit("http://facebook.com/")
//     cy.get('#email')
// });

// it('By Class', () =>{
//     cy.visit("https://docs.cypress.io/")
//     cy.get('.w-full mx-8 lg:m-0 lg:w-1/5')
// });

// it('By Tag', () =>{
//     cy.visit("https://docs.cypress.io/")
//     cy.get('nav')
// });

// it('By Tag value', () =>{
//     cy.visit("http://facebook.com/")
//     cy.get('[id="pass"]')
// });

// it('By diferent Tag', () =>{
//     cy.visit("http://facebook.com/")
//     cy.get('[data-testid="open-registration-form-button"][role="button"]')
// });

// it('By diferent Types', () =>{
//     cy.visit("https://docs.cypress.io/")
//     cy.get('button[type="button"]')
// });

// it.only('By contains name', () =>{
//     cy.visit("https://www.onliner.by/")
//     cy.get('[class^="b-main"]')
// });


it.only('Using Get with Find and Eq', () =>{
    cy.viewport(1800,1800)
    cy.visit("https://docs.cypress.io/guides/references/configuration")
    cy.get('[href="#Global"]').eq(1)
});
// it.only('Using Get with Find and Eq', () =>{
//     cy.viewport(1800,1800)
//     cy.visit("https://docs.cypress.io/guides/references/configuration")
//     cy.get('[href="#Global"]').eq(1)
// });
    
// it.only('Using Get with Find and Eq', () =>{
//     cy.viewport(1800,1800)
//     cy.visit("https://docs.cypress.io/guides/references/configuration")
//     cy.get('[class="scrollactive-nav"]').find('li').eq(2).find('a')
// });
    
// it.only('Using Get with Find and Eq', () =>{
//     cy.visit("https://docs.cypress.io/guides/references/configuration")
//     cy.get('tbody').find('td').eq('2')
// });
    