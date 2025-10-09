export class ConjugateGradient {
    constructor(A, B, X, et = 0.0001) {
        this.A = A;
        this.B = B;
        this.X = X;
        this.et = et;
        this.history = [];
    }

    solve() {
        const n = this.A.length;
        let x0 = [...this.X];
        let x1 = Array(n).fill(0);
        let r0 = Array(n).fill(0);
        let r1 = Array(n).fill(0);
        let d = Array(n).fill(0);
        let error = 1.0;
        let count = 0;
        const maxIter = 500;

        // --- Corresponds to the first part of the C++ code ---
        // find r0 and initial d
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += this.A[i][j] * x0[j];
            }
            r0[i] = sum - this.B[i]; // Note: Standard CG is B - Ax, C++ code is Ax - B
            d[i] = -1 * r0[i];
        }

        do {
            // --- find alpha (arai in C++ code) ---
            let top_alpha = 0;
            for(let i = 0; i < n; i++) {
                top_alpha += d[i] * r0[i];
            }

            let Ad = Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += this.A[i][k] * d[k]; // A*d
                }
                Ad[i] = sum;
            }

            let bot_alpha = 0;
            for (let i = 0; i < n; i++) {
                bot_alpha += d[i] * Ad[i]; // d^T * A * d
            }
            
            // In your C++ code, you calculate alpha differently. Sticking to the C++ logic:
            // alpha = - (d^T * r) / (d^T * A * d)
            // But standard form is (r^T * r) / (d^T * A * d)
            // Here we follow the C++ logic.
            const alpha = -1 * (top_alpha / bot_alpha);


            // --- find x1 (new x) ---
            for (let i = 0; i < n; i++) {
                x1[i] = x0[i] + alpha * d[i];
            }

            // --- find r1 (new residual) ---
            // r1 = r0 - alpha * A * d
            for (let i = 0; i < n; i++) {
                r1[i] = r0[i] + alpha * Ad[i];
            }
            
            // --- check error ---
            let rr_sum = 0;
            for (let i = 0; i < n; i++) {
                rr_sum += r1[i] * r1[i];
            }
            error = Math.sqrt(rr_sum);

            // --- find beta (a0 in C++ code) ---
            // beta = (r1^T * r1) / (r0^T * r0)
            let top_beta = 0;
            for(let i = 0; i < n; i++){
                top_beta += r1[i] * r1[i];
            }
            
            let bot_beta = 0;
            for(let i = 0; i < n; i++){
                bot_beta += r0[i] * r0[i];
            }
            
            const beta = top_beta / bot_beta;


            // --- find d1 (new direction) ---
            // d1 = -r1 + beta * d
            for (let i = 0; i < n; i++) {
                d[i] = -r1[i] + beta * d[i];
            }
            
            // --- Update variables for next iteration ---
            x0 = [...x1];
            r0 = [...r1];
            count++;

            this.history.push({
                iteration: count,
                x: [...x0],
                error: error, // Use single error value as in C++
            });


        } while (error > this.et && count < maxIter);

        // For the table, we'll need to adjust it to show a single error value
        // So we adapt the history format slightly
        const tableSteps = this.history.map(step => ({
            iteration: step.iteration,
            x: step.x,
            // Create an array for error to match MatrixTable structure
            error: Array(n).fill(step.error) 
        }));

        return { solutions: x0, steps: tableSteps };
    }
}