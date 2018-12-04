import assert from 'assert'
import {literalWithValue, tokenWithValue} from "../../generator/Finders";
import {js} from "../../generator/Snippet";
import {SkillTestKit} from "../SkillTestKit";
import {assignFrom, Skill} from "../../../index";
import {concatStrings} from "../../generator/ComputedField";

export function skillFixture() {
	const gen = js`
req.query.name	
`
		.name('Parameter')
		.id('express-parameter')
		.abstraction({
			in: tokenWithValue('query'),
			name: tokenWithValue('name')
		})
		.variables({
			req: 'self'
		})


	const computed = js`req.query.name`
	computed.name('Example')
	computed.id('computed-example')

	computed.abstraction({
		computed: concatStrings(tokenWithValue('query'), tokenWithValue('name')),
	})

	const complexComputed = js`hello.append('string')`
	complexComputed.name('Example')
	complexComputed.id('complex-computed-example')

	complexComputed.abstraction({
		complexcomputed: concatStrings(
			assignFrom('hello', 'computed'),
			literalWithValue('string')
		),
	})


	return Skill('aidan', 'test', '0.1.0', {
		generators: [gen, computed, complexComputed]
	})
}

describe('skill test kit', () => {
	it('will return a lens test kit if lens exists', () => {
		const myskill = skillFixture()

		const testKit = SkillTestKit(myskill)

		testKit.testGenerator('express-parameter')

	})

	it('will return error if lens does not exist', () => {
		const mySkill = skillFixture()

		const testKit = SkillTestKit(mySkill)

		assert.throws(() => testKit.testGenerator('not-real'))
	})

});
