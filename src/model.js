export const initial={n:48,p:8,seqBreak:90,parBreak:5,mixBreak:30,transferCost:50,wipCost:.1,revenue:4800,operations:[{t:10.6,c:2},{t:3.2,c:1},{t:5.7,c:1},{t:15,c:3},{t:2.4,c:1},{t:1.9,c:1}]};
export const divisors=n=>Array.from({length:n},(_,i)=>i+1).filter(x=>n%x===0);
export function calculate(s){
 const {n,p,operations:o}=s, d=o.map(x=>x.t/x.c), m=d.length, k=Math.ceil(n/p), batches=Array.from({length:k},(_,i)=>Math.min(p,n-i*p)),sum=d.reduce((a,b)=>a+b,0), max=Math.max(...d), adjacent=d.slice(0,-1).reduce((a,x,i)=>a+Math.min(x,d[i+1]),0);
 const seq=[],par=[],mix=[];
 let start=0; d.forEach((x,i)=>{seq.push({i,start,end:start+n*x,batch:1});start+=n*x+s.seqBreak});
 const ends=Array.from({length:m},()=>Array(k).fill(0));
 for(let i=0;i<m;i++) for(let j=0;j<k;j++) {const a=i?ends[i-1][j]+s.parBreak:0, b=j?ends[i][j-1]+s.parBreak:0, st=Math.max(a,b); ends[i][j]=st+batches[j]*d[i];par.push({i,start:st,end:ends[i][j],batch:j+1,quantity:batches[j]});}
 let st=0; d.forEach((x,i)=>{if(i){let processed=0,offset=0;for(const size of batches){offset=Math.max(offset,(processed+size)*d[i-1]-processed*x);processed+=size;}st+=offset+s.mixBreak;} mix.push({i,start:st,end:st+n*x,batch:1});});
 const times=[start,ends[m-1][k-1]+s.parBreak,mix[m-1].end+s.mixBreak];
 const transport=s.transferCost*(m-1)*k, holding=s.wipCost*sum*batches.reduce((a,q)=>a+q*q,0)/2, costs=transport+holding;
 return {d,sum,max,adjacent,k,batches,times,seq,par,mix,transport,holding,costs,efficiency:costs>0?s.revenue/costs:null};
}
