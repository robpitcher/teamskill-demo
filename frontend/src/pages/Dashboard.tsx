import React, { useEffect, useState } from 'react'
import { Heading, Stack, Text, FormControl, FormLabel, Select, HStack, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Heatmap from '../components/Heatmap'
import { apiGet } from '../api'

const skills = ['react', 'node', 'sql', 'azure']
const users = ['Alice', 'Bob', 'Charlie', 'Dana']
// Static example: values 0..5 (we will just map directly)
const values = [
  [1, 2, 3, 4],
  [2, 2.5, 4, 5],
  [3, 3.5, 2, 4.5],
  [1.5, 4, 3, 2]
]

export default function Dashboard() {
  const [skill, setSkill] = useState('react')
  const [min, setMin] = useState(3 as any)
  const [results, setResults] = useState([] as any)
  const [loading, setLoading] = useState(false as any)

  const runSearch = async () => {
    setLoading(true)
    try {
      const data = await apiGet(`/search?skill=${skill}&min=${min}`)
      setResults(data.results || [])
    } catch (e) {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { runSearch() }, [])

  return (
    <Stack spacing={6}>
      <Heading>Team Skills Heatmap</Heading>
      <Text color="gray.500">Static sample data for MVP plus basic search.</Text>
      <Heatmap skills={skills} users={users} values={values} />

      <Stack>
        <Heading size="md">Search by skill</Heading>
        <HStack>
          <FormControl w="200px">
            <FormLabel>Skill</FormLabel>
            <Select value={skill} onChange={(e: any) => setSkill(e.target.value)}>
              {skills.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>
          <FormControl w="120px">
            <FormLabel>Min rating</FormLabel>
            <Select value={min} onChange={(e: any) => setMin(Number(e.target.value))}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
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
      </Stack>
    </Stack>
  )
}
