import { faker } from '@faker-js/faker'

describe('Register User', () => {
  let user

  beforeEach(() => {
    user = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '12345678',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number('###-###-####'),
      birthDay: '5',
      birthMonth: 'June',
      birthYear: '2002',
    }
  })

  it('should register a user successfully', () => {
    // Arrange
    cy.visit('https://automationexercise.com')

    // Act 1: Início do cadastro
    cy.contains('Signup / Login').click()

    cy.url().should('include', '/login')

    cy.get('[data-qa="signup-name"]').type(user.name)

    cy.get('[data-qa="signup-email"]').type(user.email)

    cy.contains('button', 'Signup').click()

    // Assert 1: Formulário de cadastro carregado
    cy.url().should('include', '/signup')

    cy.contains('h2', 'Enter Account Information')

    // Act 2: Preenchimento do formulário
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

    // Assert 2: Conta criada
    cy.url().should('eq', 'https://automationexercise.com/account_created')

    cy.contains('h2', 'Account Created!')

    cy.get('[data-qa="continue-button"]').click()
  })

  it('Register User with existing email', (
    emailExist = Cypress.env('USER_EMAIL_EXIST')
  ) => {
    // Arrange
    cy.visit('https://automationexercise.com/')

    // Act 1
    cy.contains('Signup / Login').click()

    cy.url().should('include', '/login')

    cy.get('[data-qa="signup-name"]').type(user.name)

    cy.get('[data-qa="signup-email"]').type(emailExist)

    cy.contains('button', 'Signup').click()

    // Assert 1
    cy.contains('p', 'Email Address already exist!')
  })
})