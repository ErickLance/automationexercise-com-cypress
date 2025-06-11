describe('Login', () => {
  it('Login User with correct email and password', (
    userName = Cypress.env('USER_NAME'),
    userEmail = Cypress.env('USER_EMAIL_EXIST'),
    userPassword = Cypress.env('USER_PASSWORD')
  ) => {
    // Arrange
    cy.visit('https://automationexercise.com/')

    // Act
    cy.contains('Signup / Login').click()

    cy.url().should('include', '/login')

    cy.contains('h2', 'Login to your account')

    cy.get('[data-qa="login-email"]').type(userEmail)

    cy.get('[data-qa="login-password"]').type(userPassword)

    cy.contains('button', 'Login').click()

    // Assert
    cy.contains(`Logged in as ${userName}`);
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