/**
 * External dependencies
 */
import {
	keys, first, omit, omitBy,
} from 'lodash'
import { containsRegExp } from '~common/util'

/**
 * register functions to cypress commands.
 */
Cypress.Commands.add( 'colorControlClear', colorControlClear )
Cypress.Commands.add( 'rangeControlReset', rangeControlReset )
Cypress.Commands.add( 'dropdownControl', dropdownControl )
Cypress.Commands.add( 'colorControl', colorControl )
Cypress.Commands.add( 'rangeControl', rangeControl )
Cypress.Commands.add( 'toolbarControl', toolbarControl )
Cypress.Commands.add( 'toggleControl', toggleControl )
Cypress.Commands.add( 'textControl', textControl )
Cypress.Commands.add( 'textAreaControl', textAreaControl )
Cypress.Commands.add( 'stylesControl', stylesControl )
Cypress.Commands.add( 'fontSizeControl', fontSizeControl )
Cypress.Commands.add( 'urlInputControl', urlInputControl )
Cypress.Commands.add( 'radioControl', radioControl )

// Adjust Styles
Cypress.Commands.add( 'adjust', adjust )
Cypress.Commands.add( 'resetStyle', resetStyle )

/**
 * Command for resetting the color picker.
 *
 * @param {string} name
 * @param {Object} options
 */
function colorControlClear( name, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, null, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'button' )
		.contains( containsRegExp( 'Clear' ) )
		.click( { force: true } )
	// We are adding an additional click as sometimes click does not register.
		.click( { force: true, log: false } )
}

/**
 * Command for resetting the advanced range control.
 *
 * @param {string} name
 * @param {Object} options
 */
function rangeControlReset( name, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, null, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'button' )
		.contains( containsRegExp( 'Reset' ) )
		.click( { force: true } )
}

/**
 * Command for adjusting the dropdown control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function dropdownControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'select' )
		.select( value, { force: true } )
}

/**
 * Command for adjusting the color picker
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function colorControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	const selector = () => cy.getBaseControl( name, { isInPopover } )

	if ( typeof value === 'string' && value.match( /^#/ ) ) {
		// Use custom color.
		beforeAdjust( name, value, options )
		selector()
			.find( 'button' )
			.contains( 'Custom color' )
			.click( { force: true } )

		cy
			.get( '.components-popover__content .components-color-picker' )
			.find( 'input[type="text"]' )
			.type( `{selectall}${ value }{enter}`, { force: true } )

		// Declare the variable again
		selector()
			.find( 'button' )
			.contains( containsRegExp( 'Custom color' ) )
			.click( { force: true } )
	} else if ( typeof value === 'number' ) {
		// Get the nth color in the color picker.
		beforeAdjust( name, value, options )
		selector()
			.find( 'button.components-circular-option-picker__option' )
			.eq( value - 1 )
			.click( { force: true } )
	}
}

/**
 * Command for adjusting the advanced range control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function rangeControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'input.components-input-control__input' )
		.type( `{selectall}${ value }`, { force: true } )
}

/**
 * Command for adjusting the toolbar control
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function toolbarControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	// Compatibility for default values
	const defaultValues = [
		'single', // Default value for column background type.
	]

	if ( defaultValues.includes( value ) ) {
		value = ''
	}

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( `button[value="${ value }"]` )
		.click( { force: true } )
}

/**
 * Command for enabling/disabling a toggle control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function toggleControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	const selector = () => cy.getBaseControl( name, { isInPopover, customParentSelector: '' } )

	selector()
		.find( 'span.components-form-toggle' )
		.invoke( 'attr', 'class' )
		.then( classNames => {
			const parsedClassNames = classNames.split( ' ' )
			if ( ( value && ! parsedClassNames.includes( 'is-checked' ) ) || ( ! value && parsedClassNames.includes( 'is-checked' ) ) ) {
				beforeAdjust( name, value, options )
				selector()
					.find( 'input' )
					.click( { force: true } )
			}
		} )
}

/**
 * Command for adjusting the text control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function textControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'input.components-text-control__input' )
		.type( `{selectall}${ value }`, { force: true } )
}

/**
 * Command for typing into a text area control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function textAreaControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( 'textarea.components-textarea-control__input' )
		.type( `{selectall}${ value }`, { force: true } )
}

/**
 * Command for changing the block style control in native blocks.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function stylesControl( name, value, options = {} ) {
	const {
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.get( '.block-editor-block-styles' )
		.find( `div.block-editor-block-styles__item[aria-label=${ value }]` )
		.click( { force: true } )
}

/**
 * Command for changing the font size in native blocks.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function fontSizeControl( name, value, options = {} ) {
	const {
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	if ( typeof value === 'string' ) {
		cy.get( '.components-font-size-picker__select' )
			.find( '.components-custom-select-control__button' )
			.click( { force: true } )

		cy.get( '.components-font-size-picker__select' )
			.find( '.components-custom-select-control__item' )
			.contains( value )
			.click( { force: true } )
	} else if ( typeof value === 'number' ) {
		cy.get( '.components-font-size-picker__number-container' )
			.find( 'input.components-font-size-picker__number' )
			.type( `{selectall}${ value }`, { force: true } )
	}
}

/**
 * Command for adjusting the URL input control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function urlInputControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.contains( containsRegExp( name ) )
		.closest( '.components-panel__body>.components-base-control' )
		.find( 'input.block-editor-url-input__input' )
		.type( `{selectall}${ value }{enter}`, { force: true } )
}

/**
 * Command for adjusting the radio control.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
function radioControl( name, value, options = {} ) {
	const {
		isInPopover = false,
		beforeAdjust = () => {},
	} = options

	beforeAdjust( name, value, options )
	cy.getBaseControl( name, { isInPopover } )
		.find( `.components-radio-control__option:contains(${ value }) input` )
		.click( { force: true } )
}

/**
 * Command for adjusting settings.
 *
 * @param {string} name
 * @param {*} value
 * @param {Object} options
 */
