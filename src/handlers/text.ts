import { bot } from "../bot";
import * as db from "../database/database";
import * as utils from "../services/utils";
import { inlineButton } from "../replyMarkups/inlineMarkups";

bot.hears("кнопка 1", async ctx => {
    if (!ctx.from) return;
    
    const user = await db.getUser(ctx.from.id);
    if (!user) return;

    const timeSinceReg = utils.getTimeSince(user.joinedAt);

    ctx.reply(`нкопка 1\n*${utils.escapeString(timeSinceReg)}*`, { parse_mode: "MarkdownV2" })
})

bot.hears("кнопка 2", async ctx => {
    const user = await db.getUser(ctx.from.id);
    if (!user) return;
    
    const inline = inlineButton(user).reply_markup;
    ctx.reply("кнопка 2", { reply_markup: inline });
})