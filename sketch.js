

let grid=[]

let resolution=30;

let rows,cols;
let isMousePressedbyme=false

let strPoint=[]
let endPoint=[]
let newGrid=[]
let r=0
let g=206
let b=209
let paths=[]
const pathStore={}
let minHeap;

let found;
let path;

let rgba=["rgba(0, 0, 66, 0.75)","rgba(17, 104, 217, 0.75)","rgba(0, 217, 159, 0.75)","rgba(0, 190, 218, 0.75)"]

let speed;
let svgImage;
let flag;
let arr=[]
let selectedAlgo;
let userInteractionArray
let isMaze=false

function preload() {
    
    svgImage = loadImage('./Public/svgStart.svg', 'svg');
    flag = loadImage('./Public/flag.svg', 'svg');
  }


  

function setup(){
    // createCanvas(1850,700)
    createCanvas(windowWidth-25,windowHeight-200)
    angleMode(DEGREES)
    // let {Heap} =require("heap-js")
    speed=1

    


    rows=floor(height/resolution)
    cols=floor(width/resolution)

    // rows=8
    // cols=8
    path=new Path()
    minHeap=new Heap()
    found=new Found()
 

    grid=make2dArray(rows,cols)
   
    strPoint=[floor(random(rows)),floor(random(cols))]
    endPoint=[floor(random(rows)),floor(random(cols))]
    
    grid[strPoint[0]][strPoint[1]].setSEpoint(true,false)
    grid[endPoint[0]][endPoint[1]].setSEpoint(false,true)
    let dst=String(endPoint[0])+String(endPoint[1])

    

   userInteractionArray=[]

   
    
   
    // button = createButton('DFS');
    // button.position(0, 0);
    // button.mousePressed(runBG);
    // button = createButton('BFS');
    // button.position(0, 20);
    // button.mousePressed(runBFS);
    // button = createButton('Clear');
    // button.position(0, 80);
    // button.mousePressed(clearBoard);
    // button = createButton("Dijkstra's Algorithm");
    // button.position(0, 40);
    // button.mousePressed(runDijkstra);
    // button = createButton("A* search algorithm");
    // button.position(0, 60);
    // button.mousePressed(runAstar);


    //Buttons:
    // const bfsButton=document.querySelector('#BFS')
    // bfsButton.addEventListener("click",runBFS)
    // const speedButton=document.querySelector('#BFS')
    // speedButton.addEventListener("click",()=>{
    //     speed=0.1
    //     console.log(speed)

    // })
   


    const options=document.querySelector("#options")
    const list=document.querySelector("#list")
    const algoOptions=document.querySelector('#algo')

    const options2=document.querySelector("#options2")
    const list2=document.querySelector("#list2")
    const sortOptions=document.querySelector('#sort')


    const options3=document.querySelector("#options3")
    const list3=document.querySelector("#list3")
    const mazeOptions=document.querySelector('#maze')
    const algoSelect=document.querySelectorAll(".slcalgo")
    const mazeSelect=document.querySelectorAll(".mz")
    const visualizeBtn=document.querySelector("#vsb")
    const clearBtn=document.querySelector("#clr")
    const HeroTexts=document.querySelector("#HeroText")






    algoOptions.addEventListener('click',()=>{
        if(algoOptions.classList.contains("highlight")){
            algoOptions.classList.remove("highlight")
            algoOptions.classList.add("hg")
        }
        else{
            algoOptions.classList.add("highlight")
            algoOptions.classList.remove("hg")
        }
        if(options.classList.contains("hidden") && list.classList.contains("hidden")){
            options.classList.remove("hidden")
            list.classList.remove("hidden")
            options.classList.add("activeOption")
          

        }
        else{
            options.classList.add("hidden")
            list.classList.add("hidden")
            options.classList.remove("activeOption")

        }
    })


    sortOptions.addEventListener('click',()=>{
        if(sortOptions.classList.contains("highlight")){
            sortOptions.classList.remove("highlight")
            sortOptions.classList.add("hg")
        }
        else{
            sortOptions.classList.add("highlight")
            sortOptions.classList.remove("hg")
        }
        if(options2.classList.contains("hidden") && list.classList.contains("hidden")){
            options2.classList.remove("hidden")
            list2.classList.remove("hidden")
            options2.classList.add("activeOption2")
          

        }
        else{
            options2.classList.add("hidden")
            list2.classList.add("hidden")
            options2.classList.remove("activeOption2")

        }
    })



    mazeOptions.addEventListener('click',()=>{
        if(mazeOptions.classList.contains("highlight")){
            mazeOptions.classList.remove("highlight")
            mazeOptions.classList.add("hg")
        }
        else{
            mazeOptions.classList.add("highlight")
            mazeOptions.classList.remove("hg")
        }
        if(options3.classList.contains("hidden") && list.classList.contains("hidden")){
            options3.classList.remove("hidden")
            list3.classList.remove("hidden")
            options3.classList.add("activeOption3")
          

        }
        else{
            options3.classList.add("hidden")
            list3.classList.add("hidden")
            options3.classList.remove("activeOption3")

        }
    })

  

    
    algoSelect.forEach((li)=>{
        li.addEventListener('click',()=>{
            if(li.textContent=="Depth-first search"){
                selectedAlgo="DFS"
                

                
            }
            if(li.textContent=="Breath-first search"){
                selectedAlgo="BFS"
                


            }
            if(li.textContent=="DIJKSTRA's Algorithm"){
                selectedAlgo="DJS"
                

            }
            if(li.textContent=="A* star Algorithm"){
                selectedAlgo="AST"
                

            }
            if(li.textContent=="BackTracking Algorithm"){
                selectedAlgo="BDFS"
                

            }

            if(algoOptions.classList.contains("highlight")){
                algoOptions.classList.remove("highlight")
                algoOptions.classList.add("hg")
            }
            else{
                algoOptions.classList.add("highlight")
                algoOptions.classList.remove("hg")
            }
            if(options.classList.contains("hidden") && list.classList.contains("hidden")){
                options.classList.remove("hidden")
                list.classList.remove("hidden")
                options.classList.add("activeOption")
              
    
            }
            else{
                options.classList.add("hidden")
                list.classList.add("hidden")
                options.classList.remove("activeOption")
    
            }

         if(HeroTexts.classList.contains("flag")){
             HeroTexts.classList.remove("flag")

        }


            HeroTexts.innerHTML=`${selectedAlgo} Algorithm is selected `
            HeroTexts.classList.add("beautify")

        })
    })

    mazeSelect.forEach((li)=>{

        li.addEventListener("click",async ()=>{
            await clearBoard()

            recursiveMaze(grid,[strPoint[0],strPoint[1]],[endPoint[0],endPoint[1]],)


            if(mazeOptions.classList.contains("highlight")){
                mazeOptions.classList.remove("highlight")
                mazeOptions.classList.add("hg")
            }
            else{
                mazeOptions.classList.add("highlight")
                mazeOptions.classList.remove("hg")
            }
            if(options3.classList.contains("hidden") && list.classList.contains("hidden")){
                options3.classList.remove("hidden")
                list3.classList.remove("hidden")
                options3.classList.add("activeOption3")
              
    
            }
            else{
                options3.classList.add("hidden")
                list3.classList.add("hidden")
                options3.classList.remove("activeOption3")
    
            }

        })

  

    })

    



    visualizeBtn.addEventListener("click",()=>{

        if(!selectedAlgo){
            HeroTexts.innerHTML=`No Algorithm is selected.Please Select an Algorithm `
            HeroTexts.classList.add("flag")

        }
       
        if(selectedAlgo=="DFS"){
            runDFS()
            HeroTexts.innerHTML=`Depth first Search Algorithm Is a very popular algorithm `
        }
        if(selectedAlgo=="BFS"){
            runBFS()
        }
        if(selectedAlgo=="DJS"){
            runDijkstra()
        }
        if(selectedAlgo=="AST"){
           runAstar()
        }
        if(selectedAlgo=="BDFS"){
           runDFS()
        }
    

    })

    clearBtn.addEventListener("click",()=>{
        clearBoard()
    })




    
    async function runDijkstra(){
        
        dst=String(endPoint[0])+String(endPoint[1])

        let start=grid[strPoint[0]][strPoint[1]]

        let end=grid[endPoint[0]][endPoint[1]]

    
        
     
       
            //  let spath=await recursivePath(dst,[],shortest)
            // console.log(spath)

            // makeShorterPath(shortest)

          
    
      
       
        BFS(strPoint[0],strPoint[1],grid)

        setTimeout( ()=>{
             BFS2(strPoint[0],strPoint[1],grid,1,2)
         

         },400)
        //  setTimeout(()=>{
        //     BFS2(strPoint[0],strPoint[1],grid,2)

        //  },200)
        setTimeout(()=>{
            BFS2(strPoint[0],strPoint[1],grid,2,3)

         },1000)
        setTimeout(async ()=>{
            await BFS2(strPoint[0],strPoint[1],grid,3,4)
            const apath= await Dijkstra(start,end,grid)
            console.log(apath)
            makeShorterPath2(apath)

         },1600)

   
        
 
    } 

    

    async function clearBoard(){
     if(isMaze){
        for(let i =0;i<rows;i++){
            for(let j=0;j<cols;j++){
                if(grid[i][j].value==2 || grid[i][j].value==3){
                    grid[i][j].value=0
                }

            }
        }

     }
     else{
        grid=make2dArray(rows,cols)
        strPoint=[floor(random(rows)),floor(random(cols))]
        endPoint=[floor(random(rows)),floor(random(cols))]
        
        grid[strPoint[0]][strPoint[1]].setSEpoint(true,false)
        grid[endPoint[0]][endPoint[1]].setSEpoint(false,true)

     }
      
    }

    async function runDFS(){
         
         dfs(strPoint[0],strPoint[1],grid,1,path)
       

        setTimeout(()=>{
            dfs2(strPoint[0],strPoint[1],grid,2,1)

        },100)
        setTimeout(()=>{
            dfs2(strPoint[0],strPoint[1],grid,3,2)

        },500)
        setTimeout(()=>{
            dfs2(strPoint[0],strPoint[1],grid,4,3)

        },900)


    }
    // minHeap=new Heap()
    // let shortest=shortestPath(strPoint[0],strPoint[1],grid,dst)
    // console.log(dst)
    // console.log(shortest)

    // console.log(recursivePath(dst,[],shortest))


    async function runAstar(){
        let start=grid[strPoint[0]][strPoint[1]]
        let end=grid[endPoint[0]][endPoint[1]]

        
    
        AstarAlgorith(start,end,grid)

        
        


        setTimeout(()=>{
            AstarAlgorith2(start,end,grid,1)

        },200)
        setTimeout(()=>{
            AstarAlgorith2(start,end,grid,2)

        },400)
        setTimeout(async ()=>{
             AstarAlgorith2(start,end,grid,3)
            const apath=await AstarAlgorith(start,end,grid)
             makeShorterPath2(apath)

        },600)

    
        // minHeap3=new Heap()
        // dst=String(endPoint[0])+String(endPoint[1])
    
        // let shortest= await astar(strPoint[0],strPoint[1],grid,dst,minHeap)
        // let spath=recursivePath(dst,[],shortest)
    
        // makeShorterPath(spath)
    
        // astar(strPoint[0],strPoint[1],grid,dst,minHeap3)
    
        
    //     setTimeout( ()=>{
    //         let minHeap2=new Heap()
         
    //         astar2(strPoint[0],strPoint[1],grid,dst,minHeap2,1)
    
    //     },400)
    //    //  setTimeout(()=>{
    //    //     BFS2(strPoint[0],strPoint[1],grid,2)
    
    //    //  },200)
    //    setTimeout(()=>{
    //     let minHeap4=new Heap()
    //     astar2(strPoint[0],strPoint[1],grid,dst,minHeap4,2)
    //     },1000)
    //     setTimeout(async ()=>{
    //         let minHeap5=new Heap()
    //         astar2(strPoint[0],strPoint[1],grid,dst,minHeap5,3)
    //     },1600)
    
    
    
    
    
    }
    

    async function runBFS(){
        dst=String(endPoint[0])+String(endPoint[1])

        minHeap=new Heap()
        let shortest=shortestPath2D(grid, strPoint[0],strPoint[1],endPoint[0], endPoint[1])
        
       
       

        
       

        BFS(strPoint[0],strPoint[1],grid)

        setTimeout( ()=>{
             BFS2(strPoint[0],strPoint[1],grid,1,2)
         

         },400)
        //  setTimeout(()=>{
        //     BFS2(strPoint[0],strPoint[1],grid,2)

        //  },200)
        setTimeout(()=>{
            BFS2(strPoint[0],strPoint[1],grid,2,3)

         },1000)
         setTimeout(async ()=>{
            await BFS2(strPoint[0],strPoint[1],grid,3,4)
            

           

             makeShorterPath(shortest)

         },1600)
        
 
    }  
  
    
   


    // for(let i=0;i<rows;i++){
    //     tempArr=[]
    //     for(let j=0;j<cols;j++){
    //         tempArr.push(grid[i][j])
            
    //     }
    //     newGrid.push(tempArr)
    // }
    
    
    
}

