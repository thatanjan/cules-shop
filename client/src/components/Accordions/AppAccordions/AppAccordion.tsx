import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { nanoid } from 'nanoid'

import MuiLink from 'components/Links/MuiLink'

import AppAccordionData from './AppAccordionsData'

const useStyles = makeStyles({
	expandIconStyle: {
		'& .MuiAccordionSummary-expandIconWrapper': {
			color: 'white',
		},
	},
})

const AppAccordion = () => {
	const { expandIconStyle } = useStyles()
	return (
		<>
			{AppAccordionData.map(({ name, linkData }) => (
				<Accordion key={nanoid()}>
					<AccordionSummary
						className={expandIconStyle}
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography sx={{ textTransform: 'capitalize' }}>{name}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<List>
							{linkData.map(({ linkPath, linkName }) => (
								<ListItem key={nanoid()}>
									<MuiLink
										MuiComponent={ListItemText}
										href={linkPath}
										primary={linkName}
										sx={{ textTransform: 'capitalize' }}
									/>
								</ListItem>
							))}
						</List>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	)
}

export default AppAccordion
