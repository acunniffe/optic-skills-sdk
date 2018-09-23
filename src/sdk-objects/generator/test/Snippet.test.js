import {processSnippet, js} from '../Snippet';
import assert from 'assert'

describe('snippet processor', ()=> {
	it('works for single line', ()=> {
		assert(processSnippet(['a', 'b', 'c']) === 'abc')
	})

	it('tag interface works', ()=> {

const input =
js`
import test from 'js'
`
		assert(input.snippet.language === 'es7')
	})

})
