import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode,
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return (
    <main className={cn('w-full h-full mt-24 pt-5 px-5 md:px-16 lg:px-32', className)}>
      {children}
    </main>
  )
}

export default Container