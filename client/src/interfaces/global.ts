export interface AnyObject<T> {
	[key: string]: T
}

export interface CommonResponse {
	success?: boolean
	errorMessage?: string
}

export type Base64 = ArrayBuffer | string | null
