import glob from 'glob'
import path from 'path'
import {SkillNotFoundInProject} from "../Errors";
import mkdirp from 'mkdirp'
import {packagePath} from "./Constants";
import fs from 'fs'
import {Skill} from "../sdk-objects/Skill";

export function publishRemote(skill, cwd = process.cwd()) {

}

export function publishLocal(skill, cwd = process.cwd()) {

	const skillPromise = prePublish(skill, cwd);

	return skillPromise.then((result) => {
		const packageDirPath = packagePath()+`${result.info.author}/${result.info.package}/`
		const withVersionPath = packageDirPath + (result.info.version)
		return new Promise((resolve, reject) => {
			mkdirp(packageDirPath, function (err) {
				fs.writeFile(withVersionPath, JSON.stringify(result), function(err) {
					if(err) {
						reject(err)
					}
					console.log(`Published locally to ${withVersionPath}`)
					resolve()
				});
			});
		})

	}, (e) => {
		console.error('Could not compile skill: '+ e.message)
	})
}

function prePublish(skill, cwd = process.cwd()) {
	const skillObj = (()=> {
		if (skill) {
			return findSkill(skill, cwd)
		} else {
			const allSkills = findSkills(cwd)
			if (allSkills.length === 1) {
				return Object.entries(allSkills)[0]
			} else {
				throw SkillNotFoundInProject('default')
			}
		}
	})()

	console.log(`Compiling skill: ${skillObj.identifierWithVersion()}`)

	return skillObj.skillsDescription()
}


//finding skills in a project
export function findSkill(skillId, cwd = process.cwd()) {
	const validSkills = findSkills(cwd)
	console.log(validSkills)
	if (!validSkills.hasOwnProperty(skillId)) {
		throw SkillNotFoundInProject(skillId)
	}

	return validSkills[skillId]
}

export function findSkills(cwd = process.cwd()) {
	const validSkills = {}
	glob.sync('./**/*.skill.js', {cwd}).forEach((file) => {
		try {
			const m = require(path.resolve(cwd + '/' +file))

			if (m.default instanceof Skill) {
				validSkills[m.default.identifier()] = m.default
			} else {
				Object.entries(m).forEach((pair) => {
					if (pair[1] instanceof Skill) {
						validSkills[pair[1].identifier()] = pair[1]
					}
				})
			}

		} catch (e) {
			console.error(e)
		}
	});

	return validSkills
}
