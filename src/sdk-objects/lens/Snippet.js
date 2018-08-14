export const js = (string) => new Snippet(processSnippet(string), 'es7')
export const scala = (string) => new Snippet(processSnippet(string), 'scala')
export const python3 = (string) => new Snippet(processSnippet(string), 'python3')


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
