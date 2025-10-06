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

export default function EquationP2({ onCalculate }) {
    const [xin, setXin] = useState(1);
    const [fx, setFx] = useState("x^2-7");
    const [et, setEt] = useState(0.000001);

    const Submit = () => {
        if (onCalculate) {
            onCalculate({ xin, fx, et });
        }
    };

    return (
        <VStack spacing={6}>
            <Center>
                <Box p={6} bg="gray.800" w="40vw" borderRadius="lg" boxShadow="lg">
                    <VStack spacing={4} w="100%">
                        <Flex gap={4} w="90%">
                            <FormControl>
                                <FormLabel color="white">X Initial</FormLabel>
                                <NumberInput value={xin} onChange={(val) => setXin(val)}>
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
                    </VStack>
                </Box>
            </Center>
        </VStack>
    );
}
