import Ajv from 'ajv'

const ajv = Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


export class SchemaTestKit {

	constructor(schema) {
		this._schema = schema
	}

	matches(data) {
		const validate = ajv.compile(this._schema.definition);
		if (validate(data)) {
			return {isMatch: true, errors: ajv.errors}
		} else {
			return {isMatch: false, errors: ajv.errors}
		}
	}

}
