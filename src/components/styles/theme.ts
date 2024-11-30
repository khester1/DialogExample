// src/styles/theme.ts
import { createTheme } from '@fluentui/react';

export const dynamicsTheme = createTheme({
    palette: {
        themePrimary: '#0078d4', // Dynamics blue
        themeLighterAlt: '#eff6fc',
        themeLighter: '#deecf9',
        themeLight: '#c7e0f4',
        themeTertiary: '#71afe5',
        themeSecondary: '#2b88d8',
        themeDarkAlt: '#106ebe',
        themeDark: '#005a9e',
        themeDarker: '#004578',
        neutralLighterAlt: '#f8f8f8',
        neutralLight: '#f4f4f4',
        neutralDark: '#212121',
    },
    fonts: {
        small: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
            fontSize: '12px',
        },
        medium: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
            fontSize: '14px',
        },
        large: {
            fontFamily: 'Segoe UI, Arial, sans-serif',
            fontSize: '17px',
            fontWeight: 'semibold',
        },
    },
});
