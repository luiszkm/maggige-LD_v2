import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Check, CircleX, User } from 'lucide-react';

type CompanionsProps = {
  companions: Guest[];
  presenceStatus: Record<string, 'confirmed' | 'not_confirmed'>;
  onConfirm: (id: string) => void;
  onDeny: (id: string) => void;
};

export function Companions({ companions,onConfirm,onDeny,presenceStatus }: CompanionsProps) {
  
  return (
    <ul>
      {companions.map(companion => (
        <li
          key={companion.name}
          style={{
            backgroundColor: presenceStatus[companion.name] === 'confirmed' ? 'green' : 
                             presenceStatus[companion.name] === 'not_confirmed' ? 'red' : 'white',
          }}
          className="w-full border rounded-lg flex gap-3 p-2 mb-2 justify-between"
        >
          <Avatar>
            <AvatarImage src={companion.photoUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          <span>{companion.name}</span>

          <div className="flex items-center gap-2">
            <button onClick={() => onConfirm(companion.name)}>
              <Check />
            </button>
            <button onClick={() => onDeny(companion.name)}>
              <CircleX />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
