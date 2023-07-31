class Cell{
    constructor(i,j){
        this.i=i
        this.j=j

        this.g=0
        this.f=0
        this.h=0

        this.previous=undefined


    }
}





 function removeFromArray(arr,elemrnt){

    for(let i=0;i<arr.length;i++){
        if(arr[i]==elemrnt){
            arr.splice(i,1)
        }
    }

 }

 function heuristic(neighbor,end){

    let tmp=Math.abs(neighbor.i-end.i)+Math.abs(neighbor.j-end.j)
    return tmp

 }


 let start=grid[0][0]

    

 let end=grid[1][2]


function AstartAlgorith(start,end,grid){

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
            if(openSet[i].f<openSet[winnerIndex].f){
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

           neighbor.h=heuristic(neighbor,end)

           neighbor.f=neighbor.g +neighbor.h

           neighbor.previous=current
           

        }

    }
}

AstartAlgorith()