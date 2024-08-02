describe('Login Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost/shop/admin/admin_login.php');
    });

    it('should successfully login with correct username and password', () => {
        const username = 'admin';
        const password = '111';
        cy.get('input[name="name"]').type(username);
        cy.get('input[name="pass"]').type(password);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should fail to login with incorrect password', () => {
        const username = 'correctUsername';
        const incorrectPassword = 'wrongPassword';
        cy.get('input[name="name"]').type(username);
        cy.get('input[name="pass"]').type(incorrectPassword);
        cy.get('input[type="submit"]').click();
        cy.contains('incorrect username or password').should('be.visible');
    });
});