async function recursivePath(d,path,shortest){
   console.log(shortest)
    if(! shortest[d]){
        return 
    }
    recursivePath(shortest[d],path,shortest)
    path.push(d)
    
    
    return path
}




function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight-200);
    
    
  }

function mouseClicked(){

   

if(!isMousePressedbyme){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            grid[i][j].mouseClicked(mouseX,mouseY)




        }}

}
   

}

function mouseDragged(){
    if(!isMousePressedbyme){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            grid[i][j].mouseClicked(mouseX,mouseY)




        }}
    }

}




function mousePressed(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            if(grid[i][j].mouseClicked2(mouseX,mouseY)){
                grid[i][j].strPoint=false
                strPoint=null
                isMousePressedbyme=true

            }
            if(grid[i][j].mouseClicked4(mouseX,mouseY)){
                grid[i][j].endPoint=false
                endPoint=null
                isMousePressedbyme=true

            }
        }}
    



}
function mouseReleased(){
    if(isMousePressedbyme){
     
     for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            if(!strPoint){
                grid[i][j].mouseClicked3(mouseX,mouseY)
                // grid[i][j].strPoint=false

            }
            if(!endPoint){
                grid[i][j].mouseClicked5(mouseX,mouseY)
            }

           
                

            
        }

     isMousePressedbyme=false

    }
    



}
}


