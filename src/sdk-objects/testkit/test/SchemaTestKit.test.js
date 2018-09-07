import assert from 'assert'
import {Schema} from "../../schema/Schema";
import {SchemaTestKit} from "../SchemaTestKit";

describe('schema test kit', () => {

	const schema = Schema('abc', {type: 'string'})
	const testKit = new SchemaTestKit(schema)

	it('test valid data', () => {
		assert(testKit.test('abc').isMatch)
	})


	it('does not match invalid data', () => {
		assert(!testKit.test({}).isMatch)
	})

})
