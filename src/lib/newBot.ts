import { config } from "dotenv";
import { AtpAgent } from "@atproto/api";
import fs from "fs";
import path from "path";

config({ path: "../../.env" });

// Path to the image in src/images
const imagePath = path.resolve(
    "E:/Documents/2.Projects/bsky-image-bot/src/images/F5aC6AoaQAA0xeo.jpg"
);

export async function runBot() {
    try {
        // Initialize ATP Agent
        const agent = new AtpAgent({
            service: "https://bsky.social",
        });

        // Login to the Agent
        await agent.login({
            identifier: process.env.BSKY_HANDLE ?? "INCORRECT IDENTIFIER",
            password: process.env.BSKY_PASSWORD ?? "INCORRECT PASSWORD",
        });

        console.log("Bot logged in successfully.");

        // Upload Image Blob
        const image = await agent.uploadBlob(fs.readFileSync(imagePath), {
            encoding: "image/jpeg",
        });

        console.log("Image uploaded successfully.");

        // Create and Post the Content
        await agent.post({
            text: new Date().toISOString(),
            embed: {
                $type: "app.bsky.embed.images",
                mimeType: "image/jpeg",
                images: [
                    {
                        image: image.data.blob,
                        alt: "alt",
                    },
                ],
            },
            createdAt: new Date().toISOString(),
        });

        console.log("Image posted successfully.");
    } catch (error) {
        console.error("An error occurred in the bot:", error);
    }
}