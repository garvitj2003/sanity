'use client'
import { TournamentProvider } from '../../context/tournamentContext'

export default function BracketsLayout ({children}) {
  return (
    <TournamentProvider>
    <div>
      {children}
    </div>
    </TournamentProvider>
  )
}
