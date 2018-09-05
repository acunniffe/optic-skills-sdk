import {validatePackageName} from "../../Regexes";
import {InvalidSchemaDefinition} from "../../Errors";
import Ajv from 'ajv'

const ajv = Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


class Schema {
	constructor(id, definition) {

		if (!validatePackageName(id)) {
			throw new InvalidSchemaDefinition(`'${id}' is not a valid schema id`)
		}

		if (!ajv.validateSchema(definition)) {
			throw new InvalidSchemaDefinition(ajv.errors)
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
}

function SchemaFactory(id, definition) {
	return new Schema(id, definition)
}

export default SchemaFactory

