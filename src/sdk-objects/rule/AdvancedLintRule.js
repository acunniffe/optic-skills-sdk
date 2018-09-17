//stubbed out. not implemented on the backend yet

class AdvancedLintRule {
	constructor(lens, model, predicate, level, message) {

	}
}

class RuleSet {
	constructor() {
		this._rules = []
	}

	register(rule) {
		if (rule instanceof AdvancedLintRule) {
			this._rules.push(rule)
		}
	}

	warn(lens, model, predicate, message) {
		const rule =  new AdvancedLintRule(lens, model, predicate, 'warn', message)
		this.register(rule)
	}

	error(lens, model, predicate, message) {
		const rule =  new AdvancedLintRule(lens, model, predicate, 'error', message)
		this.register(rule)
	}
}

export const Rules = () => new RuleSet()
