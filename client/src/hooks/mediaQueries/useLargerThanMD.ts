import { Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useLargerThanMD = () =>
	useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

export default useLargerThanMD
