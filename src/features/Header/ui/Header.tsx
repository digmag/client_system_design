import { NavLink, Container, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ThemeSwitcher } from '../../ThemeSwitcher';
import { useMyContext } from '../../../shared/lib';
import { Link } from 'react-router-dom';

export function Header() {

    const { isAuth, setIsAuth } = useMyContext();
    
    const [opened, { toggle }] = useDisclosure(false);
    
    const handleLogout = () => {
        localStorage.clear(); 
        sessionStorage.clear(); 
        setIsAuth(false);
    };

    return (
     
      <Container size="md" className={classes.inner}>
        Кусь-банк
        
        <Flex>

          {isAuth && (
              <>
                <Flex gap='md' align='center'>
                  <Link
                      to="/bank-accounts"
                  >Счета</Link>
                  <Link
                      to="/loans"
                  >Кредиты</Link>
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
          <ThemeSwitcher />
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
   
    )
}