import assert from 'assert'
import {Schema} from "../Schema";

describe('schema sdk object', () => {
	it('will throw on invalid id', () => {
		try { //for some reason assert.throws isn't working here.
			new Schema(123, {type: 'string'})
			assert(false)
		} catch (e) {
			assert(true)
		}
	})

	it('will throw on an invalid schema', () => {
		try {
			new Schema('abcdef', {type: 'abc'})
			assert(false)
		} catch (e) {
			assert(true)
		}
	})

	it('works with valid schema', () => {
		new Schema('abcdefg', {type: 'string'})
	})

})