export function adjust( name, value, options ) {
	const {
		// overwrite selector options.
		customOptions = {},
		// overwrite parent element selector used to locate option labels.
		parentElement = '.components-panel__body',
		// if the option has no label, pass custom regex to find the control
	} = options

	// Handle options with no label
	if ( name === 'Block Design' ) {
		cy.stylesControl( name, value, options )
		return cy.get( '.block-editor-block-list__block.is-selected' )
	}

	// Handle deprecated controls.
	if ( name === 'Font size' ) {
		// Handle gutenberg core heading font size.
		if ( Cypress.$( '.components-custom-select-control:contains(Font size)' ) ) {
			cy.fontSizeControl( name, value, options )
			return cy.get( '.block-editor-block-list__block.is-selected' )
		}
	}

	const baseControlSelector = () => cy
		.getBaseControl( name, { customParentSelector: parentElement } )

	/**
	 * Specific selector to trigger one
	 * of the control options available.
	 */
	const baseControlHandler = {
		// Populate default selectors.
		'.components-circular-option-picker__dropdown-link-action': 'colorControl',
		'.components-select-control__input': 'dropdownControl',
		'.components-input-control__input': 'rangeControl',
		'.components-button-group': 'toolbarControl',
		'.components-form-toggle__input': 'toggleControl',
		'.components-text-control__input': 'textControl',
		'.components-textarea-control__input': 'textAreaControl',
		'.block-editor-url-input': 'urlInputControl',
		'.components-radio-control__input': 'radioControl',
	}

	baseControlSelector()
		.then( $baseControl => {
			const combinedControlHandlers = Object.assign( customOptions, baseControlHandler )
			const commandClassKey = first( keys( omitBy(
				combinedControlHandlers,
				( value, key ) => ! ( $baseControl.find( key ).length || Array.from( first( $baseControl ).classList ).includes( key.replace( '.', '' ) ) )
			) ) )

			if ( ! commandClassKey ) {
				throw new Error(
					'The `cy.adjust` function could not handle this option or the label provided is not found inside `.components-base-control element`. You may overwrite `cy.adjust` by passing customOptions and parentElement to find the right control.'
				)
			}

			cy[ combinedControlHandlers[ commandClassKey ] ]( name, value, omit( options, 'customOptions' ) )
		} )

	// Always return the selected block which will be used in functions that require chained wp-block elements.
	return cy.get( '.block-editor-block-list__block.is-selected' )
}

/**
 * Command for resetting the style.
 *
 * @param {string} name
 * @param {Object} options
 */
export function resetStyle( name, options = {} ) {
	const {
		// overwrite selector options.
		customOptions = {},
		// overwrite parent element selector used to locate option labels.
		parentElement = '.components-panel__body > .components-base-control',
		// if the option has no label, pass custom regex to find the control
	} = options
	const baseControlSelector = () => cy
		.get( parentElement )
		.contains( containsRegExp( name ) )
		.closest( parentElement )

	/**
	 * Specific selector to trigger one
	 * of the control options available.
	 */
	const baseControlHandler = {
		// Populate default selectors.
		'.components-input-control__input': 'rangeControlReset',
		'.components-circular-option-picker__dropdown-link-action': 'colorControlClear',
	}

	baseControlSelector()
		.then( $baseControl => {
			const combinedControlHandlers = Object.assign( customOptions, baseControlHandler )
			const commandClassKey = first( keys( omitBy(
				combinedControlHandlers,
				( value, key ) => ! ( $baseControl.find( key ).length || Array.from( first( $baseControl ).classList ).includes( key.replace( '.', '' ) ) )
			) ) )

			if ( ! commandClassKey ) {
				throw new Error(
					'The `cy.reset` function could not handle this option or the label provided is not found inside `.components-base-control element`. You may overwrite `cy.reset` by passing customOptions and parentElement to find the right control.'
				)
			}

			cy[ combinedControlHandlers[ commandClassKey ] ]( name, omit( options, 'customOptions' ) )
		} )

	// Always return the selected block which will be used in functions that require chained wp-block elements.
	return cy.get( '.block-editor-block-list__block.is-selected' )
}
