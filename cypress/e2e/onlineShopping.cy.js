import { faker } from '@faker-js/faker';

describe('Place Order: Login before Checkout', () => {
  beforeEach(() => {
    cy.sessionLogin()
  })
  it('should place an order after login', () => {
    const nameCard = faker.person.fullName()
    const cardNumber = faker.finance.creditCardNumber('mastercard')
    const cvc = faker.finance.creditCardCVV()
    const expiryMonth = faker.date.future().getMonth() + 1
    const expiryYear = faker.date.future().getFullYear()

    // Arrange
    cy.visit('https://automationexercise.com/products')

    // Act
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
})