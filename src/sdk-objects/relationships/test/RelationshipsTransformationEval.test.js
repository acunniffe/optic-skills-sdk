import assert from 'assert'
import {testTransformation} from "../RelationshipsTransformationEval";
import {Relationship} from "../Relationships";

describe('transformation eval', () => {

	it('can run a valid transformation', () => {

		const result = testTransformation(Relationship(
			'test',
			'test-id',
			'input:input',
			'output:output',
			(input, answers) => {
				return {l: true}
			}
		)).with({abc: 'def'})

		assert.deepEqual(result, {success: true, output: {l: true}})

	})

	it('can use the helpers', () => {

		const result = testTransformation(Relationship(
			'test',
			'test-id',
			'input:input',
			'output:output',
			(input, answers) => {
				return Generate('abc:def', {l: true})
			}
		)).with({abc: 'def'})

		assert.deepEqual(result, {
			success: true, output:
				{
					schema: 'abc:def',
					value: {l: true},
					options: undefined,
					_isStagedNode: true
				}
		})

	})

	it('will return an error if failed', () => {

		const result = testTransformation(Relationship(
			'test',
			'test-id',
			'input:input',
			'output:output',
			(input, answers) => {
				throw new Error('broke it')
				return {l: true}
			}
		)).with({abc: 'def'})

		assert.deepEqual(result, {
			success: false,
			error: 'Error evaluating codeError: broke it'
		})

	})

})
