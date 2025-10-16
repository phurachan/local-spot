export interface SocialEmbedState {
  embedCache: Record<string, string> // url -> html
  isLoading: boolean
  error: any
  response: any
}

export interface SocialEmbedRequest {
  url: string
}

export interface SocialEmbedResponse {
  html: string
  platform: string
  url: string
}
