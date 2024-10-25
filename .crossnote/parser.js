({
	// Please visit the URL below for more information:
	// https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

	onWillParseMarkdown: async function(markdown) {
		const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
		const frontMatterMatch = markdown.match(frontMatterRegex);

		// Handle the title from the front matter.
		let title = '';
		if (frontMatterMatch) {
			const frontMatter = frontMatterMatch[1];
			const titleMatch = frontMatter.match(/title:\s*["']?(.+?)["']?$/m);
			if (titleMatch) {
				title = titleMatch[1].trim();
			}

			markdown = markdown.replace(frontMatterRegex, '');
		}

		if (title) {
			markdown = `# ${title}\n\n${markdown}`;
		}

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
