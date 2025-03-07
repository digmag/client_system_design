import { Badge, NavLink, Container, Group, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './Header.module.css';

export function Header() {

    const [opened, { toggle }] = useDisclosure(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [active, setActive] = useState('/login'); // Установите начальное состояние для активной ссылки
    return (
     
      <Container size="md" className={classes.inner}>
        Кусь-банк
        
        <Flex>

          {isAuthenticated && (
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

          {!isAuthenticated ? (
              <NavLink
                  href="/login"
                  label="Вход"
              />
          ) : (
              <NavLink
                  href="/"
                  label="Выход"
              />
          )}

        </Flex>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
   
    )
}