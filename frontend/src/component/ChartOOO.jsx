// ChartOOO.jsx
import Plot from "react-plotly.js";


export default function ChartOOO({ data , lagrangeline, answerline , line}) {
    if (!data || data.length === 0) return null;

    const plotData = [
        {
            x: data.map((d) => d.x),
            y: data.map((d) => d.fx),
            type: "scatter",
            mode: "markers",
            marker: { color: "red", size: 10 },
            name: "Data Points"
        },
        {
            x: line.map((d) => d.x),
            y: line.map((d) => d.fx),
            type: "scatter",
            mode: "lines",
            
            line: { dash: 'dot' ,color:"blue"},
            name: "P(x) - Lagrange Polynomial"
        }
        
    ];

    if (lagrangeline && lagrangeline.length > 0) {
        lagrangeline.forEach((line, index) => {
            plotData.push({
                x: line.map((d) => d.x),
                y: line.map((d) => d.fx),
                type: "scatter",
                mode: "lines",
                name: `L_${index}(x)`
            });
        });
    }
    

    return (
        <div style={{ width: "100%", height: 500, marginTop: "2rem" }}>
            <Plot
                data={plotData}
                layout={{
                    title: "Lagrange Interpolation",
                    xaxis: { title: "x" },
                    yaxis: { title: "f(x)" },
                    dragmode: "pan",
                    legend: {
                        orientation: "h",
                        yanchor: "bottom",
                        y: 1.02,
                        xanchor: "right",
                        x: 1
                    }
                }}
                config={{
                    scrollZoom: true,
                    displaylogo: false,
                    responsive: true,
                }}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}