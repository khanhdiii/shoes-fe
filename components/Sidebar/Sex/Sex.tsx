import React, { useState } from 'react';
import { Radio, RadioChangeEvent, Space } from 'antd';

function Sex({ filterBySex }: any) {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    const selectedRange = e.target.value;
    setValue(selectedRange);
    filterBySex(selectedRange);
  };
  return (
    <div>
      <h2 className="m-3 text-lg font-semibold">Sex</h2>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>All</Radio>
          <Radio value={2}>Unisex</Radio>
          <Radio value={3}>Men</Radio>
          <Radio value={4}>Women</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
}

export default Sex;
