describe('Desktop shell', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('boots with the wallpaper, dock, top bar, and default windows', () => {
    // Wallpaper background is set via an inline style on the desktop root.
    cy.get('div.bg-cover').should(($el) => {
      expect($el.css('background-image')).to.not.equal('none')
    })

    // TopBar starts on "Finder" regardless of which windows are open by default.
    cy.contains('span.font-semibold', 'Finder').should('be.visible')

    // Desktop icons.
    cy.contains('button', 'Projects').should('be.visible')
    cy.contains('button', 'Documents').should('be.visible')
    cy.contains('button', 'Screenshot.png').should('be.visible')
    cy.contains('button', 'Resume.pdf').should('be.visible')

    // Dock icons for every window-backed app.
    const windowBackedDockApps = [
      'Finder',
      'Google Chrome',
      'Postman',
      'System Settings',
      'Obsidian',
      'Visual Studio Code',
      'Terminal',
    ]
    windowBackedDockApps.forEach((label) => {
      cy.get(`button[title="${label}"]`).should('be.visible')
    })

    // Obsidian and Resume.pdf are open on load.
    cy.getWindow('obsidian').should('be.visible')
    cy.getWindow('pdf').should('be.visible')
  })

  it('opens each dock app into its own window', () => {
    const dockJourneys: { label: string; testId: string }[] = [
      { label: 'Finder', testId: 'finder' },
      { label: 'Google Chrome', testId: 'chrome' },
      { label: 'Postman', testId: 'postman' },
      { label: 'System Settings', testId: 'settings' },
      { label: 'Visual Studio Code', testId: 'vscode' },
      { label: 'Terminal', testId: 'terminal' },
    ]

    dockJourneys.forEach(({ label, testId }) => {
      cy.openDockApp(label)
      cy.getWindow(testId).should('be.visible')
    })
  })

  it('closes and reopens a window from the dock', () => {
    cy.getWindow('obsidian').find('button[aria-label="Close"]').click()
    cy.getWindow('obsidian').should('not.exist')

    cy.openDockApp('Obsidian')
    cy.getWindow('obsidian').should('be.visible')
  })

  it('brings a window to the front and updates the active app name on focus', () => {
    const zIndexOf = (el: JQuery<HTMLElement>) => Number(el.css('z-index'))

    // Resume.pdf opens with a higher default z-index than Obsidian, so it's
    // the frontmost window on load — the top bar still shows its hardcoded
    // initial "Finder" label at this point, not something derived from
    // window state.
    cy.getWindow('obsidian').should(($obsidian) => {
      expect(zIndexOf(Cypress.$('[data-testid="pdf"]'))).to.be.greaterThan(zIndexOf($obsidian))
    })

    // Clicking Obsidian's titlebar brings it to the front — above Resume.pdf,
    // which ends up fully covered by it — and relabels the top bar.
    cy.get('[data-testid="obsidian-titlebar"]').click()
    cy.contains('span.font-semibold', 'Obsidian').should('be.visible')
    cy.getWindow('obsidian').should(($obsidian) => {
      expect(zIndexOf($obsidian)).to.be.greaterThan(zIndexOf(Cypress.$('[data-testid="pdf"]')))
    })

    // Resume.pdf's titlebar is now mostly hidden behind Obsidian's window —
    // click the strip that still pokes out past Obsidian's right edge to
    // refocus it, the same as a user reaching for whatever's still visible.
    // Its top bar label is "Finder", not "Resume.pdf": the app treats the PDF
    // preview as part of Finder for menu-bar purposes.
    cy.getWindow('obsidian').then(($obsidian) => {
      const obsidianRight = $obsidian[0].getBoundingClientRect().right
      cy.get('[data-testid="pdf-titlebar"]').then(($titlebar) => {
        const rect = $titlebar[0].getBoundingClientRect()
        cy.wrap($titlebar).click(Math.round(obsidianRight - rect.left + 10), Math.round(rect.height / 2))
      })
    })
    cy.contains('span.font-semibold', 'Finder').should('be.visible')
    cy.getWindow('pdf').should(($pdf) => {
      expect(zIndexOf($pdf)).to.be.greaterThan(zIndexOf(Cypress.$('[data-testid="obsidian"]')))
    })
  })

  it('navigates Finder into the Desktop folders and opens the resume', () => {
    cy.openDockApp('Finder')
    cy.getWindow('finder').should('be.visible')

    cy.get('[data-testid="finder-content"]').contains('button', 'Resume.pdf').click()
    cy.getWindow('pdf').should('be.visible')

    cy.get('[data-testid="finder-sidebar"]').contains('button', 'Trash').click()
    cy.get('[data-testid="finder-content"]').contains('This folder is empty').should('be.visible')
  })
})
