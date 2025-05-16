export type Root = Root2[]

export interface Root2 {
  id: string
  is_posted: boolean
  is_liked: boolean
  post_by: string
  user_profile_url: string
  post_at_date: string
  post_at_time: string
  caption: string
  image: string
  likes_count: number
  comments_count: number
  likes: Like[]
  comments: Comment[]
}

export interface Like {
  id: string
  user: string
  like_by: string
  user_post: string
  user_profile_url: string
  like_at_date: string
  like_at_time: string
}

export interface Comment {
  id: string
  comment: string
  is_comment: boolean
  comment_by: string
  user_profile_url: string
  comment_at_date: string
  comment_at_time: string
}