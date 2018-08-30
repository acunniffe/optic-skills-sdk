import packageJson from '../package'
export function IncorrectArgumentType(value, expectedType, level = 'error') {
	return {
		level,
		type: 'IncorrectArgumentType',
		message: `Incorrect Argument Type. '${value.toString()}' should be a ${expectedType}`,
		isError: true
	}
}

export function FinderFailedOnCompile(type, value, level = 'error') {
	return {
		level,
		type: 'FinderFailedOnCompile',
		message: `Finder failed on compiler. A ${type} with value '${value.toString()}' was not found in the lens example`,
		isError: true
	}
}

export function InvalidFinder(key, expectedType, level = 'error') {
	return {
		level,
		type: 'InvalidFinder',
		message: `Finder ${key} should be ${expectedType}`,
		isError: true
	}
}

export function OpticNotInstalled() {
	return {
		level: 'error',
		type: 'OpticNotInstalled',
		message: `Optic installation not found`,
		isError: true
	}
}

export function OpticNotRunning() {
	return {
		level: 'error',
		type: 'OpticNotRunning',
		message: `Optic is not running. Run 'optic startserver'`,
		isError: true
	}
}

export function OpticVersionNotSupported(supported) {
	return {
		level: 'error',
		type: 'OpticVersionNotSupported',
		message: `This version of the SDK (${packageJson.version}) is not supported by your Optic backend (only supports ${supported}). Update the SDK or backend and try again.`,
		isError: true
	}
}

export function ContainerNotFoundInSnippet(name) {
	return {
		level: 'error',
		type: 'ContainerNotFoundInSnippet',
		message: `Container '${name} was not found in the snippet'`,
		isError: true
	}
}

export function InvalidLensDefinition(errors) {
	return {
		level: 'error',
		type: 'InvalidLensDefinition',
		message: `Invalid lens definition: ${errors}`,
		isError: true
	}
}

export function InvalidSchemaDefinition(errors) {
	return {
		level: 'error',
		type: 'InvalidSchemaDefinition',
		message: `Invalid schema definition: ${errors}`,
		isError: true
	}
}

