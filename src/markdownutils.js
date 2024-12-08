const createSlug = (title) => {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
		.replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
		.trim();
};

export const createPostFromMarkdown = (markdownText, id) => {
	const sections = markdownText.split("---\n");
	let frontmatter = {};
	let content = markdownText;

	if (sections.length > 1) {
		const frontmatterLines = sections[1].split("\n");
		frontmatterLines.forEach((line) => {
			const [key, ...valueParts] = line.split(":");
			if (key && valueParts.length) {
				const value = valueParts.join(":").trim();
				frontmatter[key.trim()] = value.replace(/^["'](.*)["']$/, "$1");
			}
		});
		content = sections.slice(2).join("---\n").trim();
	}

	const blocks = [];
	const contentSections = content.split("\n\n");

	contentSections.forEach((section) => {
		if (section.startsWith("![")) {
			const matches = section.match(/!\[(.*?)\]\((.*?)\)(\{(.*?)\})?/);
			if (matches) {
				blocks.push({
					type: "image",
					src: matches[2],
					caption: matches[1],
					aspectRatio: matches[4] || "landscape",
				});
			}
		} else {
			blocks.push({
				type: "text",
				content: section,
			});
		}
	});

	// Create the post object with a slug
	const post = {
		id: id,
		title: frontmatter.title || "Untitled Post",
		date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
		abstract: frontmatter.abstract || "",
		headerImage: frontmatter.headerImage || null,
		imageCaption: frontmatter.imageCaption || null,
		content: blocks,
	};

	// Add the slug based on the title
	post.slug = createSlug(post.title);

	return post;
};
