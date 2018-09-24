import assert from 'assert'
import {Abstraction} from "../../abstraction/Abstraction";
import {AbstractionTestKit} from "../AbstractionTestKit";

describe('schema test kit', () => {

	const schema = Abstraction('abc', {type: 'string'})
	const testKit = new AbstractionTestKit(schema)

	it('test valid data', () => {
		assert(testKit.test('abc').isMatch)
	})


	it('does not match invalid data', () => {
		assert(!testKit.test({}).isMatch)
	})

})
