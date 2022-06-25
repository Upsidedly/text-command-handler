import { Event } from '../classes/event.js'

export default new Event('ready', (client) => {
    console.log(
        `Logged in as ${client.user.tag} in`, client.guilds.cache.size, `guild${client.guilds.cache.size === 1 ? '' : 's'}.`
    )

    // client.user.setPresence({ status: 'idle', activities: [
    //     {
    //         name: 'name',
    //         type: 'type'
    //     }
    // ] })
})