import type { UserProfile, Education, SocialLink } from "@/types/userProfile"

// Mock data - this would be replaced with API calls in the future
const mockUserProfile: UserProfile = {
  id: "user123",
  username: "pedrosousa",
  displayName: "Pedro Sousa",
  profileImage: "/images/profile.jpg",
  bio: "Desenvolvedor apaixonado por inovação e tecnologia. Trabalho com desenvolvimento web há mais de 5 anos, focando em criar experiências de usuário intuitivas e acessíveis. Entusiasta de código aberto e sempre em busca de novos desafios.",
  profession: "Desenvolvedor Fullstack",
  location: "Rio de Janeiro, Brasil",
  age: 22,
  pronouns: "Ele/Dele",
  memberSince: "2022",
  isPremium: true,
  isOnline: true,
  educations: [
    { id: "edu1", title: "Bacharel em Ciência da Computação", institution: "UFRJ", year: "2021" },
    { id: "edu2", title: "Especialização em Desenvolvimento Web", institution: "PUC-Rio", year: "2023" },
  ],
  socialLinks: [
    { id: "soc1", platform: "GitHub", link: "github.com/pedrosousa" },
    { id: "soc2", platform: "LinkedIn", link: "linkedin.com/in/pedrosousa" },
    { id: "soc3", platform: "Website", link: "pedrosousa.dev" },
  ],
}

// Service for handling user profile data
export const userProfileService = {
  // Get user profile
  getUserProfile: async (_userId: string): Promise<UserProfile> => {
    // This would be an API call in a real application
    // For now, just return the mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserProfile)
      }, 500) // Simulate network delay
    })
  },

  // Update user profile
  updateUserProfile: async (profile: UserProfile): Promise<UserProfile> => {
    // This would be an API call in a real application
    // For now, just return the updated profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profile)
      }, 800) // Simulate network delay
    })
  },

  // Add education
  addEducation: async (_userId: string, education: Omit<Education, "id">): Promise<Education> => {
    // This would be an API call in a real application
    const newEducation: Education = {
      id: `edu_${Date.now()}`,
      ...education,
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newEducation)
      }, 300)
    })
  },

  // Remove education
  removeEducation: async (_userId: string, _educationId: string): Promise<boolean> => {
    // This would be an API call in a real application
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 300)
    })
  },

  // Add social link
  addSocialLink: async (_userId: string, socialLink: Omit<SocialLink, "id">): Promise<SocialLink> => {
    // This would be an API call in a real application
    const newSocialLink: SocialLink = {
      id: `soc_${Date.now()}`,
      ...socialLink,
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newSocialLink)
      }, 300)
    })
  },

  // Remove social link
  removeSocialLink: async (_userId: string, _socialLinkId: string): Promise<boolean> => {
    // This would be an API call in a real application
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 300)
    })
  },

  // Update profile image
  updateProfileImage: async (_userId: string, _imageFile: File): Promise<string> => {
    // This would be an API call to upload the image and get the URL
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate returning a URL to the uploaded image
        resolve(`/images/profile-${Date.now()}.jpg`)
      }, 1000)
    })
  },
}

