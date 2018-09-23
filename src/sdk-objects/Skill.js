import 'regenerator-runtime/runtime';
export class Skill {
	constructor(author, name, version, generators = [], relationships = [], abstractions = [], dependencies = {}) {
		this._author = author
		this._package = name
		this._version = version
		this._generators = generators.reduce((a, current) => {
			if (current.subgenerators.length) {
				const generators = a.concat(current.subgenerators)
				generators.push(current)
				return generators
			} else {
				a.push(current)
				return a
			}
		}, [])
		this._relationships = relationships
		this._abstractions = abstractions
		this._dependencies = dependencies
	}

	identifier() {
		return `${this._author}:${this._package}`
	}

	identifierWithVersion() {
		return `${this._author}:${this._package}@${this._version}`
	}

	skillsDescription() {
		const generators = this._generators.map(l => {
			try {
				return l.generatorDescription()
			} catch (e) {
				throw new Error(`Lens '${l.id}' did not compile: ${e.message}`)
			}
		})
		return { //going to continue using old names for a few more versions
			info: {
				author: this._author,
				'package': this._package,
				version: this._version,
				dependencies: this._dependencies
			},
			lenses: generators,
			schemas: this._abstractions.map(i => i.schemaDescription()),
			transformations: this._relationships.map(i => i.relationshipsDescription())
		}
	}
}

export function SkillsFactory(author, name, version, contents) {
	return new Skill(
		author,
		name,
		version,
		contents.generators || [],
		contents.relationships || [],
		contents.abstractions || [],
		contents.dependencies || {})
}
