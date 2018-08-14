export const packageExportName = /^[a-zA-Z][a-zA-Z0-9-]*/

export const idRegex = /^[a-z][a-z0-9-]{0,34}$/
export function validatePackageName(string) {
	return idRegex.test(string)
}

export function validatePackageExportName(name) {
	return packageExportName.test(name)
}
