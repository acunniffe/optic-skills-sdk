import {PackageClass} from "../Package";

export function PackageTestKit(p) {
	if (!p instanceof PackageClass) {
		throw new Error('Package Test Kit must be initialized with an instance of Package')
	}

	const packageDescription = p.packageDescription()

	return {
		lenses: (() => {
			const pairs = packageDescription.lenses.map(i=> [i.id, new LensTestKit(i, packageDescription)])
			const lensesObj = {}
			pairs.forEach(pair => lensesObj[pair[0]] = pair[1])
			return lensesObj
		})()
	}

}
