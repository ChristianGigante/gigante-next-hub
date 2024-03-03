import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import LoginPage from '@/login'

export default function Component() {
  const { data: session } = useSession()

  const router = useRouter();
  // Redirect to dashboard if the user is already authenticated
  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <>
      <LoginPage />
    </>
  )

}