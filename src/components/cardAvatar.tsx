import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react';
export function CardAvatar({ name, photoUrl }: Guest) {
  return (
    <a
      href={`/${name}`}
      className="w-full border rounded-lg flex gap-3 p-2 mb-2
       hover:bg-gray-500 hover:scale-105 hover:rounded-lg transition-all"
    >
      <Avatar>
        <AvatarImage src={photoUrl} />
        <AvatarFallback>
        <User />
        </AvatarFallback>
      </Avatar>

      <span>{name}</span>
    </a>
  )
}
