import assert from 'assert'
import {js} from "../generator/Snippet";
import {tokenWithValue} from "../generator/Finders";
import {Skill} from "../../index";

function validLensFixture() {
	const lens = js`
req.query.name	
`
	lens.name = 'Parameter'
	lens.id = 'express-parameter'

	lens.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('name')
	}

	return lens;
}

describe('skill declaration', () => {

	it('will process async', () => {
		const testSkill = Skill('test', 'test', '0.1.0', {
			lenses: [validLensFixture()]
		})
		const d = testSkill.skillsDescription()
	})

})
