import assert from 'assert'
import {Lens} from '../Lens'
import {IncorrectArgumentType} from "../../../Errors";
import {Snippet} from "../Snippet";
import {Schema} from "../../schema/Schema";

describe.only('lens sdk-object', ()=> {
	const lens = new Lens()

	function testSetter(key, value) {
		lens[key] = value
		assert(lens[key] === value)
	}

	function testSetterWithInvalidInput(key, value) {
		try {
			lens[key] = value
		} catch (err) {
			return err
		}
	}

	describe('name', () => {
		it('can set', ()=> {
			testSetter('name', 'helloWorld')
		})

		it('will throw on invalid type', ()=> {
			const err = testSetterWithInvalidInput('name', 45)
			assert(err.type === 'IncorrectArgumentType')
		})
	})

	describe('id', () => {
		it('can set', ()=> {
			testSetter('id', 'hello-world')
		})

		it('will throw on invalid type', ()=> {
			const err = testSetterWithInvalidInput('id', 45)
			assert(err.type === 'IncorrectArgumentType')
		})

		it('will throw on invalid regex', ()=> {
			const err = testSetterWithInvalidInput('id', 'hello _ world')
			assert(err.type === 'IncorrectArgumentType')
		})
	})

	describe('snippet', () => {
		it('can set', ()=> {
			testSetter('snippet', new Snippet('block', 'es7'))
		})

		it('will throw on invalid object', ()=> {
			const err = testSetterWithInvalidInput('snippet', {})
			assert(err.type === 'IncorrectArgumentType')
		})

		it('will throw on invalid primitive', ()=> {
			const err = testSetterWithInvalidInput('snippet', 'hey')
			assert(err.type === 'IncorrectArgumentType')
		})

	})

		describe('value', () => {
			it('can set via proxy', () => {
				lens.value.key = {}
				assert(lens.value.hasOwnProperty('key'))
			})

			it('will throw on invalid assignment', ()=> {
				try {
					lens.value.key = 45
					assert(false)
				} catch (err) {
					assert(true)
				}
			})

		})

	describe('variables', () => {
		it('can set via proxy', () => {
			lens.variables.variable1 = 'self'
			assert(lens.variables.hasOwnProperty('variable1'))
		})

		it('will throw on invalid assignment', ()=> {
			try {
				lens.variables.key = 45
				assert(false)
			} catch (err) {
				assert(true)
			}
		})

	})

	describe('schema', () => {
		it('can set schema', ()=> {
			testSetter('schema', new Schema())
		})

		it('can set reference', ()=> {
			testSetter('schema', 'one:two/schema')
		})

		it('will throw on invalid input', ()=> {
			const err = testSetterWithInvalidInput('snippet', 43)
			assert(err.type === 'IncorrectArgumentType')
		})

	})


	describe('initial value', () => {
		it('can set', ()=> {
			testSetter('initialValue', {one: 'two'})
		})

		it('will throw on invalid input', ()=> {
			const err = testSetterWithInvalidInput('initialValue', 'hey')
			assert(err.type === 'IncorrectArgumentType')
		})

	})


	describe('priority', () => {
		it('can set', ()=> {
			testSetter('priority', 5)
		})

		it('will throw on invalid input', ()=> {
			const err = testSetterWithInvalidInput('priority', 'hey')
			assert(err.type === 'IncorrectArgumentType')
		})

	})

	describe('internal', () => {
		it('can set', ()=> {
			testSetter('internal', true)
		})

		it('will throw on invalid input', ()=> {
			const err = testSetterWithInvalidInput('internal', 5)
			assert(err.type === 'IncorrectArgumentType')
		})

	})

})
