import assert from 'assert'
import {TrainLens} from "../LensBridge";
import equals from 'deep-equal'
import {js} from "../../lens/Snippet";
import {tokenWithValue} from "../../lens/Finders";

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

function invalidLensFixture() {
	const lens = js`
req.query.name	
`

	lens.value = {
		in: tokenWithValue('query'),
		name: tokenWithValue('fake')
	}

	return lens;
}


describe('lens bridge', () => {
	it('can process a lens', (done) => {
		const request = TrainLens('es7', 'const name = require("path")')
		request.then(response => {
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
			done()
		})
	})

	it('can process the finders in a lens', (done) => {
		const a = validLensFixture().resolve()
		a.catch(i => console.error(i))
		a.then(i => {
			assert(equals(i.value, {
				"in": {
					"type": "token",
					"at": {"astType": "Identifier", "range": {"start": 4, "end": 9}}
				},
				"name": {"type": "token", "at": {"astType": "Identifier", "range": {"start": 10, "end": 14}}}
			}))
			done()
		})
	})

	it('will throw if finder is invalid', (done) => {
		invalidLensFixture().resolve().catch(e=> {
			assert(e.type === 'FinderFailedOnCompile')
			done()
		})
	})

	it('can generate a valid description', (done) => {
		const a = validLensFixture().lensDescription()
		a.catch(i => console.error(i))
		a.then(i => {
			done()
		})
	})

})
