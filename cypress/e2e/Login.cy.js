describe('Login', () => {
  it('Login User with correct email and password', () => {
    cy.guiLogin()

    cy.contains(Cypress.env('USER_NAME')).should('be.visible')

  })

  it('Login User with incorrect email and password', () => {
    // Arrange
    cy.visit('https://automationexercise.com/')

    // Act
    cy.contains('Signup / Login').click()

    cy.url().should('include', '/login')

    cy.contains('h2', 'Login to your account')

    cy.get('[data-qa="login-email"]').type('uuincorrect@teste.com.br')

    cy.get('[data-qa="login-password"]').type('incorrect')

    cy.contains('button', 'Login').click()

    // Assert
    cy.contains('Your email or password is incorrect!')
  })
})