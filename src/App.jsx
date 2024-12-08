// App.jsx
import React from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { posts } from "./assets/posts";
import NewsletterSubscribe from "./NewsletterSubscribe";
import ReactMarkdown from "react-markdown";

const ContentBlock = ({ block }) => {
	if (block.type === "text") {
		return (
			<div className="mb-8 font-serif leading-relaxed">
				<ReactMarkdown
					components={{
						h1: ({ children }) => (
							<h1 className="text-3xl font-bold mb-4">{children}</h1>
						),
						h2: ({ children }) => (
							<h2 className="text-2xl font-bold mb-3">{children}</h2>
						),
						h3: ({ children }) => (
							<h3 className="text-xl font-bold mb-2">{children}</h3>
						),
						p: ({ children }) => <p className="mb-4">{children}</p>,
						a: ({ children, href }) => (
							<a
								href={href}
								className="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								{children}
							</a>
						),
						ul: ({ children }) => (
							<ul className="list-disc ml-6 mb-4">{children}</ul>
						),
						ol: ({ children }) => (
							<ol className="list-decimal ml-6 mb-4">{children}</ol>
						),
						li: ({ children }) => <li className="mb-1">{children}</li>,
						strong: ({ children }) => (
							<strong className="font-bold">{children}</strong>
						),
						em: ({ children }) => <em className="italic">{children}</em>,
						code: ({ children }) => (
							<code className="bg-gray-100 px-1 py-0.5 rounded">
								{children}
							</code>
						),
						blockquote: ({ children }) => (
							<blockquote className="border-l-4 border-gray-200 pl-4 italic">
								{children}
							</blockquote>
						),
					}}
				>
					{block.content}
				</ReactMarkdown>
			</div>
		);
	} else if (block.type === "image") {
		let maxWidth;
		switch (block.aspectRatio) {
			case "portrait":
				maxWidth = "max-w-md";
				break;
			case "square":
				maxWidth = "max-w-lg";
				break;
			default:
				maxWidth = "max-w-2xl";
		}

		return (
			<figure className={`my-8 mx-auto ${maxWidth}`}>
				<div className="relative w-full">
					<img
						src={block.src}
						alt={block.caption}
						className="w-full h-auto rounded-lg"
					/>
				</div>
				{block.caption && (
					<figcaption className="text-center text-sm text-gray-500 mt-2">
						{block.caption}
					</figcaption>
				)}
			</figure>
		);
	}
	return null;
};

const HomePage = () => {
	const navigate = useNavigate();
	console.log(posts);
	return (
		<div className="space-y-12">
			<NewsletterSubscribe />
			{posts.map((post) => (
				<div key={post.id} className="border-b border-gray-200 pb-8">
					{post.headerImage && (
						<div className="mb-4">
							<img
								src={post.headerImage}
								alt={post.title}
								className="w-full h-48 object-cover rounded-lg"
							/>
						</div>
					)}
					<h2 className="text-2xl font-serif mb-2">
						<Link to={`/post/${post.slug}`} className="hover:text-blue-600">
							{post.title}
						</Link>
					</h2>
					<time className="text-sm text-gray-500">
						{post.date.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					{post.abstract && (
						<p className="mt-4 text-gray-700">{post.abstract}</p>
					)}
				</div>
			))}
		</div>
	);
};

const BlogPost = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold mb-4">Post not found</h2>
				<p className="text-gray-600 mb-4">
					The post you're looking for doesn't exist.
				</p>
				<Link to="/" className="text-blue-600 hover:underline">
					Return to home page
				</Link>
			</div>
		);
	}

	return (
		<article className="prose prose-lg max-w-none">
			<header className="mb-8">
				<h1 className="text-3xl font-serif mb-2">{post.title}</h1>
				<time className="text-sm text-gray-500">
					{post.date.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</time>
			</header>

			{post.headerImage && (
				<figure className="my-8">
					<img
						src={post.headerImage}
						alt={post.title}
						className="max-w-2xl mx-auto w-[calc(100%-1rem)] rounded-lg"
					/>
					{post.imageCaption && (
						<figcaption className="text-center text-sm text-gray-500 mt-2">
							{post.imageCaption}
						</figcaption>
					)}
				</figure>
			)}

			{post.abstract && (
				<div className="bg-gray-50 p-4 mb-8 rounded">
					<h2 className="text-sm font-medium text-gray-900 mb-2">Abstract</h2>
					<p className="text-gray-700">{post.abstract}</p>
				</div>
			)}

			<div className="space-y-4">
				{post.content.map((block, idx) => (
					<ContentBlock key={idx} block={block} />
				))}
			</div>

			<div className="mt-16 border-t pt-8">
				<NewsletterSubscribe />
			</div>
		</article>
	);
};

const App = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="border-b border-gray-200 bg-white">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<Link
						to="/"
						className="text-xl font-serif text-gray-900 hover:text-gray-600"
					>
						Essays
					</Link>
				</div>
			</nav>

			<main className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-8">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/post/:slug" element={<BlogPost />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
