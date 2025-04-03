import { useEffect, useState } from 'react'
import './App.css'
import { AppRouter } from './routers'
import '@mantine/core/styles.css';
import { Provider } from 'react-redux'
import { store } from './stores/store';
import { MyContext } from './contexts';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");
    setIsAuth(!!refreshToken); // Устанавливаем isAuth в true, если refreshToken существует
  }, []);

  return (
    <>
    <Provider store={store}>
      <MyContext.Provider value={{isAuth, setIsAuth}}>
      <MantineProvider>
        <AppRouter />
        <ToastContainer/>
      </MantineProvider>
      </MyContext.Provider>
      
    </Provider>
    
      
    </>
  )
}

export default App
