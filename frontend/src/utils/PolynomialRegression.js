export class PolynomialRegression {
    constructor(points, x, order) {
        this.points = [...points];
        this.x = x;
        this.order = order;
        this.n = points.length;
    }

    matrixToLatex(mat) {
        return `\\begin{bmatrix}${mat
          .map(row => row.map(val => val.toFixed(2)).join(" & "))
          .join("\\\\")}\\end{bmatrix}`;
    }

    solve() {
        if (this.n <= this.order) {
            throw new Error("Number of points must be greater than the polynomial order.");
        }

        const steps = [];
        const m = this.order + 1; // Size of the matrix

        // --- Step 1: Calculate the sums of powers of X and Y ---
        const sumX = new Array(2 * this.order + 1).fill(0);
        const sumY = new Array(this.order + 1).fill(0);

        for (const p of this.points) {
            for (let i = 0; i < sumX.length; i++) {
                sumX[i] += Math.pow(p.x, i);
            }
            for (let i = 0; i < sumY.length; i++) {
                sumY[i] += p.y * Math.pow(p.x, i);
            }
        }
        steps.push(`\\text{Calculated Sums: } \\sum x^k, \\sum yx^k`);
        steps.push(`\\text{---}`);

        // --- Step 2: Build the Augmented Matrix ---
        let augMatrix = Array.from({ length: m }, () => new Array(m + 1).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                augMatrix[i][j] = sumX[i + j];
            }
            augMatrix[i][m] = sumY[i];
        }

        steps.push(`\\text{Augmented Matrix [A|B]:}`);
        steps.push(this.matrixToLatex(augMatrix));

        // --- Step 3: Gauss-Jordan Elimination ---
        for (let i = 0; i < m; i++) {
            // Find pivot
            let pivotRow = i;
            for (let k = i + 1; k < m; k++) {
                if (Math.abs(augMatrix[k][i]) > Math.abs(augMatrix[pivotRow][i])) {
                    pivotRow = k;
                }
            }
            [augMatrix[i], augMatrix[pivotRow]] = [augMatrix[pivotRow], augMatrix[i]];

            // Normalize pivot row
            const pivot = augMatrix[i][i];
            if (Math.abs(pivot) < 1e-9) throw new Error("Matrix is singular.");
            for (let j = i; j <= m; j++) {
                augMatrix[i][j] /= pivot;
            }

            // Eliminate other rows
            for (let k = 0; k < m; k++) {
                if (k !== i) {
                    const factor = augMatrix[k][i];
                    for (let j = i; j <= m; j++) {
                        augMatrix[k][j] -= factor * augMatrix[i][j];
                    }
                }
            }
        }
        steps.push(`\\text{After Gauss-Jordan Elimination:}`);
        steps.push(this.matrixToLatex(augMatrix));
        steps.push(`\\text{---}`);

        // --- Step 4: Extract coefficients and calculate result ---
        const coefficients = augMatrix.map(row => row[m]);
        
        let equationStr = "f(x) = ";
        for(let i = 0; i < coefficients.length; i++) {
            const coeff = coefficients[i];
            if (Math.abs(coeff) < 1e-9) continue;
            
            const sign = (coeff > 0 && i > 0) ? ' + ' : (coeff < 0 ? ' - ' : '');
            const val = Math.abs(coeff).toFixed(4);
            
            if (i === 0) {
                 equationStr += `${coeff.toFixed(4)}`;
            } else if (i === 1) {
                equationStr += `${sign}${val}x`;
            } else {
                equationStr += `${sign}${val}x^${i}`;
            }
        }
        steps.push(equationStr);

        let result = 0;
        for (let i = 0; i < coefficients.length; i++) {
            result += coefficients[i] * Math.pow(this.x, i);
        }

        return { result, steps, coefficients };
    }
}