import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";

export default function NewtonInterTable({ points, table }) {
    if (!table || table.length === 0 || !points || points.length === 0) {
        return null;
    }

    return (
        <Table variant="simple" bg="white" mt={4}>
            <Thead>
                <Tr>
                    <Th><MathJax inline>{'\\(i\\)'}</MathJax></Th>
                    <Th><MathJax inline>{'\\(x_i\\)'}</MathJax></Th>
                    {/* Create headers for C0, C1, C2, ... */}
                    {Array.from({ length: table[0].length }, (_, i) => (
                        <Th key={i}><MathJax inline>{`\\(C_{${i}}\\)`}</MathJax></Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {points.map((point, i) => (
                    <Tr key={i}>
                        <Td>{i}</Td>
                        <Td>{point.x}</Td>
                        {/* Map through the row in the table data */}
                        {table[i].map((val, j) => (
                           <Td key={j}>{val !== 0 ? val.toFixed(7) : '-'}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}