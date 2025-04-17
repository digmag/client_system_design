import './App.css'
import { AppRouter } from './routers'
import '@mantine/core/styles.css';
import { Provider } from 'react-redux'
import { store } from './stores/store';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';
import { useSetThemeMutation } from '../shared/api/theme';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '../shared/lib/ThemeProvider';
import { AuthProvider, useMyContext } from '../shared/lib';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MantineProvider>
          <AuthProvider>
            <ThemeProvider>
              <AppRouter />
              <ToastContainer/>
            </ThemeProvider>
          </AuthProvider>
        </MantineProvider>
      </Provider>
    </>
  )
}

export default App
