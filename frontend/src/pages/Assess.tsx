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

// Business skills assessment questions
const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How confident are you in your communication skills?",
    answers: ["Very confident", "Somewhat confident", "Neutral", "Needs improvement"]
  },
  {
    id: 2,
    question: "How well do you manage your time?",
    answers: ["Excellent", "Good", "Average", "Needs improvement"]
  },
  {
    id: 3,
    question: "How would you rate your problem-solving abilities?",
    answers: ["Excellent", "Good", "Average", "Needs improvement"]
  },
  {
    id: 4,
    question: "How effective are you at working in a team?",
    answers: ["Very effective", "Effective", "Somewhat effective", "Needs improvement"]
  },
  {
    id: 5,
    question: "How strong are your leadership skills?",
    answers: ["Very strong", "Strong", "Average", "Needs improvement"]
  },
  {
    id: 6,
    question: "How comfortable are you with making decisions under pressure?",
    answers: ["Very comfortable", "Comfortable", "Somewhat comfortable", "Not comfortable"]
  },
  {
    id: 7,
    question: "How well do you handle feedback?",
    answers: ["Very well", "Well", "Average", "Needs improvement"]
  },
  {
    id: 8,
    question: "How would you rate your adaptability to change?",
    answers: ["Excellent", "Good", "Average", "Needs improvement"]
  },
  {
    id: 9,
    question: "How effective are your negotiation skills?",
    answers: ["Very effective", "Effective", "Somewhat effective", "Needs improvement"]
  },
  {
    id: 10,
    question: "How strong are your organizational skills?",
    answers: ["Very strong", "Strong", "Average", "Needs improvement"]
  }
]

export default function Assess() {
  const [assessmentData, setAssessmentData] = useState(null as AssessmentData | null)
  const [responses, setResponses] = useState({} as Responses)
  const [message, setMessage] = useState(null as string | null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Set assessment data directly from embedded questions
    setAssessmentData({ questions: ASSESSMENT_QUESTIONS })
  }, [])

  const handleResponseChange = (questionId: number, answerIndex: string) => {
    setResponses((prev: Responses) => ({
      ...prev,
      [questionId]: parseInt(answerIndex)
    }))
  }

  const onSubmit = async () => {
    if (!assessmentData) return

    // Validate all questions are answered
    const unansweredQuestions = assessmentData.questions.filter(
      (q: Question) => responses[q.id] === undefined
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
      assessmentData.questions.forEach((question: Question) => {
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

  const allQuestionsAnswered = assessmentData.questions.every((q: Question) => responses[q.id] !== undefined)

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
            {assessmentData.questions.map((question: Question, index: number) => (
              <FormControl key={question.id} isRequired>
                <FormLabel fontWeight="semibold" mb={3}>
                  {index + 1}. {question.question}
                </FormLabel>
                <RadioGroup 
                  value={responses[question.id]?.toString() || ''} 
                  onChange={(value: string) => handleResponseChange(question.id, value)}
                >
                  <Stack spacing={2}>
                    {question.answers.map((answer: string, answerIndex: number) => (
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
