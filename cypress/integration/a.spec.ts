describe("teste", () => {
    it("a", () => {
        cy.visit("/")
        cy.get('#teste').should('exist')
    })
})