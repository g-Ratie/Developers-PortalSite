import { Button, Checkbox, Modal } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { useSession } from 'next-auth/react';

const Checkoutform = () => {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [datetimeCheckboxValue, setDatetimeCheckboxValue] = useInputState(false);
  const [datetimeValue, setDatetimeValue] = useInputState(new Date());

  const handleButtonClick = async () => {
    const userDiscordId = session?.user?.id; // Discord ID を設定
    const checkOutTime = datetimeValue;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userDiscordId,
        checkOutTime,
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
      <Modal opened={opened} onClose={close} title="オフィス退出" fullScreen>
        <p>Discord名:{session?.user?.name}</p>
        <Checkbox label="退出時刻を手動で入力する" onChange={setDatetimeCheckboxValue} />
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
        退出
      </Button>
    </>
  );
};

export default Checkoutform;
