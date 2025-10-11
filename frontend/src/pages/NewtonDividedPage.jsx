import { useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import InterpolationForm from "../form/InterpolationForm";

// Placeholder สำหรับ Class คำนวณ (เราจะสร้างต่อไป)
// import { Lagrange } from "../utils/Lagrange"; 

export default function LagrangePage() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);

    const handleCalculate = (points, xValue) => {
        
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh" overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"} size="xl">Newton Interpolation</Heading>
                <Center>
                    <InterpolationForm onCalculate={handleCalculate} />
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                {/* ส่วนแสดงผลลัพธ์จะอยู่ที่นี่ */}
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}