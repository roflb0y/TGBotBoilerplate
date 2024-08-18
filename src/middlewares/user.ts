import * as db from "../database/database"

const user = async (ctx: any, next: any) => {
    try {
        if (!(ctx.from && ctx.chat && ctx.chat.type === 'private')) {
            return;
        }

        const user = await db.getUser(ctx.from.id);

        if (!user) { await db.addUser(ctx.from); return next() };
        if (!user.isBanned) return next();
    } catch {}
}

export default user;