module.exports = function SkillResets(mod) {
    if(mod.proxyAuthor !== 'caali' || !global.TeraProxy) {
        mod.warn('You are trying to use Skill Resets on an unsupported legacy version of tera-proxy.');
        mod.warn('The module may not work as expected, and even if it works for now, it may break at any point in the future!');
        mod.warn('It is highly recommended that you download the latest official version from the #proxy channel in https://discord.gg/dUNDDtw');
    }

    mod.hook('S_CREST_MESSAGE', 2, ({type, skill}) => {
        if (type === 6) {
            mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
                message: `<img src="img://skill__0__${mod.game.me.templateId}__${skill}" width="48" height="48" vspace="-20"/><font size="24" color="${mod.settings.reset_font_color}">&nbsp;Reset</font>`,
                type: mod.settings.flashing_notification ? 70 : 2,
                chat: false,
                channel: 0,
            })

            if (!mod.settings.show_system_reset_message)
                return false
        }
    })
}
