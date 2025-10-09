import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixFormWithX";
import { GaussSeidel } from "../utils/";
import MatrixTable from "../component/MatrixTable";

export default function App() {
    const [solution, setSolution] = useState(null);
    const [steps, setSteps] = useState([]);

    const handleSolve = (matrix, vector, x, et) => {
        try {
            const cal = new GaussSeidel(matrix, vector, x, et);
            const { solutions, steps } = cal.solve();
            setSolution(solutions);
            setSteps(steps);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
            <VStack spacing={6}>
                <Heading color="white">Jacobi</Heading>

                <MatrixForm onSolve={handleSolve} />

                {solution && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg"
              >
                        <Box
                            p={6}
                            bg="white"
                            w="100%"
                            borderRadius="lg"
                            boxShadow="lg"
                        >
                            <Heading size="md" mt={4}>
                                Solution
                            </Heading>
                            {solution.map((x, i) => (
                                <Box key={i} mb={1}>
                                    <MathJax style={{ fontSize: "1.1rem" }}>
                                        {`\\(x_{${i + 1}} = ${x.toFixed(5)}\\)`}
                                    </MathJax>
                                </Box>
                            ))}

                            <Heading size="md" mb={4} mt={6}>
                                Table
                            </Heading>
                            <MatrixTable data={steps} />
                        </Box>
                        </Box>
                    </MathJaxContext>
                    
                )}
           
            </VStack>
        </Box>
    );
}
