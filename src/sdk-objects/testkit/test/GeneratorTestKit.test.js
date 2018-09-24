import assert from 'assert'
import {skillFixture} from "./SkillTestKit.test";
import {SkillTestKit} from "../SkillTestkit";


describe('lens test kit w/ package context', () => {
	const packageTestKit = SkillTestKit(skillFixture())
	const expressParameterTestKit = packageTestKit.testGenerator('express-parameter')

	it('can test generator', () => {
		const result = expressParameterTestKit.generate({in: 'query', name: 'abc'})
		assert(result.success)
		assert(result.code === 'req.query.abc')
	})

	it('can test parse', () => {
		const result = expressParameterTestKit.parse('req.query.abcdefg')
		assert(result.success)
		assert(result.value.in === 'query')
		assert(result.value.name === 'abcdefg')
	})

	it('can test mutate', () => {
		const result = expressParameterTestKit.mutate('req.query.abcdefg', {in: 'params', name: 'abc123'})
		assert(result.success)
		assert(result.code === 'req.params.abc123')
	})

})
