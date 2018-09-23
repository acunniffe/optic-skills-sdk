import {Generator} from "./Generator";

export const js = (string) => toLens(new Snippet(processSnippet(string), 'es7'))
export const scala = (string) => toLens(new Snippet(processSnippet(string), 'scala'))
export const python3 = (string) => toLens(new Snippet(processSnippet(string), 'python3'))

function toLens(snippet) {
	const lens = new Generator()
	lens.snippet = snippet
	return lens
}

//helpers
export function processSnippet(strings) {
	const joined = strings.join('')
	return joined.trim()
}

export class Snippet {
	constructor(block, language) {
		this.block = block
		this.language = language
	}
}