async function makeShorterPath(arr){


    for(let i=1;i<arr.length-1;i++){
        // const [r,c]=pathStore[arr[i]]
        await sleep(0.5)

        grid[arr[i][0]][arr[i][1]].value=3
    }

}
async function makeShorterPath2(arr){


    for(let i=arr.length-1;i>-1;i--){
        // const [r,c]=pathStore[arr[i]]
        await sleep(0.5)

        arr[i].value=3
    }

}









function draw(){


    if(isMousePressedbyme){
        
    }

    // background(255, 255, 255)
    background("#fff")

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){



            let x=j*resolution
            let y=i*resolution

            grid[i][j].setPos(x,y);
           
        
              if(grid[i][j].strPoint){

                stroke(32,178,170)
                fill(0)
                // rect(x,y,resolution,resolution)
                image(svgImage,x,y,resolution-3,resolution-3)


              }
              else if(grid[i][j].endPoint){
                stroke(0)
                fill(220,20,60)
                // rect(x,y,resolution,resolution)
                image(flag,x,y,resolution-1,resolution-1)


              }
            else if(grid[i][j].value==1){
                
               // 52, 73, 94
               noStroke()
            if((i+j)%4==0){
                stroke(255)

            }
               fill(52, 73, 94)
               rect(x,y,resolution,resolution)

                

            }
            else if(grid[i][j].value==3){
                
               // 52, 73, 94
               stroke(0)
               fill(255,0,255)
               rect(x,y,resolution,resolution)

                

            }
            else if(grid[i][j].value==2){
                
               // 52, 73, 94


            //    setTimeout(()=>{
            //     stroke(32,178,170)
            //     fill(255,0,255)
            //     rect(x,y,resolution,resolution)

            //    },50)


                
            // 64,224,208
            // 148,0,211
           

               stroke(0)
            //    fill(0,206,209)
            //    fill(r,g,b)
            //    fill(148,0,211)
            //    fill(grid[i][j].r,grid[i][j].g,grid[i][j].b)
               fill(grid[i][j].rgba)


               rect(x,y,resolution,resolution)


               

                

            }
            else{
                // fill(255, 255, 255)
                fill('#fff')


                stroke(32,178,170)
                // stroke('#afd8f8')
                // stroke(0)
                strokeWeight(1)
                rect(x,y,resolution-1,resolution-1)

            }
        }
    }



}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



async function rgbChange(){
    
    // 148,0,211
   

       
        

        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
               
                await sleep(1)
                if(grid[i][j].value==2){
                   

                    grid[i][j].changeRGB(148,0,211)

                }
            }
        }



}




async function dfs(r,c,grid,val=1,path){
   
    if(r<0 || c<0 || r>rows-1 || c>cols-1 || grid[r][c].visited==true || found.isFound(val)==true || grid[r][c].value==1){
        return

    }

    if(grid[r][c].endPoint==true){

        found.setFound(val)
       
        paths.push(path.copy())
        return
    }

    

    grid[r][c].visited=true
    path.append([r,c])

    





    await sleep(1)
   

    grid[r][c].value=2

    await  dfs(r+1,c,grid,1,path)
    await dfs(r-1,c,grid,1,path)
    await dfs(r,c+1,grid,1,path)
    await dfs(r,c-1,grid,1,path)

    // grid[r][c].visited=false
    // path.remove([r,c])
    // grid[r][c].value=0

    


}
async function dfsForMaze(r,c,grid,val=1,path){
   
    if(r<0 || c<0 || r>rows-1 || c>cols-1 || grid[r][c].visited==true || found.isFound(val)==true || grid[r][c].value==1){
        return

    }

    if(grid[r][c].endPoint==true){

        // found.setFound(val)
        
        paths.push(path.copy())
        return
    }

    

    grid[r][c].visited=true
    path.append([r,c])

    





    await sleep(1)
  

    grid[r][c].value=2

    await  dfs(r+1,c,grid,1,path)
    await dfs(r-1,c,grid,1,path)
    await dfs(r,c+1,grid,1,path)
    await dfs(r,c-1,grid,1,path)

    grid[r][c].visited=false
    path.remove([r,c])
    grid[r][c].value=0

    


}




async function dfs2(r,c,grid,val,k){

    if(r<0 || c<0 || r>rows-1 || c>cols-1 || grid[r][c].isVisited(val)==true || found.isFound(val)==true || grid[r][c].value==1){
        return

    }

    if(grid[r][c].endPoint==true){

        found.setFound(val)
        return
    }

    

    grid[r][c].setVisited(val)





    await sleep(1)
    

    grid[r][c].rgba=rgba[k]

   await  dfs2(r+1,c,grid,val,k)
    await dfs2(r-1,c,grid,val,k)
    
    await dfs2(r,c+1,grid,val,k)
    await dfs2(r,c-1,grid,val,k)
    


}


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

                await sleep(speed)

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].visited=true
                grid[r+dr][c+dc].value=2
                

            }

        }

    

    }



}


async function BFS2(r,c,grid,k,val){
   
    

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

                await sleep(speed)

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].setVisited(val)
                grid[r+dr][c+dc].rgba=rgba[k]
                

            }

        }

    

    }



}


function isValid(matrix, x, y) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    return x >= 0 && x < numRows && y >= 0 && y < numCols && matrix[x][y].value !== 1;
  }
  
  function shortestPath2D(matrix, sourceX, sourceY, targetX, targetY) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
  
    if (!isValid(matrix, sourceX, sourceY) || !isValid(matrix, targetX, targetY)) {
      return null;
    }

  
    const queue = [[sourceX, sourceY, []]];
    const visited = new Set();
  
    while (queue.length > 0) {
      const [x, y, path] = queue.shift();
  
      if (x === targetX && y === targetY) {
        return [...path, [x, y]];
      }
  
      if (visited.has(`${x},${y}`)) {
        continue;
      }
  
      visited.add(`${x},${y}`);
      
  
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
  
      for (const [nx, ny] of neighbors) {
        if (isValid(matrix, nx, ny) && !visited.has(`${nx},${ny}`)) {
          queue.push([nx, ny, [...path, [x, y]]]);
        }
      }
    }
  
    return null;
  }


// Dijkstra's Algorithm To Find The Shortes Path


function shortestPath(r,c,grid,dst){
    const rows=grid.length
    const cols=grid[0].length

    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

    const shortest={}

    let rc=String(r)+String(c)

    const visit={}

    

    minHeap.push([0,rc,[]])
   

    while (minHeap.heap.length>1){

        if(shortest[dst]){
            console.log(shortest)

            return shortest[dst]
            
        }

        const [w1,n1,sc]=minHeap.pop()
        
        const [r1,c1] = pathStore[n1]

        if(visit[n1]){
          continue
        }

        visit[n1]=true

        shortest[n1]=shortest[sc] ? [sc,...shortest[sc]] : sc
        

        for(const [dr,dc] of neighbors){

            let tempr=r1+dr
            let tempc=c1+dc
            let n2=String(tempr)+String(tempc)

            if(tempr<0 || tempc <0 || tempr > rows-1 || tempc > cols-1 || visit[n2] || grid[tempr][tempc].value==1 ){
                

                continue

            }

            let w2=grid[tempr][tempc].weight

            // console.log([w1+w2,n2,n1])
            
            minHeap.push([w1+w2,n2,n1])
        }
    }

 






}

