import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { LUDecomposition } from "../utils/LUDecomposition";

export default function App() {
const [L, setL] = useState([]);
  const [U, setU] = useState([]);
  const [x, setX] = useState([]);
  const [yback, setYback] = useState([]);
  const [xback, setXback] = useState([]);

const handleSolve = (matrix, vector) => {
  try {
    const lu = new LUDecomposition(matrix, vector);
      const result = lu.solve();
      setL(result.L);
      setU(result.U);
      setX(result.x);
      setYback(result.yback);
      setXback(result.xback);
    } catch (err) {
      alert(err.message);
    }
};


  return (
    <Box p={6} bg="gray.700" minW="100vw" minH="100vh">
      <VStack spacing={6}>
        <Heading color="white">LU-Decomposition</Heading>

        <MatrixForm onSolve={handleSolve} />

        {x.length > 0 && (
          <MathJaxContext>
            <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg"
            >
              <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg"
              >
              <Heading size="md">L</Heading>
              <Box mt= {2}mb={2}>
              <MathJax>{`\\(${LUDecomposition.matrixToLatex(L)}\\)`}</MathJax>
              </Box>

              <Heading size="md" mt={4}>U</Heading>
              <Box mt= {2}mb={2}>
              <MathJax>{`\\(${LUDecomposition.matrixToLatex(U)}\\)`}</MathJax>
               </Box>
              <Heading size="md" mt={4}>Forward Substitution (y)</Heading>
              {yback.map((line, i) => (
                <Box mt= {2}mb={2}>
                <MathJax key={i} style={{fontSize:"1rem"}}>{`\\(${line}\\)`}</MathJax>
                </Box>
              ))}

              <Heading size="md" mt={4}>Backward Substitution (x)</Heading>
              {xback.map((line, i) => (
                <Box mt= {2}mb={2}>
                <MathJax key={i} >{`\\(${line}\\)`}</MathJax>
                </Box>
              ))}

              <Heading size="md" mt={4}>Solution x</Heading>
              {x.map((val, i) => (
                <Box mt= {2} mb={2}>
                <MathJax key={i} >{`\\(x_{${i+1}} = ${val.toFixed(3)}\\)`}</MathJax>
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
