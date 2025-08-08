import React, { useEffect, useState } from 'react'
import { Heading, Stack, Text, FormControl, FormLabel, Select, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, Alert, AlertIcon } from '@chakra-ui/react'
import Heatmap from '../components/Heatmap'
import { apiGet } from '../api'

// Business skills categories for heatmap display (shortened names for display)
const skillCategories = [
  { key: 'communication', display: 'Communication', question: 'How confident are you in your communication skills?' },
  { key: 'time-management', display: 'Time Mgmt', question: 'How well do you manage your time?' },
  { key: 'problem-solving', display: 'Problem Solving', question: 'How would you rate your problem-solving abilities?' },
  { key: 'teamwork', display: 'Teamwork', question: 'How effective are you at working in a team?' },
  { key: 'leadership', display: 'Leadership', question: 'How strong are your leadership skills?' },
  { key: 'decision-making', display: 'Decision Making', question: 'How comfortable are you with making decisions under pressure?' },
  { key: 'feedback', display: 'Feedback', question: 'How well do you handle feedback?' },
  { key: 'adaptability', display: 'Adaptability', question: 'How would you rate your adaptability to change?' },
  { key: 'negotiation', display: 'Negotiation', question: 'How effective are your negotiation skills?' },
  { key: 'organization', display: 'Organization', question: 'How strong are your organizational skills?' }
]

export default function Dashboard() {
  const [skill, setSkill] = useState('communication')
  const [min, setMin] = useState(3)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [heatmapData, setHeatmapData] = useState<{users: string[], skills: string[], values: number[][]} | null>(null)
  const [heatmapLoading, setHeatmapLoading] = useState(true)

  const loadHeatmapData = async () => {
    setHeatmapLoading(true)
    try {
      const data = await apiGet('/assessments/heatmap')
      const assessments = data.assessments || []
      
      if (assessments.length === 0) {
        // Show message when no assessments exist
        setHeatmapData(null)
        return
      }
      
      // Extract users and their assessment data
      const users = assessments.map((a: any) => a.username)
      const skills = skillCategories.map(sc => sc.display)
      
      // Create values matrix
      const values = assessments.map((assessment: any) => {
        return skillCategories.map(skillCategory => {
          // Find the rating for this skill based on the question text
          const rating = assessment.skills[skillCategory.question]
          return rating ? Number(rating) : 0
        })
      })
      
      setHeatmapData({ users, skills, values })
    } catch (error) {
      console.error('Error loading heatmap data:', error)
      setHeatmapData(null)
    } finally {
      setHeatmapLoading(false)
    }
  }

  const runSearch = async () => {
    setLoading(true)
    try {
      // Find the question text for the selected skill
      const selectedSkill = skillCategories.find(sc => sc.key === skill)
      const questionText = selectedSkill?.question || skillCategories[0].question
      
      const data = await apiGet(`/search?skill=${encodeURIComponent(questionText)}&min=${min}`)
      setResults(data.results || [])
    } catch (e) {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    loadHeatmapData()
    runSearch()
  }, [])

  useEffect(() => {
    runSearch()
  }, [skill, min])

  return (
    <Stack spacing={6}>
      <Heading>Team Skills Dashboard</Heading>
      
      {heatmapLoading ? (
        <Text color="gray.500">Loading assessment data...</Text>
      ) : heatmapData ? (
        <>
          <Text color="gray.500">Real assessment data from team member self-evaluations.</Text>
          <Heatmap 
            skills={heatmapData.skills} 
            users={heatmapData.users} 
            values={heatmapData.values} 
          />
        </>
      ) : (
        <Alert status="info">
          <AlertIcon />
          No assessment data available yet. Complete your assessment to see team skills visualization.
        </Alert>
      )}

      <Stack>
        <Heading size="md">Search by skill</Heading>
        <HStack>
          <FormControl w="300px">
            <FormLabel>Skill</FormLabel>
            <Select value={skill} onChange={(e) => setSkill(e.target.value)}>
              {skillCategories.map(sc => <option key={sc.key} value={sc.key}>{sc.display}</option>)}
            </Select>
          </FormControl>
          <FormControl w="120px">
            <FormLabel>Min rating</FormLabel>
            <Select value={min} onChange={(e) => setMin(Number(e.target.value))}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
            </Select>
          </FormControl>
          <Button onClick={runSearch} isLoading={loading} colorScheme="blue">Search</Button>
        </HStack>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr><Th>User</Th><Th isNumeric>Rating</Th><Th>Submitted</Th></Tr>
          </Thead>
          <Tbody>
            {results.map((r: any) => (
              <Tr key={r.userId}>
                <Td>{r.username}</Td>
                <Td isNumeric>{r.rating}</Td>
                <Td>{new Date(r.submittedAt).toLocaleString?.() || r.submittedAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {results.length === 0 && !loading && (
          <Text color="gray.500" fontSize="sm">
            No team members found with {skillCategories.find(sc => sc.key === skill)?.display} rating of {min} or higher.
          </Text>
        )}
      </Stack>
    </Stack>
  )
}
