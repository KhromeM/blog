import React, { useState } from "react";
import { posts } from "./assets/posts";

const ContentBlock = ({ block }) => {
	if (block.type === "text") {
		return <p className="mb-8 font-serif leading-relaxed">{block.content}</p>;
	} else if (block.type === "image") {
		let maxWidth;
		switch (block.aspectRatio) {
			case "portrait":
				maxWidth = "max-w-md"; // narrower for portrait
				break;
			case "square":
				maxWidth = "max-w-lg"; // medium for square
				break;
			default:
				maxWidth = "max-w-2xl"; // wider for landscape
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

const Blog = () => {
	const [currentView, setCurrentView] = useState("home");
	const [selectedPostId, setSelectedPostId] = useState(null);

	const viewPost = (postId) => {
		setSelectedPostId(postId);
		setCurrentView("post");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<nav className="border-b border-gray-200 bg-white">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<button
						onClick={() => setCurrentView("home")}
						className="text-xl font-serif text-gray-900 hover:text-gray-600"
					>
						Essays
					</button>
				</div>
			</nav>

			{/* Main Content */}
			<main className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-8">
				{currentView === "home" && (
					<div className="space-y-12">
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
									<button
										onClick={() => viewPost(post.id)}
										className="hover:text-blue-600 text-left"
									>
										{post.title}
									</button>
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
				)}

				{currentView === "post" && (
					<article className="prose prose-lg max-w-none">
						{(() => {
							const post = posts.find((p) => p.id === selectedPostId);
							return (
								<>
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
											<h2 className="text-sm font-medium text-gray-900 mb-2">
												Abstract
											</h2>
											<p className="text-gray-700">{post.abstract}</p>
										</div>
									)}

									<div className="space-y-4">
										{post.content.map((block, idx) => (
											<ContentBlock key={idx} block={block} />
										))}
									</div>
								</>
							);
						})()}
					</article>
				)}
			</main>
		</div>
	);
};

export default Blog;
