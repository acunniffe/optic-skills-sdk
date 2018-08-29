import rp from 'request-promise'
import 'regenerator-runtime/runtime';
import {preCheck} from "./OpticBridge";

export async function TrainLens(languageName, snippet) {
	preCheck()
	return rp.post('http://localhost:30333/sdk-bridge/lens', {body: {languageName, snippet}, json: true})
}
