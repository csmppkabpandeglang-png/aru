import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'
import type { 
  User, Client, Project, Transaction, TeamMember, Package, AddOn, Lead, 
  Card, FinancialPocket, Contract, Asset, ClientFeedback, Notification,
  SocialMediaPost, PromoCode, SOP, Profile, PaymentStatus, ClientStatus,
  TransactionType, LeadStatus, ContactChannel, AssetStatus, PostStatus,
  PostType, SatisfactionLevel, RevisionStatus, PerformanceNoteType,
  PocketType, CardType, ClientType
} from '../types'

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Supabase ${operation} error:`, error)
  throw new Error(`Failed to ${operation}: ${error.message}`)
}

// User Service
export const userService = {
  async getAll(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(user => ({
        id: user.id,
        email: user.email,
        password: user.password,
        fullName: user.full_name,
        role: user.role as 'Admin' | 'Member',
        permissions: user.permissions as any[]
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch users')
    }
  },

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: user.email,
          password: user.password,
          full_name: user.fullName,
          role: user.role,
          permissions: user.permissions || []
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        email: data.email,
        password: data.password,
        fullName: data.full_name,
        role: data.role as 'Admin' | 'Member',
        permissions: data.permissions as any[]
      }
    } catch (error) {
      handleSupabaseError(error, 'create user')
    }
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    try {
      const updateData: any = {}
      if (user.email) updateData.email = user.email
      if (user.password) updateData.password = user.password
      if (user.fullName) updateData.full_name = user.fullName
      if (user.role) updateData.role = user.role
      if (user.permissions !== undefined) updateData.permissions = user.permissions

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        email: data.email,
        password: data.password,
        fullName: data.full_name,
        role: data.role as 'Admin' | 'Member',
        permissions: data.permissions as any[]
      }
    } catch (error) {
      handleSupabaseError(error, 'update user')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete user')
    }
  }
}

// Client Service
export const clientService = {
  async getAll(): Promise<Client[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        since: client.since,
        instagram: client.instagram || undefined,
        status: client.status as ClientStatus,
        clientType: client.client_type as ClientType,
        lastContact: client.last_contact,
        portalAccessId: client.portal_access_id
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch clients')
    }
  },

  async create(client: Omit<Client, 'id'>): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: client.name,
          email: client.email,
          phone: client.phone,
          since: client.since,
          instagram: client.instagram,
          status: client.status,
          client_type: client.clientType,
          last_contact: client.lastContact,
          portal_access_id: client.portalAccessId
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        since: data.since,
        instagram: data.instagram || undefined,
        status: data.status as ClientStatus,
        clientType: data.client_type as ClientType,
        lastContact: data.last_contact,
        portalAccessId: data.portal_access_id
      }
    } catch (error) {
      handleSupabaseError(error, 'create client')
    }
  },

  async update(id: string, client: Partial<Client>): Promise<Client> {
    try {
      const updateData: any = {}
      if (client.name) updateData.name = client.name
      if (client.email) updateData.email = client.email
      if (client.phone) updateData.phone = client.phone
      if (client.since) updateData.since = client.since
      if (client.instagram !== undefined) updateData.instagram = client.instagram
      if (client.status) updateData.status = client.status
      if (client.clientType) updateData.client_type = client.clientType
      if (client.lastContact) updateData.last_contact = client.lastContact
      if (client.portalAccessId) updateData.portal_access_id = client.portalAccessId

      const { data, error } = await supabase
        .from('clients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        since: data.since,
        instagram: data.instagram || undefined,
        status: data.status as ClientStatus,
        clientType: data.client_type as ClientType,
        lastContact: data.last_contact,
        portalAccessId: data.portal_access_id
      }
    } catch (error) {
      handleSupabaseError(error, 'update client')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete client')
    }
  }
}

// Project Service
export const projectService = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(project => ({
        id: project.id,
        projectName: project.project_name,
        clientName: project.client_name,
        clientId: project.client_id,
        projectType: project.project_type,
        packageName: project.package_name,
        packageId: project.package_id,
        addOns: project.add_ons || [],
        date: project.date,
        deadlineDate: project.deadline_date || undefined,
        location: project.location,
        progress: project.progress,
        status: project.status,
        activeSubStatuses: project.active_sub_statuses || undefined,
        totalCost: project.total_cost,
        amountPaid: project.amount_paid,
        paymentStatus: project.payment_status as PaymentStatus,
        team: project.team || [],
        notes: project.notes || undefined,
        accommodation: project.accommodation || undefined,
        driveLink: project.drive_link || undefined,
        clientDriveLink: project.client_drive_link || undefined,
        finalDriveLink: project.final_drive_link || undefined,
        startTime: project.start_time || undefined,
        endTime: project.end_time || undefined,
        image: project.image || undefined,
        revisions: project.revisions || undefined,
        promoCodeId: project.promo_code_id || undefined,
        discountAmount: project.discount_amount || undefined,
        shippingDetails: project.shipping_details || undefined,
        dpProofUrl: project.dp_proof_url || undefined,
        printingDetails: project.printing_details || undefined,
        printingCost: project.printing_cost || undefined,
        transportCost: project.transport_cost || undefined,
        isEditingConfirmedByClient: project.is_editing_confirmed_by_client || undefined,
        isPrintingConfirmedByClient: project.is_printing_confirmed_by_client || undefined,
        isDeliveryConfirmedByClient: project.is_delivery_confirmed_by_client || undefined,
        confirmedSubStatuses: project.confirmed_sub_statuses || undefined,
        clientSubStatusNotes: project.client_sub_status_notes || undefined,
        subStatusConfirmationSentAt: project.sub_status_confirmation_sent_at || undefined,
        completedDigitalItems: project.completed_digital_items || undefined,
        invoiceSignature: project.invoice_signature || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch projects')
    }
  },

  async create(project: Omit<Project, 'id'>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          project_name: project.projectName,
          client_name: project.clientName,
          client_id: project.clientId,
          project_type: project.projectType,
          package_name: project.packageName,
          package_id: project.packageId,
          add_ons: project.addOns,
          date: project.date,
          deadline_date: project.deadlineDate,
          location: project.location,
          progress: project.progress,
          status: project.status,
          active_sub_statuses: project.activeSubStatuses,
          total_cost: project.totalCost,
          amount_paid: project.amountPaid,
          payment_status: project.paymentStatus,
          team: project.team,
          notes: project.notes,
          accommodation: project.accommodation,
          drive_link: project.driveLink,
          client_drive_link: project.clientDriveLink,
          final_drive_link: project.finalDriveLink,
          start_time: project.startTime,
          end_time: project.endTime,
          image: project.image,
          revisions: project.revisions,
          promo_code_id: project.promoCodeId,
          discount_amount: project.discountAmount,
          shipping_details: project.shippingDetails,
          dp_proof_url: project.dpProofUrl,
          printing_details: project.printingDetails,
          printing_cost: project.printingCost,
          transport_cost: project.transportCost,
          is_editing_confirmed_by_client: project.isEditingConfirmedByClient,
          is_printing_confirmed_by_client: project.isPrintingConfirmedByClient,
          is_delivery_confirmed_by_client: project.isDeliveryConfirmedByClient,
          confirmed_sub_statuses: project.confirmedSubStatuses,
          client_sub_status_notes: project.clientSubStatusNotes,
          sub_status_confirmation_sent_at: project.subStatusConfirmationSentAt,
          completed_digital_items: project.completedDigitalItems,
          invoice_signature: project.invoiceSignature
        })
        .select()
        .single()

      if (error) throw error

      return this.mapDatabaseToProject(data)
    } catch (error) {
      handleSupabaseError(error, 'create project')
    }
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    try {
      const updateData: any = {}
      if (project.projectName) updateData.project_name = project.projectName
      if (project.clientName) updateData.client_name = project.clientName
      if (project.clientId) updateData.client_id = project.clientId
      if (project.projectType) updateData.project_type = project.projectType
      if (project.packageName) updateData.package_name = project.packageName
      if (project.packageId) updateData.package_id = project.packageId
      if (project.addOns !== undefined) updateData.add_ons = project.addOns
      if (project.date) updateData.date = project.date
      if (project.deadlineDate !== undefined) updateData.deadline_date = project.deadlineDate
      if (project.location) updateData.location = project.location
      if (project.progress !== undefined) updateData.progress = project.progress
      if (project.status) updateData.status = project.status
      if (project.activeSubStatuses !== undefined) updateData.active_sub_statuses = project.activeSubStatuses
      if (project.totalCost !== undefined) updateData.total_cost = project.totalCost
      if (project.amountPaid !== undefined) updateData.amount_paid = project.amountPaid
      if (project.paymentStatus) updateData.payment_status = project.paymentStatus
      if (project.team !== undefined) updateData.team = project.team
      if (project.notes !== undefined) updateData.notes = project.notes
      if (project.accommodation !== undefined) updateData.accommodation = project.accommodation
      if (project.driveLink !== undefined) updateData.drive_link = project.driveLink
      if (project.clientDriveLink !== undefined) updateData.client_drive_link = project.clientDriveLink
      if (project.finalDriveLink !== undefined) updateData.final_drive_link = project.finalDriveLink
      if (project.startTime !== undefined) updateData.start_time = project.startTime
      if (project.endTime !== undefined) updateData.end_time = project.endTime
      if (project.image !== undefined) updateData.image = project.image
      if (project.revisions !== undefined) updateData.revisions = project.revisions
      if (project.promoCodeId !== undefined) updateData.promo_code_id = project.promoCodeId
      if (project.discountAmount !== undefined) updateData.discount_amount = project.discountAmount
      if (project.shippingDetails !== undefined) updateData.shipping_details = project.shippingDetails
      if (project.dpProofUrl !== undefined) updateData.dp_proof_url = project.dpProofUrl
      if (project.printingDetails !== undefined) updateData.printing_details = project.printingDetails
      if (project.printingCost !== undefined) updateData.printing_cost = project.printingCost
      if (project.transportCost !== undefined) updateData.transport_cost = project.transportCost
      if (project.isEditingConfirmedByClient !== undefined) updateData.is_editing_confirmed_by_client = project.isEditingConfirmedByClient
      if (project.isPrintingConfirmedByClient !== undefined) updateData.is_printing_confirmed_by_client = project.isPrintingConfirmedByClient
      if (project.isDeliveryConfirmedByClient !== undefined) updateData.is_delivery_confirmed_by_client = project.isDeliveryConfirmedByClient
      if (project.confirmedSubStatuses !== undefined) updateData.confirmed_sub_statuses = project.confirmedSubStatuses
      if (project.clientSubStatusNotes !== undefined) updateData.client_sub_status_notes = project.clientSubStatusNotes
      if (project.subStatusConfirmationSentAt !== undefined) updateData.sub_status_confirmation_sent_at = project.subStatusConfirmationSentAt
      if (project.completedDigitalItems !== undefined) updateData.completed_digital_items = project.completedDigitalItems
      if (project.invoiceSignature !== undefined) updateData.invoice_signature = project.invoiceSignature

      const { data: updatedData, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return this.mapDatabaseToProject(updatedData)
    } catch (error) {
      handleSupabaseError(error, 'update project')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete project')
    }
  },

  mapDatabaseToProject(data: any): Project {
    return {
      id: data.id,
      projectName: data.project_name,
      clientName: data.client_name,
      clientId: data.client_id,
      projectType: data.project_type,
      packageName: data.package_name,
      packageId: data.package_id,
      addOns: data.add_ons || [],
      date: data.date,
      deadlineDate: data.deadline_date || undefined,
      location: data.location,
      progress: data.progress,
      status: data.status,
      activeSubStatuses: data.active_sub_statuses || undefined,
      totalCost: data.total_cost,
      amountPaid: data.amount_paid,
      paymentStatus: data.payment_status as PaymentStatus,
      team: data.team || [],
      notes: data.notes || undefined,
      accommodation: data.accommodation || undefined,
      driveLink: data.drive_link || undefined,
      clientDriveLink: data.client_drive_link || undefined,
      finalDriveLink: data.final_drive_link || undefined,
      startTime: data.start_time || undefined,
      endTime: data.end_time || undefined,
      image: data.image || undefined,
      revisions: data.revisions || undefined,
      promoCodeId: data.promo_code_id || undefined,
      discountAmount: data.discount_amount || undefined,
      shippingDetails: data.shipping_details || undefined,
      dpProofUrl: data.dp_proof_url || undefined,
      printingDetails: data.printing_details || undefined,
      printingCost: data.printing_cost || undefined,
      transportCost: data.transport_cost || undefined,
      isEditingConfirmedByClient: data.is_editing_confirmed_by_client || undefined,
      isPrintingConfirmedByClient: data.is_printing_confirmed_by_client || undefined,
      isDeliveryConfirmedByClient: data.is_delivery_confirmed_by_client || undefined,
      confirmedSubStatuses: data.confirmed_sub_statuses || undefined,
      clientSubStatusNotes: data.client_sub_status_notes || undefined,
      subStatusConfirmationSentAt: data.sub_status_confirmation_sent_at || undefined,
      completedDigitalItems: data.completed_digital_items || undefined,
      invoiceSignature: data.invoice_signature || undefined
    }
  }
}

// Transaction Service
export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      
      return data.map(transaction => ({
        id: transaction.id,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type as TransactionType,
        projectId: transaction.project_id || undefined,
        category: transaction.category,
        method: transaction.method as any,
        pocketId: transaction.pocket_id || undefined,
        cardId: transaction.card_id || undefined,
        printingItemId: transaction.printing_item_id || undefined,
        vendorSignature: transaction.vendor_signature || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch transactions')
    }
  },

  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          project_id: transaction.projectId,
          category: transaction.category,
          method: transaction.method,
          pocket_id: transaction.pocketId,
          card_id: transaction.cardId,
          printing_item_id: transaction.printingItemId,
          vendor_signature: transaction.vendorSignature,
          team_member_id: (transaction as any).teamMemberId
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        date: data.date,
        description: data.description,
        amount: data.amount,
        type: data.type as TransactionType,
        projectId: data.project_id || undefined,
        category: data.category,
        method: data.method as any,
        pocketId: data.pocket_id || undefined,
        cardId: data.card_id || undefined,
        printingItemId: data.printing_item_id || undefined,
        vendorSignature: data.vendor_signature || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create transaction')
    }
  },

  async update(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    try {
      const updateData: any = {}
      if (transaction.date) updateData.date = transaction.date
      if (transaction.description) updateData.description = transaction.description
      if (transaction.amount !== undefined) updateData.amount = transaction.amount
      if (transaction.type) updateData.type = transaction.type
      if (transaction.projectId !== undefined) updateData.project_id = transaction.projectId
      if (transaction.category) updateData.category = transaction.category
      if (transaction.method) updateData.method = transaction.method
      if (transaction.pocketId !== undefined) updateData.pocket_id = transaction.pocketId
      if (transaction.cardId !== undefined) updateData.card_id = transaction.cardId
      if (transaction.printingItemId !== undefined) updateData.printing_item_id = transaction.printingItemId
      if (transaction.vendorSignature !== undefined) updateData.vendor_signature = transaction.vendorSignature

      const { data: updatedData, error } = await supabase
        .from('transactions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        date: updatedData.date,
        description: updatedData.description,
        amount: updatedData.amount,
        type: updatedData.type as TransactionType,
        projectId: updatedData.project_id || undefined,
        category: updatedData.category,
        method: updatedData.method as any,
        pocketId: updatedData.pocket_id || undefined,
        cardId: updatedData.card_id || undefined,
        printingItemId: updatedData.printing_item_id || undefined,
        vendorSignature: updatedData.vendor_signature || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update transaction')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete transaction')
    }
  }
}

// Team Member Service
export const teamMemberService = {
  async getAll(): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(member => ({
        id: member.id,
        name: member.name,
        role: member.role,
        email: member.email,
        phone: member.phone,
        standardFee: member.standard_fee,
        noRek: member.no_rek || undefined,
        rewardBalance: member.reward_balance,
        rating: member.rating,
        performanceNotes: member.performance_notes || [],
        portalAccessId: member.portal_access_id
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch team members')
    }
  },

  async create(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert({
          name: member.name,
          role: member.role,
          email: member.email,
          phone: member.phone,
          standard_fee: member.standardFee,
          no_rek: member.noRek,
          reward_balance: member.rewardBalance,
          rating: member.rating,
          performance_notes: member.performanceNotes,
          portal_access_id: member.portalAccessId
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        role: data.role,
        email: data.email,
        phone: data.phone,
        standardFee: data.standard_fee,
        noRek: data.no_rek || undefined,
        rewardBalance: data.reward_balance,
        rating: data.rating,
        performanceNotes: data.performance_notes || [],
        portalAccessId: data.portal_access_id
      }
    } catch (error) {
      handleSupabaseError(error, 'create team member')
    }
  },

  async update(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    try {
      const updateData: any = {}
      if (member.name) updateData.name = member.name
      if (member.role) updateData.role = member.role
      if (member.email) updateData.email = member.email
      if (member.phone) updateData.phone = member.phone
      if (member.standardFee !== undefined) updateData.standard_fee = member.standardFee
      if (member.noRek !== undefined) updateData.no_rek = member.noRek
      if (member.rewardBalance !== undefined) updateData.reward_balance = member.rewardBalance
      if (member.rating !== undefined) updateData.rating = member.rating
      if (member.performanceNotes !== undefined) updateData.performance_notes = member.performanceNotes
      if (member.portalAccessId) updateData.portal_access_id = member.portalAccessId

      const { data: updatedData, error } = await supabase
        .from('team_members')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        role: updatedData.role,
        email: updatedData.email,
        phone: updatedData.phone,
        standardFee: updatedData.standard_fee,
        noRek: updatedData.no_rek || undefined,
        rewardBalance: updatedData.reward_balance,
        rating: updatedData.rating,
        performanceNotes: updatedData.performance_notes || [],
        portalAccessId: updatedData.portal_access_id
      }
    } catch (error) {
      handleSupabaseError(error, 'update team member')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete team member')
    }
  }
}

// Package Service
export const packageService = {
  async getAll(): Promise<Package[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        physicalItems: pkg.physical_items || [],
        digitalItems: pkg.digital_items || [],
        processingTime: pkg.processing_time,
        defaultPrintingCost: pkg.default_printing_cost || undefined,
        defaultTransportCost: pkg.default_transport_cost || undefined,
        photographers: pkg.photographers || undefined,
        videographers: pkg.videographers || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch packages')
    }
  },

  async create(pkg: Omit<Package, 'id'>): Promise<Package> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .insert({
          name: pkg.name,
          price: pkg.price,
          physical_items: pkg.physicalItems,
          digital_items: pkg.digitalItems,
          processing_time: pkg.processingTime,
          default_printing_cost: pkg.defaultPrintingCost,
          default_transport_cost: pkg.defaultTransportCost,
          photographers: pkg.photographers,
          videographers: pkg.videographers
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        physicalItems: data.physical_items || [],
        digitalItems: data.digital_items || [],
        processingTime: data.processing_time,
        defaultPrintingCost: data.default_printing_cost || undefined,
        defaultTransportCost: data.default_transport_cost || undefined,
        photographers: data.photographers || undefined,
        videographers: data.videographers || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create package')
    }
  },

  async update(id: string, pkg: Partial<Package>): Promise<Package> {
    try {
      const updateData: any = {}
      if (pkg.name) updateData.name = pkg.name
      if (pkg.price !== undefined) updateData.price = pkg.price
      if (pkg.physicalItems !== undefined) updateData.physical_items = pkg.physicalItems
      if (pkg.digitalItems !== undefined) updateData.digital_items = pkg.digitalItems
      if (pkg.processingTime) updateData.processing_time = pkg.processingTime
      if (pkg.defaultPrintingCost !== undefined) updateData.default_printing_cost = pkg.defaultPrintingCost
      if (pkg.defaultTransportCost !== undefined) updateData.default_transport_cost = pkg.defaultTransportCost
      if (pkg.photographers !== undefined) updateData.photographers = pkg.photographers
      if (pkg.videographers !== undefined) updateData.videographers = pkg.videographers

      const { data: updatedData, error } = await supabase
        .from('packages')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        price: updatedData.price,
        physicalItems: updatedData.physical_items || [],
        digitalItems: updatedData.digital_items || [],
        processingTime: updatedData.processing_time,
        defaultPrintingCost: updatedData.default_printing_cost || undefined,
        defaultTransportCost: updatedData.default_transport_cost || undefined,
        photographers: updatedData.photographers || undefined,
        videographers: updatedData.videographers || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update package')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete package')
    }
  }
}

// Add-On Service
export const addOnService = {
  async getAll(): Promise<AddOn[]> {
    try {
      const { data, error } = await supabase
        .from('add_ons')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(addon => ({
        id: addon.id,
        name: addon.name,
        price: addon.price
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch add-ons')
    }
  },

  async create(addon: Omit<AddOn, 'id'>): Promise<AddOn> {
    try {
      const { data, error } = await supabase
        .from('add_ons')
        .insert({
          name: addon.name,
          price: addon.price
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        price: data.price
      }
    } catch (error) {
      handleSupabaseError(error, 'create add-on')
    }
  },

  async update(id: string, addon: Partial<AddOn>): Promise<AddOn> {
    try {
      const updateData: any = {}
      if (addon.name) updateData.name = addon.name
      if (addon.price !== undefined) updateData.price = addon.price

      const { data: updatedData, error } = await supabase
        .from('add_ons')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        price: updatedData.price
      }
    } catch (error) {
      handleSupabaseError(error, 'update add-on')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('add_ons')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete add-on')
    }
  }
}

// Lead Service
export const leadService = {
  async getAll(): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(lead => ({
        id: lead.id,
        name: lead.name,
        contactChannel: lead.contact_channel as ContactChannel,
        location: lead.location,
        status: lead.status as LeadStatus,
        date: lead.date,
        notes: lead.notes || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch leads')
    }
  },

  async create(lead: Omit<Lead, 'id'>): Promise<Lead> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: lead.name,
          contact_channel: lead.contactChannel,
          location: lead.location,
          status: lead.status,
          date: lead.date,
          notes: lead.notes
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        contactChannel: data.contact_channel as ContactChannel,
        location: data.location,
        status: data.status as LeadStatus,
        date: data.date,
        notes: data.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create lead')
    }
  },

  async update(id: string, lead: Partial<Lead>): Promise<Lead> {
    try {
      const updateData: any = {}
      if (lead.name) updateData.name = lead.name
      if (lead.contactChannel) updateData.contact_channel = lead.contactChannel
      if (lead.location) updateData.location = lead.location
      if (lead.status) updateData.status = lead.status
      if (lead.date) updateData.date = lead.date
      if (lead.notes !== undefined) updateData.notes = lead.notes

      const { data: updatedData, error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        contactChannel: updatedData.contact_channel as ContactChannel,
        location: updatedData.location,
        status: updatedData.status as LeadStatus,
        date: updatedData.date,
        notes: updatedData.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update lead')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete lead')
    }
  }
}

// Card Service
export const cardService = {
  async getAll(): Promise<Card[]> {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(card => ({
        id: card.id,
        cardHolderName: card.card_holder_name,
        bankName: card.bank_name,
        cardType: card.card_type as CardType,
        lastFourDigits: card.last_four_digits,
        expiryDate: card.expiry_date || undefined,
        balance: card.balance,
        colorGradient: card.color_gradient
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch cards')
    }
  },

  async create(card: Omit<Card, 'id'>): Promise<Card> {
    try {
      const { data, error } = await supabase
        .from('cards')
        .insert({
          card_holder_name: card.cardHolderName,
          bank_name: card.bankName,
          card_type: card.cardType,
          last_four_digits: card.lastFourDigits,
          expiry_date: card.expiryDate,
          balance: card.balance,
          color_gradient: card.colorGradient
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        cardHolderName: data.card_holder_name,
        bankName: data.bank_name,
        cardType: data.card_type as CardType,
        lastFourDigits: data.last_four_digits,
        expiryDate: data.expiry_date || undefined,
        balance: data.balance,
        colorGradient: data.color_gradient
      }
    } catch (error) {
      handleSupabaseError(error, 'create card')
    }
  },

  async update(id: string, card: Partial<Card>): Promise<Card> {
    try {
      const updateData: any = {}
      if (card.cardHolderName) updateData.card_holder_name = card.cardHolderName
      if (card.bankName) updateData.bank_name = card.bankName
      if (card.cardType) updateData.card_type = card.cardType
      if (card.lastFourDigits) updateData.last_four_digits = card.lastFourDigits
      if (card.expiryDate !== undefined) updateData.expiry_date = card.expiryDate
      if (card.balance !== undefined) updateData.balance = card.balance
      if (card.colorGradient) updateData.color_gradient = card.colorGradient

      const { data: updatedData, error } = await supabase
        .from('cards')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        cardHolderName: updatedData.card_holder_name,
        bankName: updatedData.bank_name,
        cardType: updatedData.card_type as CardType,
        lastFourDigits: updatedData.last_four_digits,
        expiryDate: updatedData.expiry_date || undefined,
        balance: updatedData.balance,
        colorGradient: updatedData.color_gradient
      }
    } catch (error) {
      handleSupabaseError(error, 'update card')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete card')
    }
  }
}

// Financial Pocket Service
export const financialPocketService = {
  async getAll(): Promise<FinancialPocket[]> {
    try {
      const { data, error } = await supabase
        .from('financial_pockets')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(pocket => ({
        id: pocket.id,
        name: pocket.name,
        description: pocket.description,
        icon: pocket.icon as any,
        type: pocket.type as PocketType,
        amount: pocket.amount,
        goalAmount: pocket.goal_amount || undefined,
        lockEndDate: pocket.lock_end_date || undefined,
        sourceCardId: pocket.source_card_id || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch financial pockets')
    }
  },

  async create(pocket: Omit<FinancialPocket, 'id'>): Promise<FinancialPocket> {
    try {
      const { data, error } = await supabase
        .from('financial_pockets')
        .insert({
          name: pocket.name,
          description: pocket.description,
          icon: pocket.icon,
          type: pocket.type,
          amount: pocket.amount,
          goal_amount: pocket.goalAmount,
          lock_end_date: pocket.lockEndDate,
          source_card_id: pocket.sourceCardId
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        icon: data.icon as any,
        type: data.type as PocketType,
        amount: data.amount,
        goalAmount: data.goal_amount || undefined,
        lockEndDate: data.lock_end_date || undefined,
        sourceCardId: data.source_card_id || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create financial pocket')
    }
  },

  async update(id: string, pocket: Partial<FinancialPocket>): Promise<FinancialPocket> {
    try {
      const updateData: any = {}
      if (pocket.name) updateData.name = pocket.name
      if (pocket.description) updateData.description = pocket.description
      if (pocket.icon) updateData.icon = pocket.icon
      if (pocket.type) updateData.type = pocket.type
      if (pocket.amount !== undefined) updateData.amount = pocket.amount
      if (pocket.goalAmount !== undefined) updateData.goal_amount = pocket.goalAmount
      if (pocket.lockEndDate !== undefined) updateData.lock_end_date = pocket.lockEndDate
      if (pocket.sourceCardId !== undefined) updateData.source_card_id = pocket.sourceCardId

      const { data: updatedData, error } = await supabase
        .from('financial_pockets')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        description: updatedData.description,
        icon: updatedData.icon as any,
        type: updatedData.type as PocketType,
        amount: updatedData.amount,
        goalAmount: updatedData.goal_amount || undefined,
        lockEndDate: updatedData.lock_end_date || undefined,
        sourceCardId: updatedData.source_card_id || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update financial pocket')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('financial_pockets')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete financial pocket')
    }
  }
}

// Contract Service
export const contractService = {
  async getAll(): Promise<Contract[]> {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(contract => ({
        id: contract.id,
        contractNumber: contract.contract_number,
        clientId: contract.client_id,
        projectId: contract.project_id,
        signingDate: contract.signing_date,
        signingLocation: contract.signing_location,
        clientName1: contract.client_name1,
        clientAddress1: contract.client_address1,
        clientPhone1: contract.client_phone1,
        clientName2: contract.client_name2 || undefined,
        clientAddress2: contract.client_address2 || undefined,
        clientPhone2: contract.client_phone2 || undefined,
        shootingDuration: contract.shooting_duration,
        guaranteedPhotos: contract.guaranteed_photos,
        albumDetails: contract.album_details,
        digitalFilesFormat: contract.digital_files_format,
        otherItems: contract.other_items,
        personnelCount: contract.personnel_count,
        deliveryTimeframe: contract.delivery_timeframe,
        dpDate: contract.dp_date,
        finalPaymentDate: contract.final_payment_date,
        cancellationPolicy: contract.cancellation_policy,
        jurisdiction: contract.jurisdiction,
        vendorSignature: contract.vendor_signature || undefined,
        clientSignature: contract.client_signature || undefined,
        createdAt: contract.created_at
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch contracts')
    }
  },

  async create(contract: Omit<Contract, 'id'>): Promise<Contract> {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .insert({
          contract_number: contract.contractNumber,
          client_id: contract.clientId,
          project_id: contract.projectId,
          signing_date: contract.signingDate,
          signing_location: contract.signingLocation,
          client_name1: contract.clientName1,
          client_address1: contract.clientAddress1,
          client_phone1: contract.clientPhone1,
          client_name2: contract.clientName2,
          client_address2: contract.clientAddress2,
          client_phone2: contract.clientPhone2,
          shooting_duration: contract.shootingDuration,
          guaranteed_photos: contract.guaranteedPhotos,
          album_details: contract.albumDetails,
          digital_files_format: contract.digitalFilesFormat,
          other_items: contract.otherItems,
          personnel_count: contract.personnelCount,
          delivery_timeframe: contract.deliveryTimeframe,
          dp_date: contract.dpDate,
          final_payment_date: contract.finalPaymentDate,
          cancellation_policy: contract.cancellationPolicy,
          jurisdiction: contract.jurisdiction,
          vendor_signature: contract.vendorSignature,
          client_signature: contract.clientSignature
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        contractNumber: data.contract_number,
        clientId: data.client_id,
        projectId: data.project_id,
        signingDate: data.signing_date,
        signingLocation: data.signing_location,
        clientName1: data.client_name1,
        clientAddress1: data.client_address1,
        clientPhone1: data.client_phone1,
        clientName2: data.client_name2 || undefined,
        clientAddress2: data.client_address2 || undefined,
        clientPhone2: data.client_phone2 || undefined,
        shootingDuration: data.shooting_duration,
        guaranteedPhotos: data.guaranteed_photos,
        albumDetails: data.album_details,
        digitalFilesFormat: data.digital_files_format,
        otherItems: data.other_items,
        personnelCount: data.personnel_count,
        deliveryTimeframe: data.delivery_timeframe,
        dpDate: data.dp_date,
        finalPaymentDate: data.final_payment_date,
        cancellationPolicy: data.cancellation_policy,
        jurisdiction: data.jurisdiction,
        vendorSignature: data.vendor_signature || undefined,
        clientSignature: data.client_signature || undefined,
        createdAt: data.created_at
      }
    } catch (error) {
      handleSupabaseError(error, 'create contract')
    }
  },

  async update(id: string, contract: Partial<Contract>): Promise<Contract> {
    try {
      const updateData: any = {}
      if (contract.contractNumber) updateData.contract_number = contract.contractNumber
      if (contract.clientId) updateData.client_id = contract.clientId
      if (contract.projectId) updateData.project_id = contract.projectId
      if (contract.signingDate) updateData.signing_date = contract.signingDate
      if (contract.signingLocation) updateData.signing_location = contract.signingLocation
      if (contract.clientName1) updateData.client_name1 = contract.clientName1
      if (contract.clientAddress1) updateData.client_address1 = contract.clientAddress1
      if (contract.clientPhone1) updateData.client_phone1 = contract.clientPhone1
      if (contract.clientName2 !== undefined) updateData.client_name2 = contract.clientName2
      if (contract.clientAddress2 !== undefined) updateData.client_address2 = contract.clientAddress2
      if (contract.clientPhone2 !== undefined) updateData.client_phone2 = contract.clientPhone2
      if (contract.shootingDuration) updateData.shooting_duration = contract.shootingDuration
      if (contract.guaranteedPhotos) updateData.guaranteed_photos = contract.guaranteedPhotos
      if (contract.albumDetails) updateData.album_details = contract.albumDetails
      if (contract.digitalFilesFormat) updateData.digital_files_format = contract.digitalFilesFormat
      if (contract.otherItems) updateData.other_items = contract.otherItems
      if (contract.personnelCount) updateData.personnel_count = contract.personnelCount
      if (contract.deliveryTimeframe) updateData.delivery_timeframe = contract.deliveryTimeframe
      if (contract.dpDate) updateData.dp_date = contract.dpDate
      if (contract.finalPaymentDate) updateData.final_payment_date = contract.finalPaymentDate
      if (contract.cancellationPolicy) updateData.cancellation_policy = contract.cancellationPolicy
      if (contract.jurisdiction) updateData.jurisdiction = contract.jurisdiction
      if (contract.vendorSignature !== undefined) updateData.vendor_signature = contract.vendorSignature
      if (contract.clientSignature !== undefined) updateData.client_signature = contract.clientSignature

      const { data: updatedData, error } = await supabase
        .from('contracts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        contractNumber: updatedData.contract_number,
        clientId: updatedData.client_id,
        projectId: updatedData.project_id,
        signingDate: updatedData.signing_date,
        signingLocation: updatedData.signing_location,
        clientName1: updatedData.client_name1,
        clientAddress1: updatedData.client_address1,
        clientPhone1: updatedData.client_phone1,
        clientName2: updatedData.client_name2 || undefined,
        clientAddress2: updatedData.client_address2 || undefined,
        clientPhone2: updatedData.client_phone2 || undefined,
        shootingDuration: updatedData.shooting_duration,
        guaranteedPhotos: updatedData.guaranteed_photos,
        albumDetails: updatedData.album_details,
        digitalFilesFormat: updatedData.digital_files_format,
        otherItems: updatedData.other_items,
        personnelCount: updatedData.personnel_count,
        deliveryTimeframe: updatedData.delivery_timeframe,
        dpDate: updatedData.dp_date,
        finalPaymentDate: updatedData.final_payment_date,
        cancellationPolicy: updatedData.cancellation_policy,
        jurisdiction: updatedData.jurisdiction,
        vendorSignature: updatedData.vendor_signature || undefined,
        clientSignature: updatedData.client_signature || undefined,
        createdAt: updatedData.created_at
      }
    } catch (error) {
      handleSupabaseError(error, 'update contract')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete contract')
    }
  }
}

// Asset Service
export const assetService = {
  async getAll(): Promise<Asset[]> {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(asset => ({
        id: asset.id,
        name: asset.name,
        category: asset.category,
        purchaseDate: asset.purchase_date,
        purchasePrice: asset.purchase_price,
        serialNumber: asset.serial_number || undefined,
        status: asset.status as AssetStatus,
        notes: asset.notes || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch assets')
    }
  },

  async create(asset: Omit<Asset, 'id'>): Promise<Asset> {
    try {
      const { data, error } = await supabase
        .from('assets')
        .insert({
          name: asset.name,
          category: asset.category,
          purchase_date: asset.purchaseDate,
          purchase_price: asset.purchasePrice,
          serial_number: asset.serialNumber,
          status: asset.status,
          notes: asset.notes
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        category: data.category,
        purchaseDate: data.purchase_date,
        purchasePrice: data.purchase_price,
        serialNumber: data.serial_number || undefined,
        status: data.status as AssetStatus,
        notes: data.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create asset')
    }
  },

  async update(id: string, asset: Partial<Asset>): Promise<Asset> {
    try {
      const updateData: any = {}
      if (asset.name) updateData.name = asset.name
      if (asset.category) updateData.category = asset.category
      if (asset.purchaseDate) updateData.purchase_date = asset.purchaseDate
      if (asset.purchasePrice !== undefined) updateData.purchase_price = asset.purchasePrice
      if (asset.serialNumber !== undefined) updateData.serial_number = asset.serialNumber
      if (asset.status) updateData.status = asset.status
      if (asset.notes !== undefined) updateData.notes = asset.notes

      const { data: updatedData, error } = await supabase
        .from('assets')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        name: updatedData.name,
        category: updatedData.category,
        purchaseDate: updatedData.purchase_date,
        purchasePrice: updatedData.purchase_price,
        serialNumber: updatedData.serial_number || undefined,
        status: updatedData.status as AssetStatus,
        notes: updatedData.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update asset')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete asset')
    }
  }
}

// Client Feedback Service
export const clientFeedbackService = {
  async getAll(): Promise<ClientFeedback[]> {
    try {
      const { data, error } = await supabase
        .from('client_feedback')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      
      return data.map(feedback => ({
        id: feedback.id,
        clientName: feedback.client_name,
        satisfaction: feedback.satisfaction as SatisfactionLevel,
        rating: feedback.rating,
        feedback: feedback.feedback,
        date: feedback.date
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch client feedback')
    }
  },

  async create(feedback: Omit<ClientFeedback, 'id'>): Promise<ClientFeedback> {
    try {
      const { data, error } = await supabase
        .from('client_feedback')
        .insert({
          client_name: feedback.clientName,
          satisfaction: feedback.satisfaction,
          rating: feedback.rating,
          feedback: feedback.feedback,
          date: feedback.date
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        clientName: data.client_name,
        satisfaction: data.satisfaction as SatisfactionLevel,
        rating: data.rating,
        feedback: data.feedback,
        date: data.date
      }
    } catch (error) {
      handleSupabaseError(error, 'create client feedback')
    }
  },

  async update(id: string, feedback: Partial<ClientFeedback>): Promise<ClientFeedback> {
    try {
      const updateData: any = {}
      if (feedback.clientName) updateData.client_name = feedback.clientName
      if (feedback.satisfaction) updateData.satisfaction = feedback.satisfaction
      if (feedback.rating !== undefined) updateData.rating = feedback.rating
      if (feedback.feedback) updateData.feedback = feedback.feedback
      if (feedback.date) updateData.date = feedback.date

      const { data: updatedData, error } = await supabase
        .from('client_feedback')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        clientName: updatedData.client_name,
        satisfaction: updatedData.satisfaction as SatisfactionLevel,
        rating: updatedData.rating,
        feedback: updatedData.feedback,
        date: updatedData.date
      }
    } catch (error) {
      handleSupabaseError(error, 'update client feedback')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('client_feedback')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete client feedback')
    }
  }
}

// Notification Service
export const notificationService = {
  async getAll(): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('timestamp', { ascending: false })

      if (error) throw error
      
      return data.map(notification => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        timestamp: notification.timestamp,
        isRead: notification.is_read,
        icon: notification.icon as any,
        link: notification.link_view && notification.link_action ? {
          view: notification.link_view as any,
          action: notification.link_action
        } : undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch notifications')
    }
  },

  async create(notification: Omit<Notification, 'id'>): Promise<Notification> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          title: notification.title,
          message: notification.message,
          timestamp: notification.timestamp,
          is_read: notification.isRead,
          icon: notification.icon,
          link_view: notification.link?.view,
          link_action: notification.link?.action
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        title: data.title,
        message: data.message,
        timestamp: data.timestamp,
        isRead: data.is_read,
        icon: data.icon as any,
        link: data.link_view && data.link_action ? {
          view: data.link_view as any,
          action: data.link_action
        } : undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create notification')
    }
  },

  async update(id: string, notification: Partial<Notification>): Promise<Notification> {
    try {
      const updateData: any = {}
      if (notification.title) updateData.title = notification.title
      if (notification.message) updateData.message = notification.message
      if (notification.timestamp) updateData.timestamp = notification.timestamp
      if (notification.isRead !== undefined) updateData.is_read = notification.isRead
      if (notification.icon) updateData.icon = notification.icon
      if (notification.link !== undefined) {
        updateData.link_view = notification.link?.view
        updateData.link_action = notification.link?.action
      }

      const { data: updatedData, error } = await supabase
        .from('notifications')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        title: updatedData.title,
        message: updatedData.message,
        timestamp: updatedData.timestamp,
        isRead: updatedData.is_read,
        icon: updatedData.icon as any,
        link: updatedData.link_view && updatedData.link_action ? {
          view: updatedData.link_view as any,
          action: updatedData.link_action
        } : undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update notification')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete notification')
    }
  }
}

// Social Media Post Service
export const socialMediaPostService = {
  async getAll(): Promise<SocialMediaPost[]> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .select('*')
        .order('scheduled_date', { ascending: false })

      if (error) throw error
      
      return data.map(post => ({
        id: post.id,
        projectId: post.project_id,
        clientName: post.client_name,
        postType: post.post_type as PostType,
        platform: post.platform as any,
        scheduledDate: post.scheduled_date,
        caption: post.caption,
        mediaUrl: post.media_url || undefined,
        status: post.status as PostStatus,
        notes: post.notes || undefined
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch social media posts')
    }
  },

  async create(post: Omit<SocialMediaPost, 'id'>): Promise<SocialMediaPost> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .insert({
          project_id: post.projectId,
          client_name: post.clientName,
          post_type: post.postType,
          platform: post.platform,
          scheduled_date: post.scheduledDate,
          caption: post.caption,
          media_url: post.mediaUrl,
          status: post.status,
          notes: post.notes
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        projectId: data.project_id,
        clientName: data.client_name,
        postType: data.post_type as PostType,
        platform: data.platform as any,
        scheduledDate: data.scheduled_date,
        caption: data.caption,
        mediaUrl: data.media_url || undefined,
        status: data.status as PostStatus,
        notes: data.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'create social media post')
    }
  },

  async update(id: string, post: Partial<SocialMediaPost>): Promise<SocialMediaPost> {
    try {
      const updateData: any = {}
      if (post.projectId) updateData.project_id = post.projectId
      if (post.clientName) updateData.client_name = post.clientName
      if (post.postType) updateData.post_type = post.postType
      if (post.platform) updateData.platform = post.platform
      if (post.scheduledDate) updateData.scheduled_date = post.scheduledDate
      if (post.caption) updateData.caption = post.caption
      if (post.mediaUrl !== undefined) updateData.media_url = post.mediaUrl
      if (post.status) updateData.status = post.status
      if (post.notes !== undefined) updateData.notes = post.notes

      const { data: updatedData, error } = await supabase
        .from('social_media_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        projectId: updatedData.project_id,
        clientName: updatedData.client_name,
        postType: updatedData.post_type as PostType,
        platform: updatedData.platform as any,
        scheduledDate: updatedData.scheduled_date,
        caption: updatedData.caption,
        mediaUrl: updatedData.media_url || undefined,
        status: updatedData.status as PostStatus,
        notes: updatedData.notes || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update social media post')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('social_media_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete social media post')
    }
  }
}

// Promo Code Service
export const promoCodeService = {
  async getAll(): Promise<PromoCode[]> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data.map(code => ({
        id: code.id,
        code: code.code,
        discountType: code.discount_type as 'percentage' | 'fixed',
        discountValue: code.discount_value,
        isActive: code.is_active,
        usageCount: code.usage_count,
        maxUsage: code.max_usage || undefined,
        expiryDate: code.expiry_date || undefined,
        createdAt: code.created_at
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch promo codes')
    }
  },

  async create(code: Omit<PromoCode, 'id'>): Promise<PromoCode> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert({
          code: code.code,
          discount_type: code.discountType,
          discount_value: code.discountValue,
          is_active: code.isActive,
          usage_count: code.usageCount,
          max_usage: code.maxUsage,
          expiry_date: code.expiryDate
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        code: data.code,
        discountType: data.discount_type as 'percentage' | 'fixed',
        discountValue: data.discount_value,
        isActive: data.is_active,
        usageCount: data.usage_count,
        maxUsage: data.max_usage || undefined,
        expiryDate: data.expiry_date || undefined,
        createdAt: data.created_at
      }
    } catch (error) {
      handleSupabaseError(error, 'create promo code')
    }
  },

  async update(id: string, code: Partial<PromoCode>): Promise<PromoCode> {
    try {
      const updateData: any = {}
      if (code.code) updateData.code = code.code
      if (code.discountType) updateData.discount_type = code.discountType
      if (code.discountValue !== undefined) updateData.discount_value = code.discountValue
      if (code.isActive !== undefined) updateData.is_active = code.isActive
      if (code.usageCount !== undefined) updateData.usage_count = code.usageCount
      if (code.maxUsage !== undefined) updateData.max_usage = code.maxUsage
      if (code.expiryDate !== undefined) updateData.expiry_date = code.expiryDate

      const { data: updatedData, error } = await supabase
        .from('promo_codes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        code: updatedData.code,
        discountType: updatedData.discount_type as 'percentage' | 'fixed',
        discountValue: updatedData.discount_value,
        isActive: updatedData.is_active,
        usageCount: updatedData.usage_count,
        maxUsage: updatedData.max_usage || undefined,
        expiryDate: updatedData.expiry_date || undefined,
        createdAt: updatedData.created_at
      }
    } catch (error) {
      handleSupabaseError(error, 'update promo code')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete promo code')
    }
  }
}

// SOP Service
export const sopService = {
  async getAll(): Promise<SOP[]> {
    try {
      const { data, error } = await supabase
        .from('sops')
        .select('*')
        .order('title', { ascending: true })

      if (error) throw error
      
      return data.map(sop => ({
        id: sop.id,
        title: sop.title,
        category: sop.category,
        content: sop.content,
        lastUpdated: sop.last_updated
      }))
    } catch (error) {
      handleSupabaseError(error, 'fetch SOPs')
    }
  },

  async create(sop: Omit<SOP, 'id'>): Promise<SOP> {
    try {
      const { data, error } = await supabase
        .from('sops')
        .insert({
          title: sop.title,
          category: sop.category,
          content: sop.content,
          last_updated: sop.lastUpdated
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        title: data.title,
        category: data.category,
        content: data.content,
        lastUpdated: data.last_updated
      }
    } catch (error) {
      handleSupabaseError(error, 'create SOP')
    }
  },

  async update(id: string, sop: Partial<SOP>): Promise<SOP> {
    try {
      const updateData: any = {}
      if (sop.title) updateData.title = sop.title
      if (sop.category) updateData.category = sop.category
      if (sop.content) updateData.content = sop.content
      if (sop.lastUpdated) updateData.last_updated = sop.lastUpdated

      const { data: updatedData, error } = await supabase
        .from('sops')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: updatedData.id,
        title: updatedData.title,
        category: updatedData.category,
        content: updatedData.content,
        lastUpdated: updatedData.last_updated
      }
    } catch (error) {
      handleSupabaseError(error, 'update SOP')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('sops')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      handleSupabaseError(error, 'delete SOP')
    }
  }
}

// Profile Service
export const profileService = {
  async get(): Promise<Profile> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', '1')
        .single()

      if (error) throw error

      return {
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        companyName: data.company_name,
        website: data.website,
        address: data.address,
        bankAccount: data.bank_account,
        authorizedSigner: data.authorized_signer,
        idNumber: data.id_number || undefined,
        bio: data.bio,
        incomeCategories: data.income_categories || [],
        expenseCategories: data.expense_categories || [],
        projectTypes: data.project_types || [],
        eventTypes: data.event_types || [],
        assetCategories: data.asset_categories || [],
        sopCategories: data.sop_categories || [],
        projectStatusConfig: data.project_status_config || [],
        notificationSettings: data.notification_settings || {},
        securitySettings: data.security_settings || {},
        briefingTemplate: data.briefing_template,
        termsAndConditions: data.terms_and_conditions || undefined,
        contractTemplate: data.contract_template || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'fetch profile')
    }
  },

  async createOrUpdate(profile: Omit<Profile, 'id'>): Promise<Profile> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: '1',
          full_name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          company_name: profile.companyName,
          website: profile.website,
          address: profile.address,
          bank_account: profile.bankAccount,
          authorized_signer: profile.authorizedSigner,
          id_number: profile.idNumber,
          bio: profile.bio,
          income_categories: profile.incomeCategories,
          expense_categories: profile.expenseCategories,
          project_types: profile.projectTypes,
          event_types: profile.eventTypes,
          asset_categories: profile.assetCategories,
          sop_categories: profile.sopCategories,
          project_status_config: profile.projectStatusConfig,
          notification_settings: profile.notificationSettings,
          security_settings: profile.securitySettings,
          briefing_template: profile.briefingTemplate,
          terms_and_conditions: profile.termsAndConditions,
          contract_template: profile.contractTemplate
        })
        .select()
        .single()

      if (error) throw error

      return {
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        companyName: data.company_name,
        website: data.website,
        address: data.address,
        bankAccount: data.bank_account,
        authorizedSigner: data.authorized_signer,
        idNumber: data.id_number || undefined,
        bio: data.bio,
        incomeCategories: data.income_categories || [],
        expenseCategories: data.expense_categories || [],
        projectTypes: data.project_types || [],
        eventTypes: data.event_types || [],
        assetCategories: data.asset_categories || [],
        sopCategories: data.sop_categories || [],
        projectStatusConfig: data.project_status_config || [],
        notificationSettings: data.notification_settings || {},
        securitySettings: data.security_settings || {},
        briefingTemplate: data.briefing_template,
        termsAndConditions: data.terms_and_conditions || undefined,
        contractTemplate: data.contract_template || undefined
      }
    } catch (error) {
      handleSupabaseError(error, 'update profile')
    }
  }
}