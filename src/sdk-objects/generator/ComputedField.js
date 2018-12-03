//Options
import {Assignment} from "./Assignments";
import {AbstractionComponent} from "./CollectAbstraction";
import {Finder} from "./Finders";

const allowedFieldProcessors = ['concat-strings', 'concat-arrays']

export class ComputedField {
	constructor(fieldProcessor, subcomponents) {
		this.fieldProcessor = fieldProcessor
		this.subcomponents = subcomponents
	}
}


//Helper functions
export function concatStrings() {
	const subcomponents = getSubComponents(arguments)
	return new ComputedField('concat-strings', subcomponents)
}

export function concatArrays() {
	const subcomponents = getSubComponents(arguments)
	return new ComputedField('concat-arrays', subcomponents)
}

//Utilities
function getSubComponents(args) {
	const subcomponents = Array.from(args)
	const allValid = subcomponents.every((i) => i instanceof Assignment || i instanceof AbstractionComponent || i instanceof Finder)
	if (allValid) {
		return subcomponents
	} else {
		throw new Error('Computed field subcomponents must be assignFrom, collect[x], or Finders')
	}
}
