import {SkillsClass} from "../Skill";
import {LensTestKit} from "./LensTestKit";
import {LensNotFoundInPackage} from "../../Errors";

export function SkillTestKit(p) {

	const buildPromise = (async () => {
		if (!p instanceof SkillsClass) {
			throw new Error('Package Test Kit must be initialized with an instance of Package')
		}

		const packageDescription = await p.skillsDescription()

		return {
			lenses: (() => {
				const pairs = packageDescription.lenses.map(i => [i.id, new LensTestKit(i, packageDescription)])
				const lensesObj = {}
				pairs.forEach(pair => lensesObj[pair[0]] = pair[1])
				return lensesObj
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
		}
	}

}
