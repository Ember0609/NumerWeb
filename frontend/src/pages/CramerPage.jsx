import { useState } from "react";
import { Box, VStack, Heading, Center } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { Cramer } from "../utils/Cramer";

export default function CramerPage() {
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleSolve = (matrix, vector) => {
    try {
      const cramer = new Cramer(matrix, vector);
      const { solutions, steps } = cramer.solve();
      setSolution(solutions);
      setSteps(steps);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
      <VStack spacing={6}>
        <Heading color="white">Cramer’s Rule</Heading>

        <MatrixForm onSolve={handleSolve} />

        {solution && (
          <Center w="100%">
            <MathJaxContext>
              <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg"
              >

                <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg"
                >
                  <Heading size="md" mb={4}>Solution</Heading>

                  {steps.map((s, i) => (
                    <Box key={i} mb={3} >
                      <MathJax>{`\\( \\large ${s} \\)`}</MathJax>
                    </Box>
                  ))}

                  <Heading size="md" mt={4}>Answer:</Heading>
                  <VStack align="start" spacing={2} mt={2}>
                    {solution.map((x, i) => (
                      <MathJax key={i}>
                        {`\\(\\large x_{${i + 1}} = ${Number(x).toFixed(7)} \\)`}
                      </MathJax>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </MathJaxContext>
          </Center>
        )}
      </VStack>
    </Box>
  );
}
