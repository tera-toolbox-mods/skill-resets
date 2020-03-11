module.exports = function SkillResets(mod) {
    const warnTimeout = 15;
    let lastReset = { time: null, icon: null };
    let iconsData = new Map();

    function getSkillBase(skill) {
        return Math.floor(skill / 10000);
    }

    mod.game.on("enter_game", () => {
        iconsData.clear();
        mod.queryData("/SkillIconData/Icon@class=?/", [mod.game.me.class], true, false, ["skillId", "iconName"]).then(res => {
            res.forEach(icon => {
                iconsData.set(icon.attributes.skillId, icon.attributes.iconName);
                iconsData.set(getSkillBase(icon.attributes.skillId), icon.attributes.iconName);
            });
            console.log(iconsData)
        });
    });

    mod.hook("S_CREST_MESSAGE", 2, ({ type, skill }) => {
        if (type === 6) {
            
            let icon = iconsData.get(skill) || iconsData.get(getSkillBase(skill));
            console.log(icon, skill)
            if (lastReset.icon !== icon || (lastReset.icon === icon && (Date.now() - lastReset.time > warnTimeout))) {
                
                lastReset.icon = icon;
                lastReset.time = Date.now();
                console.log("show")
                mod.send("S_CUSTOM_STYLE_SYSTEM_MESSAGE", 1, {
                    message: `<img src="img://__${icon}" width="48" height="48" vspace="-20"/><font size="24" color="${mod.settings.reset_font_color}">&nbsp;Reset</font>`,
                    style: mod.settings.resetStyle
                });
            }
            if (mod.settings.sound)
                mod.send("S_PLAY_SOUND", 1, { SoundID: mod.settings.soundId });

            if (!mod.settings.show_system_reset_message)
                return false;
        }
    });
};
