export class Lagrange {
    constructor(points, x) {
        this.points = [...points];
        this.x = x;
    }

    solve() {
        const n = this.points.length;
        const steps = [];
        const L_values = [];
        let ans = 0;

        // --- Part 1: Calculate each L_i and generate steps ---
        for (let i = 0; i < n; i++) {
            let L_i_value = 1.0;
            
            let symbolic_numerator = "";
            let symbolic_denominator = "";
            let value_numerator = "";
            let value_denominator = "";

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    // Build symbolic parts
                    symbolic_numerator += `(x - x_{${j}})`;
                    symbolic_denominator += `(x_{${i}} - x_{${j}})`;
                    
                    // Build value parts
                    value_numerator += `(${this.x} - ${this.points[j].x})`;
                    value_denominator += `(${this.points[i].x} - ${this.points[j].x})`;

                    // Actual calculation
                    L_i_value *= (this.x - this.points[j].x) / (this.points[i].x - this.points[j].x);
                }
            }
            L_values.push(L_i_value);

            // Create the detailed MathJax string for this L_i, similar to the image
            const step_string = `L_{${i}} = \\frac{${symbolic_numerator}}{${symbolic_denominator}} = \\frac{${value_numerator}}{${value_denominator}} = ${L_i_value.toFixed(7)}`;
            steps.push(step_string);
        }

        // --- Part 2: Calculate final f(x) and generate steps ---
        let symbolic_sum = L_values.map((_, i) => `L_{${i}}f(x_{${i}})`).join(' + ');
        let value_sum = L_values.map((val, i) => `(${val.toFixed(7)})(${this.points[i].y})`).join(' + ');
        
        ans = L_values.reduce((sum, val, i) => sum + val * this.points[i].y, 0);

        // Add final calculation steps
        steps.push(`f(${this.x}) = ${symbolic_sum}`);
        steps.push(`= ${value_sum}`);
        steps.push(`= ${ans.toFixed(7)}`);

        return { result: ans, steps: steps };
    }
}