import {config } from "dotenv";
import {AtpAgent} from "@atproto/api";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

config({ path: '../../.env' });

// Path to the image in src/images
const imagePath = path.resolve('E:/Documents/2.Projects/bsky-image-bot/src/images/F5aC6AoaQAA0xeo.jpg');

// -- Agent Init -- //

const agent = new AtpAgent({
    service: 'https://bsky.social'
})

await agent.login({
    identifier: process.env.BSKY_HANDLE ?? 'INCORRECT IDENTIFIER',
    password: process.env.BSKY_PASSWORD ?? 'INCORRECT PASSWORD',
})

const image = await agent.uploadBlob(fs.readFileSync(imagePath), { encoding: "image/jpeg" })

await agent.post({
    text: new Date().toISOString(),
    embed: {
        $type: 'app.bsky.embed.images',
        mimeType: "image/jpeg",
        images: [
            {
                image: image.data.blob,
                alt: 'alt'
            }
        ]
    },
    createdAt: new Date().toISOString()
});