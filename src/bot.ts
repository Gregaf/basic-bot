import {
    Client,
    EmbedBuilder,
    Events,
    GatewayIntentBits,
    REST,
} from 'discord.js';
import * as dotenv from 'dotenv';
import ready from './listeners/ready';
import { PING_COMMAND_NAME } from './commands/ping';
import logger from './tools/logger';
import {
    KOTAKU_SCRAPE_COMMAND_NAME,
    scrapeKotaku,
} from './commands/kotaku-scrape';
import axios from 'axios';
// import jsdom from 'jsdom';
// const { JSDOM } = jsdom;
import { JSDOM } from 'jsdom';
import { loadSecrets } from './init';
import { cli } from 'winston/lib/winston/config';
import setupChatCommandEvents from './listeners/interaction-create';
dotenv.config();

const main = async () => {
    const secrets = loadSecrets();

    const client = new Client({
        intents: [GatewayIntentBits.Guilds],
    });

    ready(client);

    setupChatCommandEvents(client);

    // This only works for a bot that persisntely runs, should store that in local file or something
    client.on(Events.GuildCreate, (gData) => {
        logger.info(gData.id);
    });

    client.login(secrets.authToken);
};

main();
