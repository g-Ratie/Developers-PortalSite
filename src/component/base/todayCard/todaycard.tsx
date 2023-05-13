import {
  Accordion,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
interface DataObject {
  name: string;
  value: number;
}

export function TodayCard() {
  const [userinfo, setUserInfo] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetch('/api/nowuser')
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
    setCurrentTime(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  }, []);

  return (
    <Skeleton visible={loading} style={{ width: '66%', margin: 'auto' }}>
      <Card
        padding="md"
        radius="md"
        withBorder
        shadow="sm"
        style={{ borderLeft: '5px solid #00BFFF' }}
      >
        <Card.Section>
          <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
            オフィスステータス
          </Title>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>
            現在のオフィス利用者
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
                      {user.name}: {user.value}
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
    </Skeleton>
  );
}