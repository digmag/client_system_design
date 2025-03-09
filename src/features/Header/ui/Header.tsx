import { NavLink, Container, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { useMyContext } from '../../../app/contexts';

export function Header() {

    const { isAuth, setIsAuth } = useMyContext();
    
    const [opened, { toggle }] = useDisclosure(false);
    
    const handleLogout = () => {
        localStorage.removeItem("refresh"); 
        sessionStorage.clear(); 
        setIsAuth(false);
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