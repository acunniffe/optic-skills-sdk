import assert from 'assert'
import {findSkill, findSkills, publishLocal} from "../Publish";
import equals from 'deep-equal'

describe('publish', () => {
	const testDir = './lib/commands/test/test-skills-directory'

	describe('finding skills ', () => {
		it('will only find .skill.js files', () => {
			const found = findSkills(testDir)
			assert(equals(Object.keys(found), ['aidan:test2', 'aidan:test3', 'aidan:test4']))
		})

		it('will fail to find skills that do not exist', () => {
			assert.throws(() => findSkill('fake:not-real', testDir))
		})
	})

	it('publishes locally', (done) => {
		publishLocal('aidan:test2', testDir).then(() => {
			done()
		})
	})

})
