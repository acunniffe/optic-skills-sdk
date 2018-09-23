import assert from 'assert'
import {MutationRelationship, Relationship, RelationshipsBase} from "../Relationships";
import {Ask} from "../AskConfig";

describe('transformation sdk objects', () => {

	describe('validates inputs', () => {

		it('will throw on invalid yields', () => {
			assert.throws(() => {
				new RelationshipsBase(123, 'abc', 'abc:abc', 'abc:def', () => {
				})
			})
		})

		it('will throw on invalid id', () => {
			assert.throws(() => {
				new RelationshipsBase('abcdef', 123, 'abc:abc', 'abc:def', () => {
				})
			})
		})

		it('will throw on invalid input', () => {
			assert.throws(() => {
				new RelationshipsBase('abc', 'abc', 123, 'abc:def', () => {
				})
			})
		})

		it('will throw on invalid output', () => {
			assert.throws(() => {
				new RelationshipsBase('abc', 'abc', 'abc:abc', 123, () => {
				})
			})
		})

		it('will throw on invalid func', () => {
			assert.throws(() => {
				new RelationshipsBase('abc', 'abc', 'abc:abc', 'def:def', '() => {}')
			})
		})

	})

	it('basic transformation can be configured using helper function', () => {
		const transformation = Relationship('transformed', 'example-transform', 'hello:abc', 'hello:def', (input, answers) => {
			return {other: true}
		})

		const desc = transformation.relationshipsDescription()
		assert.deepStrictEqual(desc,
			{
				"yields": "transformed",
				"id": "example-transform",
				"input": "hello:abc",
				"script": "function (input, answers) {\n      return {\n        other: true\n      };\n    }",
				"output": "hello:def",
				"ask": {},
				"dynamicAsk": {}
			})

	})

	it('mutation transformation can be configured using helper function', () => {
		const transformation = MutationRelationship('transformed', 'example-transform', 'hello:abc', (input, answers) => {
			return {other: true}
		})

		const desc = transformation.relationshipsDescription()
		assert.deepStrictEqual(desc,
			{
				yields: 'transformed',
				id: 'example-transform',
				input: 'hello:abc',
				"ask": {},
				"dynamicAsk": {},
				script: 'function (input, answers) {\n      return {\n        other: true\n      };\n    }'
			})

	})

	it('adding an AskConfig', () => {
		const ask = Ask()
		ask.forPrimitive('test', 'used for testing', 'string')

		const transformation = Relationship('transformed', 'example-transform', 'hello:abc', 'hello:def', (input, answers) => {
			return {other: true}
		})

		transformation.withAsk(ask)

		const desc = transformation.relationshipsDescription()

		assert.deepStrictEqual(desc, {
				"yields": "transformed",
				"id": "example-transform",
				"input": "hello:abc",
				"script": "function (input, answers) {\n      return {\n        other: true\n      };\n    }",
				"output": "hello:def",
				"ask": {
					"type": "object",
					"properties": {"test": {"description": "used for testing", "type": "string"}},
					"_order": ["test"],
					"required": ["test"]
				},
				"dynamicAsk": {}
			}
		)

	})

})
