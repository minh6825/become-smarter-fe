// ClickOutline component
import React, { useEffect } from 'react';

type Props = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ClickOutline = ({ setIsMenuOpen, children }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = event.target as HTMLElement;
      if (!menuElement.closest('.menu-wrapper')) {  // Đảm bảo chỉ đóng khi click ngoài menu
        setIsMenuOpen(false);
      }
    };

    // Thêm sự kiện listener khi component mount
    document.addEventListener('click', handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return <div className="menu-wrapper">{children}</div>;
};

export default ClickOutline;
