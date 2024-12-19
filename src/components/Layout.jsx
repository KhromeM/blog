import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<nav className="fancy-border">
				<div className="max-w-4xl lg:max-w-7xl mx-auto py-4">
					<div className="flex justify-center">
						<Link to="/" className="text-2xl nav-link">
							<h1 className="text-5xl">Essays</h1>
						</Link>
					</div>
				</div>
			</nav>

			<main className="w-full max-w-4xl lg:max-w-7xl mx-auto py-8 flex-grow">
				{children}
			</main>
			<footer className="footer py-12 mt-24">
				<div className="max-w-4xl lg:max-w-7xl mx-auto">
					<div className="flex justify-center">
						<div className="max-w-2xl">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-2xl font-mondwest">About Me</h2>
								<ul className="flex gap-6">
									<li>
										<a
											href="https://twitter.com/KhromeM"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors text-2xl"
										>
											<i className="fab fa-twitter" />
										</a>
									</li>
									<li>
										<a
											href="https://github.com/KhromeM"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors text-2xl"
										>
											<i className="fab fa-github" />
										</a>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/in/khromem/"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors text-2xl"
										>
											<i className="fab fa-linkedin-in" />
										</a>
									</li>
								</ul>
							</div>
							<p className="text-lg mb-6 font-mondwest">
								CS dropout working on their GPT wrapper startup and writing
								about the impact AGI/ASI will have on the human race.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};
