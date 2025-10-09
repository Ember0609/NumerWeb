import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { GaussianElimination } from "../utils/GaussianElimination";

export default function App() {
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = (matrix, vector) => {
    try {
      const matrixA = matrix.map((row, i) => [...row, vector[i]]);
      const ans = new GaussianElimination(matrixA);
      const { solutions, steps } = ans.solve();
      setSolution(solutions);
      setSteps(steps);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
      <VStack spacing={6}>
        <Heading color="white">Gaussian Elimination</Heading>

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

                {steps.map((s, i) => (
                  <Box key={i} mb={3}>
                    <MathJax style={{ fontSize: "1rem" }}>{`\\(${s}\\)`}</MathJax>
                  </Box>
                ))}

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
