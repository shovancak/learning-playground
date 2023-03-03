import { Resolvers } from 'api/generated/resolvers-types'
import { ImageService } from 'api/services'

const ImageResolver: Resolvers = {
  Mutation: {
    generateUploadUrl: () => ImageService.generateUploadUrl(),
  },
}

export default ImageResolver
