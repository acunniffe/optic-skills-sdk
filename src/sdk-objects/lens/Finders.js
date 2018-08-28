import equals from 'deep-equal'
import {FinderFailedOnCompile, InvalidFinder} from "../../Errors";

//Options
const optionsSchema = {
	type: 'object',
	properties: {
		occurrence: {type: 'number'}
	}
}

const defaultOptions = {
	occurrence: 0
}

const allowedTypes = ['token', 'literal', 'object-literal', 'array-literal']


class Finder {
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

	evaluate(candidates) {
		const found = candidates.filter(i=> {
			i.type === type && equals(i.value === value)
		})[options.occurrence]
		if (found) {
			return found
		} else {
			throw FinderFailedOnCompile(type, value)
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
