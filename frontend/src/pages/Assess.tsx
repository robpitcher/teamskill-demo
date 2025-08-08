import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  Heading, 
  Stack, 
  Text, 
  RadioGroup, 
  Radio, 
  FormControl, 
  FormLabel,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { apiPost } from '../api'

type Question = {
  id: number
  question: string
  answers: string[]
}

type AssessmentData = {
  questions: Question[]
}

type Responses = Record<number, number> // questionId -> answerIndex

export default function Assess() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [responses, setResponses] = useState<Responses>({})
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load assessment questions from JSON file
    const loadAssessment = async () => {
      try {
        const response = await fetch('/assessments/business-skills.json')
        if (!response.ok) {
          throw new Error('Failed to load assessment questions')
        }
        const data = await response.json()
        setAssessmentData(data)
      } catch (error) {
        console.error('Error loading assessment:', error)
        setMessage('Failed to load assessment questions')
      }
    }
    
    loadAssessment()
  }, [])

  const handleResponseChange = (questionId: number, answerIndex: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(answerIndex)
    }))
  }

  const onSubmit = async () => {
    if (!assessmentData) return

    // Validate all questions are answered
    const unansweredQuestions = assessmentData.questions.filter(
      q => responses[q.id] === undefined
    )
    
    if (unansweredQuestions.length > 0) {
      setMessage(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`)
      return
    }

    setMessage(null)
    setLoading(true)
    
    try {
      // Convert responses to skills format for backend compatibility
      // Map question text to response index + 1 (to get 1-4 scale instead of 0-3)
      const skills: Record<string, number> = {}
      assessmentData.questions.forEach(question => {
        const responseIndex = responses[question.id]
        // Convert 0-3 index to 1-4 scale for consistency with existing system
        skills[question.question] = responseIndex + 1
      })
      
      await apiPost('/assessments', { skills })
      setMessage('Assessment submitted successfully!')
      // Reset form
      setResponses({})
    } catch (e: any) {
      setMessage(e.message || 'Failed to submit assessment')
    } finally {
      setLoading(false)
    }
  }

  if (!assessmentData) {
    return (
      <Stack spacing={6}>
        <Heading>Self Assessment</Heading>
        <Text>Loading assessment questions...</Text>
      </Stack>
    )
  }

  const allQuestionsAnswered = assessmentData.questions.every(q => responses[q.id] !== undefined)

  return (
    <Stack spacing={6}>
      <Heading>Business Skills Self Assessment</Heading>
      <Text color="gray.600">
        Please rate yourself on each of the following business skills. 
        Your responses will help create a personalized skills profile.
      </Text>
      
      {message && (
        <Alert status={message.includes('successfully') ? 'success' : 'warning'}>
          <AlertIcon />
          {message}
        </Alert>
      )}
      
      <Card>
        <CardBody>
          <Stack spacing={6}>
            {assessmentData.questions.map((question, index) => (
              <FormControl key={question.id} isRequired>
                <FormLabel fontWeight="semibold" mb={3}>
                  {index + 1}. {question.question}
                </FormLabel>
                <RadioGroup 
                  value={responses[question.id]?.toString() || ''} 
                  onChange={(value) => handleResponseChange(question.id, value)}
                >
                  <Stack spacing={2}>
                    {question.answers.map((answer, answerIndex) => (
                      <Radio key={answerIndex} value={answerIndex.toString()}>
                        {answer}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            ))}
            
            <Box pt={4}>
              <Button 
                colorScheme="blue" 
                onClick={onSubmit}
                isLoading={loading}
                isDisabled={!allQuestionsAnswered}
                size="lg"
              >
                Submit Assessment
              </Button>
              {!allQuestionsAnswered && (
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Please answer all questions to submit your assessment
                </Text>
              )}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  )
}
