module.exports = function SkillResets(mod) {
    if(mod.proxyAuthor !== 'caali')
        mod.warn('You are trying to use SkillResets on an unsupported version of tera-proxy. It may not work as expected, and even if it does now it may break at any point in the future!');

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
