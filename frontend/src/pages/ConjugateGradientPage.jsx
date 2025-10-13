import { useState } from "react";
import { Box, VStack, Heading ,Button} from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixFormWithX";
import { ConjugateGradient } from "../utils/";
import MatrixTable from "../component/MatrixTable"; // <-- เปลี่ยน import

export default function ConjugateGradientPage() {
    const [solution, setSolution] = useState(null);
    const [steps, setSteps] = useState([]);

    const handleSolve = (matrix, vector, x_init, et) => {
        try {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (matrix[i][j] !== matrix[j][i]) {
                        throw new Error("Matrix must be symmetric for Conjugate Gradient method.");
                    }
                }
            }

            const cal = new ConjugateGradient(matrix, vector, x_init, et);
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
                <Heading color="white">Conjugate Gradient</Heading>
                <MatrixForm onSolve={handleSolve} />
                {solution && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="80%" borderRadius="lg" boxShadow="lg"> {/* ขยายความกว้าง */}
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                <Heading size="md" mt={4}>
                                    Solution
                                </Heading>
                                {solution.map((x, i) => (
                                    <Box key={i} mb={1}>
                                        <MathJax style={{ fontSize: "1.1rem" }}>
                                            {`\\(x_{${i + 1}} = ${x.toFixed(7)}\\)`}
                                        </MathJax>
                                    </Box>
                                ))}

                                <Heading size="md" mb={4} mt={6}>
                                    Iteration Steps
                                </Heading>
                                <MatrixTable data={steps} /> {/* <-- เรียกใช้ตารางใหม่ */}
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}