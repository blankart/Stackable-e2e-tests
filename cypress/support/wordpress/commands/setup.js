/**
 * Register functions to Cypress Commands
 */
Cypress.Commands.add( 'loginAdmin', loginAdmin )
Cypress.Commands.add( 'setupWP', setupWP )
Cypress.Commands.add( 'registerPosts', registerPosts )

/**
 * Command used to enter the login credentials of the admin.
 */
export function loginAdmin() {
	cy.visit( '/wp-login.php' )
	cy.get( '#user_login' ).clear().type( 'admin' )
	cy.get( '#user_pass' ).clear().type( 'admin' )
	cy.get( '#loginform' ).submit()
}

/**
 * Command for running the initial setup for the test.
 *
 * @param {Object} args
 */
export function setupWP( args = {} ) {
	const params = new URLSearchParams( {
		plugins: args.plugins || [],
		setup: true,
	} )
	cy.visit( '/?' + params.toString() )
}

/**
 * Command for creating blog posts.
 */
export function registerPosts() {
	cy.fixture( 'posts' ).then( posts => {
		( posts.posts || [] ).forEach( post => {
			const params = new URLSearchParams( post )
			cy.visit( '/?register-posts=' + params.toString() )
		} )
	} )
}

