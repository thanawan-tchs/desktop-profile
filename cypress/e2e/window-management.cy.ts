// Exercises FloatingWindow's generic drag/resize/fullscreen/close behavior
// against the Settings window, which has no interactive content of its own
// to get in the way.
describe('Window management', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.openDockApp('System Settings')
    cy.getWindow('settings').should('be.visible')
  })

  const readBox = ($el: JQuery<HTMLElement>) => {
    const style = $el[0].style
    return { left: parseFloat(style.left), top: parseFloat(style.top), width: parseFloat(style.width), height: parseFloat(style.height) }
  }

  it('drags the window by its titlebar', () => {
    cy.getWindow('settings').then(($win) => {
      const before = readBox($win)

      cy.get('[data-testid="settings-titlebar"]').dragBy(120, 60)

      cy.getWindow('settings').should(($moved) => {
        const after = readBox($moved)
        expect(after.left).to.be.closeTo(before.left + 120, 2)
        expect(after.top).to.be.closeTo(before.top + 60, 2)
      })
    })
  })

  it('resizes the window from the bottom-right corner', () => {
    cy.getWindow('settings').then(($win) => {
      const before = readBox($win)

      cy.get('[data-testid="settings-resize-se"]').dragBy(80, 50)

      cy.getWindow('settings').should(($resized) => {
        const after = readBox($resized)
        expect(after.width).to.be.closeTo(before.width + 80, 2)
        expect(after.height).to.be.closeTo(before.height + 50, 2)
      })
    })
  })

  it('toggles fullscreen, hiding the dock and resize handles, then restores the window', () => {
    cy.get('button[title="Finder"]').should('be.visible')

    cy.getWindow('settings').then(($win) => {
      const before = readBox($win)

      cy.getWindow('settings').find('button[aria-label="Enter full screen"]').click()

      // Fullscreen: no dock, no resize handles, window fills the screen.
      cy.get('button[title="Finder"]').should('not.exist')
      cy.get('[data-testid="settings-resize-se"]').should('not.exist')
      cy.getWindow('settings').should('have.class', 'inset-0')

      cy.getWindow('settings').find('button[aria-label="Exit full screen"]').click()

      // Restored: dock is back, resize handles are back, and the window snaps
      // back to its pre-fullscreen size/position.
      cy.get('button[title="Finder"]').should('be.visible')
      cy.get('[data-testid="settings-resize-se"]').should('exist')
      cy.getWindow('settings').should(($restored) => {
        const after = readBox($restored)
        expect(after.left).to.be.closeTo(before.left, 2)
        expect(after.top).to.be.closeTo(before.top, 2)
      })
    })
  })

  it('closes the window from the red titlebar button', () => {
    cy.getWindow('settings').find('button[aria-label="Close"]').click()
    cy.getWindow('settings').should('not.exist')
  })
})
