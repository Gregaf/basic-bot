import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import ready from './listeners/ready';
import logger from './tools/logger';
import { loadSecrets } from './init';
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
