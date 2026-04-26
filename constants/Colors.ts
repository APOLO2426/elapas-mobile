const tintColorLight = '#0037B0';
const tintColorDark = '#0037B0';

const PRIMARY = '#0037B0'
const SECONDARY = '#49C7E1'
const TERTIARY = '#0F172A'
const NEUTRAL = '#64748B'
const WHITE = "#ffffff"
export default {
  light: {
    text: TERTIARY,
    textDefault: WHITE,
    background: WHITE,
    border: PRIMARY,
    border2: SECONDARY,
    muted: NEUTRAL,
    error: "#BA1A1A",
    accent: PRIMARY,
    icon: PRIMARY,
    tint: tintColorLight,
    tabIconDefault: NEUTRAL,
    tabIconSelected: tintColorLight,
  },

  dark: {
    text: TERTIARY,
    textDefault: WHITE,
    background: WHITE,
    border: PRIMARY,
    border2: SECONDARY,
    muted: NEUTRAL,
    error: "#BA1A1A",
    accent: PRIMARY,
    icon: PRIMARY,
    tint: tintColorDark,
    tabIconDefault: NEUTRAL,
    tabIconSelected: tintColorDark,
  },
};
