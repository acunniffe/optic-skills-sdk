import {js} from '../sdk-objects/lens/Snippet'
import {literalWithValue, tokenWithValue, collect} from '../sdk-objects/lens/Finders';
import {parametersLens, headerLens, responseLens} from './express-internal-lenses'

const lens = js`
app.get('url', (req, res) => {
	//:handler
})	
`

lens.name = 'Route'
lens.id = 'express-route'
lens.schema = 'optic:rest/endpoint'

lens.value.method = tokenWithValue('get')
lens.value.url = literalWithValue('url')
lens.value.parameters = collect(parametersLens)
lens.value.headers = collect(headerLens)
lens.value.responses = collect(responseLens)

export {lens as expressLens}

