import { useState } from "react";
import { Box, Center, Heading, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import InterpolationForm from "../form/InterpolationForm";
import { NewtonDivided } from "../utils/NewtonDivided"; //ตรวจสอบ Path ให้ถูกต้อง
import NewtonInterTable from "../component/NewtonInterTable";

export default function NewtonDividedPage() {
    const [answer, setAnswer] = useState(null);
    const [table, setTable] = useState([]);
    const [points, setPoints] = useState([]); //เก็บค่า points
    const [xValue, setXValue] = useState(0); //เก็บค่า xValue

    const handleCalculate = (points, xValue) => {
        try {
            const calculator = new NewtonDivided(points, xValue);
            const { result, table } = calculator.solve();
            setAnswer(result);
            setTable(table);
            setPoints(points); //เก็บค่า points ที่ได้รับ
            setXValue(xValue); //เก็บค่า xValue ที่ได้รับ
        } catch (err) {
            alert(err.message);
        }
    };



    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"} size="xl">Newton Interpolation</Heading>
                <Center>
                    <InterpolationForm onCalculate={handleCalculate} />
                </Center>

                {answer !== null && table.length > 0 && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" minw="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                <Heading size="md" mb={2}>Table</Heading>
                                <NewtonInterTable points={points} table={table} />
                                <Heading size="md" mt={6} mb={2}>Solution</Heading>
                                <MathJax style={{ fontSize: "1.2rem" }}>
                                    {`\\(f(${xValue}) \\approx ${answer.toFixed(7)}\\)`}
                                </MathJax>
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}