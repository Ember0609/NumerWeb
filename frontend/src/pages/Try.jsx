import { Box, Button, Center, FormControl, FormLabel, HStack, NumberInput, NumberInputField, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Lagrange } from "../utils/Lagrange";

export default function Try(){
    const[data,setData] = useState([]);
    const[point,setPoint] = useState(3);
    const[x,setX] = useState();
    const[answer,setAnswer] = useState();

    useEffect(()=>{
        const newData = Array.from({length:point},(_,i) => {
            return data[i] || {x: '0',y: '0'}
        });
        setData(newData);
    },[point])

    const dataChange = (index,field,value) =>{
        const newData = [...data];
        newData[index][field] = value;
        setData(newData);
    }

    const handleSubmit = () =>{
        console.log("Current Data:", data);
        console.log("X value:", x);
        let cal = new Lagrange(data,x);
        let ans = cal.solve();
        setAnswer(ans.result);
    }

    return(
        <Box w={"100vw"} h={"100vh"} bg="gray.700">
            <Center>
                <Box p={6} w="60%" bg="gray.600">
                <VStack spacing={6}>
                    <HStack w="30%" justify="center">
                        <FormControl>
                            <FormLabel color="white">Point</FormLabel>
                                <NumberInput value={point} onChange = {(val) => setPoint(parseInt(val) || 0)} min={1}>
                                <NumberInputField bg="white"/>
                                </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="white">X</FormLabel>
                                <NumberInput value={x} onChange = {(val) => setX(val)}>
                                <NumberInputField bg="white"/>
                                </NumberInput>
                        </FormControl>
                    </HStack>
                    
                    <Box p={4} w="90%">
                        <VStack spacing={4}>
                            {data.map((data,index)=> (
                                <HStack key ={index} p={4}>
                                    <FormControl>
                                        <FormLabel color="white">X</FormLabel>
                                        <NumberInput value={data.x} onChange={(val) => dataChange(index,'x',val)}>
                                            <NumberInputField bg="white" />
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white">Fx</FormLabel>
                                        <NumberInput value={data.y} onChange={(val) => dataChange(index,'y',val)}>
                                            <NumberInputField bg="white" placeholder=""/>
                                        </NumberInput>
                                    </FormControl>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                    <Button colorScheme="teal" w="90%" onClick={handleSubmit}>
                              Calculate
                            </Button>

                    {answer != null &&(
                            <Text> F(x) = {answer}</Text>
                    )}
                </VStack>
                </Box>

            </Center>
        </Box>
    )
}