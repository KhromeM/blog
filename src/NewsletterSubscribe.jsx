import React, { useState } from "react";

const NewsletterSubscribe = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");

		try {
			const response = await fetch(
				`https://api.convertkit.com/v3/forms/${
					import.meta.env.VITE_CONVERTKIT_FORM_ID
				}/subscribe`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						api_key: import.meta.env.VITE_CONVERTKIT_API_KEY,
						email: email,
					}),
				}
			);

			if (!response.ok) throw new Error("Subscribe failed");

			setStatus("success");
			setEmail("");
		} catch (error) {
			console.error("Subscription error:", error);
			setStatus("error");
		}
	};

	return (
		<div className="border-t border-b border-gray-200 py-4 my-6">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col sm:flex-row items-center gap-3"
			>
				<label className="text-m font-bold	text-black whitespace-nowrap">
					Subscribe for new posts:
				</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="your@email.com"
					required
					className="flex-grow px-3 py-1 text-sm border rounded focus:outline-none focus:border-blue-500"
					disabled={status === "loading" || status === "success"}
				/>
				<button
					type="submit"
					disabled={status === "loading" || status === "success"}
					className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{status === "loading"
						? "..."
						: status === "success"
						? "✓ Subscribed"
						: "Subscribe"}
				</button>
			</form>

			{status === "error" && (
				<p className="text-red-500 text-xs mt-2 text-center">
					Something went wrong. Please try again.
				</p>
			)}
		</div>
	);
};

export default NewsletterSubscribe;
