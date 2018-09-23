import assert from 'assert'
import {tokenWithValue} from "../../generator/Finders";
import {js} from "../../generator/Snippet";
import {SkillTestKit} from "../SkillTestKit";
import {Skill} from "../../../index";

export function skillFixture() {
	const gen = js`
req.query.name	
`
	gen.name = 'Parameter'
	gen.id = 'express-parameter'

	gen.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('name')
	}

	gen.variables = {
		req: 'self'
	}

	return Skill('aidan', 'test', '0.1.0', {
		generators: [gen]
	})
}

describe('skill test kit', () => {
	it('will return a lens test kit if lens exists', ()=> {
		const myskill = skillFixture()

		const testKit = SkillTestKit(myskill)

		testKit.testLens('express-parameter')

	})

	it('will return error if lens does not exist', ()=> {
		const mySkill = skillFixture()

		const testKit = SkillTestKit(mySkill)

		assert.throws(() => testKit.testLens('not-real'))
	})

});
