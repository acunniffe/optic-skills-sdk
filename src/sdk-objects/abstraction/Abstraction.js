import {validatePackageName} from "../../Regexes";
import {InvalidAbstractionDefinition} from "../../Errors";
import Ajv from 'ajv'

const ajv = Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


export class AbstractionBase {
	constructor(id, definition) {

		if (!validatePackageName(id)) {
			throw new InvalidAbstractionDefinition(`'${id}' is not a valid abstraction id`)
		}

		if (!ajv.validateSchema(definition)) {
			throw new InvalidAbstractionDefinition(ajv.errors)
		}

		this._id = id
		this._definition = definition
	}

	get definition() {
		return this._definition
	}

	get id() {
		return this._id
	}

	schemaDescription() {
		return {
			id: this._id,
			definition: this._definition
		}
	}
}

export function Abstraction(id, definition) {
	return new AbstractionBase(id, definition)
}
