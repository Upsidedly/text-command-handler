/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MessageEmbed } from 'discord.js'
import ms from 'ms'
import { TextCommand } from '../../classes/textcommand.js'
import config from '../../hellshire.config.js'

export default new TextCommand({
    name: 'help',
    aliases: ['categories', 'cmds', 'commands'],
    description: 'List the specified commands and their function',
    fn: async (client, message, args) => {
        if (!args.length) {
            const embed = new MessageEmbed()

            embed.setTitle('Help')
            
            for (const category of client.categories.keys()) {
                embed.addField(category.charAt(0) + category.slice(1).toLowerCase(), `\`${config.prefix}help ${category.toLowerCase()}\``)
            }
        } else if (args.length === 1) {
            const category = args[0].toLowerCase()

            if (!client.categories.has(category)) {
                return message.channel.send('Invalid category')
            }

            const embed = new MessageEmbed()

            embed.setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands`)

            for (const command of client.categories.get(category)!.values()) {
                embed.setDescription((embed.description ?? '') + `> ${command.name}\n\`${config.prefix}help ${category} ${command.name}\``)
            }
        } else if (args.length > 1) {
            const category = args[0].toLowerCase()
            const command = args[1].toLowerCase()

            if (!client.categories.has(category)) {
                return message.channel.send('Invalid category')
            }

            if (!client.categories.get(category)!.has(command)) {
                return message.channel.send(`Invalid command in category \`${category}\`.`)
            }

            const embed = new MessageEmbed()

            embed.setTitle(`${command.charAt(0).toUpperCase() + command.slice(1)}`)
            embed.setDescription(client.categories.get(category)!.get(command)!.description!)
            embed.addFields([
                { name: 'Category', value: `**${category.charAt(0).toUpperCase() + category.slice(1)}**` },
            ])
            if (client.categories.get(category)!.get(command)!.aliases) {
                embed.addField(
                    'Aliases',
                    `\`${client.categories.get(category)!.get(command)!.aliases!.map(a => `\`${a}\``).join(', ')}\``
                )
            }
            if (client.categories.get(category)!.get(command)!.cooldown) {
                embed.addField(
                    'Cooldown',
                    `\`${ms(client.categories.get(category)!.get(command)!.cooldown!)}\``
                )
            }
        }
    }
})