import { Badge, NavLink, Container, Group, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { useContext } from 'react';
import { MyContext, useMyContext } from '../../../app/contexts';

export function Header() {

    const { isAuth, setIsAuth } = useMyContext();
    console.log("eeeeeeeer", isAuth)
    const [opened, { toggle }] = useDisclosure(false);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [active, setActive] = useState('/login'); // Установите начальное состояние для активной ссылки

    // Проверяем наличие refreshToken при монтировании компонента
    // useEffect(() => {
    //     const refreshToken = localStorage.getItem("refresh");
    //     setIsAuthenticated(!!refreshToken); // Устанавливаем isAuthenticated в true, если refreshToken существует
    // }, []);

    // Функция выхода
    const handleLogout = () => {
        localStorage.removeItem("refresh"); // Очищаем refreshToken
        sessionStorage.clear(); // Очищаем sessionStorage
        setIsAuth(false) // Обновляем состояние аутентификации
    };

    return (
     
      <Container size="md" className={classes.inner}>
        Кусь-банк
        
        <Flex>

          {isAuth && (
              <>
                  <NavLink
                      href="/bank-accounts"
                      label="Счета"   
                  />
                  <NavLink
                      href="/loans"
                      label="Кредиты"
                  />
              </>
          )}

          {!isAuth ? (
              <NavLink
                  href="/login"
                  label="Вход"
              />
          ) : (
              <NavLink
                  href="/"
                  label="Выход"
                  onClick={handleLogout}
              />
          )}

        </Flex>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
   
    )
}