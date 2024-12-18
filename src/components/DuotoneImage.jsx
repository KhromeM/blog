import React, { useState } from "react";

export const DuotoneImage = ({
	src,
	alt,
	caption,
	className = "",
	style = {},
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const duotoneFilter = `
    brightness(60%) 
    contrast(120%) 
    saturate(10%) 
    brightness(200%) 
    contrast(150%)
  `
		.replace(/\s+/g, " ")
		.trim();

	const hoverFilter = `brightness(60%) 
    contrast(100%) 
    saturate(60%) 
    brightness(200%) 
    contrast(150%)`;

	return (
		<figure className={`relative group ${className}`}>
			<div
				className="relative overflow-hidden"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Blue background div */}
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "#0171A9" }}
				/>

				{/* Image with extreme contrast */}
				<img
					src={src}
					alt={alt}
					className="w-full transition-all duration-300 relative"
					style={{
						filter: isHovered ? hoverFilter : duotoneFilter,
						mixBlendMode: isHovered ? "normal" : "screen",
						...style,
					}}
				/>
			</div>
			{caption && (
				<figcaption className="mt-2 text-sm italic text-gray-600">
					{caption}
				</figcaption>
			)}
		</figure>
	);
};
