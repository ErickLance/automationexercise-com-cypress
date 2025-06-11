import { faker } from '@faker-js/faker';

describe('Register User', () => {
  it('registration form success', () => {
    const nameUser = faker.internet.userName()
    const emailUser = faker.internet.email()
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const comapnuy = faker.company.name()
    const address = faker.location.streetAddress()
    const state = faker.location.state()
    const city = faker.location.city()
    const zipcode = faker.location.zipCode()
    const mobileNumber = faker.phone.number('###-###-####')
    // Arrange
    cy.visit('https://automationexercise.com')

    // Act 1
    cy.contains('Signup / Login').click()
    cy.url().should('include', '/login')
    cy.get('[data-qa="signup-name"]').type(nameUser)
    cy.get('[data-qa="signup-email"]').type(emailUser)
    cy.contains('button', 'Signup').click()

    // Assert 1
    cy.url().should('include', '/signup')
    cy.contains('h2', 'Enter Account Information')

    // Act 2
    cy.get('#id_gender1').check()
      .should('be.checked')
    cy.get('[data-qa="password"]').type('12345678')
    cy.get('[data-qa="days"]').select('5')
    cy.get('[data-qa="months"]').select('June')
    cy.get('[data-qa="years"]').select('2002')
    cy.get('#newsletter').check()
      .should('be.checked')
    cy.get('#optin').check()
      .should('be.checked')
    cy.get('[data-qa="first_name"]').type(firstName)
    cy.get('[data-qa="last_name"]').type(lastName)
    cy.get('[data-qa="company"]').type(comapnuy)
    cy.get('[data-qa="address"]').type(address)
    cy.get('[data-qa="state"]').type(state)
    cy.get('[data-qa="city"]').type(city)
    cy.get('[data-qa="zipcode"]').type(zipcode)
    cy.get('[data-qa="mobile_number"]').type(mobileNumber)
    cy.contains('button', 'Create Account').click()

    // Assert 2
    cy.url().should('eq', 'https://automationexercise.com/account_created')
    cy.contains('h2', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
  })

  it('Register User with existing email', () => {
    // Arrange
    cy.visit('https://automationexercise.com/')

    // Act 1
    cy.contains('Signup / Login').click()
    cy.url().should('include', '/login')
    cy.get('[data-qa="signup-name"]').type('derterminado')
    cy.get('[data-qa="signup-email"]').type('testedetermina@teste.com')
    cy.contains('button', 'Signup').click()

    // Assert 1
    cy.contains('p', 'Email Address already exist!')
  })
})


//cy.get('[data-qa="signup-name"]').type('derterminado')
// cy.get('[data-qa="signup-email"]').type('testedetermina@teste.com')