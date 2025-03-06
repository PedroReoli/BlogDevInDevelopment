export interface Education {
  id: string
  title: string
  institution?: string
  year?: string
}

export interface SocialLink {
  id: string
  platform: string
  link: string
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  profileImage: string
  bio: string
  profession: string
  location: string
  age: number
  pronouns: string
  memberSince: string
  isPremium: boolean
  isOnline: boolean
  educations: Education[]
  socialLinks: SocialLink[]
}

