function shortestPath(r,c,grid){
    const rows=grid.length
    const cols=grid[0].length

    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

    const shortest={}

    let rc=String(r)+String(c)

    let minHeap=new Heap()

    minHeap.heappush([0,rc,[]])

    while (minHeap.heap.length>0){

        const [w1,n1,sc]=minHeap.heappop()

        const [r1,c1] = pathStore[n1]

        if(shortest[n1]){
          continue
        }

        shortest[n1]=sc

        for(const [dr,dc] of neighbors){

            let tempr=r1+dr
            let tempc=c1+dc
            let n2=String(tempr)+String(tempc)

            if(tempr<0 || tempc <0 || tempr > rows-1 || tempc > cols-1 || shortest[n2] || grid[tempr][tempc].value==1 ){

                continue

            }

            let w2=grid[tempr][tempc].weight
            
            minHeap.heappush([w1+w2,n2,n1])




        }




    }
}

