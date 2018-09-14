import assert from 'assert'
import {tokenWithValue} from "../../lens/Finders";
import {js} from "../../lens/Snippet";
import {SkillTestKit} from "../SkillTestKit";
import {Skill} from "../../../index";

export function skillFixture() {
	const lens = js`
req.query.name	
`
	lens.name = 'Parameter'
	lens.id = 'express-parameter'

	lens.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('name')
	}

	lens.variables = {
		req: 'self'
	}

	return Skill('aidan', 'test', '0.1.0', {
		lenses: [lens]
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
