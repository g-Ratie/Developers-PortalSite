import { useState } from 'react';

function CheckboxList({ items }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      {items.map((item) => (
        <label key={item.key}>
          {item.name}
          <input name={item.name} type="checkbox" onChange={handleChange} />
        </label>
      ))}
      <div>Checked items: {JSON.stringify(checkedItems)}</div>
    </div>
  );
}

export default CheckboxList;
