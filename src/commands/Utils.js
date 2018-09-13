import isJson from 'is-json'
import niceTry from 'nice-try'

export function isValidPackageJson(jsonString) {
	if (isJson(jsonString)) {
		const json = JSON.parse(jsonString)
		const skillsSDKInstalled = niceTry(() => json.dependencies['optic-skills-sdk'])
		return !!skillsSDKInstalled
	}
}
