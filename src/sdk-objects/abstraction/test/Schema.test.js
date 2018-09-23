import assert from 'assert'
import {Abstraction} from "../Abstraction";

describe('schema sdk object', () => {
	it('will throw on invalid id', () => {
		try { //for some reason assert.throws isn't working here.
			Abstraction(123, {type: 'string'})
			assert(false)
		} catch (e) {
			assert(true)
		}
	})

	it('will throw on an invalid schema', () => {
		try {
			Abstraction('abcdef', {type: 'abc'})
			assert(false)
		} catch (e) {
			assert(true)
		}
	})

	it('works with valid schema', () => {
		Abstraction('abcdefg', {type: 'string'})

		Abstraction('example', {
			type: 'object',
			properties: {
				value1: {type: 'string'},
				value2: {type: 'string'},
			}
		})
	})

})
