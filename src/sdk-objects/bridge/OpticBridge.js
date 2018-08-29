import exec from 'sync-exec'
import niceTry from 'nice-try'
import {isInstalledOnPath} from "./Helpers";
import packageJson from '../../../package'
import {OpticNotRunning, OpticNotInstalled, OpticVersionNotSupported} from "../../Errors";

export const opticIsInstalled = isInstalledOnPath('optic')
export function opticServerIsRunning(versionVerify) {
	const result = exec(`curl localhost:30333/sdk-version?v=${versionVerify}`)

	return {
		isRunning: result.status === 0,
		support: niceTry(()=> JSON.parse(result.stdout))
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
