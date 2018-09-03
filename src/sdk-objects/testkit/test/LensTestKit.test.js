import assert from 'assert'
import {skillFixture} from "./SkillTestKit.test";
import {SkillTestKit} from "../SkillTestkit";


describe('lens test kit w/ package context', () => {
	const packageTestKit = SkillTestKit(skillFixture())

	it('can test generator', (done) => {
		packageTestKit.testLens('express-parameter', (lensTestKit) => {
			const result = lensTestKit.generate({in: 'query', name: 'abc'})
			assert(result.success)
			assert(result.code === 'req.query.abc')
			done()
		})
	})

	it('can test parse', (done) => {
		packageTestKit.testLens('express-parameter', (lensTestKit) => {
			const result = lensTestKit.parse('req.query.abcdefg')
			assert(result.success)
			assert(result.result.in === 'query')
			assert(result.result.name === 'abcdefg')
			done()
		})
	})

	it('can test mutate', (done) => {
		packageTestKit.testLens('express-parameter', (lensTestKit) => {
			const result = lensTestKit.mutate('req.query.abcdefg', {in: 'params', name: 'abc123'})
			assert(result.success)
			assert(result.code === 'req.params.abc123')
			done()
		})
	})

})
