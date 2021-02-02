/**
 * External dependencies
 */
import {
	assertBlockExist, blockErrorTest, switchDesigns, registerTests,
} from '~stackable-e2e/helpers'

describe( 'Icon List Block', registerTests( [
	blockExist,
	blockError,
	switchDesign,
] ) )

function blockExist() {
	it( 'should show the block', assertBlockExist( 'ugb/icon-list', '.ugb-icon-list' ) )
}

function blockError() {
	it( 'should not trigger block error when refreshing the page', blockErrorTest( 'ugb/icon-list' ) )
}

function switchDesign() {
	it( 'should switch design', switchDesigns( 'ugb/icon-list', [
		'Angled Icon List',
		'Arch Icon List',
		'Aspire Icon List',
		'Aspire Icon List 2',
		'Aurora Icon List',
		'Capital Icon List',
		'Dare Icon List',
		'Devour Icon List',
		'Dustin Icon List',
		'Elevate Icon List',
		'Flex Icon List',
		'Glow Icon List',
		'Heights Icon List 1',
		'Heights Icon List 2',
		'Lume Icon List',
		'Lush Icon List',
		'Prime Icon List',
		'Proact Icon List 1',
		'Proact Icon List 2',
		'Propel Icon List',
		'Seren Icon List',
		'Speck Icon List',
		'Yule Icon List',
	] ) )
}

