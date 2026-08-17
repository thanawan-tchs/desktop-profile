/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Click a Dock icon by its accessible label (the button's `title` attribute). */
      openDockApp(label: string): Chainable<JQuery<HTMLElement>>
      /** Get a FloatingWindow's root element by the `testId` prop passed to it. */
      getWindow(testId: string): Chainable<JQuery<HTMLElement>>
      /**
       * Simulate a pointer drag on the current subject: pointerdown on the
       * subject, pointermove/pointerup on the body (FloatingWindow's drag/resize
       * handlers listen on `window`, and pointer events bubble there).
       */
      dragBy(dx: number, dy: number): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('openDockApp', (label: string) => {
  return cy.get(`button[title="${label}"]`).click()
})

Cypress.Commands.add('getWindow', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add('dragBy', { prevSubject: 'element' }, (subject, dx: number, dy: number) => {
  const pointerId = 1

  cy.wrap(subject).then(($el) => {
    const rect = $el[0].getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top + rect.height / 2

    cy.wrap($el).trigger('pointerdown', {
      eventConstructor: 'PointerEvent',
      pointerId,
      isPrimary: true,
      button: 0,
      buttons: 1,
      clientX: startX,
      clientY: startY,
    })

    // A single big jump is enough to exercise the handler; real dragging fires
    // many pointermove events but the app only cares about start vs. current.
    cy.get('body')
      .trigger('pointermove', {
        eventConstructor: 'PointerEvent',
        pointerId,
        isPrimary: true,
        buttons: 1,
        clientX: startX + dx,
        clientY: startY + dy,
      })
      .trigger('pointerup', {
        eventConstructor: 'PointerEvent',
        pointerId,
        isPrimary: true,
        clientX: startX + dx,
        clientY: startY + dy,
      })
  })

  return cy.wrap(subject)
})

export {}
