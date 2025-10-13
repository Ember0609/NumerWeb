import { useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import InterpolationForm from "../form/InterpolationForm";


export default function LagrangePage() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [xValue, setXValue] = useState(0);

    const handleCalculate = (points, xValue) => {
        try {
            const calculator = new Lagrange(points, xValue);
            const { result, steps } = calculator.solve();
            setAnswer(result);
            setSteps(steps);
            setXValue(xValue);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"} size="xl">Linear Regression</Heading>
                <Center>
                    <InterpolationForm onCalculate={handleCalculate} />
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="auto" minW="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                <Heading size="md" mb={4}>Steps</Heading>
                                <VStack align="stretch" spacing={4}>
                                    {steps.map((step, index) => (
                                        <MathJax key={index} style={{ fontSize: "1rem", textAlign: 'left' }}>
                                            {`\\(${step}\\)`}
                                        </MathJax>
                                    ))}
                                </VStack>
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