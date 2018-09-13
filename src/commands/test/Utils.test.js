import assert from 'assert'
import {isValidPackageJson} from "../Utils";

describe.only('cli utils', () => {
	it('can identify a valid package json', () => {
		const json = JSON.stringify({
			"scripts": {
				"build": "rm -rf ./lib && babel src --out-dir lib",
				"test": "npm run build && find ./lib -name '*.test.js' | xargs mocha -R spec",
				"publishlocal": "node -e 'require(\"optic-skills-sdk/lib/commands/Publish.js\").publishLocal(\"rest\", \"./lib/\")'"
			},
			"license": "MIT",
			"dependencies": {
				"optic-skills-sdk": "0.0.1"
			}
		})


		assert(isValidPackageJson(json))
	})
});