function calculateHcost(r,c,dst){

    const [r1,c1]=pathStore[dst]

    let posX=grid[r][c].posX
    let posY=grid[r][c].posY

    let posX1=grid[r1][c1].posX
    let posY1=grid[r1][c1].posY



    return Math.sqrt((posX1-posX)*(posX1-posX)+(posY1-posY)*(posY1-posY))

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


async function AstarAlgorith(start,end,grid){
    

    let ROWS=grid.length
    let COLS=grid[0].length

    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]



    let path=[]

    let openSets=[]

    let closedSets=[]


    openSets.push(start)

    

   

    

    while (openSets.length>0){
    

        let winnerIndex=0

        for(let i=0;i<openSets.length;i++){
            if(openSets[i].f<openSets[winnerIndex].f){
                winnerIndex=i
            }
        }

      

        let current=openSets[winnerIndex]

        if(current===end){

            let temp=current

            path.push(current)
            
            while(temp.previous){
                path.push(temp.previous)
                temp=temp.previous
            }
            

         


            break
        }

        removeFromArray(openSets,current)
        

      
        closedSets.push(current)
        await sleep(1)

        current.value=2
       

        for(let [dr,dc] of neighbors){
            

            if(current.i+dr<0 || current.j+dc<0 || current.i+dr>ROWS-1 || current.j+dc>COLS-1){
               
                continue

            }

            let neighbor=grid[current.i+dr][current.j+dc]

            if(neighbor.value===1 || closedSets.includes(neighbor)){
                continue
            }

            let tempG=current.g+1

           if(openSets.includes(neighbor)){
            if(tempG<neighbor.g){
                neighbor.g=tempG
            }

           }
           else{
            neighbor.g=tempG

            openSets.push(neighbor)
           }

           neighbor.h=heuristic(neighbor,end)

           neighbor.f=neighbor.g +neighbor.h

           neighbor.previous=current
           

        }

    }
    return path
}
async function AstarAlgorith2(start,end,grid,val){
    

    let ROWS=grid.length
    let COLS=grid[0].length

    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]



    let path=[]

    let openSets=[]

    let closedSets=[]


    openSets.push(start)

    

   

    

    while (openSets.length>0){
    

        let winnerIndex=0

        for(let i=0;i<openSets.length;i++){
            if(openSets[i].f<openSets[winnerIndex].f){
                winnerIndex=i
            }
        }

      

        let current=openSets[winnerIndex]

        if(current===end){

            break
        }

        removeFromArray(openSets,current)
        

      
        closedSets.push(current)
        await sleep(1)

        current.rgba=rgba[val]
       

        for(let [dr,dc] of neighbors){
            

            if(current.i+dr<0 || current.j+dc<0 || current.i+dr>ROWS-1 || current.j+dc>COLS-1){
               
                continue

            }

            let neighbor=grid[current.i+dr][current.j+dc]

            if(neighbor.value===1 || closedSets.includes(neighbor)){
                continue
            }

            let tempG=current.g+1

           if(openSets.includes(neighbor)){
            if(tempG<neighbor.g){
                neighbor.g=tempG
            }

           }
           else{
            neighbor.g=tempG

            openSets.push(neighbor)
           }

           neighbor.h=heuristic(neighbor,end)

           neighbor.f=neighbor.g +neighbor.h

           neighbor.previous=current
           

        }

    }
    return path
}

async function Dijkstra(start,end,grid=[]){

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

    return path

}








async function astar(r,c,grid,dst,minheap){

    let rows=grid.length
    
    let cols=grid[0].length

    let rc=String(r)+String(c)


    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

    let hcost=calculateHcost(r,c,dst)
    
    

    

     minheap.heappush([hcost,0,rc,[]])

     console.log(minheap)
     console.log(minHeap.heap)
     console.log(minHeap.value())

   

     const shortest={}


     while (minHeap.heap.length>1){

        const [fcost,gcost,n1,src]=minheap.heappop()


        if(shortest[n1]){
            continue
        }
        if(shortest[dst]){
            break
        }

        shortest[n1]=src

        const [r1,c1]=pathStore[n1]

        await sleep(100)

        grid[r1][c1].value=2

        
       

        for(const [dr,dc] of neighbors){

            let tempr=r1+dr
            let tempc=c1+dc
            let n2=String(tempr)+String(tempc)

            if(tempr<0 || tempc <0 || tempr > rows-1 || tempc > cols-1 || shortest[n2] || grid[tempr][tempc].value==1 ){

                continue

            }

            let w2=grid[tempr][tempc].weight

            let gcost2=gcost+w2

            let hcost2=calculateHcost(tempr,tempc,dst)

            let fcost2=gcost2+hcost2

            
            minHeap.heappush([fcost2,gcost2,n2,n1])
        }

        
     }

     console.log(shortest)
     return shortest



}



async function astar2(r,c,grid,dst,minheap,k){

    let rows=grid.length
    
    let cols=grid[0].length

    let rc=String(r) +String(c)


    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

    let hcost=calculateHcost(r,c,dst)
    
    

    

     minheap.heappush([hcost,0,rc,[]])

   

     const shortest={}


     while (minHeap.heap.length>1){

        const [fcost,gcost,n1,src]=minheap.heappop()


        if(shortest[n1]){
            continue
        }

        if(shortest[dst]){
            break
        }

        shortest[n1]=src

        const [r1,c1]=pathStore[n1]

        await sleep(100)

        

        grid[r1][c1].rgba=rgba[k]
       

        for(const [dr,dc] of neighbors){

            let tempr=r1+dr
            let tempc=c1+dc
            let n2=String(tempr)+String(tempc)

            if(tempr<0 || tempc <0 || tempr > rows-1 || tempc > cols-1 || shortest[n2] || grid[tempr][tempc].value==1 ){

                continue

            }

            let w2=grid[tempr][tempc].weight

            let gcost2=gcost+w2

            let hcost2=calculateHcost(tempr,tempc,dst)

            let fcost2=gcost2+hcost2

            
            minHeap.heappush([fcost2,gcost2,n2,n1])
        }

        
     }

   
   



}







function make2dArray(rows,cols){
    let array2=[]

    for(let i=0;i<rows;i++){
        let tempArr=[]
        for(let j=0;j<cols;j++){
            
            pathStore[String(i)+String(j)]=[i,j]

            tempArr.push(new Matrix(0,i,j))

        }
        array2.push(tempArr)
    }

    return array2
    
}






class Matrix{
    constructor(value,row,col){
        this.value=value
        this.posX=null
        this.posY=null
        this.strPoint=false
        this.endPoint=false
        this.visited=false
        // this.r=0
        // this.g=206
        // this.b=209
      
        this.rgb="rgb(0,206,209)"
        // this.rgba="rgba(0,206,209,1)"
        this.rgba=rgba[0]
        this.visited2=false
        this.visited3=false
        this.visited4=false
        this.row=row
        this.col=col
        this.weight=1
        this.i=row
        this.j=col
        this.g=0
        this.f=0
        this.h=0

        this.previous=undefined


    }

