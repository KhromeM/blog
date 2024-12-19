import { Link } from "react-router-dom";
import { DuotoneImage } from "./DuotoneImage";

export const PostPreview = ({ post }) => {
	return (
		<article className="group">
			<Link
				to={`/post/${post.slug}`}
				className="block post-preview rounded-lg transition-colors hover:bg-gray-50 dark:hover:--color-base-background"
			>
				<div className="flex items-start gap-6">
					<div className="flex-1 min-w-0">
						<div className="space-y-1">
							<h2 className="text-base md:text-xl post-title transition-colors">
								{post.title}
							</h2>

							<time className="text-sm post-meta  block">
								{post.date.toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>

							{post.abstract && (
								<p className="post-meta text-sm leading-relaxed line-clamp-2 hidden md:block">
									{post.abstract}
								</p>
							)}
						</div>
					</div>

					{post.headerImage && (
						<div className="flex-none relative w-32 aspect-[4/3] overflow-hidden rounded-lg hidden md:block">
							<DuotoneImage src={post.headerImage} alt={post.title} />
						</div>
					)}
				</div>
			</Link>
		</article>
	);
};
