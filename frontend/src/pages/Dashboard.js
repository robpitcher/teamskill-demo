import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Heading, Stack, Text, FormControl, FormLabel, Select, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, Alert, AlertIcon } from '@chakra-ui/react';
import Heatmap from '../components/Heatmap';
import { apiGet } from '../api';
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
];
export default function Dashboard() {
    const [skill, setSkill] = useState('communication');
    const [min, setMin] = useState(3);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [heatmapData, setHeatmapData] = useState(null);
    const [heatmapLoading, setHeatmapLoading] = useState(true);
    const loadHeatmapData = async () => {
        setHeatmapLoading(true);
        try {
            const data = await apiGet('/assessments/heatmap');
            const assessments = data.assessments || [];
            if (assessments.length === 0) {
                // Show message when no assessments exist
                setHeatmapData(null);
                return;
            }
            // Extract users and their assessment data
            const users = assessments.map((a) => a.username);
            const skills = skillCategories.map(sc => sc.display);
            // Create values matrix
            const values = assessments.map((assessment) => {
                return skillCategories.map(skillCategory => {
                    // Find the rating for this skill based on the question text
                    const rating = assessment.skills[skillCategory.question];
                    return rating ? Number(rating) : 0;
                });
            });
            setHeatmapData({ users, skills, values });
        }
        catch (error) {
            console.error('Error loading heatmap data:', error);
            setHeatmapData(null);
        }
        finally {
            setHeatmapLoading(false);
        }
    };
    const runSearch = async () => {
        setLoading(true);
        try {
            // Find the question text for the selected skill
            const selectedSkill = skillCategories.find(sc => sc.key === skill);
            const questionText = selectedSkill?.question || skillCategories[0].question;
            const data = await apiGet(`/search?skill=${encodeURIComponent(questionText)}&min=${min}`);
            setResults(data.results || []);
        }
        catch (e) {
            setResults([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadHeatmapData();
        runSearch();
    }, []);
    useEffect(() => {
        runSearch();
    }, [skill, min]);
    return (_jsxs(Stack, { spacing: 6, children: [_jsx(Heading, { children: "Team Skills Dashboard" }), heatmapLoading ? (_jsx(Text, { color: "gray.500", children: "Loading assessment data..." })) : heatmapData ? (_jsxs(_Fragment, { children: [_jsx(Text, { color: "gray.500", children: "Real assessment data from team member self-evaluations." }), _jsx(Heatmap, { skills: heatmapData.skills, users: heatmapData.users, values: heatmapData.values })] })) : (_jsxs(Alert, { status: "info", children: [_jsx(AlertIcon, {}), "No assessment data available yet. Complete your assessment to see team skills visualization."] })), _jsxs(Stack, { children: [_jsx(Heading, { size: "md", children: "Search by skill" }), _jsxs(HStack, { children: [_jsxs(FormControl, { w: "300px", children: [_jsx(FormLabel, { children: "Skill" }), _jsx(Select, { value: skill, onChange: (e) => setSkill(e.target.value), children: skillCategories.map(sc => _jsx("option", { value: sc.key, children: sc.display }, sc.key)) })] }), _jsxs(FormControl, { w: "120px", children: [_jsx(FormLabel, { children: "Min rating" }), _jsx(Select, { value: min, onChange: (e) => setMin(Number(e.target.value)), children: [1, 2, 3, 4].map(n => _jsx("option", { value: n, children: n }, n)) })] }), _jsx(Button, { onClick: runSearch, isLoading: loading, colorScheme: "blue", children: "Search" })] }), _jsxs(Table, { size: "sm", variant: "simple", children: [_jsx(Thead, { children: _jsxs(Tr, { children: [_jsx(Th, { children: "User" }), _jsx(Th, { isNumeric: true, children: "Rating" }), _jsx(Th, { children: "Submitted" })] }) }), _jsx(Tbody, { children: results.map((r) => (_jsxs(Tr, { children: [_jsx(Td, { children: r.username }), _jsx(Td, { isNumeric: true, children: r.rating }), _jsx(Td, { children: new Date(r.submittedAt).toLocaleString?.() || r.submittedAt })] }, r.userId))) })] }), results.length === 0 && !loading && (_jsxs(Text, { color: "gray.500", fontSize: "sm", children: ["No team members found with ", skillCategories.find(sc => sc.key === skill)?.display, " rating of ", min, " or higher."] }))] })] }));
}
