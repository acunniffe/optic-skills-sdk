import niceTry from 'nice-try'
import {isInstalledOnPath} from "./Helpers";
import packageJson from '../../../package'
import process from 'child_process'
import {OpticNotRunning, OpticNotInstalled, OpticVersionNotSupported} from "../../Errors";
import srequest from 'sync-request'

export const opticIsInstalled = isInstalledOnPath('optic')
export function opticServerIsRunning(versionVerify) {

	const response = srequest('GET', 'http://localhost:30333/sdk-version', {
		qs: {'v': versionVerify}
	})

	return {
		isRunning: !response.isError(),
		support: niceTry(()=> JSON.parse(response.getBody('utf8')))
	}
}

export function preCheck() {
	if (!opticIsInstalled) {
		throw new OpticNotInstalled()
	}

	const runningStatus = opticServerIsRunning(packageJson.version)

	if (!runningStatus.isRunning) {
		throw new OpticNotRunning()
	}

	if (!runningStatus.support.isSupported) {
		throw new OpticVersionNotSupported(runningStatus.support.supportedSdks)
	}
}
