import { Card, Divider, Group, LoadingOverlay, Text, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';
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

export function LoginStatusCard() {
  const [userinfo, setUserInfo] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const { classes } = useStyles();

  useEffect(() => {
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
  }, []);

  return (
    <Card padding="md" radius="md" withBorder shadow="sm" className={classes.card}>
      <LoadingOverlay visible={loading} />

      <Card.Section>
        <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
          ログインステータス
        </Title>
      </Card.Section>

      <Group position="apart" mt="md" mb="md" style={{ marginLeft: 20, marginRight: 15 }}>
        <Text weight={500}>ログインに成功しました</Text>
      </Group>
      <Divider />

      <Text size="sm" color="dimmed">
        データ取得時間: {currentTime}
      </Text>
    </Card>
  );
}
