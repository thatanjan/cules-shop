import Dialog from '@material-ui/core/Dialog'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

interface Props {
	previewLink: string
	handleDiscard: () => void
	handleAccept: () => void
	previewModalOpen: boolean
	productImage?: boolean
}

const UploadPreviewModal = ({
	previewLink,
	handleDiscard,
	handleAccept,
	previewModalOpen,
	productImage,
}: Props) => {
	return (
		<Dialog
			fullWidth
			aria-labelledby='simple-dialog-title'
			maxWidth='lg'
			open={previewModalOpen}
		>
			<DialogContent style={{ padding: 0 }}>
				<CardMedia
					style={{ height: 0, paddingTop: productImage ? '100%' : '56.25%' }}
					image={previewLink}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleDiscard}>discard</Button>
				<Button onClick={handleAccept}>OK</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UploadPreviewModal
