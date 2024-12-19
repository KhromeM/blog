import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BlogPost } from "./pages/BlogPost";
import { Analytics } from "./components/Analytics";

const App = () => {
	return (
		<Layout>
			<Analytics />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/post/:slug" element={<BlogPost />} />
			</Routes>
		</Layout>
	);
};

export default App;
