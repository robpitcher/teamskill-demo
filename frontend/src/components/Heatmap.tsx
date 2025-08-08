import React from 'react'
import { Box, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react'

type HeatmapProps = {
  skills: string[]
  users: string[]
  values: number[][] // same dimensions: users x skills
}

function colorFor(value: number) {
  const colors = ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15']
  const idx = Math.min(colors.length - 1, Math.max(0, Math.round(value)))
  return colors[idx]
}

export default function Heatmap({ skills, users, values }: HeatmapProps) {
  const border = useColorModeValue('gray.200', 'gray.600')
  return (
    <Grid templateColumns={`200px repeat(${skills.length}, 1fr)`} gap={1}>
      <GridItem />
      {skills.map(s => (
        <GridItem key={`h-${s}`} textAlign="center"><Text fontWeight="medium">{s}</Text></GridItem>
      ))}
      {users.map((u, r) => (
        <React.Fragment key={`row-${u}`}>
          <GridItem><Text fontWeight="medium">{u}</Text></GridItem>
          {skills.map((_, c) => (
            <GridItem key={`cell-${r}-${c}`} border="1px solid" borderColor={border}>
              <Box w="100%" h="36px" bg={colorFor(values[r][c])} />
            </GridItem>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  )
}
