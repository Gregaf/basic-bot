// Initialize the commands

export interface DiscordSecrets {
    authToken: string;
    clientID: string;
}

export const loadSecrets = (): DiscordSecrets => {
    return {
        authToken: process.env.DISCORD_TOKEN || '',
        clientID: process.env.DISCORD_CLIENT_ID || '',
    };
};
