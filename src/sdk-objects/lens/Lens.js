import Ajv from 'ajv'
const ajv = new Ajv();
import {ContainerNotFoundInSnippet, IncorrectArgumentType, InvalidLensDefinition} from "../../Errors";
import {idRegex, validatePackageName} from "../../Regexes";
import {Snippet} from "./Snippet";
import {TrainLens} from "../bridge/LensBridge";
import {SchemaBase} from "../schema/Schema";
import {Finder} from "./Finders";

const lensJSONValidation = {
	"type": "object",
	"required": [
		"id",
		"snippet",
		"schema",
	],
	"properties": {
		"name": {
			"type": "string"
		},
		"id": {
			"type": "string"
		},
		"value": {
			"type": "object"
		},
		"snippet": {
			"type": "object",
			"required": [
				"block",
				"language"
			],
			"properties": {
				"block": {
					"type": "string"
				},
				"language": {
					"type": "string"
				}
			}
		},
		"variables": {
			"type": "object",
			"additionalProperties": {
				"type": "string",
				"enum": [
					"self",
					"scope"
				]
			}
		},
		"containers": {
			"type": "object",
			"additionalProperties": {
				"type": "string",
				"enum": [
					"any",
					"exact",
					"same-plus",
					"same-any-order",
					"same-any-order-plus"
				]
			}
		},
		"schema": {
			"anyOf": [
				{
					"type": "string"
				},
				{
					"type": "object"
				}
			]
		},
		"priority": {
			"type": "number"
		},
		"initialValue": {
			"type": "object"
		}
	}
}

export class Lens {
	constructor() {
		this._name;
		this._id;
		this._snippet;
		this._value = {}
		this._variables = {};
		this._containers = {};
		this._schema;
		this._initialValue = {};
		this._priority = 1;
		this._internal = false;
	}

	//name
	get name() {
		return this._name
	}
	set name(name) {
		if (typeof name === 'string') {
			this._name = name
		} else {
			throw new IncorrectArgumentType(name, 'string')
		}
	}

	//id
	get id() {
		return this._id
	}
	set id(id) {
		if (typeof id === 'string' && validatePackageName(id)) {
			this._id = id
		} else {
			throw new IncorrectArgumentType(id, 'string matching '+ idRegex)
		}
	}

	//snippet
	get snippet() {
		return this._snippet
	}
	set snippet(snippet) {
		if (typeof snippet === 'object' && snippet instanceof Snippet) {
			this._snippet = snippet
		} else {
			throw new IncorrectArgumentType(snippet, 'Snippet')
		}
	}

	//value
	get value() {
		return new Proxy(this._value, {
			set: (target, key, value, rec) => {
				if (typeof value === 'object') {  //@todo validate structure of values
					target[key] = value
					return true
				} else {
					throw new IncorrectArgumentType(value, 'ValueComponent')
				}
			}
		})
	}
	set value(value) {
		if (typeof value === 'object') {
			this._value = value
		} else {
			throw new IncorrectArgumentType(value, `value format`)
		}
	}

	//variables
	get variables() {
		return new Proxy(this._variables, {
			set: (target, key, value, rec) => {
				if (lensJSONValidation.properties.variables.additionalProperties.enum.includes(value)) {  //@todo validate structure of values
					target[key] = value
					return true
				} else {
					throw new IncorrectArgumentType(value, `one of `+lensJSONValidation.properties.variables.additionalProperties.enum)
				}
			}
		})
	}
	set variables(value) {
		if (typeof value === 'object') {
			this._variables = value
		} else {
			throw new IncorrectArgumentType(value, `variables format`)
		}
	}

	//containers
	get containers() {
		return new Proxy(this._containers, {
			set: (target, key, value, rec) => {
				if (lensJSONValidation.properties.containers.additionalProperties.enum.includes(value)) {  //@todo validate structure of values
					target[key] = value
					return true
				} else {
					throw new IncorrectArgumentType(value, `one of `+ lensJSONValidation.properties.containers.additionalProperties.enum)
				}
			}
		})
	}
	set containers(value) {
		if (typeof value === 'object') {
			this._value = value
		} else {
			throw new IncorrectArgumentType(value, `containers format`)
		}
	}

	//schema
	get schema() {
		return this._schema
	}

	schemaRef() {
		if (typeof this._schema === 'string') {
			return this._schema
		} else {
			this._id
		}
	}

	set schema(schema) {
		if (schema instanceof SchemaBase) {
			this._schema = schema
		} else if (typeof schema === 'string') { //@todo and is valid ref
			this._schema = schema
		} else {
			throw new IncorrectArgumentType(schema, `'Schema' or 'string' referencing schema ie author:name/schema-id`)
		}
	}

	//initial value
	get initialValue() {
		return this._initialValue
	}
	set initialValue(initialValue) {
		if (typeof initialValue === 'object') {
			this._initialValue = initialValue
		} else {
			throw new IncorrectArgumentType(initialValue, 'object')
		}
	}

	//priority
	get priority() {
		return this._priority
	}
	set priority(priority) {
		if (typeof priority === 'number') {
			this._priority = priority
		} else {
			throw new IncorrectArgumentType(priority, 'number')
		}
	}

	//internal
	get internal() {
		return this._internal
	}
	set internal(internal) {
		if (typeof internal === 'boolean') {
			this._internal = internal
		} else {
			throw new IncorrectArgumentType(internal, 'boolean')
		}
	}

	//processing code
	async resolve() {
		const trainingResponse = await TrainLens(this.snippet.language, this.snippet.block)

		const schemaFields = {}

		//handle value assignment only when finder involved
		const finderValues = Object.entries(this._value).filter(i=> i[1] instanceof Finder)
		finderValues.forEach(fPair => {
			const key = fPair[0]
			const finder = fPair[1]
			const finderResult = finder.evaluate(trainingResponse.trainingResults.candidates)
			schemaFields[key] = {...finderResult.schemaField, ...finder.options.rules}
			this.value[key] = finderResult.stagedComponent.component
		})

		//build the schema
		if (!this._schema) {
			this._schema = new SchemaBase(
				null,
				{
					title: this._name,
					type: 'object',
					required: Object.entries(this._value).map(i=> i[0]),
					properties: schemaFields
				}
			)
		}

		return this
	}

	async lensDescription() {
		const lensFinal = await this.resolve()
		const description = {
			name: this._name,
			id: this._id,
			snippet: this._snippet,
			value: this._value,
			variables: this._variables,
			containers: this._containers,
			schema: this._schema,
			initialValue: this._initialValue,
			priority: this._priority,
			internal: this._internal
		}
		const isValid = ajv.validate(lensJSONValidation, description)
		if (!isValid) {
			throw new InvalidLensDefinition(ajv.errors.map(i=> i.message).join(', '))
		}

		return description
	}

}
