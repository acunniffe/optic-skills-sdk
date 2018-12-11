import assert from 'assert'
import {concatStrings} from "../ComputedField";
import {tokenWithValue} from "../Finders";
import {js} from "../Snippet";
import {SkillTestKit} from "../../..";
import {skillFixture} from "../../testkit/test/SkillTestKit.test";

describe('Computed Field constructors', () => {

	function valid() {
		const gen = js`req.query.name`
		gen.name('Example')
		gen.id('computed-example')

		gen.abstraction({
			computed: concatStrings(tokenWithValue('query'), tokenWithValue('name')),
		})

		return gen

	}

	it('work with list of finders', () => {
		const computedField = concatStrings(tokenWithValue('get'), tokenWithValue('from'))
		assert.deepEqual(JSON.parse(JSON.stringify(computedField)), {
				"fieldProcessor": "concat-strings",
				"subcomponents": [{
					"type": "token",
					"value": "get",
					"options": {"occurrence": 0, "rules": {}}
				}, {"type": "token", "value": "from", "options": {"occurrence": 0, "rules": {}}}],
				"enforceUniqueArguments": false
			}
		)
	})

	it('can resolve a generator with computed fields', () => {
		assert.deepEqual(JSON.parse(JSON.stringify(valid().resolve()._abstraction.computed)), {
			"fieldProcessor": "concat-strings",
			"subcomponents": [{
				"type": "token",
				"at": {"astType": "Identifier", "range": {"start": 4, "end": 9}}
			}, {"type": "token", "at": {"astType": "Identifier", "range": {"start": 10, "end": 14}}}],
			"enforceUniqueArguments": false
		})

	})

	const myskill = skillFixture()
	const testKit = SkillTestKit(myskill)

	it('can parse a code with a computed field', () => {
		const computedTestKit = testKit.testGenerator('computed-example')

		const result = computedTestKit.parse('req.abc.defg')

		assert.deepEqual(result.value, {computed: 'abcdefg', _variables: {}})
	})

	it('can parse a code with a complex computed field', () => {
		const computedTestKit = testKit.testGenerator('complex-computed-example')

		const result = computedTestKit.parse(`
		
		const example = req.abc.defg
		
		example.append('myString')
		
		`)
		assert.deepEqual(result.value, {complexcomputed: 'abcdefgmyString', _variables: {}})
	})

})
