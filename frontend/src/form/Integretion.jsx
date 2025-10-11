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
  const [a, setA] = useState(2);
  const [b, setB] = useState(8);
  const [fx, setFx] = useState("4x^5 - 3x^4 + x^3 - 6x + 2x");

  const Submit = () => {
    if (onCalculate) {
      onCalculate({ a,b,fx });
    }
  };


  return (
    <VStack spacing={6}>
      <Center>
        <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} w="100%">
            <Flex gap={4} w="90%">
              <FormControl>
                <FormLabel color="white">A</FormLabel>
                <NumberInput value={a} onChange={(val) => setA(val)}>
                  <NumberInputField bg="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel color="white">B</FormLabel>
                <NumberInput value={b} onChange={(val) => setB(val)}>
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

            <Button colorScheme="teal" w="90%" onClick={Submit}>
              Calculate
            </Button>

          </VStack>
        </Box>
      </Center>
    </VStack>
  );
}
