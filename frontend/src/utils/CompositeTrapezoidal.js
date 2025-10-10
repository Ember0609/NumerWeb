import { parse } from "mathjs";

export class CompositeTrapezoidal {
    constructor(a, b, f,n) {
        this.A = parseFloat(a);
        this.B = parseFloat(b);
        const pf = f.replace(/(\d)([a-zA-Z])/g, '$1*$2');
        this.rawF = f;
        this.fp = parse(pf);
        this.steps = [];
        this.n = parseFloat(n);
    }

    evalAt(x) {
        return this.fp.evaluate({ x: x });
    }

    solve() {
        this.steps.push(`I \\approx \\frac{h}{2} (f(x_0) + f(x_n) + 2\\displaystyle\\sum_{i=1}^{n-1} f(x_i))`);
        
        const formatEquation = (x) => {
            return this.rawF.replace(/x/g, `(${x})`);
        }

        // หา H
        let h = (this.B - this.A)/this.n;
        this.steps.push(`h = \\frac{b - a}{n} = \\frac{${this.B} - ${this.A}}{${this.n}} = ${h}`);
        let x=[];
        let fx = [];
        
        // หา x
        for(let i = 0 ; i<this.n+1;i++){
            x[i] =  this.A + (i*h);
        }

        // คำนวน fx
        for(let i = 0 ; i<this.n+1;i++){
            fx[i] = this.evalAt(x[i]);
            this.steps.push(`f(x_${i} = ${x[i]}) = ${formatEquation(x[i])}  = ${fx[i].toFixed(4)}`);
        }

        // คำนวนตามสูตร
        let sum = 0;
        let sum_string_parts = []; 

        for (let i = 1; i < this.n; i++) {
            sum += fx[i];
            sum_string_parts.push(fx[i].toFixed(4));
        }
        const sum_string = sum_string_parts.join(' + ');

        this.steps.push(`\\displaystyle\\sum_{i=1}^{n-1} f(x_i) = ${sum_string} = ${sum.toFixed(7)}`);
        

        const ans = (h / 2) * (fx[0] + fx[this.n] + 2 * sum);
        this.steps.push(`I \\approx \\frac{${h.toFixed(4)}}{2} [${fx[0].toFixed(7)} + ${fx[this.n].toFixed(7)} + 2(${sum.toFixed(7)})] = ${ans.toFixed(7)}`);
        return { ans, steps: this.steps };
    }
}