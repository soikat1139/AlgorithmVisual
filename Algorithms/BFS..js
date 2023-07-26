async function BFS(r,c,grid){

    const rows=grid.length
    const cols=grid[0].length


    let queue=new Deque()

    queue.append([r,c])

    grid[r][c].visited=true
    grid[r][c].value=2

    while(queue.returnValue().length>0){

        for(let i=0;i<queue.returnValue().length;i++){
            const [r,c]=queue.popleft()
            if (grid[r][c].endPoint==true){
                // rgbChange(grid)
                // console.log(grid)
                return

            }
            let neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

            for(let [dr,dc] of neighbors){
                if(r+dr<0 || c+dc<0 || r+dr >rows-1 || c+dc > cols-1 || grid[r+dr][c+dc].visited==true ||grid[r+dr][c+dc].value==1){
                    continue

                }

                await sleep(1)

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].visited=true
                grid[r+dr][c+dc].value=2
                

            }

        }

    

    }



}

async function BFS2(r,c,grid,k,val){
    console.log("Hello")
    

    const rows=grid.length
    const cols=grid[0].length


    let queue=new Deque()

    queue.append([r,c])

    grid[r][c].setVisited(val)
    

    while(queue.returnValue().length>0){

        for(let i=0;i<queue.returnValue().length;i++){
            const [r,c]=queue.popleft()
            if (grid[r][c].endPoint==true){
                // rgbChange(grid)
                // console.log(grid)
                return

            }
            let neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

            for(let [dr,dc] of neighbors){
                if(r+dr<0 || c+dc<0 || r+dr >rows-1 || c+dc > cols-1 || grid[r+dr][c+dc].isVisited(val)==true ||grid[r+dr][c+dc].value==1){
                    continue

                }

                await sleep(1)

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].setVisited(val)
                grid[r+dr][c+dc].rgba=rgba[k]
                

            }

        }

    

    }



}