    getValue(){
        return this.value
    }
    setValue(x){
        this.value=x
    }
    isVisited(val){
        if(val==2){
            return this.visited2

        }
        else if(val==3){
            return this.visited3

        }
        else if(val==4){
            return this.visited4

        }


    }
    setVisited(val){
        if(val==2){
           this.visited2=true

        }
        else if(val==3){
           this.visited3=true

        }
        else if(val==4){
           this.visited4=true

        }


    }
    setDelay(x){
       
      
        setTimeout(()=>{
            this.value=x

        },this.posX*100)
    }
    changeRGB(r,g,b){
        this.r=r
        this.g=g
        this.b=b
    }
    setPos(x,y){
        this.posX=x
        this.posY=y
    }

    setSEpoint(str=false,end=false){
        this.strPoint=str
        this.endPoint=end

    }

    mouseClicked(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY && !this.endPoint && !this.strPoint){
        
        this.value==1 ? this.value=0 : this.value=1
       
        console.log([this.i,this.j])
        userInteractionArray.push([this.i,this.j])
  
      }


    }
    mouseClicked2(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY ){

        return this.strPoint


        
     
      }


    }
    mouseClicked4(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY ){

        return this.endPoint


        
     
      }


    }
    mouseClicked3(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY ){

        this.strPoint=true
        strPoint=[this.row,this.col]


        
     
      }


    }
    mouseClicked5(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY ){

        this.endPoint=true
        endPoint =[this.row,this.col]


        
     
      }


    }





}
class Deque{
    constructor(){
       this.value=[] 
    }

    popright(){
        return this.value.pop()

    }
    append(x){
        this.value.push(x)

    }
    popleft(){
       let arrValue=this.value.splice(0,1)

        return arrValue[0]
    }
    returnValue(){
        return this.value

    }

}



class Found{
    constructor(){
        this.found=false
        this.found2=false
        this.found3=false
        this.found4=false

    }
    isFound(val){
        if(val==1){
            return this.found

        }
        if(val==2){
            return this.found2

        }
        else if(val==3){
            return this.found3

        }
        else if(val==4){
            return this.found4

        }


    }
    setFound(val){
        if(val==1){
           this.found=true

        }
        if(val==2){
           this.found2=true

        }
        else if(val==3){
           this.found3=true

        }
        else if(val==4){
           this.found4=true

        }


    }
}

class Path{
    constructor(){
        this.value=[]
    }

    append(val){
        this.value.push(val)
        return this.value
    }
    remove(val){
        for(let i=0;i<this.value.length;i++){

            const [a,b]=this.value[i]

            if(a==val[0] && b==val[1]){
                this.value.splice(i,1)
            }
        }
    }
    copy(){
        return [...this.value]
    }
}



//As there is no built in Heap or priority queue in JavaScript This is a small attempt to Implement Heap for JavaScript and That's all folks 



class Heaps{
    constructor(){
        this.heap=[0]
    }

    heappush(val){
        

        if(Array.isArray(val)){
            this.heap=[[0,0]]
            this.heap.push(val)
         let i=this.heap.length-1


         while (this.heap[i][0] < this.heap[Math.floor(i/2)][0]){
            let temp=this.heap[i]

            this.heap[i]=this.heap[Math.floor(i/2)]
            this.heap[Math.floor(i/2)]=temp

            i=Math.floor(i/2)


        }  

        }
        else{
            this.heap.push(val)

            let i=this.heap.length-1

            while (this.heap[i] < this.heap[Math.floor(i/2)]){
                let temp=this.heap[i]
    
                this.heap[i]=this.heap[Math.floor(i/2)]
                this.heap[Math.floor(i/2)]=temp
    
                i=Math.floor(i/2)
    
    
            }  

        }

         

    }
    value(){

        console.log(this.heap.length)
        return this.heap.length
    }


    heappop(){

        if(this.heap.length<2){
            return null
        }

        if(this.heap.length==2){
            return this.heap.pop()
        }
       

        let res=this.heap[1]

        this.heap[1]=this.heap.pop()
        let i=1

        if(Array.isArray(this.heap[1])){
            

          



            while (2*i < this.heap.length){
                
                if(((2*i)+1<this.heap.length) && (this.heap[2*i+1][0] <= this.heap[2*i][0]) && (this.heap[i][0] > this.heap[(2*i)+1][0])){
                    
                    let temp= this.heap[i]
                    this.heap[i]= this.heap[(2*i)+1]
                    this.heap[(2*i)+1]=temp
    
                    i=2*i+1
    
    
                }
                else if(  this.heap[i][0] > this.heap[2*i][0]  ){
                   
                    let temp= this.heap[i]
                    this.heap[i]=this.heap[2*i]
                    this.heap[2*i]=temp
    
                    i=2*i
                }
            
                else{
                
                    break
                }
            }



        }
        else{
            while (2*i < this.heap.length){
                if(((2*i)+1<this.heap.length) && (this.heap[2*i+1] < this.heap[2*i]) &&(this.heap[i] > this.heap[(2*i)+1])){
                    
                    let temp= this.heap[i]
                    this.heap[i]= this.heap[(2*i)+1]
                    this.heap[(2*i)+1]=temp
    
                    i=2*i+1
    
    
                }
                else if(  this.heap[i] > this.heap[2*i]  ){
                   
                    let temp= this.heap[i]
                    this.heap[i]=this.heap[2*i]
                    this.heap[2*i]=temp
    
                    i=2*i
                }
                else{
                
                    break
                }
            }

        }



     return res


    }


    heapify(arr){

        arr.push(arr[0])

        this.heap=arr

        let curr=Math.floor((this.heap.length-1)/2)

        while(curr>0){
            i=curr
            while (2*i < this.heap.length){
                if(((2*i)+1<this.heap.length) && (this.heap[2*i+1] < this.heap[2*i]) &&(this.heap[i] > this.heap[(2*i)+1])){
                    
                    let temp= this.heap[i]
                    this.heap[i]= this.heap[(2*i)+1]
                    this.heap[(2*i)+1]=temp
    
                    i=2*i+1
    
    
                }
                else if(  this.heap[i] > this.heap[2*i]  ){
                   
                    let temp= this.heap[i]
                    this.heap[i]=this.heap[2*i]
                    this.heap[2*i]=temp
    
                    i=2*i
                }
                else{
                
                    break
                }
           
    
    
            }
            curr-=1
        

        }

    }

}

class Heap{
    constructor(){
        this.heap=[[0,0]]
    }

    push(val){
        

       
    this.heap.push(val)
         let i=this.heap.length-1


         while (this.heap[i][0] < this.heap[Math.floor(i/2)][0]){
            let temp=this.heap[i]

            this.heap[i]=this.heap[Math.floor(i/2)]
            this.heap[Math.floor(i/2)]=temp

            i=Math.floor(i/2)


        }  

       

         

    }
    value(){

       
        return this.heap.length
    }


