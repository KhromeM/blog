import { PostPreview } from "../components/PostPreview";
import { posts } from "../assets/posts";
import { NewsletterSubscribe } from "../components/NewsletterSubscribe";

export const HomePage = () => {
	return (
		<div className="space-y-12">
			<NewsletterSubscribe />
			{posts.map((post) => (
				<PostPreview key={post.id} post={post} />
			))}
		</div>
	);
};
