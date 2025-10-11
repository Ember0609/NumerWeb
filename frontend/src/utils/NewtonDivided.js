export class NewtonDivided {
    constructor(points, x) {
        this.points = [...points];
        this.x = x;
        this.memo = new Map(); // ใช้สำหรับ Memoization เพื่อเพิ่มความเร็ว
    }

    // ฟังก์ชัน cal ที่แปลงมาจาก C++ (ใช้การเรียกซ้ำ)
    cal(i, j) {
        const key = `${i},${j}`;
        if (this.memo.has(key)) {
            return this.memo.get(key);
        }

        if (i == j) {
            return this.points[i].y;
        }

        const result = (this.cal(i + 1, j) - this.cal(i, j - 1)) / (this.points[j].x - this.points[i].x);
        this.memo.set(key, result);
        return result;
    }

    solve() {
        const n = this.points.length;
        let ans = 0.0;

        for (let i = 0; i < n; i++) {
            let term = this.cal(0, i);
            for (let j = 0; j < i; j++) {
                term *= (this.x - this.points[j].x);
            }
            ans += term;
        }

        const table = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            table[i][0] = this.points[i].y;
        }
        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / (this.points[i + j].x - this.points[i].x);
            }
        }

        return { result: ans, table: table };
    }
}