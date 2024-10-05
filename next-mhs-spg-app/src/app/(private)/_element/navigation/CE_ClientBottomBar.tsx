'use client'

import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type APP_MODULE_LABELS = "Home" | "Input" | "Report"
type APP_MODULE_PATH = '/home' | '/input' | '/report'

type T_Module = {
  id: string
  label: APP_MODULE_LABELS
  path: APP_MODULE_PATH
  icon: { base: string, active: string }
}

const APP_MODULES: T_Module[] = [{
  id: 'home',
  label: "Home",
  path: '/home',
  icon: { base: ICONPACK.home, active: ICONPACK.homeActive }
},
{
  id: 'input',
  label: "Input",
  path: '/input',
  icon: { base: ICONPACK.plus, active: ICONPACK.plusActive }
},
{
  id: 'report',
  label: "Report",
  path: '/report',
  icon: { base: ICONPACK.bookCheck, active: ICONPACK.bookCheckActive }
}]

const CE_ClientBottomBar = () => {
  const pathname = usePathname()
  return (
    <div className='fixed bottom-0 w-full h-16 bg-white flex justify-between p-8 items-center shadow-xl'>
      {APP_MODULES.map((menu) =>
        <Link id={menu?.id} key={menu?.id} href={menu.path} className='cursor-pointer hover:bg-red-50/50 p-2.5 rounded'>
          <Image src={pathname === menu.path ? menu.icon.active : menu?.icon.base} alt={menu?.label} width={22} height={22} />
        </Link>
      )}
    </div>
  )
}

export default CE_ClientBottomBar