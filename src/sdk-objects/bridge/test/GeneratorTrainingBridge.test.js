import assert from 'assert'
import {TrainGenerator} from "../GeneratorTrainingBridge";
import equals from 'deep-equal'
import {js} from "../../generator/Snippet";
import {tokenWithValue} from "../../generator/Finders";

function validLensFixture() {
	const gen = js`
req.query.name	
`
	gen.name = 'Parameter'
	gen.id = 'express-parameter'

	gen.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('name')
	}

	return gen;
}

function invalidLensFixture() {
	const gen = js`
req.query.name	
`

	gen.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('fake')
	}

	return gen;
}


describe('generator training bridge', () => {
	it('can process a lens', () => {
		const response = TrainGenerator('es7', 'const name = require("path")')
		assert(response.success)
		assert(equals(response, {
			"success": true,
			"trainingResults": {
				"candidates": [{
					"value": "name",
					"previewString": "...const <b>name</b> = require...",
					"stagedComponent": {
						"propertyPath": [],
						"component": {
							"type": "token",
							"at": {"astType": "Identifier", "range": {"start": 6, "end": 10}}
						}
					},
					"schemaField": {"type": "string"}
				}, {
					"value": "require",
					"previewString": "...st name = <b>require</b>(&quot;path&quot;)...",
					"stagedComponent": {
						"propertyPath": [],
						"component": {
							"type": "token",
							"at": {"astType": "Identifier", "range": {"start": 13, "end": 20}}
						}
					},
					"schemaField": {"type": "string"}
				}, {
					"value": "path",
					"previewString": "...= require(<b>&quot;path&quot;</b>)...",
					"stagedComponent": {
						"propertyPath": [],
						"component": {
							"type": "literal",
							"at": {"astType": "Literal", "range": {"start": 21, "end": 27}}
						}
					},
					"schemaField": {"type": "string"}
				}],
				"containerCandidates": [],
				"variableCandidates": [{
					"name": "require",
					"occurrences": [{"start": 13, "end": 20}]
				}, {"name": "name", "occurrences": [{"start": 6, "end": 10}]}]
			}
		}))
	})

	it('can process the finders in a lens', () => {
		const lens = validLensFixture().resolve()
		assert(equals(lens.value, {
			"in": {
				"type": "token",
				"at": {"astType": "Identifier", "range": {"start": 4, "end": 9}}
			},
			"name": {"type": "token", "at": {"astType": "Identifier", "range": {"start": 10, "end": 14}}}
		}))
	})

	it('will throw if finder is invalid', () => {
		try {
			invalidLensFixture().resolve()
			assert(false)
		} catch(e) {
			assert(e.type === 'FinderFailedOnCompile')
		}
	})

	it('can generate a valid description', () => {
		const a = validLensFixture().generatorDescription()
	})

})