    pop(){

        if(this.heap.length<2){
            return null
        }

        if(this.heap.length==2){
            return this.heap.pop()
        }
       

        let res=this.heap[1]

        this.heap[1]=this.heap.pop()

        let i=1

       
       while (2*i < this.heap.length){
                
      if((2*i+1<this.heap.length) && (this.heap[2*i+1][0] <= this.heap[2*i][0]) && (this.heap[i][0] > this.heap[2*i+1][0])){
                    
                    let temp= this.heap[i]
                    this.heap[i]= this.heap[(2*i)+1]
                    this.heap[(2*i)+1]=temp
    
                    i=2*i+1
    
    
                }
                else if(  this.heap[i][0] > this.heap[2*i][0]  ){
                   
                    let temp= this.heap[i]
                    this.heap[i]=this.heap[2*i]
                    this.heap[2*i]=temp
    
                    i=2*i
                }
            
                else{
                
                    break
                }
           



        }
    



     return res


    }


    heapify(arr){

        arr.push(arr[0])

        this.heap=arr

        let curr=Math.floor((this.heap.length-1)/2)

        while(curr>0){
            i=curr
            while (2*i < this.heap.length){
                if(((2*i)+1<this.heap.length) && (this.heap[2*i+1] < this.heap[2*i]) &&(this.heap[i] > this.heap[(2*i)+1])){
                    
                    let temp= this.heap[i]
                    this.heap[i]= this.heap[(2*i)+1]
                    this.heap[(2*i)+1]=temp
    
                    i=2*i+1
    
    
                }
                else if(  this.heap[i] > this.heap[2*i]  ){
                   
                    let temp= this.heap[i]
                    this.heap[i]=this.heap[2*i]
                    this.heap[2*i]=temp
    
                    i=2*i
                }
                else{
                
                    break
                }
           
    
    
            }
            curr-=1
        

        }

    }

}


