'use client'

import StoreProvider from '@/src/app/StoreProvider'
import React from 'react'
import FormVerifyEmail from './FormVerifyEmail'

interface propsVerifyEmail {
  params: {
    email: string
  }
}

const page = ({ params }: propsVerifyEmail) => {
  return (
    <StoreProvider>
      <FormVerifyEmail email={params.email} />
    </StoreProvider>
  )
}

export default page