import assert from 'assert'
import {isInstalledOnPath} from "../Helpers";
import {opticServerIsRunning} from "../OpticBridge";

describe.only('optic bridge', ()=> {
	describe('pre-flight assertions', ()=> {
		it('can find cli if installed', ()=> {
			assert(isInstalledOnPath('ls') === '/bin/ls') //use something we know exists
		})

		it('will return falsey if no cli found', ()=> {
			assert(!isInstalledOnPath('abcdefg'))
		})

		it('knows if an optic server is not running', ()=> {
			assert(!opticServerIsRunning())
		})
	})
})