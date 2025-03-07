import { useState } from 'react'
import './App.css'
import { AppRouter } from './routers'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux'
import { store } from './stores/store';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </Provider>
    
      
    </>
  )
}

export default App
