import './App.css'
import { AppRouter } from './routers'
import '@mantine/core/styles.css';
import { Provider } from 'react-redux'
import { store } from './stores/store';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <>
      <Provider store={store}>
        
        <MantineProvider>
          <AppRouter />
          <ToastContainer/>
        </MantineProvider>
        
      </Provider>
    </>
  )
}

export default App
