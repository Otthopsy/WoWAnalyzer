/**
 * All Hunter azerite powers go in here.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  HAZE_OF_RAGE: {
    id: 273262,
    name: 'Haze of Rage',
    icon: 'ability_druid_ferociousbite',
  },

  HAZE_OF_RAGE_BUFF: {
    id: 273264,
    name: 'Haze of Rage',
    icon: 'ability_druid_ferociousbite',
  },

  DANCE_OF_DEATH: {
    id: 274441,
    name: 'Dance of Death',
    icon: 'ability_druid_mangle',
  },

  DANCE_OF_DEATH_BUFF: {
    id: 274443,
    name: "Dance of Death",
    icon: "ability_druid_mangle",
  },
};
