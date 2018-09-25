import {Generator} from "./Generator";
import {Abstraction} from "../..";

class AbstractionComponent {
	constructor(schemaOrLens, unique, toMap, inContainer) {
		this.schemaRef = (() => {
			if (schemaOrLens instanceof Generator) {
				return schemaOrLens.abstractionSchemaRef()
			} else if (schemaOrLens instanceof Abstraction) {
				return schemaOrLens.id
			} else {
				return schemaOrLens
			}
		})()

		this.unique = unique

		if (toMap) {
			this.toMap = toMap
		}

		if (inContainer) {
			this.inContainer = inContainer
		}
	}
}

export function collect(schemaOrLens, inContainer) {
	return new AbstractionComponent(schemaOrLens, false, undefined, inContainer)
}

export function collectUnique(schemaOrLens, inContainer) {
	return new AbstractionComponent(schemaOrLens, true, undefined, inContainer)
}

export function mapToObject(schemaOrLens, field, inContainer) {
	return new AbstractionComponent(schemaOrLens, true, field, inContainer)
}
