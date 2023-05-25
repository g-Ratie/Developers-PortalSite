import { Avatar, Button, Menu, Text } from '@mantine/core';
import {
  IconAddressBook,
  IconBuilding,
  IconGraph,
  IconLogout,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const UserMenu = () => {
  const { data: session } = useSession();
  const router = useRouter();
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
        <Menu.Item icon={<IconBuilding size={14} />}>ホーム</Menu.Item>
        <Menu.Item icon={<IconAddressBook size={14} />}>プロフィール(未実装)</Menu.Item>
        <Menu.Item
          icon={<IconGraph size={14} />}
          onClick={() => {
            router.push('/stats');
          }}
        >
          統計データ
        </Menu.Item>
        <Menu.Item
          icon={<IconUsers size={14} />}
          onClick={() => {
            router.push('/users');
          }}
        >
          メンバーリスト
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>設定(未実装)</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => signOut()}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
