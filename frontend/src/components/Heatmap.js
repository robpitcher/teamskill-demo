import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
function colorFor(value) {
    const colors = ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'];
    const idx = Math.min(colors.length - 1, Math.max(0, Math.round(value)));
    return colors[idx];
}
export default function Heatmap({ skills, users, values }) {
    const border = useColorModeValue('gray.200', 'gray.600');
    return (_jsxs(Grid, { templateColumns: `200px repeat(${skills.length}, 1fr)`, gap: 1, children: [_jsx(GridItem, {}), skills.map(s => (_jsx(GridItem, { textAlign: "center", children: _jsx(Text, { fontWeight: "medium", children: s }) }, `h-${s}`))), users.map((u, r) => (_jsxs(React.Fragment, { children: [_jsx(GridItem, { children: _jsx(Text, { fontWeight: "medium", children: u }) }), skills.map((_, c) => (_jsx(GridItem, { border: "1px solid", borderColor: border, children: _jsx(Box, { w: "100%", h: "36px", bg: colorFor(values[r][c]) }) }, `cell-${r}-${c}`)))] }, `row-${u}`)))] }));
}
