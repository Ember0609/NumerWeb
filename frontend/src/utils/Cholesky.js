export class Cholesky {
  constructor(A, B) {
    this.origA = A.map(row => [...row]); // เก็บ A ต้นฉบับไว้
    this.origB = [...B];
    this.n = this.origA.length;
    
    // ประกาศ property ทั้งหมดที่นี่
    this.At = Array.from({ length: this.n }, () => Array(this.n).fill(0)); // A Transpose
    this.NA = Array.from({ length: this.n }, () => Array(this.n).fill(0)); // A^T * A
    this.Nb = Array(this.n).fill(0); // A^T * B
    this.L = Array.from({ length: this.n }, () => Array(this.n).fill(0));
    this.LT = Array.from({ length: this.n }, () => Array(this.n).fill(0));
    this.x = Array(this.n).fill(0);
    this.y = Array(this.n).fill(0);
    this.yback = [];
    this.xback = [];
  }

  solve() {
    const n = this.n;

    // --- Step 1: สร้าง A^T ---
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        this.At[j][i] = this.origA[i][j];
      }
    }

    // --- Step 2: คำนวณ NA = A^T * A ---
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += this.At[i][k] * this.origA[k][j];
        }
        this.NA[i][j] = sum;
      }
    }

    // --- Step 3: คำนวณ Nb = A^T * B ---
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += this.At[i][j] * this.origB[j];
      }
      this.Nb[i] = sum;
    }

    // --- Step 4: Cholesky Decomposition (NA = LL^T) ---
    // ทำให้เป็น Loop เพื่อรองรับทุกขนาด
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += this.L[i][k] * this.L[j][k];
        }
        if (i === j) {
          const Numsqrt = this.NA[i][i] - sum;
          if (Numsqrt < 0) {
            throw new Error("Matrix is not positive-definite.");
          }
          this.L[i][j] = Math.sqrt(Numsqrt);
        } else {
          this.L[i][j] = (this.NA[i][j] - sum) / this.L[j][j];
        }
      }
    }

    // สร้าง L Transpose (LT)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        this.LT[i][j] = this.L[j][i];
      }
    }

    // --- Step 5: Forward substitution (Ly = Nb) ---
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += this.L[i][j] * this.y[j];
      }
      this.y[i] = (this.Nb[i] - sum) / this.L[i][i];
      this.yback.push(`y_{${i + 1}} = \\frac{${this.Nb[i].toFixed(3)} - ${sum.toFixed(3)}}{${this.L[i][i].toFixed(3)}} = ${this.y[i].toFixed(3)}`);
    }

    // --- Step 6: Backward substitution (L^T x = y) ---
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += this.LT[i][j] * this.x[j];
      }
      this.x[i] = (this.y[i] - sum) / this.LT[i][i];
      this.xback.push(`x_{${i + 1}} = \\frac{${this.y[i].toFixed(3)} - ${sum.toFixed(3)}}{${this.LT[i][i].toFixed(3)}} = ${this.x[i].toFixed(3)}`);
    }

    return { L: this.L, LT: this.LT, x: this.x, yback: this.yback, xback: this.xback };
  }

  static matrixToLatex(mat) {
    if (!mat || mat.length === 0) return "";
    return `\\begin{bmatrix}${mat
      .map(row => row.map(val => (val ? val.toFixed(3) : '0.000')).join(" & "))
      .join("\\\\")}\\end{bmatrix}`;
  }
}