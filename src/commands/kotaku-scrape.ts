import {
    CacheType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { fetchPage } from '../utility/web';
import { JSDOM } from 'jsdom';

export const KOTAKU_SCRAPE_COMMAND_NAME = 'kotaku';

interface HyperLink {
    title: string;
    url: string;
}

export const Command = new SlashCommandBuilder()
    .setName(KOTAKU_SCRAPE_COMMAND_NAME)
    .setDescription('Responds with the top 10 latest Kotaku articles.');

export const scrapeKotaku = async () => {
    const page = await fetchPage('https://kotaku.com/latest');
    const dom = new JSDOM(page).window.document;

    const links = Array.from(dom.querySelectorAll('div.sc-3kpz0l-7'));

    const linkMapping: HyperLink[] = links.map((link) => {
        const title = link.textContent || '';
        const data = link.querySelector('a')?.href || '';

        return { title: title, url: data };
    });

    return linkMapping;
};

export const kotakuScrapeCmdExecute = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    const hyperlinks = await scrapeKotaku();

    const embeds = hyperlinks.map((link) =>
        new EmbedBuilder().setTitle(link.title).setURL(link.url)
    );

    await interaction.reply({ embeds: embeds.slice(0, 10) });
};

export default Command;
