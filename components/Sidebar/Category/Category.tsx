import React, { useState } from 'react';
import { Radio, RadioChangeEvent, Space } from 'antd';

function Category() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <h2 className="m-3 text-lg font-semibold">Category</h2>

      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>All</Radio>
          <Radio value={2}>Jordan</Radio>
          <Radio value={3}>Sneaker</Radio>
          <Radio value={4}>Scandal</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
}

export default Category;
