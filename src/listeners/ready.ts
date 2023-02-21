import { Client, EmbedBuilder, Events, TextChannel } from 'discord.js';
import logger from '../tools/logger';
import { CronJob } from 'cron';
import { scrapeKotaku } from '../commands/kotaku-scrape';

const ready = (client: Client): void => {
    client.on(Events.ClientReady, async () => {
        if (!client.user || !client.application) {
            logger.error(`Client not ready: ${client.toJSON()}`);
            return;
        }

        logger.info(
            `Current Guilds: ${client.guilds.cache.get(
                process.env.DISCORD_GUILD_ID || ''
            )}`
        );

        const scheduledKotakuScrape = new CronJob(
            '00 00 12 * * *',
            async () => {
                const hyperlinks = await scrapeKotaku();

                const guild = client.guilds.cache.get(
                    process.env.DISCORD_GUILD_ID || ''
                );

                if (!guild) {
                    logger.error('Guild not found');
                    return;
                }

                const channel = guild.channels.cache.get(
                    '164903818218176512'
                ) as TextChannel;

                const embeds = hyperlinks.map((link) =>
                    new EmbedBuilder().setTitle(link.title).setURL(link.url)
                );

                channel.send({ embeds: embeds.slice(0, 10) });
            }
        );

        scheduledKotakuScrape.start();

        logger.info(`${client.user.username} is online!`);
    });
};

export default ready;
