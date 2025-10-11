import { useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import DiffForm from "../form/DiffFrom"; // Import ฟอร์มของคุณ
import { Divided } from "../utils/"; // Import Class ที่สร้างใหม่

export default function App() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);
    
    const handleCalculate = ({ order, direction, error, x, fx, h }) => {
        try {
            const calculator = new Divided(fx, x, h);
            const res = calculator.solve(order, direction, error);
            
            setAnswer(res.ans);
            setSteps(res.steps);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"}>Divided-Differentiation</Heading>
                <Center>
                    <DiffForm onCalculate={handleCalculate} />
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" minw="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                <Heading size="md" mb={2}>Steps</Heading>
                                <VStack align="stretch" spacing={4} mb={6}>
                                    {steps.map((step, index) => (
                                            <MathJax style={{ fontSize: "1.2rem" }}>{`\\(${step}\\)`}</MathJax>
                                    ))}
                                </VStack>
                                
                                <Heading size="md" mb={2}>Solution</Heading>
                                    <MathJax style={{ fontSize: "1.2rem" }}>
                                        {`\\(f'(x) \\approx ${answer.toFixed(7)}\\)`}
                                    </MathJax>
            
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}