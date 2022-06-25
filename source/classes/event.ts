import { Hellshire } from './client.js'
import { ClientEvents } from 'discord.js'

export class Event<T extends keyof ClientEvents> {
    name: string
    callback: (client: Hellshire, ...args: ClientEvents[T]) => unknown
    how: 'on' | 'once'

    constructor(name: T, callback: (client: Hellshire, ...args: ClientEvents[T]) => unknown, how?: 'on' | 'once') {
        this.name = name
        this.callback = callback
        this.how = how || 'on'
    }
}