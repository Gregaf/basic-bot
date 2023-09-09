import {
    CacheType,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from 'discord.js';

export const RANDOM_MEME_COMMAND_NAME = 'random-meme';

export const Command = new SlashCommandBuilder()
    .setName(RANDOM_MEME_COMMAND_NAME)
    .setDescription('Respond with a random meme from reddit /r/memes');

export const randomMemeCmdExecute = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    await interaction.reply('TODO');
};

export default Command;
