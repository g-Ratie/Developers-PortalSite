import { Button, Checkbox, Modal, SegmentedControl, Text } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

const Checkinform = () => {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [datetimeCheckboxValue, setDatetimeCheckboxValue] = useInputState(false);
  const [datetimeValue, setDatetimeValue] = useInputState(new Date());
  const [floor, setFloor] = useInputState('4F');
  return (
    <>
      <Modal opened={opened} onClose={close} title="オフィス入室" fullScreen>
        <Text> 階数選択</Text>
        <SegmentedControl fullWidth data={['4F', '2F']} value={floor} onChange={setFloor} />
        <p>DiscordID:{session?.user?.id}</p>
        <p>Discord名:{session?.user?.name}</p>
        <Checkbox label="入室時刻を手動で入力する" onChange={setDatetimeCheckboxValue} />
        <DateTimePicker
          label="時刻を入力してください"
          valueFormat="YYYY-MM-DD HH:mm"
          placeholder="Pick date and time"
          mx="auto"
          disabled={!datetimeCheckboxValue}
          defaultValue={new Date()}
          style={{ marginTop: 10 }}
          onChange={() => {
            setDatetimeValue;
          }}
        />
        <Button
          type="submit"
          onClick={() => {
            console.log('datetimeValue', datetimeValue, 'floor', floor);
            close;
          }}
        >
          送信
        </Button>
      </Modal>

      <Button fullWidth onClick={open}>
        入室
      </Button>
    </>
  );
};

export default Checkinform;
