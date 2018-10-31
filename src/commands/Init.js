import pJson from '../../package'
import fs from 'fs'
export function initInDirectory(dir, author, name, version) {
	const srcPath = dir + '/src'
	fs.mkdirSync(dir + '/lib');
	fs.mkdirSync(srcPath);

	const files = defaultSkillFiles(author, name, version)

	fs.writeFileSync(srcPath+`/${name}.skill.js`, files.skill)
	fs.writeFileSync(srcPath+`/${name}.test.js`, files.test)
	fs.writeFileSync(dir+`/package.json`, files.packageJson)
	fs.writeFileSync(dir+`/.babelrc`, files.babel)

}

function defaultSkillFiles(author, name, version) {
const skill = `
import {Skill} from "optic-skills-sdk";

export default Skill('${author}', '${name}', '${version}', {
	abstractions: [],
	generators: [],
	relationships: []
})`.trim()

const test = `
import assert from 'assert'
import {SkillTestKit} from "optic-skills-sdk";
import ${name}Skill from './${name}.skill'
describe.only('${name} skill', () => {
	const ${name}SkillTestKit = SkillTestKit(${name}Skill)

})`.trim()


const packageJson = JSON.stringify({
	"name": `${author+'-'+name}`,
	"version": version,
	"description": "",
	"scripts": {
		"build": "rm -rf ./lib && babel src --out-dir lib",
		"test": "npm run build && find ./lib -name '*.test.js' | xargs mocha -R spec"
	},
	"license": "MIT",
	"devDependencies": {
		"@babel/cli": "^7.0.0-beta.49",
		"@babel/core": "^7.0.0-beta.49",
		"@babel/preset-env": "^7.0.0-beta.49",
		"mocha": "^3.4.2"
	},
	"dependencies": {
		"optic-skills-sdk": pJson.version
	}
}, null, 4)

const babel = `
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [

  ]
}
`.trim()

	return {
		packageJson,
		skill,
		test,
		babel
	}
}
