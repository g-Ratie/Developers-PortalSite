import {
  Avatar,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Header,
  Text,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { userFirebaseAuthContext } from '../auth/Provider';
import Loginbutton from './loginbutton';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  burgerlink: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: 32,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  burgerlinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const auth = userFirebaseAuthContext();

  //providerからの

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        setActive(link.link);
        //ここに遷移の処理を書く
      }}
    >
      {link.label}
    </Link>
  ));
  const burgeritems = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.burgerlink, { [classes.burgerlinkActive]: active === link.link })}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <Header height={60} mb={120}>
        <Container className={classes.header}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={192} height={108} />
          </Link>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          {auth.currentUser ? (
            <Button variant="outline">
              <Avatar
                src={auth.currentUser.photoURL}
                radius="xl"
                size={rem(24)}
                style={{ marginRight: '10px' }}
              />
              <Text>{auth.currentUser.displayName}</Text>
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Button>
          ) : (
            <Loginbutton />
          )}
        </Container>
        <Container className={classes.header}>
          <Group className={classes.links}>{items}</Group>
        </Container>
      </Header>

      <Drawer opened={opened} onClose={toggle} padding="md" position="right" size="100%">
        <Container style={{ marginTop: '20%' }}>{burgeritems}</Container>
      </Drawer>
    </>
  );
}
