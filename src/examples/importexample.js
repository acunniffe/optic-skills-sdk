import {js} from '../sdk-objects/lens/Snippet'
import {literalWithValue, tokenWithValue} from "../sdk-objects/lens/Finders";

const lens = js`
req.query.name	
`

lens.name = 'Parameter'
lens.id = 'express-parameter'

lens.schema = {
	type: "object",
	required: ["in", "name"],
	properties: {
		in: {
			type: "string",
			enum: ["query", "body", "params", "header"]
		},
		name: {
			type: "string"
		}
	}
}

//Value
lens.value.in = tokenWithValue('query')
lens.value.name = tokenWithValue('name')


export {lens as parameterLens}
