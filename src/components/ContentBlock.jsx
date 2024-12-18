import ReactMarkdown from "react-markdown";
import { DuotoneImage } from "./DuotoneImage";

export const ContentBlock = ({ block }) => {
	const MarkdownComponents = {
		h1: ({ children }) => (
			<h1 className="content-title mb-6 mt-12 first:mt-0 tracking-tight">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-2xl content-title mb-4 mt-8 tracking-tight">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-xl content-title mb-4 mt-6 tracking-tight">
				{children}
			</h3>
		),
		p: ({ children }) => (
			<p className="content-body mb-4 leading-relaxed">{children}</p>
		),
		a: ({ children, href }) => (
			<a
				href={href}
				className="content-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		),
		ul: ({ children }) => (
			<ul className="list-disc ml-6 mb-4 content-body space-y-1">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal ml-6 mb-4 content-body space-y-1">
				{children}
			</ol>
		),
		li: ({ children }) => <li className="leading-relaxed">{children}</li>,
		strong: ({ children }) => (
			<strong className="blog-content-strong">{children}</strong>
		),
		em: ({ children }) => <em className="blog-content-em">{children}</em>,
		code: ({ children }) => (
			<code className="blog-content-code px-1.5 py-0.5 rounded font-mono text-sm">
				{children}
			</code>
		),
		blockquote: ({ children }) => (
			<blockquote className="blog-content-blockquote pl-4 py-1 my-4 italic">
				{children}
			</blockquote>
		),
	};

	if (block.type === "text") {
		return (
			<div className="leading-relaxed blog-content">
				<ReactMarkdown components={MarkdownComponents}>
					{block.content}
				</ReactMarkdown>
			</div>
		);
	}

	if (block.type === "image") {
		return (
			<figure className="my-8 max-w-4xl mx-auto">
				<DuotoneImage src={block.src} alt={block.caption} className="w-full" />
				{block.caption && (
					<figcaption className="content-meta mt-2 text-sm italic text-center">
						{block.caption}
					</figcaption>
				)}
			</figure>
		);
	}

	return null;
};
