import { REST, Routes } from "discord.js";
import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
// const client = new Discord.Client({ intents: [1, 512, 32768, 2 , 128] });
// const config = require("./config.json");
// const fs = require("fs");

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];

const rest = new REST({version: "10"}).setToken(process.env.token);


try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.token);

// fs.readdirSync('./commands/').forEach(local => {
//     const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

//     for(let file of comandos) {
//         let puxar= require(`./commands/${local}/${file}`)

//         if(puxar.name) {
//             client.commands.set(puxar.name, puxar)
//         } 
//         if(puxar.aliases && Array.isArray(puxar.aliases))
//         puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
//     } 
// });

// client.on("messageCreate", async (message) => {

//     let prefix = config.prefix;
  
//     if (message.author.bot) return;
//     if (message.channel.type === Discord.ChannelType.DM) return;     
  
//     if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
  
//     if(!message.content.startsWith(prefix)) return;
//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
//     let cmd = args.shift().toLowerCase()
//     if(cmd.length === 0) return;
//     let command = client.commands.get(cmd)
//     if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
//     try {
//         command.run(client, message, args)
//     } catch (err) { 
//         console.error('Erro:' + err); 
//     }
// });

// client.on("ready", () =>{
//     console.log(`${client.user.username} está online!`)
// })

client.on("guildMemberAdd",(member) => {
    let canal_logs = "1037854800349495367";
    let embed = new Discord.EmbedBuilder()
    .setColor("Pink")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(" Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);

    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}`}) //Caso queira que o usuário não seja mecionado, retire a parte do "co9ntent"
})
