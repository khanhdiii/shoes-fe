import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

function UserProfile() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push('/'); // Redirect to home page after logout
  };

  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
      linkTo: '/profile',
    },
    {
      label: 'Logout',
      key: '2',
    },
  ];

  console.log(user);

  return (
    <div className="user-profile rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
      <div className="user-icon flex ">
        {user && user?.providerData?.[0]?.photoURL ? (
          <img
            src={user?.providerData?.[0]?.photoURL}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-[50%] mr-1"
          />
        ) : (
          <AiOutlineUser className="text-[24px]" />
        )}
        {user && (
          <Dropdown
            overlay={
              <Menu>
                {items.map((item) => (
                  <Menu.Item key={item.key}>
                    {item.key === '1' ? (
                      <Link href={item.linkTo}>{item.label}</Link>
                    ) : (
                      <a onClick={handleLogout}>{item.label}</a>
                    )}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {user?.displayName || user?.email}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
