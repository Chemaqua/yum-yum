describe('Add Product Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost/shop/admin/admin_login.php');
        const username = 'admin';
        const password = '111';
        cy.get('input[name="name"]').type(username);
        cy.get('input[name="pass"]').type(password);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost/shop/admin/products.php');
    });

    it('should add a product with valid data', () => {
        cy.get('input[name="name"]').type('Sample Product');
        cy.get('input[name="price"]').type('19');
        cy.get('select[name="category"]').select('main dish');
        cy.get('input[name="image"]').attachFile('sample.jpg');
        cy.get('input[name="add_product"]').click();
        cy.contains('new product added!').should('be.exist');
    });

    it('should show an error if the product name already exists', () => {
        cy.get('input[name="name"]').type('Sample Product');
        cy.get('input[name="price"]').type('25');
        cy.get('select[name="category"]').select('desserts');
        cy.get('input[name="image"]').attachFile('sample.jpg');
        cy.get('input[name="add_product"]').click();
        cy.contains('product name already exists!').should('be.visible');
    });

    it('should show an error if required fields are missing', () => {
        cy.get('input[name="price"]').type('15');
        cy.get('select[name="category"]').select('drinks');
        cy.get('input[name="image"]').attachFile('sample.jpg');
        cy.get('input[name="add_product"]').click();
        cy.get('input:valid').should('have.length', 3)
    });
});
