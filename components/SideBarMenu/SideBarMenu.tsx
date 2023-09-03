import React, { useState } from 'react';
import Category from '../Sidebar/Category/Category';
import Price from '../Sidebar/Price/Price';
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function SideBarMenu({ filterByPriceRange }: any) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('category');

  const handleMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <section className="w-[170px] flex flex-col items-center fixed border-r-2 border-solid">
      <Button
        type="text"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, left: 0, background: 'pink' }}
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
        <Menu.Item key="category">Category</Menu.Item>
        <Menu.Item key="price">Price</Menu.Item>
      </Menu>
      {selectedMenuItem === 'category' && <Category />}
      {selectedMenuItem === 'price' && (
        <Price filterByPriceRange={filterByPriceRange} />
      )}
    </section>
  );
}

export default SideBarMenu;
