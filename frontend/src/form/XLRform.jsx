import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { useState } from "react";
  
export default function XLRform({ onCalculate }) {
  const [xl, setXl] = useState(1);
  const [xr, setXr] = useState(10);
  const [fx, setFx] = useState("x^4-13");
  const [et, setEt] = useState(0.000001);

  const Submit = () => {
    if (onCalculate) {
      onCalculate({ xl, xr, fx, et });
    }
  };

 const LoadRandomExample = async () => {
    try {
        // แค่เปลี่ยน URL ให้ระบุประเภทโจทย์
        const example = await fetch("http://127.0.0.1:8000/examples/bisection")
            .then(res => res.json());

        // ที่เหลือเหมือนเดิม
        setXl(parseFloat(example.xl));
        setXr(parseFloat(example.xr));
        setFx(example.fx);
        setEt(parseFloat(example.et));
    } catch (error) { /* ... */ }
}

  return (
    <VStack spacing={6}>
      <Center>
        <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} w="100%">
            <Flex gap={4} w="90%">
              <FormControl>
                <FormLabel color="white">X Start</FormLabel>
                <NumberInput value={xl} onChange={(val) => setXl(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel color="white">X End</FormLabel>
                <NumberInput value={xr} onChange={(val) => setXr(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <FormControl maxW="90%">
              <FormLabel color="white">F(x)</FormLabel>
              <Input bg="white" value={fx} onChange={(e) => setFx(e.target.value)} />
            </FormControl>

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

            <Button colorScheme="teal" w="90%" onClick={Submit}>
              Calculate
            </Button>

            <Button colorScheme="purple" onClick={LoadRandomExample}>
                    Load Random Example
                </Button>
          </VStack>
        </Box>
      </Center>
    </VStack>
  );
}
