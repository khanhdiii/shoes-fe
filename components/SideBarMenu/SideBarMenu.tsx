import React, { useState } from 'react';
import Price from '../Sidebar/Price/Price';
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Sex from '../Sidebar/Sex/Sex';

function SideBarMenu({ filterByPriceRange, filterBySex }: any) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('sex');

  const handleMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <section className="w-[200px] flex-col items-center fixed border-r-2 border-solid ml-3">
      <Button
        type="text"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, left: 0, background: '#bae0ff' }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="horizontal"
        // theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={[selectedMenuItem]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="sex">Sex</Menu.Item>
        <Menu.Item key="price">Price</Menu.Item>
      </Menu>
      {/* {selectedMenuItem === 'sex' && <Category />} */}
      {selectedMenuItem === 'sex' && <Sex filterBySex={filterBySex} />}
      {selectedMenuItem === 'price' && (
        <Price filterByPriceRange={filterByPriceRange} />
      )}
    </section>
  );
}

export default SideBarMenu;
