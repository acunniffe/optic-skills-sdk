import {Skill} from "../../index";
import {headerSchema, parametersSchema, responsesSchema, routeSchema} from "./RestSchemas";

export default Skill('optic', 'express-js', '0.4.0', {
	dependencies: {
		'optic:rest': '0.3.0'
	}
})
