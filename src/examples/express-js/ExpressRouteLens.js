import {js, literalWithValue, mapUnique, tokenWithValue} from '../../index'

//Parameters Lens
const parametersLens = js`
req.query.paramName
`
parametersLens.id = 'express-parameter'
parametersLens.schema = 'optic:rest/parameters'
parametersLens.value = {
	in: tokenWithValue('query'),
	name: tokenWithValue('paramName')
}
parametersLens.variables = {
	req: 'scope'
}


//Route Lens
const routeLens = js`
app.get('url', (req, res) => {
	//:handler
})
`
routeLens.id = 'express-route'
routeLens.schema = 'optic:rest/route'
routeLens.value = {
	method: tokenWithValue('get'),
	url: literalWithValue('url'),
	parameters: mapUnique(parametersLens)
}

routeLens.variables = {
	req: 'self',
	res: 'self',
}


