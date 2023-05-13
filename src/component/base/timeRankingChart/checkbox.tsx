import { useState } from 'react';
interface DataObject {
  name: string;
  value: number;
}
function CheckboxList({ items }: { items: DataObject[] }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      {items.map((item) => (
        <label key={item.name}>
          {item.name}
          <input name={item.name} type="checkbox" onChange={handleChange} />
        </label>
      ))}
      <div>Checked items: {JSON.stringify(checkedItems)}</div>
    </div>
  );
}

export default CheckboxList;
