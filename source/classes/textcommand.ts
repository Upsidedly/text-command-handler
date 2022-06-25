import { Message } from 'discord.js'
import ms from 'ms'
import { Hellshire } from './client.js'

type Text = {
    name: string,
    aliases?: string[],
    categories?: string[],
    description?: string,
    fn: (client: Hellshire, message: Message, args: string[], alias: string) => unknown,
    cd?: string
}

type TextPermissions = {
    onlyUsers?: string[],
    onlyRoles?: string[],
    onlyOwners?: boolean,
}

function objectExists(obj: Record<string, unknown> | null | undefined): obj is Record<string, unknown> {
    if (obj === null || obj === undefined) return false
    if (Object.keys(obj).length === 0) return false
    return true
}

function arrayExists(arr: unknown[] | null | undefined): arr is unknown[] {
    if (arr === null || arr === undefined) return false
    if (arr.length === 0) return false
    return true
}

export class TextCommand {
    name: string
    aliases: string[] | null
    categories: string[] | null
    description: string| null
    fn: (client: Hellshire, message: Message<boolean>, args: string[], alias: string) => unknown
    permissions: TextPermissions | null
    cooldown: number | null

    constructor(options: Text, perms?: TextPermissions) {
        this.name = options.name
        this.categories = arrayExists(options.categories) ? options.categories : null
        this.description = options.description || null
        this.fn = options.fn
        this.permissions = objectExists(perms) ? perms : null
        this.cooldown = options.cd ? ms(options.cd) : null

        if (arrayExists(options.aliases)) {
            this.aliases = options.aliases
        } else {
            this.aliases = null
        }
    }
}