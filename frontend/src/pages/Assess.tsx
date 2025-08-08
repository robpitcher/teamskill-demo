import React, { useState } from 'react'
import { Box, Button, Card, CardBody, Grid, GridItem, Heading, Select, Stack, Text } from '@chakra-ui/react'
import { apiPost } from '../api'

const SKILLS = ['react', 'node', 'sql', 'azure'] as const

type Skill = typeof SKILLS[number]

type Ratings = Record<string, number>

const initial: Ratings = {
  react: 3,
  node: 3,
  sql: 3,
  azure: 3
}

export default function Assess() {
  const [ratings, setRatings] = useState(initial as Ratings)
  const [message, setMessage] = useState(null as any)

  const onChange = (skill: string, value: string) => {
    setRatings((r: any) => ({ ...r, [skill]: Number(value) }))
  }

  const onSubmit = async () => {
    setMessage(null)
    try {
      await apiPost('/assessments', { skills: ratings })
      setMessage('Submitted!')
    } catch (e: any) {
      setMessage(e.message || 'Failed to submit')
    }
  }

  return (
    <Stack spacing={6}>
      <Heading>Self Assessment</Heading>
      <Card>
        <CardBody>
          <Grid templateColumns="1fr 200px" gap={4}>
            {SKILLS.map(s => (
              <React.Fragment key={s}>
                <GridItem>
                  <Text textTransform="capitalize">{s}</Text>
                </GridItem>
                <GridItem>
                  <Select value={ratings[s]} onChange={(e: any) => onChange(s, e.target.value)}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </Select>
                </GridItem>
              </React.Fragment>
            ))}
          </Grid>
          <Box mt={4}>
            <Button colorScheme="blue" onClick={onSubmit}>Submit</Button>
          </Box>
          {message && <Text mt={3}>{message}</Text>}
        </CardBody>
      </Card>
    </Stack>
  )
}
