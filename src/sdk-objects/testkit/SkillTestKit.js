import {LensTestKit} from "./LensTestKit";
import {LensNotFoundInPackage, SchemaNotFoundInPackage, TransformationNotFoundInPackage} from "../../Errors";
import {SchemaTestKit} from "./SchemaTestKit";
import {TransformationTestKit} from "./TransformationTestKit";
import {Skill} from "../Skill";

export function SkillTestKit(p) {

	const buildPromise = (async () => {
		if (!p instanceof Skill) {
			throw new Error('Package Test Kit must be initialized with an instance of Package')
		}

		const packageDescription = await p.skillsDescription()

		return {
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
	})()

	buildPromise.catch((error) => {
		throw error
	})

	return {
		_buildPromise: buildPromise,
		testLens: (id, callback) => {
			buildPromise.then((testObject) => {
				const lens = testObject.lenses[id]
				if (lens) {
					callback(lens)
				} else {
					callback(null, new LensNotFoundInPackage(id))
				}
			})
		},
		testSchema: (id, callback) => {
			buildPromise.then((testObject) => {
				const schema = testObject.schemas[id]
				if (schema) {
					callback(schema)
				} else {
					callback(null, new SchemaNotFoundInPackage(id))
				}
			})
		},
		testTransformation: (id, callback) => {
			buildPromise.then((testObject) => {
				const transformations = testObject.transformations[id]
				if (transformations) {
					callback(transformations)
				} else {
					callback(null, new TransformationNotFoundInPackage(id))
				}
			})
		}
	}
}
