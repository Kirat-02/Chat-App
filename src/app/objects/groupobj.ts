import { Channel } from "./channelobj";

export interface Groups {
    id: Number,
    name: String,
    members:[Number],
    admins: [Number],
    assistant: [Number],
    channels: [Channel]
}