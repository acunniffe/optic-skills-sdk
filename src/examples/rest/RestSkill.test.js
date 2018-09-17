import assert from 'assert'
import {SkillTestKit} from "../..";
import restSkill from './Rest.skill'
describe('rest skill', () => {
	const restSkillTestKit = SkillTestKit(restSkill)

	describe('header schema', () => {
		const headerTestKit = restSkillTestKit.testSchema('header')
		it('matches valid header model', () => {
			assert(headerTestKit.test({name: 'Content-Type'}).isMatch)
		})

		it('does not match invalid header model', () => {
			assert(!headerTestKit.test({}).isMatch)
		})
	})

	describe('parameters schema', () => {
		const parameterTestKit = restSkillTestKit.testSchema('parameter')

		it('matches valid parameter model', () => {
			assert(parameterTestKit.test({in: 'query', name: 'field'}).isMatch)
		})

		it('does not match invalid parameter model', () => {
			assert(!parameterTestKit.test({in: 'NOT_REAL', name: 'field'}).isMatch)
		})
	})


	describe('response schema', () => {
		const responseTestKit = restSkillTestKit.testSchema('response')

		it('matches valid response model', () => {
			assert(responseTestKit.test({code: 200}).isMatch)
		})

		it('does not match invalid response model', () => {
			assert(!responseTestKit.test({code: '200'}).isMatch)
		})
	})

	describe('route schema', () => {
		const routeTestKit = restSkillTestKit.testSchema('route')
		it('matches valid route model', () => {
			assert(routeTestKit.test({method: 'get', url: 'google.com', parameters: [
					{name: 'token', in: 'body'}
				]}).isMatch)
		})

		it('does not match invalid route model', () => {
			assert(!routeTestKit.test({code: '200'}).isMatch)
		})
	})

})
