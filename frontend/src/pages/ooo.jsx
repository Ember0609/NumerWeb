import { Box, Button, Center, FormControl, FormLabel, HStack, NumberInput, NumberInputField, VStack, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ALagrange } from "../utils/ALagrange";
import ChartOOO from "../component/ChartOOO";

export default function ooo() {
    const [data, setData] = useState([{ x: '1', fx: '12' }, { x: '2', fx: '24' }, { x: '3', fx: '36' }]);
    const [point, setPoint] = useState(3);
    const [x, setX] = useState(2.4);
    const [answer, setAnswer] = useState();
    const [datac, setDatac] = useState([]);
    const [answerline, setAnswerline] = useState([]);
    const [lagrangeline, setLagrangeline] = useState([]);
    const [line,setLine] = useState([]);


    useEffect(() => {
        const newData = Array.from({ length: point }, (_, i) => {
            return data[i] || { x: '0', fx: '0' }
        });
        setData(newData);
    }, [point])



    const changeData = (i, name, value) => {
        const newData = [...data];
        newData[i][name] = Number(value);
        setData(newData);
    };


    const summit = () => {
        console.log("click")
        let cal = new ALagrange(data, x, point);
        let ans = cal.solve();
        setAnswer(ans.result)
        setDatac(ans.Lpoint)
        setLine(ans.anspoint)
        let getline = cal.Lline();
        setAnswerline(getline.answerline);
        setLagrangeline(getline.lagrangeline);
    }
    return (
        <Box w="100vw" h="100%" bg={"gray.700"}>
            <Center>
                <VStack p={4}>
                    <Heading color={"white"}> Lagrange </Heading>
                    <Box p={6} w="80%" bg={"gray.800"} borderRadius={"lg"} mt={"20px"}>
                        <HStack>
                            <FormControl>
                                <FormLabel color={"white"}>Points</FormLabel>
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
                                    <NumberInput value={data.x} onChange={(val) => changeData(index, 'x', val)}>
                                        <NumberInputField bg="white" />
                                    </NumberInput>
                                </FormControl>
                                <FormControl w={"60%"}>
                                    <FormLabel color="white">Fx </FormLabel>
                                    <NumberInput value={data.fx} onChange={(val) => changeData(index, 'fx', val)}>
                                        <NumberInputField bg="white" />
                                    </NumberInput>
                                </FormControl>

                            </HStack>

                        ))}
                    </Box>
                    <Button onClick={summit}>
                        Cal
                    </Button>
                    {answer != null && (
                        <Box bg="white" borderRadius={"lg"} p={6} mt={"20px"} w={"60vw"}>
                            <Center>
                                <Text >Fx = {answer}</Text>
                            </Center>
                            <ChartOOO data={datac}
                                lagrangeline={lagrangeline}
                                answerline={answerline}
                                line = {line}
                                x = {x}
                            />
                        </Box>
                    )
                    }
                </VStack>
            </Center>
        </Box>

    )
}