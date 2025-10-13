import Plot from "react-plotly.js";

export default function LinearRegressionChart({ plotData }) {
    // ถ้าไม่มีข้อมูล plotData ให้ return null (ไม่แสดงอะไรเลย)
    if (!plotData) {
        return null;
    }

    return (
        <Plot
            data={[
                {
                    x: plotData.points.map(p => p.x),
                    y: plotData.points.map(p => p.y),
                    mode: 'markers',
                    type: 'scatter',
                    name: 'Data Points',
                    marker: { color: 'blue' }
                },
                {
                    x: plotData.lineX,
                    y: plotData.lineY,
                    mode: 'lines',
                    type: 'scatter',
                    name: 'Regression Line',
                    line: { color: 'red' }
                },
                {
                    x: [plotData.prediction.x],
                    y: [plotData.prediction.y],
                    mode: 'markers',
                    type: 'scatter',
                    name: `Prediction at x=${plotData.prediction.x}`,
                    marker: { color: 'green', size: 12, symbol: 'star' }
                }
            ]}
            layout={{
                title: 'Linear Regression',
                xaxis: { title: 'x' },
                yaxis: { title: 'y' },
                dragmode:"pan",
            }}
            config={{
                    scrollZoom: true,
                    displaylogo: false,
                    responsive: true,}}

            style={{ width: '100%', height: '400px' }}
        />
    );
}