import equals from 'deep-equal'
import {FinderFailedOnCompile, InvalidFinder} from "../../Errors";

//Options
const optionsSchema = {
	type: 'object',
	properties: {
		occurrence: {type: 'number'},
		rules: {
			type: 'object'
		}
	}
}

const defaultOptions = {
	occurrence: 0,
	rules: {}
}

const allowedTypes = ['token', 'literal', 'object-literal', 'array-literal']


export class Finder {
	constructor(type, value, options) {

		const validType = allowedTypes.includes(type)
		if (!validType) {
			throw InvalidFinder('type', `one of ${allowedTypes.toString()}`)
		}

		//@todo validate options

		this._type = type
		this._value = value
		this._options = options

	}

	get options() {
		return this._options
	}

	evaluate(candidates, lensId) {
		const found = candidates.filter(i=> {
			return i.stagedComponent.component.type === this._type &&
				(equals(i.value, this._value))
		})[this._options.occurrence]
		if (found) {
			return found
		} else {
			throw FinderFailedOnCompile(this._type, this._value)
		}
	}

}


//Finders
export function tokenWithValue(string, options = defaultOptions) {
	return new Finder('token', string, options)
}

export function literalWithValue(any, options = defaultOptions) {
	return new Finder('literal', any, options)
}

export function objectWithValue(obj, options = defaultOptions) {
	return new Finder('object-literal', obj, options)
}

export function arrayWithValue(arr, options = defaultOptions) {
	return new Finder('array-literal', arr, options)
}

