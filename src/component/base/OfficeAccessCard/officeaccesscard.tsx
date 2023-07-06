import { Badge, Card, Group, LoadingOverlay, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Checkinform from './checkinForm/checkinform';
import Checkoutform from './checkoutForm/checkoutform';

interface DataObject {
  name: string;
  value: number;
  discord_id: string;
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

export function OfficeAccessCard() {
  const [userinfo, setUserInfo] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Group position="apart">
          <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
            オフィス入退室
          </Title>
          {(userinfo.some((item) => item.discord_id === session?.user?.id) && (
            <Badge color="green" variant="light" size="md" style={{ marginRight: 15 }}>
              入室中
            </Badge>
          )) || (
            <Badge color="red" variant="light" size="md" style={{ marginRight: 15 }}>
              未入室
            </Badge>
          )}
        </Group>
      </Card.Section>
      {(userinfo.some((item) => item.discord_id === session?.user?.id) && <Checkoutform />) || (
        <>
          <Checkinform />
        </>
      )}
    </Card>
  );
}
