import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function BisectionTable({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <Box w="100%" overflowX="auto" bg="white" borderRadius="md" p={4}>
            <Table variant="simple" size="sm">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>Iteration</Th>
                        <Th>X</Th>
                        <Th>f(X)</Th>
                        <Th>Error</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, index) => (
                        <Tr key={index}>
                            <Td>{row.iteration}</Td>
                            <Td>{row.root.toFixed(5)}</Td>
                            <Td>{row.fx.toFixed(5)}</Td>
                            <Td>{row.error.toFixed(7)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}
