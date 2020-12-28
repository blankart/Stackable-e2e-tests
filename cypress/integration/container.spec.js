/**
 * Internal dependencies
 */
import { blocks } from '../config'
import {
	assertBlockExist, blockErrorTest, switchLayouts,
} from '../support/helpers'

describe( 'Container', () => {
	it( 'should show the block', assertBlockExist( 'ugb/container', '.ugb-container' ) )

	it( 'should not trigger block error when refreshing the page', blockErrorTest( 'ugb/container' ) )

	it( 'should allow adding inner blocks inside Advanced Columns and Grid', () => {
		cy.setupWP()
		cy.newPage()
		cy.addBlock( 'ugb/container' )

		blocks
			.filter( blockName => blockName !== 'ugb/container' )
			.forEach( blockName => cy.appendBlock( blockName ) )
	} )

	it( 'should switch layout', switchLayouts( 'ugb/container', [
		'Basic',
		'Plain',
		'Image',
		{
			value: 'image2',
		},
		{
			value: 'image3',
		},
	] ) )
} )
