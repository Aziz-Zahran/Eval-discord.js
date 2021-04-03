const Discord = require('discord.js')
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const { inspect } = require('util')
 
module.exports = {
    name: 'eval',
    usage: "",
    description: 'evaluates any string as javascript code and executes it.',
    category: "Utility",
    cooldown: 1,
    run: async (client, message, args) => {
        if(message.author.id !== '774074653480189963') return message.channel.send("sorry, this command is only for the developer")

        const command = args.join(" ");
        if(!command) return message.channel.send("you must write a command ")

        try {
            const evaled = eval(command)
            let words = ["token", "destroy"]
            if(words.some(word => message.content.toLowerCase().includes(word))){
                return message.channel.send("Those words are blacklisted!")
            }
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("correctly evaluated")
            .addField(`**Type:**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
            .addField("**Evaluated in:**", `\`\`\`yaml\n${Date.now()-message.createdTimestamp} ms\`\`\``, true)
            .addField("**Entrance**", `\`\`\`js\n${command}\`\`\``)
            .addField("**Exit**", `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)

            message.channel.send(embed)

        }catch (error) {
            const embedfailure = new Discord.MessageEmbed()
            .setColor("RED")
            .addField(`Entrance`, `\`\`\`js\n${command}\`\`\``)
            .addField(`Error`, `\`\`\`js\n${error}\`\`\` `)

            message.channel.send(embedfailure)
        }
    }}
