import { Box, Button, Center, FormControl, FormLabel, HStack, NumberInput, NumberInputField, VStack ,Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ALagrange } from "../utils/ALagrange";
export default function ooo() {
    const [data, setData] = useState([]);
    const [point, setPoint] = useState(3);
    const [x, setX] = useState(0);
    const [answer,setAnswer] = useState();

    useEffect(() => {
        const newData = Array.from({length:point},(_,i) =>{
            return data[i] || {x:'0',fx:'0'}
        });
        setData(newData);
    },[point])



    const changeData = (i, name, value) => {
        const newData = [...data];
        newData[i][name] = value;
        setData(newData);
    }


    const summit = () => {
        console.log("click")
        let cal = new ALagrange(data,x,point);
        let ans = cal.solve();
        setAnswer(ans.result)
    }
    return (
        <Box w="100vw" h="100vh" bg={"gray.700"}>
            <Center>
                <VStack>
                    <Box p={6} w="80%" bg={"gray.600"}>
                        <HStack>
                            <FormControl>
                                <FormLabel color={"white"}>Point</FormLabel>
                                <NumberInput value={point} onChange={(val) => (setPoint(val))}>
                                    <NumberInputField bg="white" />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel color={"white"}>X</FormLabel>
                                <NumberInput value={x} onChange={(val) => (setX(val))}>
                                    <NumberInputField bg="white" />
                                </NumberInput>
                            </FormControl>
                        </HStack>
                        {data.map((data, index) => (
                            <HStack p={4} key={index} >
                                <FormControl w={"60%"}>
                                    <FormLabel color="white">X</FormLabel>
                                    <NumberInput value={data.x} onChange={(val) => changeData(index,'x',val)}>
                                        <NumberInputField bg="white" />
                                    </NumberInput>
                                </FormControl>
                                <FormControl w={"60%"}>
                                    <FormLabel color="white">Fx </FormLabel>
                                    <NumberInput value={data.fx} onChange={(val) => changeData(index,'fx',val)}>
                                        <NumberInputField bg="white" />
                                    </NumberInput>
                                </FormControl>
                            </HStack>
                        ))}        
                    </Box>
                    <Button onClick={summit}>
                            Cal
                        </Button>
                    {answer != null &&(
                        <Text color="white">Fx = {answer}</Text>
                    )
                    }
                </VStack>
            </Center>
        </Box>

    )
}