import { Telegraf } from "telegraf";
const args = require('args-parser')(process.argv);

import * as config from "./config";
import user from "./middlewares/user";

export const bot = new Telegraf(args.dev ? config.DEV_TOKEN : config.BOT_TOKEN);
bot.use(user);