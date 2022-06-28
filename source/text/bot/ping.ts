import { TextCommand } from '../../classes/textcommand.js'
import { MessageEmbed } from 'discord.js'
import ms from 'ms'

export default new TextCommand({
    name: 'ping',
    aliases: ['pong'],
    description: 'Pong!',
    fn: async (client, message) => {
        const embed = new MessageEmbed({
            title: 'Pong!',
            fields: [
                {
                    name: 'Latency',
                    value: `\`${Date.now() - message.createdTimestamp}ms\``
                },
                {
                    name: 'API Latency',
                    value: `\`${Math.round(client.ws.ping)}ms\``
                },
                {
                    name: 'Uptime',
                    value: `${ms(client.sinceLogin())}`
                }
            ]
        })

        await message.channel.send({ embeds: [embed] })
    }
})