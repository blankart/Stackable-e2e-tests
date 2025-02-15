/**
 * External dependencies
 */
import { first, lowerCase } from 'lodash'
import { containsRegExp } from '~common/util'

const SIDEBAR_NAMESPACES = {
	'Settings': 'edit-post/block',
	'Stackable Settings': 'stackable-global-settings/sidebar',
}

/**
 * Register functions to Cypress Commands
 */
Cypress.Commands.add( 'openInspector', openInspector )
Cypress.Commands.add( 'toggleStyle', toggleStyle )
Cypress.Commands.add( 'getActiveTab', getActiveTab )

/**
 * Overwrite Gutenberg commands.
 */
Cypress.Commands.overwrite( 'openSidebar', ( originalFn, ...args ) => {
	originalFn( SIDEBAR_NAMESPACES[ first( args ) ] )
} )

Cypress.Commands.overwrite( 'closeSidebar', ( originalFn, ...args ) => {
	originalFn( SIDEBAR_NAMESPACES[ first( args ) ] )
} )

/**
 * Stackable Command for opening the block inspectore of a block.
 *
 * @param {*} subject
 * @param {string} tab
 * @param {string} selector
 */
export function openInspector( subject, tab, selector ) {
	cy.selectBlock( subject, selector )
	cy.toggleSidebar( 'edit-post/block', true )

	cy
		.get( 'button.edit-post-sidebar__panel-tab' )
		.contains( containsRegExp( 'Block' ) )
		.click( { force: true } )

	cy
		.get( 'button.edit-post-sidebar__panel-tab' )
		.contains( containsRegExp( tab ) )
		.click( { force: true } )
}

/**
 * Stackable Command for enabling/disabling an
 * accordion.
 *
 * @param {string} name
 * @param {boolean} enabled
 */
export function toggleStyle( name = 'Block Title', enabled = true ) {
	const selector = () => 	cy
		.get( '.components-panel__body' )
		.contains( containsRegExp( name ) )
		.closest( '.components-panel__body' )
		.find( '.components-form-toggle.ugb-toggle-panel-form-toggle' )

	selector()
		.invoke( 'attr', 'class' )
		.then( classNames => {
			if ( classNames.match( /is-checked/ ) !== enabled ) {
				selector()
					.find( 'input' )
					.click( { force: true } )
			}
		} )
}

/**
 * Stackable Command for getting the active tab
 * in inspector.
 */
export function getActiveTab() {
	return cy
		.get( '.ugb-panel-tabs__wrapper>button.edit-post-sidebar__panel-tab.is-active', { log: false } )
		.invoke( 'attr', 'aria-label' )
		.then( ariaLabel => {
			return new Cypress.Promise( resolve => {
				// Get the active tab.ß
				const tab = lowerCase( first( ariaLabel.split( ' ' ) ) )
				resolve( tab )
			} )
		} )
}
