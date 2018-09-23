import Ajv from 'ajv'

const ajv = Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


export class AbstractionTestKit {

	constructor(abstraction) {
		this._abstraction = abstraction
	}

	test(data) {
		const validate = ajv.compile(this._abstraction.definition);
		if (validate(data)) {
			return {isMatch: true, errors: ajv.errors}
		} else {
			return {isMatch: false, errors: ajv.errors}
		}
	}

}
