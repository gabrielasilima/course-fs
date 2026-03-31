describe('Blog app', function() {
  beforeEach(function() {
    // 5.17: Reset do banco e visita à página
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Test',
      username: 'tester',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').should('be.visible')
  })

  describe('Login', function() {
    // 5.18: Testes de sucesso e falha
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('tester')
      cy.get('input:last').type('password123')
      cy.get('button[type="submit"]').click()
      cy.contains('User Test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('tester')
      cy.get('input:last').type('wrongpass')
      cy.get('button[type="submit"]').click()
      
      // Bônus: verifica se a cor da mensagem de erro é vermelha
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'password123' })
    })

    it('A blog can be created', function() {
      // 5.19: Criando um blog
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Testing')
      cy.get('#author').type('Cypress Bot')
      cy.get('#url').type('http://test.com')
      cy.get('button[type="submit"]').click()

      cy.contains('Cypress Testing Cypress Bot')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First Blog', author: 'Me', url: 'http://me.com' })
      })

      it('Users can like a blog', function() {
        // 5.20: Curtir um blog
        cy.contains('view').click()
        cy.get('.likes-count').contains('likes 0')
        cy.get('.like-button').click()
        cy.get('.likes-count').contains('likes 1')
      })

      it('The creator can delete the blog', function() {
        // 5.21: Deletar pelo criador
        cy.contains('view').click()
        cy.get('.delete-button').click()
        cy.should('not.contain', 'First Blog')
      })

      it('Others cannot see the delete button', function() {
        // 5.22: Outro usuário não vê o botão de delete
        cy.contains('logout').click()
        const otherUser = { name: 'Other', username: 'other', password: 'password' }
        cy.request('POST', 'http://localhost:3003/api/users', otherUser)
        cy.login({ username: 'other', password: 'password' })

        cy.contains('view').click()
        cy.get('.delete-button').should('not.exist')
      })
    })

    // 5.23: Ordenação por likes
    it('Blogs are ordered according to likes', function() {
      cy.createBlog({ title: 'Most Likes', author: 'Top', url: '...', likes: 10 })
      cy.createBlog({ title: 'Second Most', author: 'Mid', url: '...', likes: 5 })
      cy.createBlog({ title: 'Least Likes', author: 'Bottom', url: '...', likes: 0 })

      cy.visit('http://localhost:3000') // Recarrega para garantir a ordem vinda do backend

      cy.get('.blog').eq(0).should('contain', 'Most Likes')
      cy.get('.blog').eq(1).should('contain', 'Second Most')
      cy.get('.blog').eq(2).should('contain', 'Least Likes')
    })
  })
})