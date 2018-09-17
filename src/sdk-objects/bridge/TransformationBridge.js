import rp from 'request-promise'
import srequest from 'sync-request'
     //feels dirty but this is just for testing. there is no reason to subject test code to callback hell
import 'regenerator-runtime/runtime';
import {preCheck} from "./OpticBridge";

//Test runners
export function TestTransformation(packageJson, transformationId, input = {}, answers = {}) {
	preCheck()
	const response = srequest('POST', 'http://localhost:30333/sdk-bridge/transformation/test', {
		json: {
			packageJson,
			transformationId,
			input,
			answers
		}
	})

	return JSON.parse(response.getBody('utf8'))
}
