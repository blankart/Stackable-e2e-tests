
/**
 * External dependencies
 */
import {
	assertBlockExist, blockErrorTest, switchDesigns, assertAligns, assertBlockTitleDescription, assertBlockBackground, assertSeparators, registerTests, assertBlockTitleDescriptionContent, responsiveAssertHelper, assertTypography, assertAdvancedTab,
} from '~stackable-e2e/helpers'
import { registerBlockSnapshots } from '~gutenberg-e2e/plugins'

const [ desktopStyle, tabletStyle, mobileStyle ] = responsiveAssertHelper( styleTab )
const [ desktopAdvanced, tabletAdvanced, mobileAdvanced ] = responsiveAssertHelper( advancedTab, { tab: 'Advanced' } )

describe( 'Icon Block', registerTests( [
	blockExist,
	blockError,
	switchDesign,
	typeContent,
	desktopStyle,
	tabletStyle,
	mobileStyle,
	desktopAdvanced,
	tabletAdvanced,
	mobileAdvanced,
	blockSpecificTests,
] ) )

function blockExist() {
	it( 'should show the block', assertBlockExist( 'ugb/icon', '.ugb-icon' ) )
}

function blockError() {
	it( 'should not trigger block error when refreshing the page', blockErrorTest( 'ugb/icon' ) )
}

function switchDesign() {
	it( 'should switch design', switchDesigns( 'ugb/icon', [
		'Cary Icon',
		'Elevate Icon',
		'Hue Icon',
		'Lume Icon',
	] ) )
}

function typeContent() {
	it( 'should allow typing in the block', () => {
		cy.setupWP()
		cy.newPage()
		cy.addBlock( 'ugb/icon' ).as( 'iconBlock' )
		registerBlockSnapshots( 'iconBlock' )

		cy.openInspector( 'ugb/icon', 'Style' )
		cy.toggleStyle( 'Title' )

		cy.typeBlock( 'ugb/icon', '.ugb-icon__title', 'Helloo World!! 12' )
			.assertBlockContent( '.ugb-icon__title', 'Helloo World!! 12' )

		assertBlockTitleDescriptionContent( 'ugb/icon' )
	} )
}

