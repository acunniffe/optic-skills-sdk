class Package {
	constructor(author, name, version, lenses = [], transformations = [], schemas = [], dependencies = []) {
		this._author = author
		this._package = name
		this._version = version
		this._lenses = lenses
		this._transformations = transformations
		this._schemas = schemas
		this._dependencies = dependencies
	}

	async packageDescription() {
		const lenses = await Promise.all(this._lenses.map(i=> i.lensDescription()))
		return {
			author: this._author,
			'package': this._package,
			version: this._version,
			lenses,
			schemas: this._schemas.map(i=> i.schemaDescription()),
			transformations: this._schemas.map(i=> i.transformationDescription()),
			dependencies: this._dependencies
		}
	}
}

function PackageFactory(author, name, version, contents) {
	return new Package(
		author,
		name,
		version,
		contents.lenses || [],
		contents.transformations || [],
		contents.schemas || [],
		contents.dependencies || [])
}

export default PackageFactory
export const PackageClass = Package
