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
		message: `Finder failed in compiler. A ${type} with value '${JSON.stringify(value)}' was not found`,
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
		message: `Optic is not running. Run 'optic start'`,
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

export function InvalidGeneratorDefinition(errors) {
	return {
		level: 'error',
		type: 'InvalidGeneratorDefinition',
		message: `Invalid Generator definition: ${errors}`,
		isError: true
	}
}

export function InvalidAbstractionDefinition(errors) {
	return {
		level: 'error',
		type: 'InvalidAbstractionDefinition',
		message: `Invalid abstraction definition: ${errors}`,
		isError: true
	}
}

export function GeneratorNotFoundInPackage(id) {
	return {
		level: 'error',
		type: 'GeneratorNotFoundInPackage',
		message: `Generator '${id} not found in package`,
		isError: true
	}
}

export function AbstractionNotFoundInPackage(id) {
	return {
		level: 'error',
		type: 'AbstractionNotFoundInPackage',
		message: `Abstraction '${id} not found in package`,
		isError: true
	}
}

export function RelationshipNotFoundInPackage(id) {
	return {
		level: 'error',
		type: 'RelationshipNotFoundInPackage',
		message: `Relationship '${id} not found in package`,
		isError: true
	}
}


export function SkillNotFoundInProject(id) {
	return {
		level: 'error',
		type: 'SkillNotFoundInProject',
		message: `Skill '${id}' was not found in this project. Make sure it's exported from a file named '*.skill.js'`,
		isError: true
	}
}

