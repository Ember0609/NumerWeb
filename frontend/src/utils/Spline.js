export class Spline {
    constructor(points) {
        // Sort points by x-value to ensure correct interval calculations
        this.points = [...points].sort((a, b) => a.x - b.x);
        this.n = this.points.length;
    }

    solve(xValue, type) {
        switch (type) {
            case 'linear':
                return this._solveLinear(xValue);
            case 'quadratic':
                // Quadratic spline implementation can be added here
                throw new Error("Quadratic Spline is not yet implemented.");
            case 'cubic':
                return this._solveCubic(xValue);
            default:
                throw new Error("Invalid spline type specified.");
        }
    }

    // --- UPDATED: _solveLinear method ---
    _solveLinear(xValue) {
        const steps = [];


        for (let i = 0; i < this.n - 1; i++) {
            const p0 = this.points[i];
            const p1 = this.points[i + 1];
            const slope = (p1.y - p0.y) / (p1.x - p0.x);

            const intercept = p0.y - slope * p0.x;

            const slopeInterceptForm = `${slope.toFixed(4)}x ${intercept >= 0 ? '+' : '-'} ${Math.abs(intercept).toFixed(4)}`;

        
            const resultForThisEquation = slope * xValue + intercept;

            const equation = `f_{${i}}(x) = ${p0.y.toFixed(4)} + ${slope.toFixed(4)}(x - ${p0.x}) = ${slopeInterceptForm} \\rightarrow f_{${i}}(${xValue}) = ${resultForThisEquation.toFixed(4)}`;

            steps.push(equation);
        }

        const i = this._findInterval(xValue);
        const p0 = this.points[i];
        const p1 = this.points[i + 1];

        const result = p0.y + ((p1.y - p0.y) / (p1.x - p0.x)) * (xValue - p0.x);

        steps.push(`{\\text{Calculation for x = ${xValue}:}}`);
        const finalCalcStep = `f(${xValue}) \\approx ${p0.y.toFixed(4)} + \\frac{${p1.y.toFixed(4)} - ${p0.y.toFixed(4)}}{${p1.x} - ${p0.x}}(${xValue} - ${p0.x})`;
        steps.push(finalCalcStep);

        return { result, steps };
    }
    _solveCubic(xValue) {
        // ... (Cubic spline code remains the same)
        const steps = [];
        const n = this.n;
        const a = this.points.map(p => p.y);
        const h = new Array(n - 1);
        for (let i = 0; i < n - 1; i++) h[i] = this.points[i + 1].x - this.points[i].x;

        const alpha = new Array(n - 1);
        for (let i = 1; i < n - 1; i++) {
            alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
        }

        const l = new Array(n).fill(1);
        const mu = new Array(n).fill(0);
        const z = new Array(n).fill(0);
        const c = new Array(n).fill(0);
        const b = new Array(n - 1).fill(0);
        const d = new Array(n - 1).fill(0);

        for (let i = 1; i < n - 1; i++) {
            l[i] = 2 * (this.points[i + 1].x - this.points[i - 1].x) - h[i - 1] * mu[i - 1];
            mu[i] = h[i] / l[i];
            z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
        }

        for (let j = n - 2; j >= 0; j--) {
            c[j] = z[j] - mu[j] * c[j + 1];
            b[j] = (a[j + 1] - a[j]) / h[j] - (h[j] * (c[j + 1] + 2 * c[j])) / 3;
            d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
        }

        for (let i = 0; i < n - 1; i++) {
            steps.push(`S_{${i}}(x) = ${a[i].toFixed(4)} + ${b[i].toFixed(4)}(x - ${this.points[i].x}) + ${c[i].toFixed(4)}(x - ${this.points[i].x})^2 + ${d[i].toFixed(4)}(x - ${this.points[i].x})^3`);
        }

        const i = this._findInterval(xValue);
        const dx = xValue - this.points[i].x;
        const result = a[i] + b[i] * dx + c[i] * Math.pow(dx, 2) + d[i] * Math.pow(dx, 3);

        steps.push(`f(${xValue}) \\approx S_{${i}}(${xValue})`);

        return { result, steps };
    }

    _findInterval(xValue) {
        // Find the index 'i' such that points[i].x <= xValue < points[i+1].x
        let i = 0;
        // Handle edge case where xValue is less than the first point's x
        if (xValue < this.points[0].x) {
            return 0;
        }
        while (i < this.n - 2 && xValue > this.points[i + 1].x) {
            i++;
        }
        return i;
    }
}