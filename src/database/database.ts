import { User } from "telegraf/typings/core/types/typegram";
import { DBUser } from "./interface";
import { MUser } from "./schemas";
import * as log from "../services/logger";

export async function getUser(userId: number): Promise<DBUserClass | undefined> {
    const user = await MUser.findOne({ userId: userId })
    if (user === null) return undefined;

    return new DBUserClass(user);
}

export async function addUser(tguser: User): Promise<DBUserClass> {
    const user = await getUser(tguser.id);

    if (user) return user;
    const res = await new MUser({userId: tguser.id, username: tguser.username, locale: tguser.language_code}).save();
    log.db(`Inserted new user ${tguser.username}(${tguser.id})`);

    console.log(res);

    return new DBUserClass(res);
}

export class DBUserClass {
    userId: number
    username: string
    locale: string
    processesCount: number
    convertType: string
    joinedAt: Date
    isBanned: boolean

    constructor(user: DBUser) {
        this.username = user.username;
        this.userId = user.userId;
        this.processesCount = user.processesCount;
        this.convertType = user.convertType;
        this.locale = user.locale;
        this.joinedAt = user.joinedAt;
        this.isBanned = user.isBanned;
    };

    async setBanned(status: boolean): Promise<void> {
        await MUser.findOneAndUpdate({ userId: this.userId }, { "isBanned": status }, { "returnDocument": "after" });
        log.db(`SET BAN STATUS TO ${status} FOR ${this.username}(${this.userId})`)
        this.isBanned = status;
    }
}