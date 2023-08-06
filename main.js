

const modal=document.querySelector('#modal');
const modalHeader=document.querySelector('#modalHead');
const modalPRMText=document.querySelector("#modal-prm-text")
const modalSCNText=document.querySelector("#model-scnd-text")
const modelFooter=document.querySelector("#modal-footer")
const skipBtn=document.querySelector("#skip")
const nextBtn=document.querySelector("#next")
const previousBtn=document.querySelector("#previous")
const modelImg=document.querySelector("#modal-Img")
const closeBtn=document.querySelector("#close")
const pageId=document.querySelector("#pageId")
const modalBody=document.querySelector("#modal-body")
let pagePosition=0

const modelContext=[

    {
        page:1,
        headerText:"Welcome To Algorithm Visualizer",
        modalPRMText:"  This is a web application that visualizes different algorithms. It is a project that I have been working on for a while now. I hope you enjoy it.",
        modalSCNText:" Click Skip Button To skip Tutorial .To continue Tutorial Click Next Button",
        imgLink:"./Public/algorithm.jpg"


    },

    {
        page:2,
        headerText:"What Is  Algorithm Visualizer ?",
        modalPRMText:"This Web Application is simply to enhance my algorithm learning capability.",
        modalSCNText:"You can find shortest path between two nodes Using This  application.You can also find the shortest path to solve a maze ",
        imgLink:"./Public/maze.jpg"


    },
    {
        page:3,
        headerText:"Selecting An algorithm",
        modalPRMText:"I have Implemented (until now) 5 different algorithms to find the shortest path.",
        modalSCNText:"To Select an algorithm please select the Select Algorithm Button and you will be eligible to visualize that algorithm ",
        imgLink:"./Public/Screenshot.png"


    },
    {
        page:4,
        headerText:"Algorithm's Introduction",
        modalPRMText:"Here are  the algorithm's That I have implemented so far...",
     
       


    }

]


window.addEventListener('load', ()=> {
    pageId.innerHTML=`${pagePosition+1}/${modelContext.length}`

    
   
  });




skipBtn.addEventListener("click",()=>{
    modal.classList.add("hide")
})
closeBtn.addEventListener("click",()=>{
    modal.classList.add("hide")
})

nextBtn.addEventListener("click",()=>{
    if(pagePosition==modelContext.length-1){
        pagePosition=0
        
    }
    else{
        pagePosition++;
    }

    pageId.innerHTML=`${pagePosition+1}/${modelContext.length}`

    if(modelContext[pagePosition].page==3){
        modalBody.appendChild(modelImg)

        modalHeader.innerHTML=modelContext[pagePosition].headerText
        modalPRMText.innerHTML=modelContext[pagePosition].modalPRMText
        modalSCNText.innerHTML=modelContext[pagePosition].modalSCNText
      
    
        modelImg.setAttribute("src",modelContext[pagePosition].imgLink)
        modelImg.classList.add("model-img-sp")

    }
    else if(modelContext[pagePosition].page==4){
        modalBody.removeChild(modelImg)
        modalHeader.innerHTML=modelContext[pagePosition].headerText
        modalPRMText.innerHTML=modelContext[pagePosition].modalPRMText
        modalSCNText.innerHTML=`
        <ul>
        <li>DFS:DFS known as Depth-First-Search Algorithm.This is a Brute Force To find the path.This is not really that much effective.It goes through basically every Node to find the goal </li>
        <li>BFS:Also known as Breadth-first-Search. This algorithm is slightly better than DFS .Instead of going through a node once at a time .It visits every surrounding nodes that it can reach</li>
        <li>DIJKSTRA'S ALgorithm:This is a modified version of BFS algorithm.This algorithm works on priority basis.It works effectively on a weighted graph. In a unweighted graph it works like a BFS algorithm</li>
        <li>A* search: This algorithm is my Love.This is the most effective algorithm to find the shortest path. It uses heuristic to calculate the distance</li>
        </ul>
        
        `


    }
    else{
        modalBody.appendChild(modelImg)
        modalHeader.innerHTML=modelContext[pagePosition].headerText
        modalPRMText.innerHTML=modelContext[pagePosition].modalPRMText
        modalSCNText.innerHTML=modelContext[pagePosition].modalSCNText
      
    
        modelImg.setAttribute("src",modelContext[pagePosition].imgLink)
    }
    


 
   



})

previousBtn.addEventListener("click",()=>{
    if(pagePosition==0){
        pagePosition=modelContext.length-1

    }
    else{
        pagePosition-=1
    }
    pageId.innerHTML=`${pagePosition+1}/${modelContext.length}`

    if(modelContext[pagePosition].page==3){
        modalHeader.innerHTML=modelContext[pagePosition].headerText
        modalPRMText.innerHTML=modelContext[pagePosition].modalPRMText
        modalSCNText.innerHTML=modelContext[pagePosition].modalSCNText
      
    
        modelImg.setAttribute("src",modelContext[pagePosition].imgLink)
        modelImg.classList.add("model-img-sp")

    }
    else{
        modalHeader.innerHTML=modelContext[pagePosition].headerText
        modalPRMText.innerHTML=modelContext[pagePosition].modalPRMText
        modalSCNText.innerHTML=modelContext[pagePosition].modalSCNText
      
    
        modelImg.setAttribute("src",modelContext[pagePosition].imgLink)
    }
    

    

})