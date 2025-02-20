import { useEffect, useState } from 'react'
import eventDataJson from '@/../marriageList.json'
import { CardPresenter } from './cardPresenter'
import { Input } from './ui/input'

type Present = {
  name: string
  photoUrl: string
  linkUrl: string
}

type Guests = {
  name: string
  photoUrl: string
}

type Password = {
  password: string
  guests: Guests[]
  email: string
  confirmed: string[]
  present: string[]
}
type EventData = {
  presentList: Present[]
  passwords: Password[]
}

type PresentSectionProps = {
  onSelectionChange: (selectedPresents: Present[]) => void
}

export function PresentSection({ onSelectionChange }: PresentSectionProps) {
  const eventData: EventData = eventDataJson

  const [search, setSearch] = useState('')
  const [presentFilter, setPresentFilter] = useState(eventData.presentList)
  const [selectedPresents, setSelectedPresents] = useState<Present[]>([])

  useEffect(() => {
    const filteredPresent = eventData.presentList.filter(present =>
      present.name.toLowerCase().includes(search.toLowerCase())
    )
    setPresentFilter(filteredPresent)
  }, [search])

  useEffect(() => {
    onSelectionChange(selectedPresents) // Atualiza o pai somente quando o estado muda
  }, [selectedPresents, onSelectionChange])

  const handlePresentClick = (present: Present) => {
    setSelectedPresents(prev => {
      const isSelected = prev.some(p => p.linkUrl === present.linkUrl)
      return isSelected
        ? prev.filter(p => p.linkUrl !== present.linkUrl)
        : [...prev, present]
    })
  }

  return (
    <div className="gap-4 flex flex-col z-50 border-t py-5 border-green-900">
      <Input className='z-50'
        onChange={e => setSearch(e.target.value)}
        placeholder="Pesquise seu presente"
      />
      {/* <small>obs: Imagens para sugestões de presente,não contem link para compra </small> */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {presentFilter &&
          presentFilter.map(present => (
            <CardPresenter
              onClick={() => handlePresentClick(present)}
              linkUrl={present.linkUrl}
              key={present.photoUrl}
              name={present.name}
              photoUrl={present.photoUrl}
              isSelected={selectedPresents.some(p => p.linkUrl === present.linkUrl)}
            />
          ))}
      </div>
    </div>
  )
}
