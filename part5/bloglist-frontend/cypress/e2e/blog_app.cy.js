describe('Blog App', function() {
  beforeEach( function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'hien',
      username: 'hienthi',
      password: 'hieng135'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    const user2 = {
      name: 'luong',
      username: 'luongng',
      password: 'nguyen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)

    cy.visit('')
  })

  
  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').should('contain', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
    
      cy.get('#username').type('hienthi')
      cy.get('#password').type('hieng135')
      cy.get('#login-button').click()
      cy.contains('Hello, hienthi')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('hienthi')
      cy.get('#password').type('abcs123')
      cy.get('#login-button').click()
      
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Wrong username or password')
      cy.get('html').should('not.contain', 'hienthi')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'hienthi', password: 'hieng135'})
      cy.createBlog({title: 'How would it be?', author: 'Ala', url:'alibaba.com'})
      cy.contains('How would it be?').contains('show').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('A test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('abc.com')
      cy.get('#create-button').click()
  
      cy.contains('A test title by test author')
    })

    it('like button can be clicked', function() {
      cy.contains('likes').contains('like').click()
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('likes 1')
    })

    it('only blog creator delele a blog', function() {
      cy.contains('remove').click()
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', 'alibaba.com')
    })

    it('blog cannot be deleted if not creator/ only creator can see remove button', function() {
      cy.contains('logout').click()
      cy.login({username: 'luongng', password:'nguyen'})
      cy.contains('How would it be?').contains('show').click()
      cy.contains('remove').should('have.css', 'display', 'none')
    })

    it.only('blogs are ordered according to likes descendingly', function () {
      cy.createBlog({title: 'another blog with more likes', author: 'author2', url: 'whoknows.com', likes: 123})
      cy.contains('another blog with more likes').contains('show').click()
      cy.contains('another blog with more likes').contains('like').click().as('clickLike')
      cy.wait(5000)
      cy.get('.details').eq(0).should('contain', 'another blog with more likes')
      cy.get('.details').eq(1).should('contain', 'How would it be?')
      
    })
  })

})