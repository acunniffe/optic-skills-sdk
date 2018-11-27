import {tokenWithValue} from "./Finders";

const optionsSchema = {
	type: 'object',
	properties: {
		abstraction: {type: 'string'},
		operation: {type: 'object', properties: {
			type: {type: 'string', enum: ['SetValue', 'AppendItems', 'PrependItems']},
			unique: {type: 'boolean'}
		}},
	}
}

const defaultOptions = {required: 'set'}

//Options
export class Assignment {
	constructor(tokenAt, keyPath, options = defaultOptions) {
		this.tokenAt = tokenAt
		this.keyPath = keyPath
		if (options.abstraction) {this.abstraction = options.abstraction}
		if (options.operation) {this.operation = options.operation}
	}
}

export function assignFrom(tokenAt, keyPath, options) {
	return new Assignment(tokenWithValue(tokenAt), keyPath, options)
}


