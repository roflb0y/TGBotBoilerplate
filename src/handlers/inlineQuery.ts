import { bot } from "../bot";
import * as db from "../database/database";

bot.action("b3", async ctx => {
    const user = await db.getUser(ctx.callbackQuery.from.id);
    if (!user) return;
    
    ctx.reply("кнопка 3");
    ctx.answerCbQuery();
})