describe("teste", () => {
    it("a", () => {
        cy.visit("/")

        // Create
        cy.findByText('Produtos').click()
        cy.findByText('Cadastrar Novo Produto').click()
        cy.findByLabelText('Name').type('nome_teste')
        cy.findByLabelText('Código').type('codigo_teste')
        cy.findByLabelText('Categoria').type('categoria_teste')
        cy.findByLabelText('Marca').type('marca_teste')
        cy.findByLabelText('Unidade').type('unidade_teste')
        cy.findByLabelText('Estoque Mínimo').type('123')
        cy.findByLabelText('Estoque Máximo').type('789')
        cy.findByLabelText('Observação').type('observação_teste')
        cy.findByText('Cadastrar Produto').click()

        // Resumo
        cy.findByText('nome_teste').should('exist')

        // Arquivados
        cy.findByText('Arquivados').click()
        cy.findByText('nome_teste').should('not.exist')

        cy.findByText('Detalhes').click()
        cy.findByText('nome_teste').should('exist').click()
        cy.findByText('Arquivar').click()

        cy.findByText('Detalhes').click()
        cy.findByText('nome_teste').should('not.exist')

        cy.findByText('Arquivados').click()
        cy.findByText('nome_teste').should('exist')
        cy.get('.sc-crXcEl').click()

        cy.findByText('Arquivados').click()
        cy.findByText('nome_teste').should('not.exist')

        // Detalhes
        cy.findByText('Detalhes').click()
        cy.findByText('nome_teste').should('exist').click()

        // Edit
        cy.findByLabelText('Name').type('_edited')
        cy.findByRole('button', { name: 'Editar Produto' }).click()
        cy.findByText('nome_teste').should('not.exist')
        cy.findByText('nome_teste_edited').should('exist').click()

        // Delete
        cy.findByText('Deletar').click()
        cy.findByText('nome_teste').should('not.exist')
    })
})