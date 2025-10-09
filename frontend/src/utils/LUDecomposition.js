export class LUDecomposition {
  constructor(A, B) {
    this.A = A.map(row => [...row]);
    this.B = Array.isArray(B[0]) ? B.map(row => row[0]) : [...B]; // รับทั้ง vector matrix
    this.n = this.A.length;
    this.steps = [];
    this.x = [];
    this.y = [];
    this.L = Array.from({ length: this.n }, () => Array(this.n).fill(0));
    this.U = Array.from({ length: this.n }, () => Array(this.n).fill(0));
    this.yback = [];
    this.xback = [];
  }

  solve() {
    const n = this.A.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += this.L[j][k] * this.U[k][i];
        }
        this.L[j][i] = this.A[j][i] - sum;
      }

      this.U[i][i] = 1;
      for (let j = i+1; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) {
          sum += this.L[i][k] * this.U[k][j];
        }
        this.U[i][j] = (this.A[i][j] - sum) / this.L[i][i];
        
      }
    }


    // Forward substitution: Ly = B
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += this.L[i][j] * this.y[j];
      }
      this.y[i] = (this.B[i] - sum) / this.L[i][i];
      this.yback.push(
        `y_{${i + 1}} = \\frac{${sum.toFixed(3)}}{${this.L[i][i].toFixed(3)}} = ${this.y[i].toFixed(3)}`)
    }

    // Backward substitution: Ux = y
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += this.U[i][j] * this.x[j];
      }
      this.x[i] = this.y[i] - sum; 
      this.xback.push(`x_{${i + 1}} = ${this.x[i].toFixed(3)}`)
    }

    return { L: this.L, U: this.U, x: this.x, yback: this.yback, xback: this.xback };
  }

 static matrixToLatex(mat) {
    return `\\begin{bmatrix}${mat
      .map(row => row.map(val => val.toFixed(3)).join(" & "))
      .join("\\\\")}\\end{bmatrix}`;
  }

}
