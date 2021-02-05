/**
 * External dependencies
 */
import {
	assertBlockExist, blockErrorTest, switchDesigns, switchLayouts, registerTests,
} from '~stackable-e2e/helpers'

describe( 'Team Member Block', registerTests( [
	blockExist,
	blockError,
	switchLayout,
	switchDesign,
] ) )

function blockExist() {
	it( 'should show the block', assertBlockExist( 'ugb/team-member', '.ugb-team-member' ) )
}

function blockError() {
	it( 'should not trigger block error when refreshing the page', blockErrorTest( 'ugb/team-member' ) )
}

function switchLayout() {
	it( 'should switch layout', switchLayouts( 'ugb/team-member', [
		{ value: 'Basic', selector: '.ugb-team-member--design-basic' },
		{ value: 'Plain', selector: '.ugb-team-member--design-plain' },
		{ value: 'Horizontal', selector: '.ugb-team-member--design-horizontal' },
		{ value: 'Overlay', selector: '.ugb-team-member--design-overlay' },
		{ value: 'Overlay Simple', selector: '.ugb-team-member--design-overlay-simple' },
		{ value: 'Half', selector: '.ugb-team-member--design-half' },
	] ) )
}

function switchDesign() {
	it( 'should switch design', switchDesigns( 'ugb/team-member', [
		'Capital Team Member',
		'Cary Team Member 1',
		'Cary Team Member 2',
		'Decora Team Member',
		'Detour Team Member',
		'Dim Team Member',
		'Elevate Team Member',
		'Glow Team Member',
		'Heights Team Member',
		'Hue Team Member',
		'Lume Team Member',
		'Lush Team Member',
		'Prime Team Member',
		'Seren Team Member 1',
		'Seren Team Member 2',
		'Upland Team Member',
	] ) )
}

