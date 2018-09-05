import {TestTransformation} from "../bridge/TransformationBridge";

export class TransformationTestKit {

	constructor(transformation, packageDescription) {
		this._transformation = transformation
		this._packageDescription = packageDescription
	}

	stageTransformation(input, answers) {
		return TestTransformation(this._packageDescription, this._transformation.id, input, answers)
	}

}
