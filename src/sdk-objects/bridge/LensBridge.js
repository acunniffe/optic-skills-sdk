import rp from 'request-promise'
import srequest from 'sync-request'
     //feels dirty but this is just for testing. there is no reason to subject test code to callback hell
import 'regenerator-runtime/runtime';
import {preCheck} from "./OpticBridge";

export async function TrainLens(languageName, snippet) {
	preCheck()
	return rp.post('http://localhost:30333/sdk-bridge/lens', {body: {languageName, snippet}, json: true})
}


//Test runners
export function GenerateTest(packageJson, lensId, inputObject) {
	preCheck()
	const response = srequest('POST', 'http://localhost:30333/sdk-bridge/lens/test/generate', {
		json: {
			packageJson,
			lensId,
			inputObject
		}
	})

	return JSON.parse(response.getBody('utf8'))
}

export function ParseTest(packageJson, lensId, input, language) {
	preCheck()
	const response = srequest('POST', 'http://localhost:30333/sdk-bridge/lens/test/parse', {
		json: {
			packageJson,
			lensId,
			input,
			language
		}
	})

	return JSON.parse(response.getBody('utf8'))
}

export function MutateTest(packageJson, lensId, input, language, newValue) {
	preCheck()
	const response = srequest('POST', 'http://localhost:30333/sdk-bridge/lens/test/mutate', {
		json: {
			packageJson,
			lensId,
			input,
			language,
			newValue
		}
	})

	return JSON.parse(response.getBody('utf8'))
}

