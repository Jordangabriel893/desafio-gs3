export interface User {
    id?: string
    password?:string,
    email?: string,
    permission?: {
        id: number,
        role: string,
        canViewAllProfiles: boolean,
        canCreateProfiles: boolean,
        canEditUserProfiles: boolean,
        canEditProfiles: boolean,
    }
  }
  