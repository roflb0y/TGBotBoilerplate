import { Markup } from "telegraf"

export const mainButtons = Markup.keyboard(
    [
        [
            Markup.button.text("кнопка 1"),
            Markup.button.text("кнопка 2")
        ]
    ]
).resize()