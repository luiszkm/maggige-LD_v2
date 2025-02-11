import * as React from 'react'

interface EmailTemplateProps {
  guests: string[]
  email: string
  presents: string[]
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  guests,
  presents
}) => (
  <div>
    <h1>confirmou presença, {email}!</h1>
    <p>Confirmação de presença realizada com sucesso.</p>
    <p>Presentes selecionados: {presents?.join(', ')}</p>
    <p>Convidados confirmados: {guests?.join(', ')}</p>
  </div>
)
