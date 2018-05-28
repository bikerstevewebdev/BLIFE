require('dotenv').config()
it('cypress demo', () => {
    cy.request({
        method: "post",
        url: 'https://bikersteve.auth0.com/oauth/token',
        "Content-Type": "application/json",
        body: {
            "grant_type": "authorization_code",
            "client_id": "tl8AVqzRu2lYXvN2BnygxJqaX9C1b-Q0",
            "client_secret": "PROCESS.env.CLIENT_SECRET",
            "code": "AUTHORIZATION_CODE",
            "redirect_uri": "http://localhost:3000/login"
          }
    }).then(res => {
        cy.setCookie()
    })
    cy.visit('https://life-inbalance.com')
    cy.get('button')
        .contains('Login')
        .click()
        cy.get('button')
            .contains('with Google').click()
})