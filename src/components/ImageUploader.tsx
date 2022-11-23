import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Flex, Text } from '@chakra-ui/react'

interface ImageUploaderProps {
  onSuccess: (file: File) => void
}

export const ImageUploader = ({ onSuccess }: ImageUploaderProps) => {
  const { open, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true,
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
      <Button colorScheme="messenger" onClick={open}>
        Select image
      </Button>
    </Flex>
  )
}
