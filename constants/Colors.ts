const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const PRIMARY = '#9ef5ff8d'
const SECONDARY = '#00386C'
const TERCIARY = '#ffffff'
const NEUTRAL = '#1E293B'

export default {
  light: {
    text: NEUTRAL,
    background: '#fdfdfd',
    border: PRIMARY,
    muted: SECONDARY,
    error: "",
    accent: "#194C7A",
    icon: SECONDARY,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },

  dark: {
    text: NEUTRAL,
    background: '#71a4c5',
    border: PRIMARY,
    muted: SECONDARY,
    error: "",
    accent: "#194C7A",
    icon: SECONDARY,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
