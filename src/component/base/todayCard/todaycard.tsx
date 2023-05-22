import {
  Accordion,
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

export function TodayCard() {
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
        console.log(data);
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
          オフィスステータス
        </Title>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>
          4Fオフィス
          <Badge
            color="blue"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            size="md"
            style={{ marginLeft: 10 }}
          >
            {/* 値を取得する */}
            {userinfo.length}/15
          </Badge>
          {userinfo.map((user, index) => (
            <Text key={index} weight={500}>
              {user.name}
            </Text>
          ))}
          <Accordion defaultValue="usertime">
            <Accordion.Item value="usertime">
              <Accordion.Control>詳細データ</Accordion.Control>
              <Accordion.Panel>
                {userinfo.map((user, index) => (
                  <Text key={index} weight={500}>
                    {user.name} in:{user.value}
                  </Text>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
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
