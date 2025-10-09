export class GaussSeidel {
    constructor(A, B, X, et) {
        this.A = A;
        this.B = B;
        this.X = X;
        this.et = et;
        this.history = [];
    }

    solve() {
        const n = this.A.length;
        let x = [...this.X];
        let xold = Array(n).fill(0);
        let error = Array(n).fill(1);
        let iter = 0;
        const maxIter = 100;

        do {

            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) {
                    if (i != j) {
                        sum += this.A[i][j] * x[j];
                    }
                }
                x[i] = (this.B[i] - sum) / this.A[i][i];
            }

            for (let i = 0; i < n; i++) {
                error[i] = Math.abs((x[i] - xold[i]) / (x[i] || 1));
            }

            xold = [...x];

            this.history.push({
                iteration: iter,
                x: [...xold],  
                error: [...error],
            });

            const maxError = Math.max(...error);
            if (maxError < this.et || iter >= maxIter) {
                break;
            }
            iter++;
        } while (true);

        return { solutions: x, steps: this.history };
    }
}