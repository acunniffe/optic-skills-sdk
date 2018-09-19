import {addUser, getCredentials} from "./UserManagment";
import {hardcodedRegsitry, registryHost} from "./Config";
import request from "request";
import pJson from '../../../package'

export function publishPackage(contents, callback, registry = hardcodedRegsitry) {
	setupPublishRequest(contents, (pubReq)=> {

		if (pubReq) {
			const body = JSON.stringify(pubReq)

			request({url: `${registryHost}/packages/create`, method: 'POST', body}, (err, response, body) => {

				if (response.statusCode === 200) {
					console.log(`Package published as ${pubReq.namespace}:${pubReq.packageName}@${pubReq.version}`)
				} else {
					console.error('Package could not be published ' + JSON.parse(body).error)
				}

			})
		}

	}, registry)
}

export function setupPublishRequest(contents, callback, registry = hardcodedRegsitry) {

	const info = {
		author: contents.info.author,
		'package': contents.info.package,
		version: contents.info.version,
	}

	console.log(`Publishing ${info.author}:${info.package}@${info.version}`)
	getCredentials(registry).then((creds)=> {
		if (!creds) {
			console.error('No credentials saved. Run opticsdk adduser OR createuser')
			callback()
			return
		}

		const pubRequest = {
			namespace: info.author,
			packageName: info.package,
			version: info.version,
			email: creds.email,
			password: creds.password,
			mdVersion: pJson.version,
			contents

		}

		callback(pubRequest)

	})
}
