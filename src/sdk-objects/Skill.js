class Skill {
	constructor(author, name, version, lenses = [], transformations = [], schemas = [], dependencies = {}) {
		this._author = author
		this._package = name
		this._version = version
		this._lenses = lenses
		this._transformations = transformations
		this._schemas = schemas
		this._dependencies = dependencies
	}

	async skillsDescription() {
		const lenses = await Promise.all(this._lenses.map(i => i.lensDescription()))
		return {
			info: {
				author: this._author,
				'package': this._package,
				version: this._version,
				dependencies: this._dependencies
			},
			lenses,
			schemas: this._schemas.map(i => i.schemaDescription()),
			transformations: this._schemas.map(i => i.transformationDescription())
		}
	}
}

function SkillsFactory(author, name, version, contents) {
	return new Skill(
		author,
		name,
		version,
		contents.lenses || [],
		contents.transformations || [],
		contents.schemas || [],
		contents.dependencies || {})
}

export default SkillsFactory
export const SkillsClass = Skill
