// src/utils/Regression.js

export class Regression {

    matrixToLatex(mat) {
        // Function to format a matrix into LaTeX string for display
        return `\\begin{bmatrix}${mat
          .map(row => row.map(val => val.toFixed(2)).join(" & "))
          .join("\\\\")}\\end{bmatrix}`;
    }

    solve(points, xToPredict, type, order = 1) {
        let processedPoints = points;
        let processedXToPredict = xToPredict;
        let numVars = xToPredict.length;

        // --- Data Preparation Step ---
        if (type === 'polynomial') {
            numVars = order;
            // Transform single-variable points into multi-variable points (x, x^2, x^3, ...)
            processedPoints = points.map(p => {
                const multiX = [];
                for (let i = 1; i <= order; i++) {
                    multiX.push(Math.pow(p.x[0], i));
                }
                return { x: multiX, y: p.y };
            });
            // Transform the single x-to-predict value
            processedXToPredict = [];
            for (let i = 1; i <= order; i++) {
                processedXToPredict.push(Math.pow(xToPredict[0], i));
            }
        }
        
        const n = processedPoints.length;
        if (n <= numVars) {
            throw new Error("Number of data points must be greater than the number of variables/order.");
        }

        const steps = [];
        const matrixSize = numVars + 1;

        // --- Build the Augmented Matrix from Normal Equations ---
        let augMatrix = Array.from({ length: matrixSize }, () => new Array(matrixSize + 1).fill(0));
        for (let i = 0; i < n; i++) {
            const point = processedPoints[i];
            const x_values = [1, ...point.x]; // [1, x1, x2, ...]
            const y_val = point.y;

            for (let row = 0; row < matrixSize; row++) {
                for (let col = 0; col < matrixSize; col++) {
                    augMatrix[row][col] += x_values[row] * x_values[col];
                }
                augMatrix[row][matrixSize] += x_values[row] * y_val;
            }
        }
        steps.push(`\\text{Augmented Matrix [A|B]:}`);
        steps.push(this.matrixToLatex(augMatrix));

        // --- Perform Gauss-Jordan Elimination ---
        for (let i = 0; i < matrixSize; i++) {
            let pivotRow = i;
            for (let k = i + 1; k < matrixSize; k++) {
                if (Math.abs(augMatrix[k][i]) > Math.abs(augMatrix[pivotRow][i])) pivotRow = k;
            }
            [augMatrix[i], augMatrix[pivotRow]] = [augMatrix[pivotRow], augMatrix[i]];

            const pivot = augMatrix[i][i];
            if (Math.abs(pivot) < 1e-9) throw new Error("Matrix is singular. Data may be linearly dependent.");
            for (let j = i; j <= matrixSize; j++) augMatrix[i][j] /= pivot;

            for (let k = 0; k < matrixSize; k++) {
                if (k !== i) {
                    const factor = augMatrix[k][i];
                    for (let j = i; j <= matrixSize; j++) augMatrix[k][j] -= factor * augMatrix[i][j];
                }
            }
        }
        steps.push(`\\text{After Gauss-Jordan Elimination:}`);
        steps.push(this.matrixToLatex(augMatrix));
        steps.push(`\\text{---}`);

        // --- Extract coefficients and form equation ---
        const coefficients = augMatrix.map(row => row[matrixSize]);
        
        let equationStr = "f(x) = " + coefficients[0].toFixed(4);
        for(let i = 1; i < coefficients.length; i++) {
            const coeff = coefficients[i];
            const sign = coeff >= 0 ? ' + ' : ' - ';
            const power = (type === 'polynomial' && i > 1) ? `^${i}` : '';
            const variable = (type === 'polynomial') ? 'x' : `x_{${i}}`;
            equationStr += `${sign}${Math.abs(coeff).toFixed(4)}${variable}${power}`;
        }
        steps.push(equationStr);

        // --- Predict value ---
        let result = coefficients[0];
        for (let i = 0; i < processedXToPredict.length; i++) {
            result += coefficients[i + 1] * processedXToPredict[i];
        }

        return { result, steps, coefficients };
    }
}