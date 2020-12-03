// https://docs.cypress.io/api/introduction/api.html

describe('Timer', () => {
  it('checks initial state of the timer page', () => {
    cy.visit('/')
    cy.get('.tomato-image').should('be.visible')
    cy.get('.clock').should('be.visible')
    // control buttons should be visible
    cy.get('button').contains('Pomodoro').should('be.visible')
    cy.get('button').contains('Short break').should('be.visible')
    cy.get('button').contains('Long break').should('be.visible')
    cy.get('.mdi-play').should('be.visible')
    // components that should be hidden
    cy.get('.v-progress-linear').should('not.be.visible')
    cy.get('.mdi-close').should('not.be.visible')
  })

  it('should be able to change the session length', () => {
    cy.visit('/')

    cy.get('.clock').contains('25:00').should('be.visible')

    cy.get('button').contains('Short break').click()
    cy.get('.clock').contains('5:00').should('be.visible')

    cy.get('button').contains('Long break').click()
    cy.get('.clock').contains('15:00').should('be.visible')

    cy.get('button').contains('Pomodoro').click()
    cy.get('.clock').contains('25:00').should('be.visible')
  })

  it('should start the timer', () => {
    cy.visit('/')
    cy.get('.clock').should('have.text', '25:00')
    cy.get('.mdi-play').click()
    cy.wait(2000)
    cy.get('.clock').should('have.text', '24:58')
    // control buttons should no longer be visible
    cy.get('button').contains('Pomodoro').should('not.be.visible')
    cy.get('button').contains('Short break').should('not.be.visible')
    cy.get('button').contains('Long break').should('not.be.visible')
    cy.get('.mdi-play').should('not.be.visible')
    // components that should become
    cy.get('.v-progress-linear').should('be.visible')
    cy.get('.mdi-close').should('be.visible')
  })

  it('should be able to cancel a session', () => {
    cy.visit('/')
    cy.get('.mdi-play').click()
    cy.wait(1000)
    cy.get('.mdi-close').click()
    cy.get('.clock').should('have.text', '25:00')
  })
})