function styleTab( viewport, desktopOnly ) {
	cy.setupWP()
	cy.newPage()
	cy.addBlock( 'ugb/icon' ).as( 'iconBlock' )
	const iconBlock = registerBlockSnapshots( 'iconBlock' )
	cy.openInspector( 'ugb/icon', 'Style' )

	// Test General options
	cy.collapse( 'General' )
	cy.waitFA()
	cy.adjust( 'Number of Icons / Columns', 4 )
	cy.get( '.ugb-icon__item4' ).should( 'exist' )
	cy.changeIcon( 1, 'info' )
	cy.changeIcon( 2, 'info' )
	cy.changeIcon( 3, 'info' )
	cy.changeIcon( 4, 'info' )

	assertAligns( 'Align', '.ugb-inner-block', { viewport } )

	// Test Title options
	cy.collapse( 'Title' )
	cy.toggleStyle( 'Title' )
	cy.typeBlock( 'ugb/icon', '.ugb-icon__item1 .ugb-icon__title', 'Title 1' )
	cy.typeBlock( 'ugb/icon', '.ugb-icon__item2 .ugb-icon__title', 'Title 2' )
	cy.typeBlock( 'ugb/icon', '.ugb-icon__item3 .ugb-icon__title', 'Title 3' )
	cy.typeBlock( 'ugb/icon', '.ugb-icon__item4 .ugb-icon__title', 'Title 4' )

	cy.adjust( 'Title on Top', true )
	desktopOnly( () => {
		cy.adjust( 'Title HTML Tag', 'h4' )
			.assertHtmlTag( '.ugb-icon__title', 'h4' )
		cy.adjust( 'Title Color', '#742f2f' ).assertComputedStyle( {
			'.ugb-icon__title': {
				'color': '#742f2f',
			},
		} )
	} )
	assertTypography( '.ugb-icon__title', { viewport } )
	assertAligns( 'Align', '.ugb-icon__title', { viewport } )

	// Test Icon options
	cy.collapse( 'Icon' )
	desktopOnly( () => {
		cy.adjust( 'Icon Color', '#acacac' ).assertComputedStyle( {
			'.ugb-icon-inner-svg': {
				'color': '#acacac',
				'fill': '#acacac',
			},
		} )
		cy.adjust( 'Color Type', 'gradient' )
		cy.adjust( 'Icon Color #1', '#f00069' )
		cy.adjust( 'Icon Color #2', '#000000' )
		cy.adjust( 'Gradient Direction (degrees)', 180 )
		cy.adjust( 'Icon Opacity', 0.5 )
		cy.adjust( 'Icon Rotation', 31 ).assertComputedStyle( {
			'.ugb-icon__icon': {
				'opacity': '0.5',
			},
			'.ugb-icon-inner-svg': {
				'fill': 'url("#grad-f00069-000000-180")',
				'transform': 'matrix(0.857167, 0.515038, -0.515038, 0.857167, 0, 0)',
			},
		} )
	} )

	cy.adjust( 'Icon Size', 23, { viewport } ).assertComputedStyle( {
		'.ugb-icon-inner-svg': {
			'height': '23px',
			'width': '23px',
		},
	} )

	// TODO: Add Multicolor test

	desktopOnly( () => {
		cy.adjust( 'Background Shape', true )
		cy.adjust( 'Shape', { label: 'Circle', value: 'circle' } )
		cy.adjust( 'Shape Color', '#bcdeff' )
		cy.adjust( 'Shape Opacity', 0.9 )
		cy.adjust( 'Shape Size', 1.4 )
		cy.adjust( 'Horizontal Offset', 9 )
		cy.adjust( 'Vertical Offset', 8 ).assertComputedStyle( {
			'.ugb-icon__bg-shape': {
				'fill': '#bcdeff',
				'color': '#bcdeff',
				'opacity': '0.9',
			},
		} )
	} )
	cy.adjust( 'Align', 'left', { viewport } ).assertComputedStyle( {
		'.ugb-icon__icon': {
			'align-self': 'flex-start',
		},
	} )
	cy.adjust( 'Align', 'center', { viewport } ).assertComputedStyle( {
		'.ugb-icon__icon': {
			'align-self': 'center',
		},
	} )
	cy.adjust( 'Align', 'right', { viewport } ).assertComputedStyle( {
		'.ugb-icon__icon': {
			'align-self': 'flex-end',
		},
	} )

	// Test Effects option
	desktopOnly( () => {
		cy.collapse( 'Effects' )
		const effects = [
			'lift',
			'lift-more',
			'scale',
			'scale-more',
			'lower',
			'lower-more',
		]
		effects.forEach( effect => {
			cy.adjust( 'Hover Effect', effect )
				.assertClassName( '.ugb-icon__item', `ugb--hover-${ effect }` )
		} )
	} )

	// Test Spacing options
	cy.collapse( 'Spacing' )
	cy.adjust( 'Paddings', [ 25, 26, 27, 28 ], { viewport, unit: 'px' } ).assertComputedStyle( {
		'.ugb-icon__content-wrapper': {
			'padding-top': '25px',
			'padding-right': '26px',
			'padding-bottom': '27px',
			'padding-left': '28px',
		},
	} )
	cy.adjust( 'Paddings', [ 3, 4, 5, 6 ], { unit: 'em', viewport } ).assertComputedStyle( {
		'.ugb-icon__content-wrapper': {
			'padding-top': '3em',
			'padding-right': '4em',
			'padding-bottom': '5em',
			'padding-left': '6em',
		},
	} )
	cy.adjust( 'Paddings', [ 17, 18, 19, 20 ], { unit: '%', viewport } ).assertComputedStyle( {
		'.ugb-icon__content-wrapper': {
			'padding-top': '17%',
			'padding-right': '18%',
			'padding-bottom': '19%',
			'padding-left': '20%',
		},
	} )
	cy.adjust( 'Icon', 14, { viewport } ).assertComputedStyle( {
		'.ugb-icon__icon': {
			'margin-bottom': '14px',
		},
	} )
	cy.adjust( 'Title', 29, { viewport } ).assertComputedStyle( {
		'.ugb-icon__title': {
			'margin-bottom': '29px',
		},
	} )

	// Test Block Title and Description
	assertBlockTitleDescription( { viewport } )

	// Test Block Background
	assertBlockBackground( '.ugb-icon', { viewport } )

	// Test Top and Bottom Separator
	assertSeparators( { viewport } )
	iconBlock.assertFrontendStyles()
}

function advancedTab( viewport ) {
	cy.setupWP()
	cy.newPage()
	cy.addBlock( 'ugb/icon' ).as( 'iconBlock' )
	const iconBlock = registerBlockSnapshots( 'iconBlock' )

	cy.openInspector( 'ugb/icon', 'Advanced' )

	assertAdvancedTab( '.ugb-icon', {
		viewport,
		customCssSelectors: [
			'.ugb-icon__icon',
			'.ugb-icon__icon svg',
		],
	} )

	// Add more block specific tests.
	iconBlock.assertFrontendStyles()
}

function blockSpecificTests() {
	it( 'should execute block specific tests', () => {
		// Test 1: @see https://github.com/gambitph/Stackable/issues/1206

		cy.setupWP()
		cy.newPage()
		cy.addBlock( 'ugb/icon' ).as( 'iconBlock' )
		const iconBlock = registerBlockSnapshots( 'iconBlock' )
		cy.openInspector( 'ugb/icon', 'Style' )
		cy.toggleStyle( 'Title' )

		// Set the block alignment to align center in toolbar
		cy.changeAlignment( 'ugb/icon', 0, 'Align center' )

		cy.collapse( 'General' )
		cy.adjust( 'Align', 'right' ).assertComputedStyle( {
			'.ugb-icon': {
				'justify-content': 'flex-end',
			},
			'.ugb-inner-block': {
				'text-align': 'right',
			},
			'.ugb-icon__title': {
				'text-align': 'right',
			},
		} )

		iconBlock.assertFrontendStyles()
	} )
}

