Cypress.Commands.add('guiLogin', (
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
  //cy.contains(`Logged in as ${Cypress.env('USER_NAME')}`);
})

Cypress.Commands.add('sessionLogin', (
  userEmail = Cypress.env('USER_EMAIL_EXIST'),
  userPasssword = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(userEmail, userPasssword)
  cy.session(userEmail, login)
})

Cypress.Commands.add('registerUser', (user) => {
  cy.visit('https://automationexercise.com')

  cy.contains('Signup / Login').click()
  cy.url().should('include', '/login')

  cy.get('[data-qa="signup-name"]').type(user.name)
  cy.get('[data-qa="signup-email"]').type(user.email)
  cy.contains('button', 'Signup').click()

  cy.url().should('include', '/signup')
  cy.contains('h2', 'Enter Account Information')

  cy.get('#id_gender1').check().should('be.checked')
  cy.get('[data-qa="password"]').type(user.password)
  cy.get('[data-qa="days"]').select(user.birthDay)
  cy.get('[data-qa="months"]').select(user.birthMonth)
  cy.get('[data-qa="years"]').select(user.birthYear)

  cy.get('#newsletter').check().should('be.checked')
  cy.get('#optin').check().should('be.checked')
  cy.get('[data-qa="first_name"]').type(user.firstName)
  cy.get('[data-qa="last_name"]').type(user.lastName)
  cy.get('[data-qa="company"]').type(user.company)
  cy.get('[data-qa="address"]').type(user.address)
  cy.get('[data-qa="state"]').type(user.state)
  cy.get('[data-qa="city"]').type(user.city)
  cy.get('[data-qa="zipcode"]').type(user.zipcode)
  cy.get('[data-qa="mobile_number"]').type(user.mobile)

  cy.contains('button', 'Create Account').click()

  cy.url().should('eq', 'https://automationexercise.com/account_created')
  cy.contains('h2', 'Account Created!')
  cy.get('[data-qa="continue-button"]').click()
})
