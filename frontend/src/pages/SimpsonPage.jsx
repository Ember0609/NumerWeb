import { useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Integretion from "../form/Integretion";
import { Simpson } from "../utils/";

export default function SimpsonPage() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [problem, setProblem] = useState(null); // State ใหม่สำหรับเก็บโจทย์

    const SimpsonCal = ({ a, b, fx }) => {
        try {
            const cal = new Simpson(a, b, fx);
            const res = cal.solve();

            setProblem(`\\int_{${a}}^{${b}} (${cal.rawF}) \\,dx`);
            
            setAnswer(res.ans);
            setSteps(res.steps);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"}>Simpson Rule</Heading>
                <Center>
                    <Integretion onCalculate={SimpsonCal} />
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                
    
                                <Heading size="md" mb={2}>Problem</Heading>
                                <Box mb={6} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                                    <MathJax style={{ fontSize: "1.2rem" }}>{`\\(${problem}\\)`}</MathJax>
                                </Box>
                                <Heading size="md" mb={2}>Steps</Heading>
                                <VStack align="stretch" spacing={4} mb={6}>
                                    {steps.map((step) => (
                                            <MathJax>{`\\(${step}\\)`}</MathJax>
                                    ))}
                                </VStack>
                                
                                <Heading size="md" mb={2}>Solution</Heading>
                                    <MathJax style={{ fontSize: "1.1rem" }}>
                                        {`\\(I \\approx ${answer.toFixed(6)}\\)`}
                                    </MathJax>
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}