require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
    Client,
    Collection,
    GatewayIntentBits,
    REST,
    Routes,
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

console.log("Started loading application events.");

const events = [];

const eventFolderPath = path.join(__dirname, "events");
const eventFolders = fs.readdirSync(eventFolderPath);

for (const eventFolder of eventFolders) {
    const eventsPath = path.join(eventFolderPath, eventFolder);
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js"));

    for (const eventFile of eventFiles) {
        const eventFilePath = path.join(eventsPath, eventFile);
        const event = require(eventFilePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        events.push(event);
    }
}

console.log(`Successfully loaded ${events.length} application events.`);

client.commands = new Collection();
const commands = [];

const commandFolderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandFolderPath);

console.log("Started loading application commands.");

for (const commandFolder of commandFolders) {
    const commandPath = path.join(commandFolderPath, commandFolder);
    const commandFiles = fs
        .readdirSync(commandPath)
        .filter((file) => file.endsWith(".js"));

    for (const commandFile of commandFiles) {
        const commandFilePath = path.join(commandPath, commandFile);
        const command = require(commandFilePath);

        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

console.log(`Successfully loaded ${commands.length} application commands.`);

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
    console.log("Started refreshing application commands.");

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
    });

    console.log("Successfully reloaded application commands.");
} catch (error) {
    console.error(error);
}

client.login(process.env.TOKEN);
