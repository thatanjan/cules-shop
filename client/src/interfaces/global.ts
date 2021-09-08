import { SxProps } from '@material-ui/system'
import { Theme } from '@material-ui/core/styles'

export interface AnyObject<T> {
	[key: string]: T
}

export interface CommonResponse {
	success?: boolean
	errorMessage?: string
}

export type Base64 = ArrayBuffer | string | null

export type SxTypes = SxProps<Theme>
