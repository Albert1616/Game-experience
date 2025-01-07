import React from 'react'
import { Input } from '../ui/input'
import { UseFormRegister } from 'react-hook-form'
import { UserCredentialsType, UserType } from '@/utils/formTypesZod'

type TypeName = "name" | "email" | "password" | "confirm_password";

type Props = {
  placeholder: string,
  type: string,
  name: TypeName
  register: UseFormRegister<UserType>
}

const InputFormUser = ({ placeholder, type, name, register }: Props) => {
  return (
    <Input placeholder={placeholder} type={type} {...register(name)}
      className='focus:outline-none rounded-lg border 
      border-primaryDark dark:border-primary text-white dark:text-black text-[15px] font-semibold
      placeholder:dark:text-black' />
  )
}

export default InputFormUser