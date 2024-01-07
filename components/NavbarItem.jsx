import Link from 'next/link';
import React from 'react';


const NavbarItem = ({url, label, active }) => {
  return (
    <Link href={url} className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </Link>
  )
}

export default NavbarItem;
