


let grid=[]

let resolution=30

let rows,cols
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





function setup(){
    // createCanvas(1850,700)
    createCanvas(windowWidth-20,windowHeight-200)
    angleMode(DEGREES)

    rows=floor(height/resolution)
    cols=floor(width/resolution)
    // rows=4
    // cols=4
    path=new Path()
    minHeap=new Heap()
 

    grid=make2dArray(rows,cols)
   
    strPoint=[floor(random(rows)),floor(random(cols))]
    endPoint=[floor(random(rows)),floor(random(cols))]
    
    grid[strPoint[0]][strPoint[1]].setSEpoint(true,false)
    grid[endPoint[0]][endPoint[1]].setSEpoint(false,true)
    let dst=String(endPoint[0])+String(endPoint[1])

    
   
    
   
    button = createButton('DFS');
    button.position(0, 0);
    button.mousePressed(runBG);
    button = createButton('BFS');
    button.position(0, 20);
    button.mousePressed(runBFS);
    button = createButton('Clear');
    button.position(0, 40);
    button.mousePressed(clearBoard);
    button = createButton("Dijkstra's Algorithm");
    button.position(0, 60);
    button.mousePressed(runDijkstra);

    
    async function runDijkstra(){
        dst=String(endPoint[0])+String(endPoint[1])

        minHeap=new Heap()
        let shortest=shortestPath(strPoint[0],strPoint[1],grid,dst)
       
    
      
       



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
            let spath=recursivePath(dst,[],shortest)

            makeShorterPath(spath)

         },1600)

   
        
 
    } 

    function clearBoard(){
        minHeap=new Heap()
        grid=make2dArray(rows,cols)
        strPoint=[floor(random(rows)),floor(random(cols))]
        endPoint=[floor(random(rows)),floor(random(cols))]
        
        grid[strPoint[0]][strPoint[1]].setSEpoint(true,false)
        grid[endPoint[0]][endPoint[1]].setSEpoint(false,true)
    }

    async function runBG(){
         
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
    

    async function runBFS(){
        dst=String(endPoint[0])+String(endPoint[1])

        minHeap=new Heap()
        let shortest=shortestPath(strPoint[0],strPoint[1],grid,dst)
        
       

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
            let spath=recursivePath(dst,[],shortest)

            makeShorterPath(spath)

         },1600)
        
 
    }  
    found=new Found()
    
   


    // for(let i=0;i<rows;i++){
    //     tempArr=[]
    //     for(let j=0;j<cols;j++){
    //         tempArr.push(grid[i][j])
            
    //     }
    //     newGrid.push(tempArr)
    // }
    
    
    
}

function recursivePath(d,path,shortest){
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
        const [r,c]=pathStore[arr[i]]
        await sleep(0.5)

        grid[r][c].value=3
    }

}







function draw(){


    if(isMousePressedbyme){
        
    }

    background(255, 255, 255)

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){



            let x=j*resolution
            let y=i*resolution

            grid[i][j].setPos(x,y);
           
        
              if(grid[i][j].strPoint){
                noStroke()
                fill(0)
                rect(x,y,resolution,resolution)


              }
              else if(grid[i][j].endPoint){
                noStroke()
                fill(220,20,60)
                rect(x,y,resolution,resolution)


              }
            else if(grid[i][j].value==1){
                
               // 52, 73, 94
               noStroke()
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
                fill(255, 255, 255)


                stroke(32,178,170)
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

                await sleep(1)

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

                await sleep(1)

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].setVisited(val)
                grid[r+dr][c+dc].rgba=rgba[k]
                

            }

        }

    

    }



}


// Dijkstra's Algorithm To Find The Shortes Path


function shortestPath(r,c,grid,dst){
    const rows=grid.length
    const cols=grid[0].length

    const neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

    const shortest={}

    let rc=String(r)+String(c)

    

    minHeap.heappush([0,rc,[]])
   

    while (minHeap.heap.length>0){

        if(shortest[dst]){
            break
        }

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

    return shortest






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
        this.r=52
        this.g=73
        this.b=94
        this.rgb="rgb(0,206,209)"
        // this.rgba="rgba(0,206,209,1)"
        this.rgba=rgba[0]
        this.visited2=false
        this.visited3=false
        this.visited4=false
        this.row=row
        this.col=col
        this.weight=1
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



class Heap{
    constructor(){
        this.heap=[0]
    }

    heappush(val){
        this.heap.push(val)

        if(Array.isArray(val)){
            this.heap[0]=[0,0]
         let i=this.heap.length-1


         while (this.heap[i][0] < this.heap[Math.floor(i/2)][0]){
            let temp=this.heap[i]

            this.heap[i]=this.heap[Math.floor(i/2)]
            this.heap[Math.floor(i/2)]=temp

            i=Math.floor(i/2)


        }  

        }
        else{

            let i=this.heap.length-1

            while (this.heap[i] < this.heap[Math.floor(i/2)]){
                let temp=this.heap[i]
    
                this.heap[i]=this.heap[Math.floor(i/2)]
                this.heap[Math.floor(i/2)]=temp
    
                i=Math.floor(i/2)
    
    
            }  

        }

         

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