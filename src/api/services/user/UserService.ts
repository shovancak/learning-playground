import { addUserImage } from './addUserImage'
import { getImageUrl } from './getImageUrl'
import { getUserById } from './getUserById'
import { removeUserImage } from './removeUserImage'
import { signUp } from './signUp'

export const UserService = {
  getUserById,
  signUp,
  getImageUrl,
  addUserImage,
  removeUserImage,
}
