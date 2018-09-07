import assert from 'assert'
import {SkillTestKit} from "../..";
import restSkill from './Rest.skill'
describe('rest skill', () => {
	const restSkillTestKit = SkillTestKit(restSkill)

	describe('header schema', () => {
		it('matches valid header model', (done) => {
			restSkillTestKit.testSchema('header', (headerSchema) => {
				assert(headerSchema.test({name: 'Content-Type'}).isMatch)
				done()
			})
		})

		it('does not match invalid header model', (done) => {
			restSkillTestKit.testSchema('header', (headerSchema) => {
				assert(!headerSchema.test({}).isMatch)
				done()
			})
		})
	})

	describe('parameters schema', () => {
		it('matches valid parameter model', (done) => {
			restSkillTestKit.testSchema('parameter', (parameterSchema) => {
				assert(parameterSchema.test({in: 'query', name: 'field'}).isMatch)
				done()
			})
		})

		it('does not match invalid parameter model', (done) => {
			restSkillTestKit.testSchema('parameter', (parameterSchema) => {
				assert(!parameterSchema.test({in: 'NOT_REAL', name: 'field'}).isMatch)
				done()
			})
		})
	})

	describe('parameters schema', () => {
		it('matches valid parameter model', (done) => {
			restSkillTestKit.testSchema('parameter', (parameterSchema) => {
				assert(parameterSchema.test({in: 'query', name: 'field'}).isMatch)
				done()
			})
		})

		it('does not match invalid parameter model', (done) => {
			restSkillTestKit.testSchema('parameter', (parameterSchema) => {
				assert(!parameterSchema.test({in: 'NOT_REAL', name: 'field'}).isMatch)
				done()
			})
		})
	})

	describe('response schema', () => {
		it('matches valid response model', (done) => {
			restSkillTestKit.testSchema('response', (parameterSchema) => {
				assert(parameterSchema.test({code: 200}).isMatch)
				done()
			})
		})

		it('does not match invalid response model', (done) => {
			restSkillTestKit.testSchema('response', (parameterSchema) => {
				assert(!parameterSchema.test({code: '200'}).isMatch)
				done()
			})
		})
	})

	describe('route schema', () => {
		it('matches valid route model', (done) => {
			restSkillTestKit.testSchema('route', (parameterSchema) => {
				assert(parameterSchema.test({method: 'get', url: 'google.com', parameters: [
						{name: 'token', in: 'body'}
					]}).isMatch)
				done()
			})
		})

		it('does not match invalid route model', (done) => {
			restSkillTestKit.testSchema('route', (parameterSchema) => {
				assert(!parameterSchema.test({code: '200'}).isMatch)
				done()
			})
		})
	})

})
