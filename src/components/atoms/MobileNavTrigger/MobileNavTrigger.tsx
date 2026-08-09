import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@ui/sheet'
import clsx from 'clsx'
import { navigationItems } from '@consts/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { cn } from '@utils/cn'
import { isLinkActive } from '@utils/navigation'

const MobileNavTrigger = () => {
  const [open, setOpen] = useState(false)
  const { asPath } = useRouter()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label='Open menu'
          className={clsx(
            'flex items-center justify-center',
            'size-5 rounded-md',
            'text-white hover:bg-white/10',
            'lg:hidden',
          )}
        >
          <Menu className='size-5' aria-hidden='true' />
        </button>
      </SheetTrigger>
      <SheetContent side='left' className='bg-dark-gray w-72 border-none'>
        <SheetTitle className='sr-only'>Navigation</SheetTitle>
        <nav className='flex flex-col gap-1 p-4'>
          {navigationItems.map(item =>
            item.path ? (
              <Link
                key={item.path}
                href={item.path}
                target={item.opensInNewTab ? '_blank' : '_self'}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-base text-white',
                  isLinkActive(asPath, item.path) ? 'text-secondary-main' : '',
                )}
              >
                {item.text}
              </Link>
            ) : (
              <div key={item.text as string} className='mt-2'>
                <div className='text-muted-foreground px-3 pb-2 text-xs uppercase'>{item.text}</div>
                {item.subItems?.map(subItem => (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    target={subItem.opensInNewTab ? '_blank' : '_self'}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2 text-base text-white',
                      isLinkActive(asPath, subItem.path) ? 'text-secondary-main' : '',
                    )}
                  >
                    {subItem.text}
                  </Link>
                ))}
              </div>
            ),
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavTrigger
