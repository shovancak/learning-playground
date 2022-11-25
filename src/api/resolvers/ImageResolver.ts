import { Resolvers } from 'api/generated/resolvers-types'
import { ImageService } from 'api/services'

const ImageResolver: Resolvers = {
  Query: {
    generateUploadUrl: () => ImageService.generateUploadUrl(),
  },
}

export default ImageResolver
