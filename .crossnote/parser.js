({
	// Please visit the URL below for more information:
	// https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

	onWillParseMarkdown: async function(markdown) {
		// Replace Hugo ref shortcodes with a placeholder URL format
		markdown = markdown.replace(/{{<\s*ref\s*"([^"]+)"\s*>}}/g, (match, p1) => {
				return `[Link](${p1})`;
		});

		// Replace Hugo figure shortcodes with an HTML img element and adjust the src path
		markdown = markdown.replace(/{{<\s*figure\s*src="([^"]+)"\s*>}}/g, (match, src) => {
				const adjustedSrc = `../../static${src}`;
				return `<img src="${adjustedSrc}" alt="Figure" style="max-width: 100%; height: auto;">`;
		});

		return markdown;
},

	onDidParseMarkdown: async function(html) {
		return html;
	},
})
