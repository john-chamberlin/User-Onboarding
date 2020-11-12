describe('form app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    const nameText = () => cy.get('input[name="name"]');
    const emailText = () => cy.get('input[name="email"]');
    const passText = () => cy.get('input[name="password"]');
    const checkbox = () => cy.get('input[name="agree"]');
    const submitBtn = () => cy.get('#submitBtn');

    it('typing in inputs', () => {
        nameText()
        .should('have.value', '')
        .type('John Chamberlin')
        .should('have.value', 'John Chamberlin')
        emailText()
        .should('have.value', '')
        .type('winman01.j@gmail.com')
        passText()
        .should('have.value', '')
        .type('Trombonegod69')
    })
    it('checkbox checked', () => {
        checkbox().check();
    })

    it('can submit form', () => {
        cy.get('form').submit()
    })

    it('submit button disabled until everything filled out', () => {
        submitBtn().should('be.disabled')
        nameText().should('have.value', '')
        emailText().should('have.value', '')
        passText().should('have.value', '')
        submitBtn().should('be.disabled')
        nameText().type('Wonder Woman')
        emailText().type('winmanisnfnksfninsf')
        passText().type('trombonegod69')
        checkbox().check()
        submitBtn().should('be.not.disabled')
    })

    it('form validation', () => {
        nameText()
        .type('two')
        .clear()
        emailText()
        .type('no')
        .clear()
        passText()
        .type('no')
        .clear()
        checkbox()
        .check()
        .uncheck()
    })
})