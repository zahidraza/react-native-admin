import type { Theme } from 'native-base';
import { DefaultTheme, Theme as RNTheme } from '@react-navigation/native';

const createRNTheme = (colorMode: string, nbTheme: Theme) => {
  let theme: RNTheme;
  if (colorMode === 'dark') {
    theme = {
      dark: true,
      colors: {
        primary: nbTheme.colors.primary[500], // Color for selected Tab
        notification: nbTheme.colors.secondary[500], // Backgound Color for Notification Badge
        text: nbTheme.colors.lightText,
        // background: "#222B34", // Background color for screen
        // card: "#2C3744", // Background color for TabBar and Header
        // border: "#364453", // Border Color
        background: '#142338',
        card: '#213A5E',
        border: '#2E5184',
      },
    };
  } else {
    theme = {
      dark: false,
      colors: {
        ...DefaultTheme.colors,
        primary: nbTheme.colors.primary[500], // Color for selected Tab
        notification: nbTheme.colors.secondary[500], // Backgound Color for Notification Badge
        text: nbTheme.colors.darkText,
        background: '#D5DDE4',
      },
    };
  }
  return theme;
};

export default createRNTheme;
