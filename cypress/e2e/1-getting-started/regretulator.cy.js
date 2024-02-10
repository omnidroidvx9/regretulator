/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => { 
    cy.fixture('../fixtures/example.json').then((json) => {
      cy.log(json.baseUrl)
      cy.visit(json.baseUrl)
    }) 
  })

  it('calculates regret', () => {
    const year = '2004'
    const amount = 8000
    const expectedResult = '$50,531.10'

    cy.get('#years').select(year)  
    cy.get('[name=amount]').type(`${amount}`)
    cy.get('button').click()

    cy.get('#result').should('have.text', expectedResult)
  })
})