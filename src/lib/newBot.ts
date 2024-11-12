import {config } from "dotenv";
import {AtpAgent} from "@atproto/api";

config({ path: '../../.env' });

const agent = new AtpAgent({
    service: 'https://bsky.social'
})

await agent.login({
    identifier: process.env.BSKY_HANDLE ?? 'INCORRECT IDENTIFIER',
    password: process.env.BSKY_PASSWORD ?? 'INCORRECT PASSWORD',
})

await agent.post({
    text: 'Hello world! I posted this via the API.',
    createdAt: new Date().toISOString()
})

console.log(process.env.BSKY_HANDLE);