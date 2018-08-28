import exec from 'sync-exec'
import niceTry from 'nice-try'
import {isInstalledOnPath} from "./Helpers";


export const opticIsInstalled = isInstalledOnPath('optic')
export function opticServerIsRunning(versionVerify) {
	const result = exec('curl localhost:30333/build-version')
	return result.status === 0 && versionVerify === result.stdout.trim().replace('"', '')
}

