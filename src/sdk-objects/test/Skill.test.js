import assert from 'assert'
import {js} from "../lens/Snippet";
import {tokenWithValue} from "../lens/Finders";
import Skill from "../Skill";

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

describe('skill declaration', (done) => {

	it('will process async', (done) => {
		const testSkill = Skill('test', 'test', '0.1.0', {
			lenses: [validLensFixture()]
		})
		const d = testSkill.skillsDescription()
		d.then(i=> {
			console.log(i)
			done()
		})
	})

})
