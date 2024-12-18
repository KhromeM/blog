import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
	return (
		<div className="min-h-screen">
			<nav className="fancy-border">
				<div className="max-w-4xl lg:max-w-7xl mx-auto py-4">
					<div className="flex justify-center">
						<Link to="/" className="text-2xl nav-link">
							<h1 className="text-5xl">Essays</h1>
						</Link>
					</div>
				</div>
			</nav>

			<main className="w-full max-w-4xl lg:max-w-7xl mx-auto py-8">
				{children}
			</main>
			{/* <footer className="footer py-12 mt-24">
				<div className="max-w-4xl lg:max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<h3 className="footer-heading mb-4">About</h3>
							<p className="footer-text text-sm leading-relaxed">
								Essays on technology and its impact on our lives.
							</p>
						</div>
						<div>
							<h3 className="footer-heading mb-4">Subscribe</h3>
							<p className="footer-text text-sm mb-4">
								Get notified about new essays.
							</p>
							<input
								type="email"
								placeholder="your@email.com"
								className="w-full px-3 py-2 text-sm newsletter-input rounded bg-white/50 focus:outline-none focus:ring-1"
							/>
						</div>
					</div>
				</div>
			</footer> */}
		</div>
	);
};
