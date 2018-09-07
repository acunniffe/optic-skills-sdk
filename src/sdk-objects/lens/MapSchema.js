import {Lens} from "./Lens";
import {Schema} from "../..";

class SchemaComponent {
	constructor(schemaOrLens, unique, toMap, inContainer) {
		this.schemaRef = (() => {
			if (schemaOrLens instanceof Lens) {
				schemaOrLens.schemaRef()
			} else if (schemaOrLens instanceof Schema) {
				schemaOrLens.id
			} else {
				schemaOrLens
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

export function map(schemaOrLens, inContainer) {
	return new SchemaComponent(schemaOrLens, false, undefined, inContainer)
}

export function mapUnique(schemaOrLens, inContainer) {
	return new SchemaComponent(schemaOrLens, true, undefined, inContainer)
}

export function mapToObject(schemaOrLens, field, inContainer) {
	return new SchemaComponent(schemaOrLens, true, field, inContainer)
}
