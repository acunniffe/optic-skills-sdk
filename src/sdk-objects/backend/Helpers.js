import exec from "sync-exec";

export function isInstalledOnPath(programName) {
	const result = exec(`which ${programName}`)
	const trimmedOut = result.stdout.trim()
	if (result.status === 0 && trimmedOut) {
		return trimmedOut
	}
}