const mazeArray=[
    [ 1, 2 ], [ 2, 2 ],
    [ 3, 2 ], [ 4, 2 ],
    [ 2, 3 ], [ 2, 4 ],
    [ 6, 1 ], [ 6, 2 ],
    [ 6, 3 ], [ 6, 4 ],
    [ 6, 5 ], [ 6, 6 ],
    [ 6, 7 ], [ 5, 4 ],
    [ 4, 4 ], [ 5, 6 ],
    [ 4, 6 ], [ 1, 6 ],
    [ 2, 6 ], [ 1, 8 ],
    [ 2, 8 ],  [ 4, 8 ],
    [ 4, 9 ],  [ 4, 10 ],
    [ 3, 10 ], [ 2, 10 ],
    [ 1, 10 ], [ 2, 11 ],
    [ 2, 12 ], [ 3, 12 ],
    [ 4, 12 ], [ 6, 8 ],
    [ 6, 9 ],  [ 6, 10 ],
    [ 6, 11 ], [ 6, 12 ],
    [ 6, 13 ], [ 6, 14 ],
    [ 5, 14 ], [ 4, 14 ],
    [ 3, 14 ], [ 2, 14 ],
    [ 6, 15 ], [ 6, 16 ],
    [ 5, 16 ], [ 4, 16 ],
    [ 3, 16 ], [ 2, 16 ],
    [ 6, 17 ], [ 6, 18 ],
    [ 6, 19 ], [ 6, 20 ],
    [ 2, 18 ], [ 3, 18 ],
    [ 4, 18 ], [ 4, 19 ],
    [ 4, 20 ], [ 5, 20 ],
    [ 3, 20 ], [ 2, 20 ],
    [ 2, 21 ], [ 2, 22 ],
    [ 4, 22 ], [ 5, 22 ],
    [ 6, 22 ], [ 6, 23 ],
    [ 6, 24 ], [ 6, 25 ],
    [ 5, 24 ], [ 4, 24 ],
    [ 3, 24 ], [ 2, 24 ],
    [ 4, 26 ], [ 5, 26 ],
    [ 6, 26 ], [ 6, 27 ],
    [ 6, 28 ], [ 6, 29 ],
    [ 6, 29 ], [ 6, 29 ],
    [ 4, 27 ], [ 4, 28 ],
    [ 2, 26 ], [ 1, 26 ],
    [ 1, 28 ], [ 2, 28 ],
    [ 1, 30 ], [ 2, 30 ],
    [ 1, 31 ], [ 1, 32 ],
    [ 2, 32 ], [ 6, 30 ],
    [ 5, 30 ], [ 4, 30 ],
    [ 6, 31 ], [ 6, 32 ],
    [ 3, 32 ], [ 4, 32 ],
    [ 1, 36 ], [ 2, 36 ],
    [ 3, 36 ], [ 6, 33 ],
    [ 6, 34 ], [ 6, 35 ],
    [ 6, 36 ], [ 2, 33 ],
    [ 2, 34 ], [ 3, 34 ],
    [ 4, 34 ], [ 4, 36 ],
    [ 6, 37 ], [ 6, 38 ],
    [ 6, 39 ], [ 6, 40 ],
    [ 5, 38 ], [ 4, 38 ],
    [ 3, 38 ], [ 2, 38 ],
    [ 1, 40 ], [ 2, 40 ],
    [ 3, 40 ], [ 4, 40 ],
    [ 6, 41 ], [ 6, 42 ],
    [ 6, 43 ], [ 6, 44 ],
    [ 5, 44 ], [ 4, 44 ],
    [ 3, 44 ], [ 2, 44 ],
    [ 2, 41 ], [ 2, 42 ],
    [ 3, 42 ], [ 4, 42 ],
    [ 6, 45 ], [ 6, 46 ],
    [ 6, 47 ], [ 6, 48 ],
    [ 5, 48 ], [ 4, 48 ],
    [ 3, 48 ], [ 2, 48 ],
    [ 4, 47 ], [ 4, 46 ],
    [ 3, 46 ], [ 2, 46 ],
    [ 6, 49 ], [ 6, 50 ],
    [ 6, 51 ], [ 6, 52 ],
    [ 4, 52 ], [ 3, 52 ],
    [ 2, 52 ], [ 1, 52 ],
    [ 2, 51 ], [ 2, 50 ],
    [ 3, 50 ], [ 4, 50 ],
    [ 4, 53 ], [ 4, 54 ],
    [ 1, 54 ], [ 2, 54 ],
    [ 6, 53 ], [ 6, 54 ],
    [ 6, 55 ], [ 6, 56 ],
    [ 5, 56 ], [ 4, 56 ],
    [ 3, 56 ], [ 2, 56 ],
    [ 1, 58 ], [ 2, 58 ],
    [ 3, 58 ], [ 4, 58 ],
    [ 6, 57 ], [ 6, 58 ],
    [ 6, 59 ], [ 6, 60 ],
    [ 3, 60 ], [ 4, 60 ],
    [ 4, 61 ], [ 6, 61 ],
    [ 2, 60 ], [ 8, 1 ],
    [ 8, 2 ],  [ 8, 3 ],
    [ 10, 2 ], [ 11, 2 ],
    [ 12, 1 ], [ 12, 2 ],
    [ 12, 3 ], [ 13, 2 ],
    [ 14, 2 ], [ 15, 1 ],
    [ 15, 2 ], [ 17, 2 ],
    [ 18, 2 ], [ 19, 2 ],
    [ 19, 3 ], [ 21, 2 ],
    [ 8, 4 ],  [ 8, 5 ],
    [ 8, 6 ],  [ 9, 4 ],
    [ 10, 4 ], [ 9, 6 ],
    [ 10, 6 ], [ 12, 4 ],
    [ 12, 4 ], [ 12, 4 ],
    [ 12, 5 ], [ 12, 6 ],
    [ 12, 7 ], [ 13, 4 ],
    [ 14, 4 ], [ 14, 5 ],
    [ 14, 6 ], [ 14, 7 ],
    [ 15, 4 ], [ 16, 4 ],
    [ 17, 4 ], [ 16, 5 ],
  [ 16, 6 ], [ 16, 6 ],
  [ 16, 6 ], [ 18, 4 ],
  [ 19, 4 ], [ 21, 4 ],
  [ 21, 5 ], [ 21, 6 ],
  [ 20, 6 ], [ 19, 6 ],
  [ 18, 7 ], [ 18, 8 ],
  [ 18, 9 ], [ 18, 9 ],
  [ 18, 9 ], [ 19, 9 ],
  [ 20, 9 ], [ 17, 9 ],
  [ 16, 9 ],  [ 15, 9 ],
  [ 14, 9 ],  [ 14, 10 ],
  [ 14, 11 ], [ 8, 8 ],
  [ 8, 9 ],   [ 8, 10 ],
  [ 8, 11 ],  [ 7, 12 ],
  [ 8, 12 ],  [ 9, 12 ],
  [ 10, 12 ], [ 11, 12 ],
  [ 12, 12 ], [ 15, 12 ],
  [ 11, 11 ], [ 11, 10 ],
  [ 10, 10 ], [ 11, 8 ],
  [ 10, 8 ],  [ 12, 10 ],
  [ 16, 12 ], [ 18, 12 ],
  [ 19, 12 ], [ 21, 11 ],
  [ 18, 11 ], [ 18, 10 ],
  [ 8, 13 ],  [ 8, 14 ],
  [ 11, 13 ], [ 11, 14 ],
  [ 10, 14 ], [ 8, 16 ],
  [ 9, 16 ],  [ 10, 16 ],
  [ 11, 16 ], [ 11, 18 ],
  [ 10, 18 ], [ 9, 18 ],
  [ 8, 18 ],  [ 7, 18 ],
  [ 8, 19 ],  [ 8, 20 ],
  [ 10, 19 ], [ 10, 20 ],
  [ 11, 20 ], [ 14, 13 ],
  [ 14, 14 ], [ 14, 15 ],
  [ 14, 16 ], [ 15, 14 ],
  [ 16, 14 ], [ 17, 14 ],
  [ 18, 14 ], [ 15, 16 ],
  [ 16, 16 ], [ 18, 16 ],
  [ 19, 16 ], [ 20, 17 ], [ 20, 16 ], [ 20, 15 ],
  [ 20, 18 ], [ 21, 18 ],
  [ 7, 22 ],  [ 8, 22 ],
  [ 9, 22 ],  [ 10, 22 ],
  [ 11, 22 ], [ 12, 22 ],
  [ 18, 21 ], [ 18, 22 ],
  [ 18, 23 ], [ 18, 24 ],
  [ 17, 24 ], [ 16, 24 ],
  [ 20, 20 ], [ 20, 20 ],
  [ 20, 20 ], [ 20, 21 ],
  [ 20, 22 ], [ 20, 23 ],
  [ 21, 23 ], [ 19, 18 ],
  [ 18, 18 ], [ 14, 17 ],
  [ 12, 16 ], [ 14, 23 ],
  [ 14, 24 ], [ 14, 24 ],
  [ 14, 24 ], [ 14, 25 ],
  [ 14, 26 ], [ 10, 23 ],
  [ 10, 23 ], [ 10, 23 ],
  [ 10, 24 ], [ 9, 24 ],
  [ 8, 24 ],  [ 11, 24 ],
  [ 12, 24 ], [ 7, 26 ],
  [ 8, 26 ],  [ 10, 26 ],
  [ 10, 27 ], [ 10, 28 ],
  [ 9, 28 ],  [ 8, 28 ],
  [ 7, 28 ],  [ 11, 26 ],
  [ 12, 26 ], [ 11, 28 ],
  [ 12, 28 ], [ 14, 27 ],
  [ 14, 28 ], [ 16, 26 ],
  [ 16, 27 ], [ 16, 28 ],
  [ 16, 29 ], [ 16, 30 ],
  [ 16, 31 ], [ 17, 30 ],
  [ 18, 30 ], [ 19, 30 ],
  [ 18, 25 ], [ 18, 26 ],
  [ 18, 27 ], [ 19, 27 ],
  [ 20, 27 ], [ 19, 25 ],
  [ 20, 25 ], [ 19, 28 ],
  [ 8, 30 ],  [ 9, 30 ],
  [ 10, 30 ], [ 11, 30 ],
  [ 12, 30 ], [ 13, 30 ],
  [ 14, 30 ], [ 15, 30 ],
  [ 20, 30 ], [ 21, 30 ],
  [ 7, 32 ],  [ 8, 32 ],
  [ 9, 32 ],  [ 10, 32 ],
  [ 12, 31 ], [ 12, 32 ],
  [ 12, 33 ], [ 12, 34 ],
  [ 11, 34 ], [ 10, 34 ],
  [ 9, 34 ],  [ 8, 34 ],
  [ 12, 35 ], [ 12, 36 ],
  [ 12, 37 ], [ 12, 38 ],
  [ 12, 39 ], [ 11, 38 ],
  [ 10, 38 ], [ 9, 38 ],
  [ 8, 38 ],  [ 8, 37 ],
  [ 8, 36 ],  [ 9, 36 ],
  [ 12, 40 ], [ 8, 40 ],
  [ 9, 40 ],  [ 10, 40 ],
  [ 10, 41 ], [ 10, 42 ],
  [ 10, 43 ], [ 9, 43 ],
  [ 8, 43 ],  [ 7, 43 ],
  [ 10, 44 ], [ 10, 45 ],
  [ 10, 46 ], [ 10, 47 ],
  [ 10, 48 ], [ 9, 48 ],
  [ 8, 48 ],  [ 7, 45 ],
  [ 8, 45 ],  [ 10, 49 ],
  [ 10, 50 ], [ 7, 50 ],
  [ 8, 50 ],  [ 11, 43 ],
  [ 12, 43 ], [ 13, 43 ],
  [ 14, 43 ], [ 15, 43 ],
  [ 16, 43 ], [ 16, 32 ],
  [ 16, 33 ], [ 14, 31 ],
  [ 14, 32 ], [ 14, 33 ],
  [ 14, 34 ], [ 14, 35 ],
  [ 15, 35 ], [ 16, 35 ],
  [ 13, 40 ], [ 14, 40 ],
  [ 14, 39 ], [ 14, 38 ],
  [ 14, 38 ], [ 14, 38 ],
  [ 14, 38 ], [ 14, 38 ],
  [ 14, 37 ], [ 16, 37 ],
  [ 16, 38 ], [ 16, 39 ],
  [ 15, 39 ], [ 18, 31 ],
  [ 17, 33 ], [ 18, 33 ],
  [ 19, 33 ], [ 19, 31 ],
  [ 21, 32 ], [ 18, 35 ],
  [ 19, 35 ], [ 20, 35 ],
  [ 20, 36 ], [ 20, 37 ],
  [ 19, 37 ], [ 21, 37 ],
  [ 18, 39 ], [ 19, 39 ],
  [ 19, 40 ], [ 19, 41 ],
  [ 20, 41 ], [ 21, 41 ],
  [ 19, 42 ], [ 19, 43 ],
  [ 20, 43 ], [ 21, 43 ],
  [ 18, 43 ], [ 16, 42 ],
  [ 16, 41 ], [ 12, 44 ],
  [ 12, 45 ], [ 12, 46 ],
  [ 13, 46 ], [ 14, 46 ],
  [ 15, 46 ], [ 17, 46 ],
  [ 17, 47 ], [ 17, 48 ],
  [ 9, 61 ],  [ 7, 59 ],
  [ 12, 56 ], [ 12, 57 ],
  [ 12, 58 ], [ 11, 57 ],
  [ 12, 61 ], [ 12, 60 ],
  [ 14, 59 ], [ 15, 59 ],
  [ 16, 59 ], [ 16, 60 ],
  [ 16, 61 ], [ 20, 54 ],
  [ 20, 54 ], [ 21, 54 ], [ 16, 53 ], [ 16, 52 ],    [ 20, 11 ], [ 13, 19 ],
  [ 14, 19 ], [ 15, 19 ],
  [ 16, 19 ], [ 15, 20 ],
  [ 15, 21 ], [ 17, 22 ],
  [ 18, 47 ], [ 19, 47 ],
  [ 20, 47 ], [ 19, 46 ],
[ 19, 45 ], [ 15, 45 ],
[ 17, 45 ], [ 19, 44 ],
[ 20, 45 ], [ 13, 47 ],
[ 13, 47 ], [ 13, 47 ],
[ 13, 48 ], [ 13, 49 ],
[ 12, 49 ], [ 14, 49 ],
[ 15, 49 ], [ 16, 54 ],
[ 16, 55 ], [ 17, 54 ],
[ 18, 54 ], [ 17, 50 ],
[ 18, 50 ], [ 19, 50 ],
[ 19, 49 ], [ 20, 50 ],
[ 21, 50 ], [ 13, 50 ],
[ 13, 51 ], [ 13, 52 ],
[ 13, 53 ], [ 12, 53 ],
[ 11, 53 ], [ 10, 53 ],
[ 9, 53 ],  [ 8, 53 ],
[ 8, 52 ],  [ 12, 51 ],
[ 10, 52 ], [ 10, 54 ],
[ 10, 55 ], [ 9, 55 ],
[ 8, 55 ],  [ 13, 57 ],
[ 14, 57 ], [ 10, 57 ],
[ 16, 58 ], [ 16, 57 ],
[ 17, 57 ], [ 18, 57 ],
[ 19, 57 ], [ 17, 59 ],
[ 18, 59 ], [ 19, 59 ],
[ 19, 60 ], [ 21, 59 ],
[ 21, 57 ], [ 18, 56 ],
[ 18, 52 ], [ 19, 52 ],
[ 20, 52 ], [ 20, 51 ],
[ 20, 51 ], [ 20, 51 ],
[ 15, 54 ], [ 14, 56 ],
[ 9, 60 ],  [ 9, 59 ],
[ 7, 57 ],  [ 8, 57 ],
[ 15, 50 ], [ 15, 48 ]

]


