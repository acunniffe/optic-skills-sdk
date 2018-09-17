import safeEval from 'safe-eval'

export function testTransformation(transformation) {
	return {
		'with': (input = {}, answers = {}) => {
			const withCall = `(${transformation._script.toString()})(input, answers)`

			try {
				const output = safeEval(withCall, {input, answers, ...helpers()})
				return {success: true, output}
			} catch (e) {
				return {success: false, error: 'Error evaluating code'+ e}
			}
		}
	}
}


const helpers = () => {

	function Generate(schema, value, options) {
		return {
			schema: schema,
			value: value,
			options: options,
			_isStagedNode: true
		}
	}

	function Mutate(modelId, value, options) {
		return {
			modelId: modelId,
			value: value,
			options: options,
			_isStagedMutation: true
		}
	}

//Builtins

	function Raw(rawText) {
		return {
			schema: 'optic:builtins/raw',
			value: {
				rawText: rawText
			},
			options: {},
			_isStagedNode: true
		}
	}


//Model Setters
	function Code(value) {
		return {
			_valueFormat: 'code',
			value: value
		}
	}

	function Token(value) {
		return {
			_valueFormat: 'token',
			value: value
		}
	}

//Container Mutation Enums
	function Append(items) {
		return {
			items: items,
			type: 'append'
		}
	}

	function Prepend(items) {
		return {
			items: items,
			type: 'prepend'
		}
	}

	function ReplaceWith(items) {
		return {
			items: items,
			type: 'replace-with'
		}
	}

	function InsertAt(index, items) {
		return {
			index: index,
			items: items,
			type: 'insert-at'
		}
	}

	function Empty() {
		return {
			type: 'empty'
		}
	}

	return {Generate, Mutate, Raw, Code, Token, Append, Prepend, ReplaceWith, InsertAt, Empty}
}
