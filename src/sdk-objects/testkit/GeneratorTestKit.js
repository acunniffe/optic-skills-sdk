import {GenerateTest, MutateTest, ParseTest} from "../bridge/GeneratorTrainingBridge";

export class GeneratorTestKit {

	constructor(generator, packageDescription) {
		this._generator = generator
		this._packageDescription = packageDescription
	}

	generate(inputObject) {
		return GenerateTest(this._packageDescription, this._generator.id, inputObject)
	}

	parse(input) {
		return ParseTest(this._packageDescription, this._generator.id, input, this._generator.snippet.language)
	}

	mutate(input, newValue) {
		return MutateTest(this._packageDescription, this._generator.id, input, this._generator.snippet.language, newValue)
	}

}
