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



//Another Way oF doing this:


function Dijkstra(start,end,grid=[]){

    let ROWS=grid.length
    let COLS=grid[0].length


   
    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]



    let path=[]

    let openSet=[]

    let closedSet=[]

    openSet.push(start)

    

    while (openSet.length>0){


        let winnerIndex=0

        for(let i=0;i<openSet.length;i++){
            if(openSet[i].g<openSet[winnerIndex].g){
                winnerIndex=i
            }
        }

      

        let current=openSet[winnerIndex]

        if(current===end){

            let temp=current

            path.push(current)
            
            while(temp.previous){
                path.push(temp.previous)
                temp=temp.previous
            }

            console.log(path)


            break
        }

        removeFromArray(openSet,current)
      
        closedSet.push(current)
        

        for(let [dr,dc] of neighbors){
            

            if(current.i+dr<0 || current.j+dc<0 || current.i+dr>ROWS-1 || current.j+dc>COLS-1){
               
                continue

            }

            let neighbor=grid[current.i+dr][current.j+dc]

            if(neighbor.value===1 || closedSet.includes(neighbor)){
                continue
            }

            let tempG=current.g+1

           if(openSet.includes(neighbor)){
            if(tempG<neighbor.g){
                neighbor.g=tempG
            }

           }
           else{
            neighbor.g=tempG

            openSet.push(neighbor)
           }

          

         

           neighbor.previous=current
           

        }

    }
}
