import React, { useState } from 'react';
import { Radio, RadioChangeEvent, Space } from 'antd';

function Price({ filterByPriceRange }: any) {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    const selectedRange = e.target.value;
    setValue(selectedRange);
    filterByPriceRange(selectedRange);
  };
  return (
    <div>
      <h2 className="m-3 text-lg font-semibold">Price</h2>

      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>All</Radio>
          <Radio value={2}>0 - 1.000.000</Radio>
          <Radio value={3}>1.000.000 - 2.000.000</Radio>
          <Radio value={4}>2.000.000 - 3.000.000</Radio>
          <Radio value={5}>Over</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
}

export default Price;
