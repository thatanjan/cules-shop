import { Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useLargerThanLG = () =>
	useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

export default useLargerThanLG
