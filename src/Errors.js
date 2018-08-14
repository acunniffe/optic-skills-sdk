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
