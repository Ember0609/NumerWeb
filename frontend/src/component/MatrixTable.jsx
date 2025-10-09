import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function MatrixTable({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <Box w="100%" overflowX="auto" bg="white" borderRadius="md" p={4} mt={4}>
            <Table variant="simple" size="md">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>Iteration</Th>
                        <Th>X</Th>
                        <Th>Error</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, index) => (
                        <Tr key={index}>
                            <Td>{row.iteration}</Td>
                            <Td>
                                {row.x.map((val, i) => (
                                    <Box key={i}>
                                        x{i + 1}: {val.toFixed(7)}
                                    </Box>
                                ))}
                            </Td>
                            <Td>
                                {row.error.map((val, i) => (
                                    <Box key={i}>
                                        Error {i + 1}: {val.toFixed(7)}
                                    </Box>
                                ))}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}