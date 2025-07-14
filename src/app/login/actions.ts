'use server'
 
import { redirect } from 'next/navigation'
 
export async function login(formData: FormData) {
  const email = formData.get('email')
  // Here you would typically validate the user's credentials
  if (email) {
    redirect('/coach')
  }
}
