import assert from 'assert'
import {isInstalledOnPath} from "../Helpers";
import {opticServerIsRunning, preCheck} from "../OpticBridge";

describe('optic bridge', ()=> {
	describe('pre-flight assertions', ()=> {
		it('can find cli if installed', ()=> {
			assert(isInstalledOnPath('ls') === '/bin/ls') //use something we know exists
		})

		it('will return falsey if no cli found', ()=> {
			assert(!isInstalledOnPath('abcdefg'))
		})
		//
		// it.only('can run precheck', ()=> {
		// 	preCheck()
		// })
	})
})
