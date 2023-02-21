// Initialize the commands

import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import logger from './tools/logger';
import path from 'path';
import { readdirSync } from 'fs';
import * as dotenv from 'dotenv';

interface DiscordSecrets {
    authToken: string;
    clientID: string;
}

export const loadSecrets = (): DiscordSecrets => {
    return {
        authToken: process.env.DISCORD_TOKEN || '',
        clientID: process.env.DISCORD_CLIENT_ID || '',
    };
};

export const loadCommands = async (): Promise<SlashCommandBuilder[]> => {
    logger.info('Setting up slash commands...');

    const commandsPath = path.join(__dirname, 'commands');
    logger.debug('Commands\' path: ' + commandsPath);

    const commandFiles = readdirSync(commandsPath).filter(
        (file) => file.endsWith('.ts') || file.endsWith('.js')
    );

    logger.debug('Commands\' files: ' + commandFiles);

    const commands: SlashCommandBuilder[] = [];
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);

        commands.push(command.Command);
    }

    return commands;
};

export const setupApplicationCommands = async (
    rest: REST,
    secrets: DiscordSecrets,
    commands: SlashCommandBuilder[]
) => {
    try {
        logger.info(secrets.clientID);
        logger.info('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(secrets.clientID), {
            body: commands,
        });

        logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error(error);
    }
};

const main = async () => {
    dotenv.config();

    const secrets = loadSecrets();
    const rest = new REST({ version: '10' }).setToken(secrets.authToken);

    const commands = await loadCommands();

    await setupApplicationCommands(rest, secrets, commands);
};

main();
