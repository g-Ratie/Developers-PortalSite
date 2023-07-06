import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { IconReload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
interface DataObject {
  name: string;
  value: number;
}

const useStyles = createStyles((theme) => ({
  card: {
    [theme.fn.smallerThan('md')]: {
      width: '90%',
      margin: 'auto',
    },
    [theme.fn.largerThan('md')]: {
      width: '60%',
      margin: 'auto',
    },
  },
}));

export function OfficeStatusCard() {
  const [userinfo, setUserInfo] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const { classes } = useStyles();
  const getNowUser = () => {
    setLoading(true);
    fetch('/api/users/getnowuser')
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
    setCurrentTime(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  };
  useEffect(() => {
    getNowUser();
    setCurrentTime(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  }, []);

  return (
    <Card padding="md" radius="md" withBorder shadow="sm" className={classes.card}>
      <LoadingOverlay visible={loading} />

      <Card.Section>
        <Group position="apart">
          <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
            オフィスステータス
          </Title>
          <ActionIcon color="blue" onClick={() => getNowUser()} style={{ marginRight: 15 }}>
            <IconReload />
          </ActionIcon>
        </Group>
      </Card.Section>

      <Group position="apart" mt="md" mb="md" style={{ marginLeft: 20, marginRight: 15 }}>
        <Text weight={500} style={{ margin: 2 }}>
          4Fオフィス
          <Badge
            color="blue"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            size="md"
            style={{ marginLeft: 10 }}
          >
            {userinfo.length}/15
          </Badge>
          {userinfo.map((user, index) => (
            <>
              <Group position="apart" style={{ margin: 2 }}>
                <Text key={index} weight={500}>
                  {user.name}
                </Text>
                <Badge>{user.value}</Badge>
              </Group>
            </>
          ))}
        </Text>
      </Group>
      <Divider />

      <Text size="sm" color="dimmed">
        データ取得時間: {currentTime}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        詳細を見る
      </Button>
    </Card>
  );
}
