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

/**
 * Function for hiding Stackable Modal if present.
 */
export function hideStackableModal() {
	cy.get('body').then( $body => {
		if ( $body.find( '.ugb-modal-welcome-video' ).length ) {
			cy.get( '.ugb-modal-welcome-video__overlay button[data-testid="button-close"]' ).click()
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
