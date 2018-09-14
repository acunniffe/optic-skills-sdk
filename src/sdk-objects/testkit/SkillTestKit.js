import {LensTestKit} from "./LensTestKit";
import {LensNotFoundInPackage, SchemaNotFoundInPackage, TransformationNotFoundInPackage} from "../../Errors";
import {SchemaTestKit} from "./SchemaTestKit";
import {TransformationTestKit} from "./TransformationTestKit";
import {Skill} from "../Skill";

export function SkillTestKit(p) {

	if (!p instanceof Skill) {
		throw new Error('Package Test Kit must be initialized with an instance of Package')
	}

	const packageDescription = p.skillsDescription()

	const skillConfiguration = {
		lenses: (() => {
			const pairs = packageDescription.lenses.map(i => [i.id, new LensTestKit(i, packageDescription)])
			const lensesObj = {}
			pairs.forEach(pair => lensesObj[pair[0]] = pair[1])
			return lensesObj
		})(),
		schemas: (() => {
			const pairs = packageDescription.schemas.map(i => [i.id, new SchemaTestKit(i, packageDescription)])
			const schemasObj = {}
			pairs.forEach(pair => schemasObj[pair[0]] = pair[1])
			return schemasObj
		})(),
		transformations: (() => {
			const pairs = packageDescription.transformations.map(i => [i.id, new TransformationTestKit(i, packageDescription)])
			const transformationsObj = {}
			pairs.forEach(pair => transformationsObj[pair[0]] = pair[1])
			return transformationsObj
		})()
	}

	return {
		skillConfiguration,
		testLens: (id) => {
			const lens = skillConfiguration.lenses[id]
			if (lens) {
				return lens
			} else {
				throw new LensNotFoundInPackage(id)
			}
		},
		testSchema: (id) => {
			const schema = skillConfiguration.schemas[id]
			if (schema) {
				return (schema)
			} else {
				throw new SchemaNotFoundInPackage(id)
			}
		},
		testTransformation: (id) => {
			const transformations = skillConfiguration.transformations[id]
			if (transformations) {
				return transformations
			} else {
				throw new TransformationNotFoundInPackage(id)
			}
		}
	}
}
