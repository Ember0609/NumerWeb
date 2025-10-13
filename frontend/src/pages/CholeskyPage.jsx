import { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixForm from "../form/MatrixForm";
import { Cholesky } from "../utils/Cholesky"; // แก้ไข import

export default function CholeskyPage() { // แก้ชื่อ Component
  const [L, setL] = useState([]);
  const [LT, setLT] = useState([]); // เปลี่ยน U เป็น LT
  const [x, setX] = useState([]);
  const [yback, setYback] = useState([]);
  const [xback, setXback] = useState([]);

  const handleSolve = (matrix, vector) => {
    try {
      // เช็คว่าเป็นเมทริกซ์สมมาตรหรือไม่ (เบื้องต้น)
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
          if (matrix[i][j] !== matrix[j][i]) {
            throw new Error("Matrix is not symmetric.");
          }
        }
      }

      const cholesky = new Cholesky(matrix, vector); // เรียกใช้ Cholesky
      const result = cholesky.solve();
      setL(result.L);
      setLT(result.LT); // ตั้งค่า LT
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
        <Heading color="white">Cholesky Decomposition</Heading>

        <MatrixForm onSolve={handleSolve} problemType="matrix_symmetric"/>

        {x.length > 0 && (
          <MathJaxContext>
            <Box p={6} bg="gray.800" w="60%" borderRadius="lg" boxShadow="lg"
              >
            <Box p={6} bg="white" w="100%" borderRadius="lg">
              <Heading size="md">L</Heading>
              <Box mb={4}>
                <MathJax>{`\\(${Cholesky.matrixToLatex(L)}\\)`}</MathJax>
              </Box>

              <Heading size="md" mt={4}>L<sup>T</sup> (L Transpose)</Heading> {/* เปลี่ยน U เป็น L^T */}
              <Box mb={4}>
                <MathJax>{`\\(${Cholesky.matrixToLatex(LT)}\\)`}</MathJax>
              </Box>

              <Heading size="md" mt={4}>Forward Substitution (Ly = B)</Heading>
              {yback.map((line, i) => (
                <Box key={i} mb={2}>
                  <MathJax style={{ fontSize: "1.2rem" }}>{`\\(${line}\\)`}</MathJax>
                </Box>
              ))}

              <Heading size="md" mt={4}>Backward Substitution (L<sup>T</sup>x = y)</Heading>
              {xback.map((line, i) => (
                <Box key={i} mb={2}>
                  <MathJax style={{ fontSize: "1.2rem" }}>{`\\(${line}\\)`}</MathJax>
                </Box>
              ))}

              <Heading size="md" mt={4}>Solution x</Heading>
              {x.map((val, i) => (
                <Box key={i} mb={1}>
                  <MathJax style={{ fontSize: "1.2rem" }}>{`\\(x_{${i+1}} = ${val.toFixed(3)}\\)`}</MathJax>
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