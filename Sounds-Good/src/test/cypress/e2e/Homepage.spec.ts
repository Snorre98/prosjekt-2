// '[data-cy=]'

describe('Test the different components in the Homepage', () => {
  //Checks if the application can be started and refreshes the page before all tests.
  beforeEach(() => {
    cy.visit('/')
  })

  it('Test navbar', () => {
    //Checks if the navbar exists and contains the logo.
    cy.get('[data-cy=Navbar] > :nth-child(1)')
      .should('exist')
      .should('contain', 'Sounds Good')

    //Checks if the navbar contains the Homebutton.
    cy.get('[data-cy=Navbar] > :nth-child(2)')
      .should('exist')
      .should('contain', 'Home')
  })

  //Checks if the radio buttons exist and can be clicked.
  it('Test radiobuttons', () => {
    cy.get('[data-cy=ArtistButton]').should('exist').click()
    cy.get('[data-cy=AlbumButton]').should('exist').click()
    cy.get('[data-cy=TrackButton]').should('exist').click()
  })

  //Checks if the searchbar exists and can be used.
  //The result from the search will be empty, however
  //the container for the result still exists and can be
  //used in the test.
  it('Test search', () => {
    cy.get('[data-cy=Searchbar]')
      .should('exist')
      .type('test')
      .should('have.value', 'test')

    cy.get('[data-cy=SongsContainer]').should('exist')
  })

  //Checks if the slider exists and can be used.
  it('Test slider', () => {
    cy.get('[data-cy=SliderContainer]').should('exist')
    cy.get('[data-cy=Slider]').should('exist').click(100, 0)
    cy.get('[data-cy=Slider]').click('right').click(250, 0)
  })
})
