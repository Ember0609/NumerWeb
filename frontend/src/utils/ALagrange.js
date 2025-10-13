export class ALagrange{
    constructor(data,x,point){
        this.data = data
        this.x = x;
        this.point = point;
    }

    solve(){
        let ans = 0;
        let L;
        for(let i = 0; i<this.point ;i++){
            L = 1;
            for(let j = 0; j<this.point ;j++){
                if(i==j){
                    continue;
                }
                L *= (this.x-this.data[j].x)/(this.data[i].x-this.data[j].x);
            }
            ans += L*this.data[i].fx;
        }
        console.log(ans);
        return {result:ans};
    }
}