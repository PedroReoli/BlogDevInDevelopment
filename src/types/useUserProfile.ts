"use client"

import { useState, useEffect } from "react"
import type { UserProfile, Education, SocialLink } from "@/types/userProfile"
import { userProfileService } from "@/services/userProfileService"
import { toast } from "react-hot-toast"

// Generate a unique ID for new items
const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`

export const useUserProfile = (userId: string) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch user profile
  const fetchUserProfile = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await userProfileService.getUserProfile(userId)
      setUserProfile(data)
    } catch (err) {
      console.error("Failed to fetch user profile:", err)
      setError("Failed to load profile data")
      toast.error("Failed to load profile data")
    } finally {
      setIsLoading(false)
    }
  }

  // Update user profile
  const updateProfile = async (updatedProfile: UserProfile) => {
    setIsUpdating(true)

    try {
      const updated = await userProfileService.updateUserProfile(updatedProfile)
      setUserProfile(updated)
      toast.success("Profile updated successfully")
      return true
    } catch (err) {
      console.error("Failed to update profile:", err)
      toast.error("Failed to update profile")
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  // Update a specific field
  const updateField = async (field: keyof UserProfile, value: any) => {
    if (!userProfile) return false

    const updatedProfile = {
      ...userProfile,
      [field]: value,
    }

    return updateProfile(updatedProfile)
  }

  // Add education
  const addEducation = async (title: string, institution?: string, year?: string) => {
    if (!userProfile) return false

    try {
      // In a real app, you'd call the API first
      const newEducation: Education = {
        id: generateId(),
        title,
        institution,
        year,
      }

      const updatedProfile = {
        ...userProfile,
        educations: [...userProfile.educations, newEducation],
      }

      const success = await updateProfile(updatedProfile)
      if (success) toast.success("Education added successfully")
      return success
    } catch (err) {
      console.error("Failed to add education:", err)
      toast.error("Failed to add education")
      return false
    }
  }

  // Remove education
  const removeEducation = async (educationId: string) => {
    if (!userProfile) return false

    try {
      const updatedProfile = {
        ...userProfile,
        educations: userProfile.educations.filter((edu) => edu.id !== educationId),
      }

      const success = await updateProfile(updatedProfile)
      if (success) toast.success("Education removed successfully")
      return success
    } catch (err) {
      console.error("Failed to remove education:", err)
      toast.error("Failed to remove education")
      return false
    }
  }

  // Add social link
  const addSocialLink = async (platform: string, link: string) => {
    if (!userProfile) return false

    try {
      const newSocialLink: SocialLink = {
        id: generateId(),
        platform,
        link,
      }

      const updatedProfile = {
        ...userProfile,
        socialLinks: [...userProfile.socialLinks, newSocialLink],
      }

      const success = await updateProfile(updatedProfile)
      if (success) toast.success("Social link added successfully")
      return success
    } catch (err) {
      console.error("Failed to add social link:", err)
      toast.error("Failed to add social link")
      return false
    }
  }

  // Remove social link
  const removeSocialLink = async (socialLinkId: string) => {
    if (!userProfile) return false

    try {
      const updatedProfile = {
        ...userProfile,
        socialLinks: userProfile.socialLinks.filter((link) => link.id !== socialLinkId),
      }

      const success = await updateProfile(updatedProfile)
      if (success) toast.success("Social link removed successfully")
      return success
    } catch (err) {
      console.error("Failed to remove social link:", err)
      toast.error("Failed to remove social link")
      return false
    }
  }

  // Load profile on mount
  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  return {
    userProfile,
    isLoading,
    isUpdating,
    error,
    updateProfile,
    updateField,
    addEducation,
    removeEducation,
    addSocialLink,
    removeSocialLink,
    refreshProfile: fetchUserProfile,
  }
}

