import { useParams } from "react-router-dom";
import { ContentBlock } from "../components/ContentBlock";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";
import { posts } from "../assets/posts";
import { DuotoneImage } from "../components/DuotoneImage";

export const BlogPost = () => {
	const { slug } = useParams();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="py-12 text-center">
				<h2 className="text-2xl content-title mb-4">Post not found</h2>
				<Link to="/" className="content-link">
					Return home
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-4xl lg:max-w-7xl mx-auto">
			<article className="text-left">
				<h1 className="content-title mb-2 font-medium tracking-tight">
					{post.title}
				</h1>

				<time className="text-sm content-meta block mb-8">
					{post.date.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</time>

				{post.headerImage && (
					<figure className="my-8 max-w-4xl mx-auto">
						<DuotoneImage
							src={post.headerImage}
							alt={post.title}
							className="w-full"
						/>

						{post.imageCaption && (
							<figcaption className="content-meta mt-2 text-sm italic text-center ">
								{post.imageCaption}
							</figcaption>
						)}
					</figure>
				)}

				{post.abstract && (
					<div className="my-8 p-6 blog-abstract mx-auto">
						<h2 className="content-title text-sm  mb-2">Abstract</h2>
						<p className="content-body">{post.abstract}</p>
					</div>
				)}

				<div className="mt-12">
					{post.content.map((block, idx) => (
						<ContentBlock key={idx} block={block} />
					))}
				</div>

				<div className="mt-16 mx-auto">
					<NewsletterSubscribe />
				</div>
			</article>
		</div>
	);
};
