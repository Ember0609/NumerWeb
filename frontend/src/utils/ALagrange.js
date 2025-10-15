export class ALagrange {
    constructor(data, x, point) {
        this.data = [...data].map(d => ({ x: parseFloat(d.x), fx: parseFloat(d.fx) }));
        this.x = parseFloat(x);
        this.point = point;
    }

    solve() {
        let ans = 0;
        let L;
        let n = this.data.length;
        let Lpoint = [];
        let anspoint =[];
        for (let i = 0; i < n; i++) {
            L = 1;
            for (let j = 0; j < n; j++) {
                if (i == j) {
                    continue;
                }
                L *= (this.x - this.data[j].x) / (this.data[i].x - this.data[j].x);
            }
            let x = this.data[i].x;
            let fx = this.data[i].fx;
            ans += L * this.data[i].fx;
            Lpoint.push({ Lpoint: L, x, fx, ans })
            anspoint.push({ Lpoint: L, x:this.x, fx :L* this.data[i].fx, ans })
        }
        console.log(ans);
        return { result: ans, Lpoint ,anspoint };
    }

    Lline() {
        const n = this.data.length;
        const xv = this.data.map(p => p.x);
        const minx = Math.min(...xv);
        const maxx = Math.max(...xv);
        const step = (maxx - minx) / 100;
        const ansline = [];
        const lagrangeline = Array.from({ length: n }, () => []);

        for (let xval = minx; xval <= maxx; xval += step) {
            let ansY = 0;

            for (let i = 0; i < n; i++) {
                let Li = 1;
                for (let j = 0; j < n; j++) {
                    if (i === j) continue;
                    Li *= (xval - this.data[j].x) / (this.data[i].x - this.data[j].x);
                }

                lagrangeline[i].push({ x: xval, fx: Li * this.data[i].fx });
                console.log(Li)
                ansY += this.data[i].fx * Li;
            }

            ansline.push({ x: xval, fx: ansY });
        }

        return { answerline: ansline, lagrangeline };
    }

} 