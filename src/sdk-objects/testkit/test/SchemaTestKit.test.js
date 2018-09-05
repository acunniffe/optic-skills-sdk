import assert from 'assert'
import Schema from "../../schema/Schema";
import {SchemaTestKit} from "../SchemaTestKit";

describe('schema test kit', () => {

	const schema = new Schema('abc', {type: 'string'})
	const testKit = new SchemaTestKit(schema)

	it('matches valid data', () => {
		assert(testKit.matches('abc').isMatch)
	})


	it('does not match invalid data', () => {
		assert(!testKit.matches({}).isMatch)
	})

})
