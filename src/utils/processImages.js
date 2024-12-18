import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { matchPath } from "react-router-dom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "../../public/assets/images");
const outputDir = path.join(__dirname, "../../public/assets/blueImages");

const processImage = async (inputPath, outputPath) => {
	try {
		const image = await sharp(inputPath)
			.removeAlpha()
			.ensureAlpha()
			.raw()
			.toBuffer({ resolveWithObject: true });

		const { data, info } = image;
		const newData = Buffer.alloc(data.length);

		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			const a = data[i + 3];

			const brightness = Math.max(r, g, b) / 255;
			const totalColor = r + g + b;
			const blueRatio = totalColor === 0 ? 0 : b / totalColor;
			const finalBlue = blueRatio ** 2 * b;

			newData[i] = 255;
			newData[i + 1] = 255;
			newData[i + 2] = finalBlue;
			newData[i + 3] = a;
		}

		await sharp(newData, {
			raw: {
				width: info.width,
				height: info.height,
				channels: 4,
			},
		})
			.modulate({
				brightness: 1.5,
				contrast: 1.2,
			})
			.png()
			.toFile(outputPath);

		console.log(`✓ Processed: ${path.basename(inputPath)}`);
	} catch (error) {
		console.error(`✗ Error processing ${inputPath}:`, error);
	}
};

const processDirectory = async () => {
	try {
		await fs.mkdir(outputDir, { recursive: true });

		const files = await fs.readdir(sourceDir);
		const existingFiles = await fs.readdir(outputDir);

		const imageFiles = files.filter((file) => {
			const ext = /\.(jpg|jpeg|png|gif)$/i.test(file);
			const outName = `${path.basename(file, path.extname(file))}.png`;
			const alreadyProcessed = existingFiles.includes(outName);
			return ext && !alreadyProcessed;
		});

		console.log(`Found ${imageFiles.length} images to process...`);

		await Promise.all(
			imageFiles.map((file) => {
				const inputPath = path.join(sourceDir, file);
				const outputPath = path.join(
					outputDir,
					`${path.basename(file, path.extname(file))}.png`
				);
				return processImage(inputPath, outputPath);
			})
		);

		console.log("\nProcessing complete!");
		console.log(`Processed images can be found in: ${outputDir}`);
	} catch (error) {
		console.error("Error processing directory:", error);
		process.exit(1);
	}
};

processDirectory();
