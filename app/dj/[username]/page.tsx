import { PublicDJProfile } from "@/components/public-dj-profile"

interface DJProfilePageProps {
  params: {
    username: string
  }
}

export default function DJProfilePage({ params }: DJProfilePageProps) {
  return <PublicDJProfile username={params.username} />
}
