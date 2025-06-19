import { faker } from '@faker-js/faker';

describe('General System Features', () => {

  it('should place an order after login', () => {
    const nameCard = faker.person.fullName()
    const cardNumber = faker.finance.creditCardNumber('mastercard')
    const cvc = faker.finance.creditCardCVV()
    const expiryMonth = faker.date.future().getMonth() + 1
    const expiryYear = faker.date.future().getFullYear()

    // Arrange
    cy.visit('https://automationexercise.com/products')

    // Act
    cy.guiLogin()

    cy.contains('Add to cart').first().click()
    cy.contains('Continue Shopping').click()
    cy.contains('Add to cart').last().click()
    cy.contains('View Cart').click()

    cy.url().should('include', '/view_cart')

    cy.contains('Proceed To Checkout').click()
    cy.url().should('include', '/checkout')

    cy.get('[name="message"]').type('making a purchase')
    cy.contains('Place Order').click()

    cy.url().should('include', '/payment')

    cy.get('[name="name_on_card"]').type(nameCard)
    cy.get('[name="card_number"]').type(cardNumber)
    cy.get('[name="cvc"]').type(cvc)
    cy.get('[name="expiry_month"]').type(expiryMonth)
    cy.get('[name="expiry_year"]').type(expiryYear)
    cy.get('[data-qa="pay-button"]').click()

    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
    cy.contains('Download Invoice').should('be.visible')
  })

  it('Fill out the contact form', () => {
    // Arrange
    cy.visit('https://automationexercise.com/contact_us')

    // Act
    cy.contains('Contact us').should('be.visible').click()
    cy.url().should('include', '/contact_us')
    cy.get('h2').contains('Get In Touch').should('be.visible');

    cy.get('[data-qa="name"]').type('contato teste automatizado')
    cy.get('[data-qa="email"]').type('contatoteste@gmail.com')
    cy.get('[data-qa="subject"]').type('Teste auto')
    cy.get('[data-qa="message"]').type('teste automatico com cypress')

    cy.get('[name="upload_file"]')
      .selectFile('cypress/fixtures/example.json')
    cy.get('[data-qa="submit-button"]').click()
    cy.contains('Success! Your details have been submitted successfully.')
      .should('be.visible')
    cy.contains(' Home').should('be.visible').click()

    // Assert
    cy.url().should('not.include', '/contact_us')
  })

  it.only('Verify Products and Product detail page', () => {

    // Arrange
    cy.guiLogin()

    // Act
    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.contains('All Products').should('be.visible')
    cy.contains('Category').should('be.visible')
    cy.contains('Brands').should('be.visible')

    cy.get('.features_items').should('be.visible')

    cy.get('.features_items .col-sm-4').first().contains('View Product').click()
    cy.contains('Blue Top').should('be.visible')
    cy.contains('Availability: In Stock').should('be.visible')
    cy.contains('Condition: New').should('be.visible')
    cy.contains('Brand: Polo').should('be.visible')
  })
})
