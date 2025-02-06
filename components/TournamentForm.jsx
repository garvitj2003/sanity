import React, { useState } from 'react'
import { z } from "zod"
import { Button } from "../@/components/ui/button"
import { Input } from "../@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTournament } from '../context/tournamentContext'

const tournamentFormSchema = z.object({
  tournamentName: z.string({ required_error: "Please enter a tournament name" }),
  participants: z.coerce.number().min(2, { message: "Minimum 2 teams are required" }),
  eliminationType: z.enum(["single_elimination", "double_elimination"]),
  startDate: z.string({ required_error: "Please enter a start date" })
})

const teamNamesSchema = z.object({
  teams: z.array(z.string().min(1, "Team name is required"))
    .refine(
      (teams) => Array.isArray(teams) && new Set(teams).size === teams.length,
      { message: "Team names must be unique" }
    ),
})

export default function TournamentForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState()
  const [teams, setTeams] = useState()
  const router = useRouter()
  const { setTournamentData } = useTournament();
  const [contextError, setContextError] = useState(null);

  const form = useForm({
    resolver: zodResolver(tournamentFormSchema),
    defaultValues: {
      eliminationType: "single_elimination",
    },
  })

  const teamForm = useForm({
    resolver: zodResolver(teamNamesSchema),
    defaultValues: {
      teams: [],
    },
  })

  const teamsFormError = teamForm.formState.errors.teams?.root?.message;

  function onSubmit(data) {
    setFormData(data)
    setStep(2)
    // Initialize team names array based on number of participants
    teamForm.setValue("teams", Array(data.participants).fill(""))
  }

  function onTeamNamesSubmit(data) {
    setTeams(data)
    try{
      setTournamentData({
        data: formData,
        teams: data.teams
      });
    } catch (error) {
      setContextError(error.message)
      return;
    }
    router.push(`/bracket/${formData.tournamentName.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {step === 1 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="tournamentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament Name</FormLabel>
                  <FormControl>
                    <Input placeholder="CS2 Championship" {...field} className='border border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Participants</FormLabel>
                  <FormControl>
                    <Input type="number" min={2} placeholder="2" {...field} className='border border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eliminationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elimination Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='border border-gray-600'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single_elimination">Single Elimination</SelectItem>
                      <SelectItem value="double_elimination">Double Elimination</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className='border border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Next: Add Teams
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...teamForm}>
          <form onSubmit={teamForm.handleSubmit(onTeamNamesSubmit)} className="space-y-6">
            <p className='w-full text-sm text-blue-500 text-center py-4 px-4 bg-bluen-600/5 border border-blue-500/30 rounded-lg'>Note: Team name must be unique</p>

            {teamsFormError && (
              <p className="text-red-500 text-sm text-center">{teamsFormError}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              {teamForm.watch("teams").map((_, index) => (
                <FormField
                  key={index}
                  control={teamForm.control}
                  name={`teams.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter team ${index + 1} name`} {...field} className="border border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
                Back
              </Button>
              <Button type="submit" className="w-full">
                Generate Bracket
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
