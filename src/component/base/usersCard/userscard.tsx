import { Card, Select, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import UserAccordion from '../userTable/userTable';

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
const Userscard = () => {
  const { classes } = useStyles();
  return (
    <Card padding="md" radius="md" withBorder shadow="sm" className={classes.card}>
      <Card.Section>
        <Title order={3} align="left" mt="lg" mb="sm" style={{ marginLeft: 15 }}>
          INIAD Developers メンバー一覧
        </Title>
      </Card.Section>
      <Select
        label="ソート"
        placeholder="直近のin"
        data={[{ value: 'Recentin', label: '直近のin' }]}
        style={{ marginBottom: 15 }}
      />
      <UserAccordion />
    </Card>
  );
};

export default Userscard;
