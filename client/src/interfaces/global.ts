export interface AnyObject<T> {
	[key: string]: T
}

export interface CommonResponse {
	success?: boolean
	errorMessage?: string
}
