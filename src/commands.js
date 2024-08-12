require('dotenv').config();
require('discord.js');
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const c_void = {
    name: 'void',
    description: 'Void an action',
    options: [
        {
            name: 'message',
            description: 'Link to violating message',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for voiding',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
}

const c_refreshFactions = {
    name: 'refreshfactions',
    description: 'Refresh faction settings and regenerate roles accordingly',
    options: []
};

const c_assignFaction = {
    name: 'assignfaction',
    description: 'Assign a faction to a user',
    options: [
        {
            name: 'user',
            description: 'User to assign faction to',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'faction',
            description: 'Faction [tag] to assign',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
};

const c_removeAssignment = {
    name: 'removeassignment',
    description: 'Remove faction assignment from a user',
    options: [
        {
            name: 'user',
            description: 'User to remove faction assignment from',
            type: ApplicationCommandOptionType.User,
        }
    ]
};

const c_viewAllAssignments = {
    name: 'viewall',
    description: 'View all faction assignments',
};

const c_debug = {
    name: 'debug',
    description: 'Command whose function switches around based on db needs',
};


const c_accept = {
    name: 'accept',
    description: 'Accept proposal from user',
    options: [
        {
            name: 'proposal',
            description: 'Message link to proposal',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for acceptance',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
};


const c_deny = {
    name: 'deny',
    description: 'Deny proposal from user',
    options: [
        {
            name: 'proposal',
            description: 'Message link to proposal',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for denial',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
};


const c_setLogChannel = {
    name: 'setlogchannel',
    description: 'Set the channel to log actions to',
    options: [
        {
            name: 'channel',
            description: 'Channel to log actions to',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ]
};


const c_addFormattedChannel = {
    name: 'addformattedchannel',
    description: 'Add a channel to the list of formatted channels',
    options: [
        {
            name: 'channel',
            description: 'Channel to add to list of formatted channels',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ]
};

const c_viewAllFormattedChannels = {
    name: 'viewallformattedchannels',
    description: 'View all formatted channels',
};


const c_addFaction = {
    name: 'addfaction',
    description: 'Add a faction to the list of factions',
    options: [
        {
            name: 'tag',
            description: 'Tag of faction to add',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'name',
            description: 'Name of faction to add',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'color',
            description: 'Color of faction to add',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'description',
            description: 'Description of faction to add',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
};

const c_listAllFactions = {
    name: 'listfactions',
    description: 'List all factions',
};


const c_removeFaction = {
    name: 'removefaction',
    description: 'Remove a faction from the list of factions',
    options: [
        {
            name: 'tag',
            description: 'Tag of faction to remove',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
};

const c_editFaction = {
    name: 'editfaction',
    description: 'Edit a faction',
    options: [
        {
            name: 'tag',
            description: 'Tag of faction to edit',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'name',
            description: 'New name',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'color',
            description: 'New color',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'description',
            description: 'New description',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
};

const c_manualRoleUpdate = {
    name: 'manualroleupdate',
    description: 'Manually update roles',
};

const cList = [c_void, c_refreshFactions, c_assignFaction, c_removeAssignment, c_viewAllAssignments, c_accept, c_deny, c_setLogChannel, c_addFormattedChannel, c_addFaction, c_removeFaction, c_listAllFactions, c_editFaction, c_viewAllFormattedChannels, c_manualRoleUpdate, c_debug];


const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async() => {
    try {
        console.log("Registering Commands...");
        console.log(cList);
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD_ID),
            
            { body: cList },
        );

        console.log("Commands Registered");
    } catch (error) {
        console.log("ERR");
        console.log(error);
    }
})();