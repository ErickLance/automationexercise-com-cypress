import { faker } from '@faker-js/faker';

describe('Register User', () => {
  it('registration form', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const comapnuy = faker.company.name()
    const address = faker.location.streetAddress()
    const state = faker.location.state()
    const city = faker.location.city()
    const zipcode = faker.location.zipCode()
    const mobileNumber = faker.phone.number('###-###-####')
    // Arrange
    cy.visit('https://example.cypress.io')

    // Act 1
    cy.contains('button', ' Signup / Login').click()
    cy.url().should('eq', 'https://automationexercise.com/login')
    cy.get('[data-qa="signup-name"]').type('derterminado')
    cy.get('[data-qa="signup-email"]').type('testedetermina@teste.com')
    cy.contains('button', 'Signup').click()

    // Assert 1
    cy.url().should('eq', 'https://automationexercise.com/signup')
    cy.contains('h2', 'Enter Account Information')

    // Act 2
    cy.get('#uniform-id_gender1').click()
      .should('have.checked', true)
    cy.get('[data-qa="password"]').type('12345678')
    cy.get('[data-qa="days"]').select('5')
    cy.get('[data-qa="months"]').select('June')
    cy.get('[data-qa="years"]').select('2002')
    cy.get('#newsletter').check()
      should('be.checked')
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
    cy.constains('h2', 'Account Created!')
    cy.contains('button', 'Continue').click()



  })
})