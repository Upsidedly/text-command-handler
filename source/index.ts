import { Hellshire } from './classes/client.js'
import { Intents } from 'discord.js'
import config from './hellshire.config.js'

const client = new Hellshire({ intents: new Intents(32767), owners: ['935932557013426176'] })

await client.events()
await client.text()

await client.login(config.token)