async function recursiveMaze(grid,start,end,clearBoard){
    
    let ROWS=grid.length;
    let COLS=grid[0].length
   
    isMaze=true

    for(let i=0;i<ROWS;i++){
        for(let j=0;j<COLS;j++){
            if(i==0 || j==0 || i==ROWS-1 || j==COLS-1){
                // if(!start.includes(i) && !start.includes(j) && !end.includes(j) && !end.includes(i)){
                    await sleep(0.1)
                    grid[i][j].value=1

                // }
                
                
            }
        }
    }

    for(let [i,j] of mazeArray){
        // if(!start.includes(i) && !start.includes(j) && !end.includes(j) && !end.includes(i)){
            await sleep(0.1)
            grid[i][j].value=1

        // }
    }
    
    for(let [i,j] of [start,end]){
        grid[i][j].value=0

    }


}









// function setup(){
//     createCanvas(windowWidth,windowHeight)
//     angleMode(DEGREES)
    
    
    
// }

// function draw(){
//     background(0)


//     let hr=hour()
//     let min=minute()

//     let sc=second()


//    let mapSecond=(sc+1)*6
//    let mapMinute=(min+1)*6
//    let mapHour=(hr+1)*30
   
   

//     translate(200,200)
//     rotate(-90)

//     noFill()

//     strokeWeight(8)
//     stroke(255,20,147)
//     // arc(0,0,300,300,0,mapSecond)
//     noFill()

//     push()
//     rotate(mapSecond)
//     stroke(0,255,255)
//     line(0,0,110,0)
//     pop()

//     push()
//     rotate(mapMinute)
//     stroke(255,20,147)
//     line(0,0,120,0)
//     pop()


//     push()
//     rotate(mapHour)
//     stroke(255,69,0)
//     line(0,0,120,0)
//     pop()
    

//     strokeWeight(5)
//     stroke(0,255,0)
//     // arc(0,0,285,285,0,mapMinute)

//     strokeWeight(5)
//     stroke(255,69,0)
//     // arc(0,0,270,270,0,mapHour)
//     push()
//     stroke(255)
//     ellipse(0,0,3,3)
//     pop()
    




// }





// let grid;
// let rows,cols
// let resolution=15


// function setup(){
//     createCanvas(600,600)
//     rows=height/resolution
//     cols=width/resolution
    
  
//     let array=[]

//     for(let i=0;i<rows;i++){
//         let tempArr=[]
//         for(let j=0;j<cols;j++){
//             tempArr.push(floor(random(2)))
//         }
//         array.push(tempArr)
//     }
//     grid=array

//     print(grid)
    

    

// }

// function draw(){
//     background(0)
    
//     for(let i=0;i<rows;i++){
        
//         for(let j=0;j<cols;j++){
//             let x=i*resolution
//             let y=j*resolution

//             if(grid[i][j]==1){
//                 fill(255)
//                 stroke(0)

//                 rect(x,y,resolution-1,resolution-1)

//             }
           
//         }
//     }

//     let next=[]

//     for(let i=0;i<rows;i++){
//         let tempArr=[]
//         for(let j=0;j<cols;j++){



//             let count=countNeighbors(grid,i,j)
//             let state=grid[i][j]

        









            
//         }
//         next.push(tempArr)
//     }

    
// }



// let snake;

// function setup(){
//     createCanvas(600,700)
//     snake=new Snake(0,0)
//     frameRate(15)
    
// }
// function draw(){
//     background(0)
//     snake.update()
//     snake.show()
//     function keyPressed(){
    
//         if(keyCode==DOWN_ARROW){
//             snake.dir(0,-1)
            
//         }
    
//     }



// }



// class Snake{
//     constructor(x,y){
//         this.x=x
//         this.y=y
//         this.scale=10
//         this.up=false
//         this.down=false
//         this.

//     }
//     dir(dx,dy){
//         this.x=this.x+dx
//         this.y=this.y-dy
//     }

//     update(){

//     }

//     show(){
//         fill(200)
//         noStroke()
//         rect(this.x,this.y,this.scale,this.scale)
//     }



// }