import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Flex, Text } from '@chakra-ui/react'

const MAX_SIZE_IN_BYTES = 2000000

interface ImageUploaderProps {
  onSuccess: (file: File) => void
  isDisabled: boolean
}

export const ImageUploader = ({
  onSuccess,
  isDisabled,
}: ImageUploaderProps) => {
  const { open, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    maxSize: MAX_SIZE_IN_BYTES,
    multiple: false,
    noClick: true,
    disabled: isDisabled,
    onDropAccepted: (files: File[]) => {
      onSuccess(files[0])
    },
    onDropRejected: (fileRejections) => {
      alert(`ImageUploader error: ${fileRejections[0].errors[0].message}`)
    },
  })

  return (
    <Flex
      direction="column"
      w="600px"
      h="350px"
      borderRadius="16px"
      bgColor={isDragActive ? 'blue.50' : 'white'}
      align="center"
      justify="center"
      gap="24px"
      borderWidth="1px"
      borderColor={isDragActive ? 'blue.400' : 'gray.200'}
      {...getRootProps()}
      pb="10px"
    >
      <Text>
        Drag &apos;n&apos; drop image here, or select image from files
      </Text>
      <Button colorScheme="messenger" onClick={open} isDisabled={isDisabled}>
        Select image
      </Button>
    </Flex>
  )
}
