import React, { useState } from 'react'
import { Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const { login } = useAuth() as any
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null as any)
  const navigate = useNavigate()
  const location = useLocation() as any

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError(null)
    const ok = await login(username, password)
    if (ok) {
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <Stack align="center" spacing={6}>
      <Heading>Sign In</Heading>
      <Card w="sm">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input value={username} onChange={(e: any) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
              <Button type="submit" colorScheme="blue">Sign In</Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Stack>
  )
}
