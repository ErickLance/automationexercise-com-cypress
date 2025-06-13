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
    cy.registerUser(user)
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