import equals from 'deep-equal'
import {FinderFailedOnCompile} from "../../Errors";

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

function finderFactory(type, value, options) {
	//@todo validate options here
	return (candidates) => {
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
	return finderFactory('token', string, options)
}

export function literalWithValue(any, options = defaultOptions) {
	return finderFactory('literal', any, options)
}

export function objectWithValue(obj, options = defaultOptions) {
	return finderFactory('object-literal', obj, options)
}

export function arrayWithValue(arr, options = defaultOptions) {
	return finderFactory('array-literal', arr, options)
}
