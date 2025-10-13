import { useEffect, useState } from "react";
import { Box, Input, Button, Grid, VStack, HStack, Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
 } from "@chakra-ui/react";
 

export default function MatrixForm({ onSolve }) {
  const [size, setSize] = useState(3);

 

  const [matrix, setMatrix] = useState([
  ]);
  const [x, setX] = useState([]);
  const [vector, setVector] = useState([]);
  const [et, setEt] = useState(0.000001);

  useEffect(() => {
      handleResize(size);
    }, []);

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
  };

  const handleVectorChange = (i, value) => {
    const newVector = [...vector];
    newVector[i] = value;
    setVector(newVector);
  };

  const handleXChange = (i, value) => {
    const newX = [...x];
    newX[i] = value;
    setX(newX);
  };

  const handleResize = (n) => {
    if (n < 1) return;
    setSize(n);
    setMatrix(Array.from({ length: n }, () => Array(n).fill("")));
    setVector(Array(n).fill(""));
    setX(Array(n).fill(""));
  };

  const LoadRandomExample = async () => {
    try {
        const example = await fetch("http://127.0.0.1:8000/examples/matrix_symmetric")
            .then(res => res.json());

        if (!example || !example.matrix_a) {
            alert("No symmetric matrix example data received");
            return;
        }
        
        setSize(example.matrix_a.length);
        setMatrix(example.matrix_a);
        setVector(example.vector_b);
        if (example.x_init) {
           setX(example.x_init);
        }

    } catch (error) {
        console.error("Failed to load symmetric matrix example:", error);
    }
};

  return (
    <Box
      p={6}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="md"
      maxW="70vw"
    >
      <VStack spacing={4}>
        <HStack>
          <Input
            bg="white"
            type="number"
            value={size}
            onChange={(e) => handleResize(Number(e.target.value))}
            w="100px"
          />
          <Box color="white">Matrix Size (n x n)</Box>
        </HStack>

        <HStack align="start" spacing={8}>
          {/* A matrix */}
          <VStack>
            <Heading size="sm" color="white">Matrix A</Heading>
            <Box overflow="auto" maxW="50vw">
              <Grid templateColumns={`repeat(${size}, 80px)`} gap={2}>
                {matrix.map((row, i) =>
                  row.map((val, j) => (
                    <Input
                      bg="white"
                      key={`${i}-${j}`}
                      type="number"
                      value={val}
                      placeholder="0" // แสดง 0 จาง ๆ
                      onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                    />
                  ))
                )}
              </Grid>
            </Box>
          </VStack>

          {/* Vector B */}
          <VStack>
            <Heading size="sm" color="white">Vector B</Heading>
            <Box overflow="auto" maxH="1000px">
              <Grid templateColumns={`repeat(1, 80px)`} gap={2}>
                {vector.map((val, i) => (
                  <Input
                    bg="white"
                    key={`b-${i}`}
                    type="number"
                    value={val}
                    placeholder="0"
                    onChange={(e) => handleVectorChange(i, e.target.value)}
                  />
                ))}
              </Grid>
            </Box>
          </VStack>
        </HStack>

        <Heading size="sm" color="white">X</Heading>
         <Box display="flex" justifyContent="center" w="100%">
          <Grid templateColumns={`repeat(${size}, 80px)`} gap={2}>
            {x.map((val, i) => (
              <Input
                bg="white"
                key={`x-${i}`}
                type="number"
                value={val}
                placeholder="0"
                onChange={(e) => handleXChange(i, e.target.value)}
              />
            ))}
          </Grid>
        </Box>
        <FormControl maxW="90%">
                      <FormLabel color="white">Error Tolerance</FormLabel>
                      <NumberInput value={et} onChange={(val) => setEt(val)} step={0.000001}>
                        <NumberInputField bg="white" />
                        <NumberInputStepper >
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

        <Button
          colorScheme="teal"
          onClick={() =>
            onSolve(
              // แปลง string เป็น number ก่อนส่ง
              matrix.map(row => row.map(val => parseFloat(val) || 0)),
              vector.map(val => parseFloat(val) || 0),
               x.map(val => parseFloat(val) || 0),
              et
            )
          }
        >
          Solve
        </Button>
        <Button colorScheme="purple" onClick={LoadRandomExample}>
                    Load Random Example
                </Button>
      </VStack>
    </Box>
  );
}
