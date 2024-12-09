import { ProfileForm } from "./components/ProfileForm"
import { PasswordForm } from "./components/PasswordForm"

export const ProfilePage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <ProfileForm />
      <PasswordForm />
    </div>
  )
}
