describe('home', () => {
    it('loads', () => {
        cy.visit('/note')

        cy.get('h1').should('contain', 'Trapper Keeper: Keep')
    })
})
