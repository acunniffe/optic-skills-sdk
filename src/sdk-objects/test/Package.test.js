import assert from 'assert'
import {js} from "../lens/Snippet";
import {tokenWithValue} from "../lens/Finders";
import Package from "../Package";

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

describe('package declaration', (done) => {

	it.only('will process async', (done) => {
		const testPackage = Package('test', 'test', '0.1.0', {
			lenses: [validLensFixture()]
		})
		const d = testPackage.packageDescription()
		d.then(i=> {
			console.log(i)
			done()
		})
	})

})
