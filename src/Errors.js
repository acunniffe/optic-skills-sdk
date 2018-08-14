export function IncorrectArgumentType(value, expectedType, level = 'warn') {
	return {
		level,
		type: 'IncorrectArgumentType',
		message: `Incorrect Argument Type. '${value.toString()}' should be a ${expectedType}`,
		isError: true
	}
}
