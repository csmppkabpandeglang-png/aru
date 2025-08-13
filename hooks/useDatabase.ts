
import { useState, useEffect } from 'react'
import type { 
  User, Client, Project, Transaction, TeamMember, Package, AddOn, Lead, 
  Card, FinancialPocket, Contract, Asset, ClientFeedback, Notification,
  SocialMediaPost, PromoCode, SOP, Profile
} from '../types'

import { 
  userService, clientService, projectService, transactionService, 
  teamMemberService, packageService, addOnService, leadService,
  cardService, financialPocketService, contractService, assetService,
  clientFeedbackService, notificationService, socialMediaPostService,
  promoCodeService, sopService, profileService
} from '../services/database'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError('Failed to load users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await userService.create(user)
      setUsers(prev => [newUser, ...prev])
      return newUser
    } catch (err) {
      setError('Failed to create user')
      throw err
    }
  }

  const updateUser = async (id: string, user: Partial<User>) => {
    try {
      const updatedUser = await userService.update(id, user)
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u))
      return updatedUser
    } catch (err) {
      setError('Failed to update user')
      throw err
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await userService.delete(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      setError('Failed to delete user')
      throw err
    }
  }

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: loadUsers
  }
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await clientService.getAll()
      setClients(data)
      setError(null)
    } catch (err) {
      setError('Failed to load clients')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (client: Omit<Client, 'id'>) => {
    try {
      const newClient = await clientService.create(client)
      setClients(prev => [newClient, ...prev])
      return newClient
    } catch (err) {
      setError('Failed to create client')
      throw err
    }
  }

  const updateClient = async (id: string, client: Partial<Client>) => {
    try {
      const updatedClient = await clientService.update(id, client)
      setClients(prev => prev.map(c => c.id === id ? updatedClient : c))
      return updatedClient
    } catch (err) {
      setError('Failed to update client')
      throw err
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await clientService.delete(id)
      setClients(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError('Failed to delete client')
      throw err
    }
  }

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refetch: loadClients
  }
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await projectService.getAll()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError('Failed to load projects')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await projectService.create(project)
      setProjects(prev => [newProject, ...prev])
      return newProject
    } catch (err) {
      setError('Failed to create project')
      throw err
    }
  }

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      const updatedProject = await projectService.update(id, project)
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p))
      return updatedProject
    } catch (err) {
      setError('Failed to update project')
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await projectService.delete(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete project')
      throw err
    }
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: loadProjects
  }
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const data = await profileService.get()
      setProfile(data)
      setError(null)
    } catch (err) {
      setError('Failed to load profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profileData: Omit<Profile, 'id'>) => {
    try {
      const updatedProfile = await profileService.createOrUpdate(profileData)
      setProfile(updatedProfile)
      return updatedProfile
    } catch (err) {
      setError('Failed to update profile')
      throw err
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: loadProfile
  }
}

// Export more hooks for other entities as needed
export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTeamMembers()
  }, [])

  const loadTeamMembers = async () => {
    try {
      setLoading(true)
      const data = await teamMemberService.getAll()
      setTeamMembers(data)
      setError(null)
    } catch (err) {
      setError('Failed to load team members')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    try {
      const newMember = await teamMemberService.create(member)
      setTeamMembers(prev => [newMember, ...prev])
      return newMember
    } catch (err) {
      setError('Failed to create team member')
      throw err
    }
  }

  const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
    try {
      const updatedMember = await teamMemberService.update(id, member)
      setTeamMembers(prev => prev.map(m => m.id === id ? updatedMember : m))
      return updatedMember
    } catch (err) {
      setError('Failed to update team member')
      throw err
    }
  }

  const deleteTeamMember = async (id: string) => {
    try {
      await teamMemberService.delete(id)
      setTeamMembers(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError('Failed to delete team member')
      throw err
    }
  }

  return {
    teamMembers,
    loading,
    error,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    refetch: loadTeamMembers
  }
}
