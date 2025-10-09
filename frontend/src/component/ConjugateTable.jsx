import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function ConjugateGradientTable({ data }) {
    if (!data || data.length === 0) return null;

    // ฟังก์ชันสำหรับจัดรูปแบบ Array ให้อ่านง่าย
    const formatArray = (arr) => {
        if (!Array.isArray(arr)) return arr.toFixed(7);
        return arr.map((val, i) => (
            <Box key={i}>
                [{i}]: {val.toFixed(7)}
            </Box>
        ));
    };

    return (
        <Box w="100%" overflowX="auto" bg="white" borderRadius="md" p={4} mt={4}>
            <Table variant="simple" size="sm">
                <Thead bg="gray.100">
                    <Tr>
                        <Th isNumeric>Iter</Th>
                        <Th>X</Th>
                        <Th>r (Residual)</Th>
                        <Th>d (Direction)</Th>
                        <Th isNumeric>Alpha</Th>
                        <Th isNumeric>Beta</Th>
                        <Th isNumeric>Error</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, index) => (
                        <Tr key={index}>
                            <Td isNumeric>{row.iteration}</Td>
                            <Td>{formatArray(row.x)}</Td>
                            <Td>{formatArray(row.r)}</Td>
                            <Td>{formatArray(row.d)}</Td>
                            <Td isNumeric>{row.alpha.toFixed(7)}</Td>
                            <Td isNumeric>{row.iteration > 0 ? row.beta.toFixed(7) : "-"}</Td>
                            <Td isNumeric>{row.error.toFixed(7)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}