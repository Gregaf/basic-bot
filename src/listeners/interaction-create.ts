import { Client, Events } from 'discord.js';
import {
    KOTAKU_SCRAPE_COMMAND_NAME,
    kotakuScrapeCmdExecute,
} from '../commands/kotaku-scrape';
import { PING_COMMAND_NAME, pingCmdExecute } from '../commands/ping';
import logger from '../tools/logger';

const setupChatCommandEvents = (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch (interaction.commandName) {
        case PING_COMMAND_NAME:
            logger.info('Executing ping command');
            pingCmdExecute(interaction);
            break;
        case KOTAKU_SCRAPE_COMMAND_NAME:
            logger.info('Executing kotaku scrape command');
            kotakuScrapeCmdExecute(interaction);
            break;
        }
    });
};

export default setupChatCommandEvents;
