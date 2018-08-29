import {PackageClass} from "../Package";

export function PackageTestKit(p) {
	if (!p instanceof PackageClass) {
		throw new Error('Package Test Kit must be initialized with an instance of Package')
	}

	const packageDescription = p.packageDescription()

	return {
		lenses: packageDescription.lenses.map(i=> new LensTestKit(i, packageDescription))
	}

}
