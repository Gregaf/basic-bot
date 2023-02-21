import {
    CacheType,
    ChatInputCommandInteraction,
    Interaction,
    SlashCommandBuilder,
} from 'discord.js';

export const PING_COMMAND_NAME = 'ping';

export const Command = new SlashCommandBuilder()
    .setName(PING_COMMAND_NAME)
    .setDescription('Replies with Pong!');

export const pingCmdExecute = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    await interaction.reply('Pong!');
};

export default Command;
