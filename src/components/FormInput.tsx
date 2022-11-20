import { useFormContext } from 'react-hook-form'
import { Input, InputProps } from '@chakra-ui/react'

type FormInputProps = {
  id: string
} & InputProps

export const FormInput = ({ id, ...rest }: FormInputProps) => {
  const { register } = useFormContext()

  return <Input {...rest} {...register(id)} />
}
