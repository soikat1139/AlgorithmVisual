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
        console.log(path.copy())
        paths.push(path.copy())
        return
    }

    

    grid[r][c].visited=true
    path.append([r,c])

    





    await sleep(1)
    console.log([r,c])

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