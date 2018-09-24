import {idRegex, validatePackageName} from "../../Regexes";
import {IncorrectArgumentType} from "../../Errors";
import {AskConfig} from "./AskConfig";

export class RelationshipsBase {
	constructor(yields, id, input, output, script) {

		if (typeof yields !== 'string') {
			throw new IncorrectArgumentType(yields, 'string')
		}

		if (!(typeof id === 'string' && validatePackageName(id))) {
			throw new IncorrectArgumentType(id, 'string matching '+ idRegex)
		}

		if (typeof input !== 'string') {
			throw new IncorrectArgumentType(input, 'string')
		}

		if (output && typeof output !== 'string') {
			throw new IncorrectArgumentType(output, 'string')
		}

		if (typeof script !== 'function') {
			throw new IncorrectArgumentType(script, 'function')
		}

		this._yields = yields
		this._id = id
		this._input = input
		this._output = output
		this._script = script
	}

	withAsk(ask) {
		if (ask instanceof AskConfig) {
			this._ask = ask
		} else {
			throw new IncorrectArgumentType(ask, 'AskConfig')
		}
	}

	relationshipsDescription() {
		const obj = {
			yields: this._yields,
			id: this._id,
			input: this._input,
			script: this._script.toString(),
		}

		if (this._output) {
			obj.output = this._output
		}

		if (this._ask) {
			obj.ask = this._ask.toJsonSchema()
			obj.dynamicAsk = this._ask.collectDynamicAsk()
		} else {
			obj.ask = {}
			obj.dynamicAsk = {}
		}

		return obj
	}
}

export function Relationship(yields, id, input, output, func) {
	return new RelationshipsBase(yields, id, input, output, func)
}

export function MutationRelationship(yields, id, input, func) {
	return new RelationshipsBase(yields, id, input, undefined, func)
}

export function MultiRelationship(yields, id, input, func) {
	return new RelationshipsBase(yields, id, input, undefined, func)
}
