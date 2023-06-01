import { Card, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';

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
const Errorcard = () => {
  const { classes } = useStyles();
  return (
    <Card padding="md" radius="md" withBorder shadow="sm" className={classes.card}>
      <Card.Section>
        <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
          認証エラー
        </Title>
      </Card.Section>
      <p>
        あなたのDIscordアカウントのINIAD Developers Discordサーバーへの所属を確認できませんでした。
      </p>
    </Card>
  );
};

export default Errorcard;
