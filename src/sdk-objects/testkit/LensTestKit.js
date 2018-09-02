import {GenerateTest, MutateTest, ParseTest} from "../bridge/LensBridge";

export class LensTestKit {

	constructor(lens, packageDescription) {
		this._lens = lens
		this._packageDescription = packageDescription
	}

	generate(inputObject) {
		return GenerateTest(this._packageDescription, this._lens.id, inputObject)
	}

	parse(input) {
		return ParseTest(this._packageDescription, this._lens.id, input, this._lens.snippet.language)
	}

	mutate(input, newValue) {
		return MutateTest(this._packageDescription, this._lens.id, input, this._lens.snippet.language, newValue)
	}

}
