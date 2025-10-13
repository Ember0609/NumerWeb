import { useState } from "react";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import RegressionForm from "../form/RegressionForm";
import { Regression } from "../utils/Regression";
import RegressionChart from "../component/RegressionChart";
import Plot from "react-plotly.js"; // <-- เพิ่ม import ของ Plotly โดยตรง

export default function RegressionPage() {
    const [answer, setAnswer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [xValues, setXValues] = useState([]);
    const [plotData, setPlotData] = useState(null);
    const [regressionType, setRegressionType] = useState('polynomial');

    const handleCalculate = (points, xToPredict, type, order) => {
        try {
            const calculator = new Regression();
            const { result, steps, coefficients } = calculator.solve(points, xToPredict, type, order);

            setAnswer(result);
            setSteps(steps);
            setXValues(xToPredict);
            setRegressionType(type);

            if (type === 'polynomial') {
                const xPoints = points.map(p => p.x[0]);
                const minX = Math.min(...xPoints);
                const maxX = Math.max(...xPoints);
                const lineX = [];
                const lineY = [];

                for (let x = minX; x <= maxX; x += (maxX - minX) / 100) {
                    lineX.push(x);
                    let y = 0;
                    for (let i = 0; i < coefficients.length; i++) {
                        y += coefficients[i] * Math.pow(x, i);
                    }
                    lineY.push(y);
                }

                setPlotData({
                    points: points.map(p => ({ x: p.x[0], y: p.y })),
                    lineX,
                    lineY,
                    prediction: { x: xToPredict[0], y: result }
                });
            } else if (type === 'multiple' && xToPredict.length === 2) {
                // ** START: โค้ดสร้างข้อมูลสำหรับกราฟ 3 มิติ **
                const [a0, a1, a2] = coefficients;

                // สร้าง Grid สำหรับพื้นผิวระนาบ
                const x1_data = points.map(p => p.x[0]);
                const x2_data = points.map(p => p.x[1]);
                const x1_range = np.linspace(Math.min(...x1_data), Math.max(...x1_data), 10);
                const x2_range = np.linspace(Math.min(...x2_data), Math.max(...x2_data), 10);
                
                const z_plane = [];
                for (const x2_val of x2_range) {
                    const row = [];
                    for (const x1_val of x1_range) {
                        row.push(a0 + a1 * x1_val + a2 * x2_val);
                    }
                    z_plane.push(row);
                }

                setPlotData({
                    points3d: {
                        x: x1_data,
                        y: x2_data,
                        z: points.map(p => p.y)
                    },
                    plane: {
                        x: x1_range,
                        y: x2_range,
                        z: z_plane
                    }
                });
                // ** END: โค้ดสร้างข้อมูลสำหรับกราฟ 3 มิติ **
            } else {
                setPlotData(null); // ล้างข้อมูลกราฟสำหรับกรณีอื่นๆ
            }

        } catch (err) {
            alert(err.message);
        }
    };

    // ฟังก์ชัน helper สำหรับสร้าง Array (เลียนแบบ np.linspace)
    const np = {
        linspace: (start, stop, num) => {
            const arr = [];
            const step = (stop - start) / (num - 1);
            for (let i = 0; i < num; i++) {
                arr.push(start + (step * i));
            }
            return arr;
        }
    };

    return (
        <Box p={6} bg="gray.700" minW="100vw" minH={{ base: "auto", md: "100vh" }} overflowX="hidden">
            <VStack spacing={6}>
                <Heading color={"white"} size="xl">Regression Analysis</Heading>
                <Center>
                    <RegressionForm onCalculate={handleCalculate} />
                </Center>

                {answer !== null && (
                    <MathJaxContext>
                        <Box p={6} bg="gray.800" w="auto" minW="60%" borderRadius="lg" boxShadow="lg">
                            <Box p={6} bg="white" w="100%" borderRadius="lg" boxShadow="lg">
                                
                                {regressionType === 'polynomial' && <RegressionChart plotData={plotData} />}

                                {/* ** START: Component กราฟ 3 มิติ ** */}
                                {regressionType === 'multiple' && plotData && (
                                     <Plot
                                        data={[
                                            // Trace 1: Data points (scatter3d)
                                            {
                                                ...plotData.points3d,
                                                mode: 'markers',
                                                type: 'scatter3d',
                                                name: 'Data Points',
                                                marker: { color: 'blue', size: 5 }
                                            },
                                            // Trace 2: Regression plane (surface)
                                            {
                                                ...plotData.plane,
                                                type: 'surface',
                                                name: 'Regression Plane',
                                                colorscale: 'Viridis',
                                                opacity: 0.7,
                                                showscale: false
                                            }
                                        ]}
                                        layout={{
                                            title: 'Multiple Linear Regression (3D View)',
                                            scene: {
                                                xaxis: { title: 'X1' },
                                                yaxis: { title: 'X2' },
                                                zaxis: { title: 'Y' }
                                            },
                                            autosize: true,
                                            margin: { l: 0, r: 0, b: 0, t: 40 }
                                        }}
                                        style={{ width: '100%', height: '500px' }}
                                     />
                                )}
                                {/* ** END: Component กราฟ 3 มิติ ** */}


                                <Heading size="md" mt={6} mb={4}>Calculation Steps</Heading>
                                <VStack align="stretch" spacing={4}>
                                    {steps.map((step, index) => (
                                        <MathJax key={index} style={{ fontSize: "1rem", textAlign: 'left' }}>
                                            {`\\(${step}\\)`}
                                        </MathJax>
                                    ))}
                                </VStack>
                                <Heading size="md" mt={6} mb={2}>Predicted Value</Heading>
                                <MathJax style={{ fontSize: "1.2rem" }}>
                                    {`\\(f(${xValues.join(', ')}) \\approx ${answer.toFixed(7)}\\)`}
                                </MathJax>
                            </Box>
                        </Box>
                    </MathJaxContext>
                )}
            </VStack>
        </Box>
    );
}