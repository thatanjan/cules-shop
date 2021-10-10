import Profile from 'models/Profile'
import uploadImage from 'utils/cloudinary/uploadToCloudinary'
import sendErrorMessage from 'utils/errorMessage'
import successResponse from 'utils/successResponse'
import imageConfig from 'variables/cloudinaryVariables'
import deleteImage from 'utils/cloudinary/deleteImageFromCloudinary'

const PATH = 'cules-shop/profile/'

const PROFILE_PICTUE = 'profilePicture'

const UPLOAD = 'upload'
const REMOVE = 'remove'

const mainResolver = operation => async (
	_,
	{ image },
	{ user: { userID } }
) => {
	try {
		const profileData = await Profile.findOne({ user: userID }, PROFILE_PICTUE)

		const currentImage = profileData[PROFILE_PICTUE]

		if (!currentImage && operation === REMOVE) {
			return sendErrorMessage('no image found')
		}

		if (currentImage) {
			await deleteImage(currentImage)

			if (operation === REMOVE) {
				profileData[PROFILE_PICTUE] = ''

				await profileData.save()

				return successResponse()
			}
		}

		const imageID = await uploadImage(image, { folder: PATH, ...imageConfig })

		if (typeof imageID !== 'string')
			return sendErrorMessage('Uploading image failed')

		profileData[PROFILE_PICTUE] = imageID
		const res = await profileData.save()

		if (res) return successResponse()

		return sendErrorMessage('error')
	} catch (err) {
		return sendErrorMessage(err)
	}
}

const resolvers = {
	Mutation: {
		uploadProfilePicture: mainResolver(UPLOAD),
		removeProfilePicture: mainResolver(REMOVE),
	},
}

export default resolvers
