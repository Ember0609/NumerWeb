import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { MatrixInversion } from "../utils/MatrixInversion";

export default function App() {
  const [solution, setSolution] = useState(null);
const [steps, setSteps] = useState([]);
const [inverse, setInverse] = useState(null);

const handleSolve = (matrix, vector) => {
  try {
    const gauss = new MatrixInversion(matrix, vector);
    const { solutions, steps, inverse } = gauss.solve();
    setSolution(solutions);
    setSteps(steps);
    setInverse(inverse);
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
      <VStack spacing={6}>
        <Heading color="white">Matrix Inversion</Heading>

        <MatrixForm onSolve={handleSolve} />

        {solution && (
          <MathJaxContext>
            <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg"
            >
              <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg"
              >
              <Heading size="md" mb={4}>
                Steps
              </Heading>

             <Heading size="md" mt={4}>Inverse Matrix</Heading>
            <Box mt={2}>
              <MathJax style={{ fontSize: "1rem" }}>
                {`\\(${MatrixInversion.prototype.matrixToLatex(inverse)}\\)`}
              </MathJax>
            </Box>

              <Heading size="md" mt={4}>
                Solution
              </Heading>

              {solution.map((x, i) => (
                <Box key={i} mb={1}>
                  <MathJax style={{ fontSize: "1.1rem" }}>
                    {`\\(x_{${i + 1}} = ${x.toFixed(3)}\\)`}
                  </MathJax>
                </Box>
              ))}
            </Box>
            </Box>
          </MathJaxContext>
        )}
      </VStack>
    </Box>
  );
}
