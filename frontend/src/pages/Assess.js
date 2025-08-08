import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, Heading, Stack, Text, RadioGroup, Radio, FormControl, FormLabel, Alert, AlertIcon } from '@chakra-ui/react';
import { apiPost } from '../api';
export default function Assess() {
    const [assessmentData, setAssessmentData] = useState(null);
    const [responses, setResponses] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Load assessment questions from JSON file
        const loadAssessment = async () => {
            try {
                const response = await fetch('/assessments/business-skills.json');
                if (!response.ok) {
                    throw new Error('Failed to load assessment questions');
                }
                const data = await response.json();
                setAssessmentData(data);
            }
            catch (error) {
                console.error('Error loading assessment:', error);
                setMessage('Failed to load assessment questions');
            }
        };
        loadAssessment();
    }, []);
    const handleResponseChange = (questionId, answerIndex) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: parseInt(answerIndex)
        }));
    };
    const onSubmit = async () => {
        if (!assessmentData)
            return;
        // Validate all questions are answered
        const unansweredQuestions = assessmentData.questions.filter((q) => responses[q.id] === undefined);
        if (unansweredQuestions.length > 0) {
            setMessage(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`);
            return;
        }
        setMessage(null);
        setLoading(true);
        try {
            // Convert responses to skills format for backend compatibility
            // Map question text to response index + 1 (to get 1-4 scale instead of 0-3)
            const skills = {};
            assessmentData.questions.forEach((question) => {
                const responseIndex = responses[question.id];
                // Convert 0-3 index to 1-4 scale for consistency with existing system
                skills[question.question] = responseIndex + 1;
            });
            await apiPost('/assessments', { skills });
            setMessage('Assessment submitted successfully!');
            // Reset form
            setResponses({});
        }
        catch (e) {
            setMessage(e.message || 'Failed to submit assessment');
        }
        finally {
            setLoading(false);
        }
    };
    if (!assessmentData) {
        return (_jsxs(Stack, { spacing: 6, children: [_jsx(Heading, { children: "Self Assessment" }), _jsx(Text, { children: "Loading assessment questions..." })] }));
    }
    const allQuestionsAnswered = assessmentData.questions.every((q) => responses[q.id] !== undefined);
    return (_jsxs(Stack, { spacing: 6, children: [_jsx(Heading, { children: "Business Skills Self Assessment" }), _jsx(Text, { color: "gray.600", children: "Please rate yourself on each of the following business skills. Your responses will help create a personalized skills profile." }), message && (_jsxs(Alert, { status: message.includes('successfully') ? 'success' : 'warning', children: [_jsx(AlertIcon, {}), message] })), _jsx(Card, { children: _jsx(CardBody, { children: _jsxs(Stack, { spacing: 6, children: [assessmentData.questions.map((question, index) => (_jsxs(FormControl, { isRequired: true, children: [_jsxs(FormLabel, { fontWeight: "semibold", mb: 3, children: [index + 1, ". ", question.question] }), _jsx(RadioGroup, { value: responses[question.id]?.toString() || '', onChange: (value) => handleResponseChange(question.id, value), children: _jsx(Stack, { spacing: 2, children: question.answers.map((answer, answerIndex) => (_jsx(Radio, { value: answerIndex.toString(), children: answer }, answerIndex))) }) })] }, question.id))), _jsxs(Box, { pt: 4, children: [_jsx(Button, { colorScheme: "blue", onClick: onSubmit, isLoading: loading, isDisabled: !allQuestionsAnswered, size: "lg", children: "Submit Assessment" }), !allQuestionsAnswered && (_jsx(Text, { fontSize: "sm", color: "gray.500", mt: 2, children: "Please answer all questions to submit your assessment" }))] })] }) }) })] }));
}
