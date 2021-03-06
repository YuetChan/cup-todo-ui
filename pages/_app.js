import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../util/create-emotion-cache';
import lightTheme from '../styles/theme/light-theme';
import '../styles/globals.css';

import "../styles/google-button.scss";
import "../styles/home.scss";
import "../styles/new-request.scss";
import "../styles/requests_id.scss";
import "../styles/user-home.scss";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={ emotionCache }>
      <ThemeProvider theme={ lightTheme }>
        <CssBaseline />
        <Component { ...pageProps } />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
