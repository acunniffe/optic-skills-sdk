export const platform = (() => {
	if (process.platform === 'darwin') {
		return 'mac'
	} else if (process.platform === 'win32') {
		return 'windows'
	}
})()

export function packagePath () {
	const homeDir = require('os').homedir()
	switch (platform) {
		case 'mac':
			return homeDir + '/Library/Application Support/Optic/packages/'
		default:
			throw new Error('Unsupported platform')
	}
}
