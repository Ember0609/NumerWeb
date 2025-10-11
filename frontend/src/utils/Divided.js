import { parse } from "mathjs";

export class Divided {
    constructor(fx, x, h) {
        this.x = parseFloat(x);
        this.h = parseFloat(h);
        const pf = fx.replace(/(\d)([a-zA-Z])/g, '$1*$2');
        this.func = parse(pf);
        this.steps = [];
    }

    evalAt(x) {
        return this.func.evaluate({ x: x });
    }

    CreateTable(x0, h) {
        let table = [];
        // สร้างตารางเผื่อไว้สำหรับสูตรที่ต้องใช้ค่า x ไกลขึ้น (เช่น f(x_i+5))
        for (let i = -5; i <= 5; i++) {
            let x = x0 + i * h;
            let fxi = this.evalAt(x);
            table.push({ x, fx: fxi });
        }
        return table;
    }

    solve(order, direction, error) {
        let x0 = this.x;
        let h = this.h;
        let ans = 0;
        let formula = "";

        const formatNumber = (num) => {
            const fixedNum = num.toFixed(7);
            return num < 0 ? `(${fixedNum})` : fixedNum;
        };

        let table = this.CreateTable(x0, h);
        let xi = table.findIndex((item) => item.x === x0);

        // ==================== ORDER 1 ====================
        if (order == 1) {
            if (direction == 1 && error == 1) { // FWD O(h)
                formula = "f'(x) \\approx \\frac{f(x_{i+1}) - f(x_i)}{h}";
                this.steps.push(formula);
                ans = (table[xi + 1].fx - table[xi].fx) / h;
                this.steps.push(`f'(${x0}) \\approx \\frac{${formatNumber(table[xi+1].fx)} - ${formatNumber(table[xi].fx)}}{${h}} = ${ans.toFixed(7)}`);
            } 
            else if (direction == 1 && error == 2) { // FWD O(h^2)
                formula = "f'(x) \\approx \\frac{-f(x_{i+2}) + 4f(x_{i+1}) - 3f(x_i)}{2h}";
                this.steps.push(formula);
                ans = (-table[xi + 2].fx + 4 * table[xi + 1].fx - 3 * table[xi].fx) / (2 * h);
                this.steps.push(`f'(${x0}) \\approx \\frac{-${formatNumber(table[xi+2].fx)} + 4(${formatNumber(table[xi+1].fx)}) - 3(${formatNumber(table[xi].fx)})}{2(${h})} = ${ans.toFixed(7)}`);
            } 
            else if (direction == 2 && error == 1) { // BWD O(h)
                formula = "f'(x) \\approx \\frac{f(x_i) - f(x_{i-1})}{h}";
                this.steps.push(formula);
                ans = (table[xi].fx - table[xi - 1].fx) / h;
                this.steps.push(`f'(${x0}) \\approx \\frac{${formatNumber(table[xi].fx)} - ${formatNumber(table[xi-1].fx)}}{${h}} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 2) { // BWD O(h^2)
                formula = "f'(x) \\approx \\frac{3f(x_i) - 4f(x_{i-1}) + f(x_{i-2})}{2h}";
                this.steps.push(formula);
                ans = (3 * table[xi].fx - 4 * table[xi-1].fx + table[xi-2].fx) / (2 * h);
                this.steps.push(`f'(${x0}) \\approx \\frac{3(${formatNumber(table[xi].fx)}) - 4(${formatNumber(table[xi-1].fx)}) + ${formatNumber(table[xi-2].fx)}}{2(${h})} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 2) { // Central O(h^2)
                formula = "f'(x) \\approx \\frac{f(x_{i+1}) - f(x_{i-1})}{2h}";
                this.steps.push(formula);
                ans = (table[xi + 1].fx - table[xi - 1].fx) / (2 * h);
                this.steps.push(`f'(${x0}) \\approx \\frac{${formatNumber(table[xi + 1].fx)} - ${formatNumber(table[xi - 1].fx)}}{2(${h})} = ${ans.toFixed(7)}`);
            } 
            else if (direction == 3 && error == 3) { // Central O(h^4)
                formula = "f'(x) \\approx \\frac{-f(x_{i+2}) + 8f(x_{i+1}) - 8f(x_{i-1}) + f(x_{i-2})}{12h}";
                this.steps.push(formula);
                ans = (-table[xi + 2].fx + 8 * table[xi + 1].fx - 8 * table[xi - 1].fx + table[xi - 2].fx) / (12 * h);
                this.steps.push(`f'(${x0}) \\approx \\frac{-${formatNumber(table[xi + 2].fx)} + 8(${formatNumber(table[xi + 1].fx)}) - 8(${formatNumber(table[xi - 1].fx)}) + ${formatNumber(table[xi - 2].fx)}}{12(${h})} = ${ans.toFixed(7)}`);
            }
        
        // ==================== ORDER 2 ====================
        } else if (order == 2) {
            const h2 = Math.pow(h, 2);
            if (direction == 1 && error == 1) { // FWD O(h)
                formula = "f''(x) \\approx \\frac{f(x_{i+2}) - 2f(x_{i+1}) + f(x_i)}{h^2}";
                this.steps.push(formula);
                ans = (table[xi + 2].fx - 2 * table[xi + 1].fx + table[xi].fx) / h2;
                this.steps.push(`f''(${x0}) \\approx \\frac{${formatNumber(table[xi + 2].fx)} - 2(${formatNumber(table[xi + 1].fx)}) + ${formatNumber(table[xi].fx)}}{${h}^2} = ${ans.toFixed(7)}`);
            }
            else if (direction == 1 && error == 2) { // FWD O(h^2)
                formula = "f''(x) \\approx \\frac{-f(x_{i+3}) + 4f(x_{i+2}) - 5f(x_{i+1}) + 2f(x_i)}{h^2}";
                this.steps.push(formula);
                ans = (-table[xi + 3].fx + 4 * table[xi + 2].fx - 5 * table[xi + 1].fx + 2 * table[xi].fx) / h2;
                this.steps.push(`f''(${x0}) \\approx \\frac{-${formatNumber(table[xi + 3].fx)} + 4(${formatNumber(table[xi + 2].fx)}) - 5(${formatNumber(table[xi + 1].fx)}) + 2(${formatNumber(table[xi].fx)})}{${h}^2} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 1) { // BWD O(h)
                formula = "f''(x) \\approx \\frac{f(x_i) - 2f(x_{i-1}) + f(x_{i-2})}{h^2}";
                this.steps.push(formula);
                ans = (table[xi].fx - 2 * table[xi - 1].fx + table[xi - 2].fx) / h2;
                this.steps.push(`f''(${x0}) \\approx \\frac{${formatNumber(table[xi].fx)} - 2(${formatNumber(table[xi - 1].fx)}) + ${formatNumber(table[xi - 2].fx)}}{${h}^2} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 2) { // BWD O(h^2)
                formula = "f''(x) \\approx \\frac{2f(x_i) - 5f(x_{i-1}) + 4f(x_{i-2}) - f(x_{i-3})}{h^2}";
                this.steps.push(formula);
                ans = (2 * table[xi].fx - 5 * table[xi - 1].fx + 4 * table[xi - 2].fx - table[xi-3].fx) / h2;
                this.steps.push(`f''(${x0}) \\approx \\frac{2(${formatNumber(table[xi].fx)}) - 5(${formatNumber(table[xi - 1].fx)}) + 4(${formatNumber(table[xi - 2].fx)}) - ${formatNumber(table[xi - 3].fx)}}{${h}^2} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 2) { // Central O(h^2)
                formula = "f''(x) \\approx \\frac{f(x_{i+1}) - 2f(x_i) + f(x_{i-1})}{h^2}";
                this.steps.push(formula);
                ans = (table[xi + 1].fx - 2 * table[xi].fx + table[xi - 1].fx) / h2;
                this.steps.push(`f''(${x0}) \\approx \\frac{${formatNumber(table[xi + 1].fx)} - 2(${formatNumber(table[xi].fx)}) + ${formatNumber(table[xi - 1].fx)}}{${h}^2} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 3) { // Central O(h^4) - ADDED
                formula = "f''(x) \\approx \\frac{-f(x_{i+2}) + 16f(x_{i+1}) - 30f(x_i) + 16f(x_{i-1}) - f(x_{i-2})}{12h^2}";
                this.steps.push(formula);
                ans = (-table[xi + 2].fx + 16*table[xi+1].fx - 30*table[xi].fx + 16*table[xi-1].fx - table[xi-2].fx) / (12 * h2);
                this.steps.push(`f''(${x0}) \\approx \\frac{-${formatNumber(table[xi+2].fx)} + 16(${formatNumber(table[xi+1].fx)}) - 30(${formatNumber(table[xi].fx)}) + 16(${formatNumber(table[xi-1].fx)}) - ${formatNumber(table[xi-2].fx)}}{12(${h})^2} = ${ans.toFixed(7)}`);
            }
        
        // ==================== ORDER 3 ====================
        } else if (order == 3) {
            const h3 = Math.pow(h, 3);
            if (direction == 1 && error == 1) { // FWD O(h)
                formula = "f'''(x) \\approx \\frac{f(x_{i+3}) - 3f(x_{i+2}) + 3f(x_{i+1}) - f(x_i)}{h^3}";
                this.steps.push(formula);
                ans = (table[xi + 3].fx - 3 * table[xi + 2].fx + 3 * table[xi + 1].fx - table[xi].fx) / h3;
                this.steps.push(`f'''(${x0}) \\approx \\frac{${formatNumber(table[xi+3].fx)} - 3(${formatNumber(table[xi+2].fx)}) + 3(${formatNumber(table[xi+1].fx)}) - ${formatNumber(table[xi].fx)}}{${h}^3} = ${ans.toFixed(7)}`);
            }
            else if (direction == 1 && error == 2) { // FWD O(h^2) From slide
                formula = "f'''(x) \\approx \\frac{-3f(x_{i+4}) + 14f(x_{i+3}) - 24f(x_{i+2}) + 18f(x_{i+1}) - 5f(x_i)}{2h^3}";
                this.steps.push(formula);
                ans = (-3*table[xi+4].fx + 14*table[xi+3].fx - 24*table[xi+2].fx + 18*table[xi+1].fx - 5*table[xi].fx) / (2 * h3);
                this.steps.push(`f'''(${x0}) \\approx \\frac{-3(${formatNumber(table[xi+4].fx)}) + 14(${formatNumber(table[xi+3].fx)}) - 24(${formatNumber(table[xi+2].fx)}) + 18(${formatNumber(table[xi+1].fx)}) - 5(${formatNumber(table[xi].fx)})}{2(${h})^3} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 1) { // BWD O(h)
                formula = "f'''(x) \\approx \\frac{f(x_i) - 3f(x_{i-1}) + 3f(x_{i-2}) - f(x_{i-3})}{h^3}";
                this.steps.push(formula);
                ans = (table[xi].fx - 3 * table[xi - 1].fx + 3 * table[xi - 2].fx - table[xi - 3].fx) / h3;
                this.steps.push(`f'''(${x0}) \\approx \\frac{${formatNumber(table[xi].fx)} - 3(${formatNumber(table[xi-1].fx)}) + 3(${formatNumber(table[xi-2].fx)}) - ${formatNumber(table[xi-3].fx)}}{${h}^3} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 2) { // BWD O(h^2) From slide
                formula = "f'''(x) \\approx \\frac{5f(x_i) - 18f(x_{i-1}) + 24f(x_{i-2}) - 14f(x_{i-3}) + 3f(x_{i-4})}{2h^3}";
                this.steps.push(formula);
                ans = (5*table[xi].fx - 18*table[xi-1].fx + 24*table[xi-2].fx - 14*table[xi-3].fx + 3*table[xi-4].fx) / (2 * h3);
                this.steps.push(`f'''(${x0}) \\approx \\frac{5(${formatNumber(table[xi].fx)}) - 18(${formatNumber(table[xi-1].fx)}) + 24(${formatNumber(table[xi-2].fx)}) - 14(${formatNumber(table[xi-3].fx)}) + 3(${formatNumber(table[xi-4].fx)})}{2(${h})^3} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 2) { // Central O(h^2)
                formula = "f'''(x) \\approx \\frac{f(x_{i+2}) - 2f(x_{i+1}) + 2f(x_{i-1}) - f(x_{i-2})}{2h^3}";
                this.steps.push(formula);
                ans = (table[xi + 2].fx - 2 * table[xi + 1].fx + 2 * table[xi - 1].fx - table[xi - 2].fx) / (2 * h3);
                this.steps.push(`f'''(${x0}) \\approx \\frac{${formatNumber(table[xi+2].fx)} - 2(${formatNumber(table[xi+1].fx)}) + 2(${formatNumber(table[xi-1].fx)}) - ${formatNumber(table[xi-2].fx)}}{2(${h})^3} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 4) { // Central O(h^4) - ADDED
                formula = "f'''(x) \\approx \\frac{-f(x_{i+3}) + 8f(x_{i+2}) - 13f(x_{i+1}) + 13f(x_{i-1}) - 8f(x_{i-2}) + f(x_{i-3})}{8h^3}";
                this.steps.push(formula);
                ans = (-table[xi + 3].fx + 8*table[xi+2].fx - 13*table[xi+1].fx + 13*table[xi-1].fx - 8*table[xi-2].fx + table[xi-3].fx) / (8 * h3);
                this.steps.push(`f'''(${x0}) \\approx \\frac{-${formatNumber(table[xi+3].fx)} + 8(${formatNumber(table[xi+2].fx)}) - 13(${formatNumber(table[xi+1].fx)}) + 13(${formatNumber(table[xi-1].fx)}) - 8(${formatNumber(table[xi-2].fx)}) + ${formatNumber(table[xi-3].fx)}}{8(${h})^3} = ${ans.toFixed(7)}`);
            }

        // ==================== ORDER 4 ====================
        } else if (order == 4) {
            const h4 = Math.pow(h, 4);
            if (direction == 1 && error == 1) { // FWD O(h)
                formula = "f^{(4)}(x) \\approx \\frac{f(x_{i+4}) - 4f(x_{i+3}) + 6f(x_{i+2}) - 4f(x_{i+1}) + f(x_i)}{h^4}";
                this.steps.push(formula);
                ans = (table[xi + 4].fx - 4 * table[xi + 3].fx + 6 * table[xi + 2].fx - 4 * table[xi + 1].fx + table[xi].fx) / h4;
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{${formatNumber(table[xi+4].fx)} - 4(${formatNumber(table[xi+3].fx)}) + 6(${formatNumber(table[xi+2].fx)}) - 4(${formatNumber(table[xi+1].fx)}) + ${formatNumber(table[xi].fx)}}{${h}^4} = ${ans.toFixed(7)}`);
            }
            else if (direction == 1 && error == 2) { // FWD O(h^2) From slide
                formula = "f^{(4)}(x) \\approx \\frac{-2f(x_{i+5}) + 11f(x_{i+4}) - 24f(x_{i+3}) + 26f(x_{i+2}) - 14f(x_{i+1}) + 3f(x_i)}{h^4}";
                this.steps.push(formula);
                ans = (-2*table[xi+5].fx + 11*table[xi+4].fx - 24*table[xi+3].fx + 26*table[xi+2].fx - 14*table[xi+1].fx + 3*table[xi].fx) / h4;
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{-2(${formatNumber(table[xi+5].fx)}) + 11(${formatNumber(table[xi+4].fx)}) - 24(${formatNumber(table[xi+3].fx)}) + 26(${formatNumber(table[xi+2].fx)}) - 14(${formatNumber(table[xi+1].fx)}) + 3(${formatNumber(table[xi].fx)})}{${h}^4} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 1) { // BWD O(h)
                formula = "f^{(4)}(x) \\approx \\frac{f(x_i) - 4f(x_{i-1}) + 6f(x_{i-2}) - 4f(x_{i-3}) + f(x_{i-4})}{h^4}";
                this.steps.push(formula);
                ans = (table[xi].fx - 4 * table[xi - 1].fx + 6 * table[xi - 2].fx - 4 * table[xi - 3].fx + table[xi - 4].fx) / h4;
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{${formatNumber(table[xi].fx)} - 4(${formatNumber(table[xi-1].fx)}) + 6(${formatNumber(table[xi-2].fx)}) - 4(${formatNumber(table[xi-3].fx)}) + ${formatNumber(table[xi-4].fx)}}{${h}^4} = ${ans.toFixed(7)}`);
            }
            else if (direction == 2 && error == 2) { // BWD O(h^2) From slide
                formula = "f^{(4)}(x) \\approx \\frac{3f(x_i) - 14f(x_{i-1}) + 26f(x_{i-2}) - 24f(x_{i-3}) + 11f(x_{i-4}) - 2f(x_{i-5})}{h^4}";
                this.steps.push(formula);
                ans = (3*table[xi].fx - 14*table[xi-1].fx + 26*table[xi-2].fx - 24*table[xi-3].fx + 11*table[xi-4].fx - 2*table[xi-5].fx) / h4;
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{3(${formatNumber(table[xi].fx)}) - 14(${formatNumber(table[xi-1].fx)}) + 26(${formatNumber(table[xi-2].fx)}) - 24(${formatNumber(table[xi-3].fx)}) + 11(${formatNumber(table[xi-4].fx)}) - 2(${formatNumber(table[xi-5].fx)})}{${h}^4} = ${ans.toFixed(7)}`);
            }
            else if (direction == 3 && error == 2) { // Central O(h^2)
                formula = "f^{(4)}(x) \\approx \\frac{f(x_{i+2}) - 4f(x_{i+1}) + 6f(x_i) - 4f(x_{i-1}) + f(x_{i-2})}{h^4}";
                this.steps.push(formula);
                ans = (table[xi + 2].fx - 4 * table[xi + 1].fx + 6 * table[xi].fx - 4 * table[xi - 1].fx + table[xi - 2].fx) / h4;
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{${formatNumber(table[xi + 2].fx)} - 4(${formatNumber(table[xi+1].fx)}) + 6(${formatNumber(table[xi].fx)}) - 4(${formatNumber(table[xi-1].fx)}) + ${formatNumber(table[xi-2].fx)}}{${h}^4} = ${ans.toFixed(7)}`);
            } 
             else if (direction == 3 && error == 3) { // Central O(h^4) - ADDED
                formula = "f^{(4)}(x) \\approx \\frac{-f(x_{i+3}) + 12f(x_{i+2}) - 39f(x_{i+1}) + 56f(x_i) - 39f(x_{i-1}) + 12f(x_{i-2}) - f(x_{i-3})}{6h^4}";
                this.steps.push(formula);
                ans = (-table[xi + 3].fx + 12*table[xi+2].fx - 39*table[xi+1].fx + 56*table[xi].fx - 39*table[xi-1].fx + 12*table[xi-2].fx - table[xi-3].fx) / (6 * h4);
                this.steps.push(`f^{(4)}(${x0}) \\approx \\frac{-${formatNumber(table[xi+3].fx)} + 12(${formatNumber(table[xi+2].fx)}) - 39(${formatNumber(table[xi+1].fx)}) + 56(${formatNumber(table[xi].fx)}) - 39(${formatNumber(table[xi-1].fx)}) + 12(${formatNumber(table[xi-2].fx)}) - ${formatNumber(table[xi-3].fx)}}{6(${h})^4} = ${ans.toFixed(7)}`);
            }
            

        } else {
            throw new Error("Selected order is not implemented.");
        }

        return { ans, steps: this.steps };
    }
}