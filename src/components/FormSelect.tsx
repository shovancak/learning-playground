import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectProps } from '@chakra-ui/react'

type FormSelectProps = {
  id: string
  name: string
  options: { label: string; value: string }[]
} & SelectProps

export const FormSelect = ({ id, name, options, ...rest }: FormSelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          name={name}
          id="role"
          placeholder="Choose your role"
          value={value}
          onChange={onChange}
          {...rest}
        >
          {options.map(({ label, value: optionValue }) => (
            <option key={label} value={optionValue}>
              {label}
            </option>
          ))}
        </Select>
      )}
    />
  )
}
