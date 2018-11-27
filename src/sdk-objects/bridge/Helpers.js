import process from 'child_process'
import niceTry from 'nice-try'

export function isInstalledOnPath(programName) {
	const result = niceTry(() => process.execSync(`which ${programName}`))

	if (result) {
		const trimmedOut = result.toString().trim()
		if (result && trimmedOut) {
			return trimmedOut
		}
	}
}
