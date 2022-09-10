import { Channel } from "./channelobj";

export interface Groups {
    groupid: Number;
    members:[Number],
    admin: [Number],
    assistant: [Number],
    channels: [Channel];
}