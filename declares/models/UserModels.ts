export interface UserModel {
  id?: string | number
  firstName?: string
  lastName?: string
  email?: string
  role?: string[]
  name?: string
  socialAccount?: {
    email?: string;
    socialName?: string
  } 
}
