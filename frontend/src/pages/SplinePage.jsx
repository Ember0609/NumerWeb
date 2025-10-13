import { useState } from "react";
import { Box, Center, Heading, VStack, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import InterpolationForm from "../form/InterpolationForm";
import { Spline } from "../utils/Spline"; 

export default function SplinePage() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [xValue, setXValue] = useState(0);
    const [splineType, setSplineType] = useState('cubic'); 
    const [title, setTitle] = useState('Cubic Spline');

    const handleCalculate = (points, xValue) => {
        try {
            if (splineType === 'linear' && points.length < 2) {
                alert("Linear Spline requires at least 2 points.");
                return;
            }
            if (splineType === 'quadratic' && points.length < 3) {
                 alert("Quadratic Spline requires at least 3 points.");
                return;
            }
            if (splineType === 'cubic' && points.length < 2) {
                 alert("Cubic Spline requires at least 2 points.");
                return;
            }
            
            const calculator = new Spline(points);
            const { result, steps } = calculator.solve(xValue, splineType);

            setTitle(`${splineType.charAt(0).toUpperCase() + splineType.slice(1)} Spline`);

            setAnswer(result);
            setSteps(steps);
            setXValue(xValue);
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"} size="xl">Spline Interpolation</Heading>
                <Center>
                    <Box p={6} bg="gray.800" borderRadius="lg" boxShadow="md" w="50vw">
                        <VStack spacing={4}>
                             <FormControl>
                                <FormLabel color="white">Spline Type</FormLabel>
                                <Select bg="white" value={splineType} onChange={(e) => setSplineType(e.target.value)}>
                                    <option value='linear'>Linear</option>
                                    <option value='quadratic'>Quadratic</option>
                                    <option value='cubic'>Cubic</option>
                                </Select>
                            </FormControl>
                            <InterpolationForm onCalculate={handleCalculate} />
                        </VStack>
                    </Box>
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="auto" minW="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                <Heading size="md" mb={4}>{title} Equations/Steps</Heading>
                                <VStack align="stretch" spacing={3}>
                                    {steps.map((step, index) => (
                                        <MathJax key={index} style={{ fontSize: "1.1rem", textAlign: 'left' }}>
                                            {`\\(${step}\\)`}
                                        </MathJax>
                                    ))}
                                </VStack>
                                <Heading size="md" mt={6} mb={2}>Final Answer</Heading>
                                <MathJax style={{ fontSize: "1.3rem", fontWeight: 'bold' }}>
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