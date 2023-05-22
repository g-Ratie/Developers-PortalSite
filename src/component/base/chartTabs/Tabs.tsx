import { Container, Tabs } from '@mantine/core';
import { IconCrown, IconGraph, IconSettings } from '@tabler/icons-react';
import MonthlyChart from '../EntrycountChart/chart';
import RankingChart from '../timeRankingChart/chart';

const ChartTabs = () => {
  return (
    <Container size="md">
      <Tabs color="indigo" defaultValue="ranking">
        <Tabs.List>
          <Tabs.Tab value="ranking" icon={<IconCrown size="0.8rem" />}>
            入室時間ランキング
          </Tabs.Tab>
          <Tabs.Tab value="entry" icon={<IconGraph size="0.8rem" />}>
            日別入室回数
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
            設定
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ranking" pl="md">
          <RankingChart />
        </Tabs.Panel>

        <Tabs.Panel value="entry" pl="md">
          <MonthlyChart />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pl="md">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ChartTabs;
