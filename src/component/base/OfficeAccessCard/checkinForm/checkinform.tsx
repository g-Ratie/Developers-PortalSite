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

  const handleButtonClick = async () => {
    const userDiscordId = session?.user?.id; // Discord ID を設定
    const checkInTime = datetimeValue;
    const is4F = true; // 4Fにいるかどうかを設定
    const response = await fetch('/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userDiscordId,
        checkInTime,
        is4F,
      }),
    });
    console.log(response.body);
    close();
    window.location.reload();

    if (response.ok) {
      console.log('Record added successfully');
    } else {
      console.error('Error adding record', await response.json());
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="オフィス入室" fullScreen>
        <Text> 階数選択</Text>
        <SegmentedControl fullWidth data={['4F', '2F']} value={floor} onChange={setFloor} />
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
        <Button type="submit" onClick={handleButtonClick}>
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
