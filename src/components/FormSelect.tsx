import { useFormContext } from 'react-hook-form'
import { Select, SelectProps } from '@chakra-ui/react'

type FormSelectProps = {
  id: string
} & SelectProps

export const FormSelect = ({ id, ...rest }: FormSelectProps) => {
  const { register } = useFormContext()

  return <Select {...rest} {...register(id)} />
}
