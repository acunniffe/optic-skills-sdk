import {GeneratorTestKit} from "./GeneratorTestKit";
import {GeneratorNotFoundInPackage, AbstractionNotFoundInPackage, RelationshipNotFoundInPackage} from "../../Errors";
import {AbstractionTestKit} from "./AbstractionTestKit";
import {TransformationTestKit} from "./TransformationTestKit";
import {Skill} from "../Skill";

export function SkillTestKit(p) {

	if (!p instanceof Skill) {
		throw new Error('Package Test Kit must be initialized with an instance of Package')
	}

	const packageDescription = p.skillsDescription()

	const skillConfiguration = {
		lenses: (() => {
			const pairs = packageDescription.lenses.map(i => [i.id, new GeneratorTestKit(i, packageDescription)])
			const lensesObj = {}
			pairs.forEach(pair => lensesObj[pair[0]] = pair[1])
			return lensesObj
		})(),
		schemas: (() => {
			const pairs = packageDescription.schemas.map(i => [i.id, new AbstractionTestKit(i, packageDescription)])
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
		testGenerator: (id) => {
			const lens = skillConfiguration.lenses[id]
			if (lens) {
				return lens
			} else {
				throw new GeneratorNotFoundInPackage(id)
			}
		},
		testAbstraction: (id) => {
			const schema = skillConfiguration.schemas[id]
			if (schema) {
				return (schema)
			} else {
				throw new AbstractionNotFoundInPackage(id)
			}
		},
		testRelationship: (id) => {
			const transformations = skillConfiguration.transformations[id]
			if (transformations) {
				return transformations
			} else {
				throw new RelationshipNotFoundInPackage(id)
			}
		}
	}
}
