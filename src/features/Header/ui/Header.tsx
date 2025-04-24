import { NavLink, Container, Burger, Flex } from '@mantine/core';
import classes from './Header.module.css';
import { ThemeSwitcher } from '../../ThemeSwitcher';
import { Link } from 'react-router-dom';
import { useHeader } from '../hooks';

export function Header() {
   const {isAuth, opened, toggle, handleLogout} = useHeader();
    return (
      <Container size="md" className={classes.inner}>
        Кусь-банк
        <Flex>
          {isAuth && (
              <>
                <Flex gap='md' align='center'>
                  <Link to="/bank-accounts">Счета</Link>
                  <Link to="/loans">Кредиты</Link>
                  <Link to="/transaction">Переводы</Link>
                </Flex>
              </>
          )}
          {!isAuth ? (
              <NavLink
                  href="http://localhost:7000?appId=client&redirectURI=http://localhost:5173/login/finish"
                  label="Вход через SSO"
              />
          ) : (
              <NavLink
                  href="/"
                  label="Выход"
                  onClick={handleLogout}
              />
          )}
        </Flex>
        {isAuth?<ThemeSwitcher />:<></>}
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
   
    )
}