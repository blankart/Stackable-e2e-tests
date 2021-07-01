/**
 * Register functions to Cypress Commands.
 */
Cypress.Commands.add( 'waitFA', waitFA )

/**
 * Overwrite Gutenberg Commands.
 */

Cypress.Commands.overwrite( 'newPage', function( originalFn, ...args ) {
	originalFn( ...args )
	hideStackableModal()
} )

Cypress.Commands.overwrite( 'newPost', function( originalFn, ...args ) {
	originalFn( ...args )
	hideStackableModal()
} )

let stackableModalClosed = false

/**
 * Function for hiding Stackable Modal if present.
 */
export function hideStackableModal() {
	if ( ! stackableModalClosed ) {
		cy.wait( 3000 )
	}

	cy.get('body').then( $body => {
		if ( $body.find( '.ugb-modal-welcome-video' ).length && ! stackableModalClosed ) {
			cy.log( 'Enter' )
			cy.get( '.ugb-modal-welcome-video button[aria-label="Close dialog"]' ).click({ force: true })
			stackableModalClosed = true
		}
	} )
}

/**
 * Stackable Command for waiting FontAwesome to register inside window.
 */
export function waitFA() {
	return cy.waitUntil( done => {
		cy.window().then( win => {
			done( win.FontAwesome )
		} )
	} )
}
