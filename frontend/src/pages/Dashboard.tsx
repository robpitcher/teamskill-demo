import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import Heatmap from '../components/Heatmap'

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
  return (
    <Stack spacing={6}>
      <Heading>Team Skills Heatmap</Heading>
      <Text color="gray.500">Static sample data for MVP.</Text>
      <Heatmap skills={skills} users={users} values={values} />
    </Stack>
  )
}
