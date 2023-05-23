import { Avatar, Button, Menu, Text } from '@mantine/core';
import { IconGraph, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';

const UserMenu = () => {
  const { data: session } = useSession();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="outline">
          <Avatar src={session?.user?.image} radius="xl" size="sm" />
          <Text>{session?.user?.name}</Text>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item disabled>ログイン中: {session?.user?.name}</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconUser size={14} />}>プロフィール</Menu.Item>
        <Menu.Item icon={<IconGraph size={14} />}>統計データ</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>設定</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => signOut()}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
