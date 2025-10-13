import { parse } from "mathjs";

export class Trapezoidal {
    constructor(a, b, f) {
        this.A = parseFloat(a); // ควรแปลงเป็นตัวเลขเสมอ
        this.B = parseFloat(b);
        const pf = f.replace(/(\d)([a-zA-Z])/g, '$1*$2');
        this.rawF = f;
        this.fp = parse(pf);
        this.steps = []; // สร้างอาเรย์สำหรับเก็บขั้นตอน
    }

    evalAt(x) {
        return this.fp.evaluate({ x: x });
    }

    solve() {
        this.steps.push(`I \\approx \\frac{h}{2} (f(x_0) + f(x_1))`);
        
        const formatEquation = (x) => {
            return this.rawF.replace(/x/g, `(${x})`);
        }

        let h = this.B - this.A;
        this.steps.push(`h = b - a = ${this.B} - ${this.A} = ${h}`);

        let fx = [];
        
        fx[0] = this.evalAt(this.A);
        this.steps.push(`f(x_0 = ${this.A}) = ${formatEquation(this.A)}  = ${fx[0].toFixed(4)}`);
        fx[1] = this.evalAt(this.B);
        this.steps.push(`f(x_1 = ${this.B}) = ${formatEquation(this.B)}  = ${fx[1].toFixed(4)}`);

        let ans = (h / 2) * (fx[0] + fx[1]);
        this.steps.push(`I \\approx \\frac{${h}}{2} (${fx[0].toFixed(4)} + ${fx[1].toFixed(4)}) = ${ans.toFixed(4)}`);
        
        // คืนค่าทั้งคำตอบและขั้นตอน
        return { ans, steps: this.steps };
    }
}