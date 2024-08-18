import { Markup } from "telegraf";
import { DBUserClass } from "../database/database";

export const inlineButton = (user: DBUserClass) => Markup.inlineKeyboard(
    [
        [
            Markup.button.callback("кнопка 3", "b3")
        ]
    ]
)