class Test{
    constructor(x){
        this.x=x
    }

    method (){
        console.log(this)
        setTimeout(()=>{
            console.log(this)

        },50)
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


let queue=new Deque()


queue.append([2,3])


///



function forFun(){
    setTimeout(()=>{
        console.log("Hello World")

    },200)
    setTimeout(()=>{
        console.log("Hello World2")

    },500)
}
    
    
// forFun()



    // Constants


class Path{
    constructor(){
        this.value=[]
    }

    append(val){
        this.value.push(val)
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





// let path=new Path()

// path.append([1,2])
// path.append([2,2])
// path.append([2,3])
// path.append([2,4])

// console.log(path)
// path.remove([2,3])
// console.log(path.copy())



 

// console.log(Math.floor(9/2))

let a=1
let b=6
let rc=String(a)+String(b)


// let r1=Number(rc[0])
// let r2=Number(rc[1])

const pathStore={}


function make2dArray(rows,cols){
    let array2=[]

    for(let i=0;i<rows;i++){
        let tempArr=[]
        for(let j=0;j<cols;j++){
            
            pathStore[String(i)+String(j)]=[i,j]

            tempArr.push(0)

        }
        array2.push(tempArr)
    }

    return array2
    
}






const NO_PARENT = -1;

function dijkstra(adjacencyMatrix, startVertex) {
const nVertices = adjacencyMatrix[0].length;

// shortestDistances[i] will hold the shortest distance from startVertex to i
const shortestDistances = new Array(nVertices).fill(Number.MAX_SAFE_INTEGER);

// added[i] will true if vertex i is included in shortest path tree
// or shortest distance from startVertex to i is finalized
const added = new Array(nVertices).fill(false);

// Initialize all distances as infinite and added[] as false
for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	shortestDistances[vertexIndex] = Number.MAX_SAFE_INTEGER;
	added[vertexIndex] = false;
}

// Distance of source vertex from itself is always 0
shortestDistances[startVertex] = 0;

// Parent array to store shortest path tree
const parents = new Array(nVertices).fill(NO_PARENT);

// The starting vertex does not have a parent
parents[startVertex] = NO_PARENT;

// Find shortest path for all vertices
for (let i = 1; i < nVertices; i++) {
	// Pick the minimum distance vertex from the set of vertices not yet processed.
	// nearestVertex is always equal to startVertex in first iteration.
	let nearestVertex = -1;
	let shortestDistance = Number.MAX_SAFE_INTEGER;

	for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	if (!added[vertexIndex] && shortestDistances[vertexIndex] < shortestDistance) {
		nearestVertex = vertexIndex;
		shortestDistance = shortestDistances[vertexIndex];
	}
	}

	// Mark the picked vertex as processed
	added[nearestVertex] = true;

	// Update dist value of the adjacent vertices of the picked vertex.
	for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	const edgeDistance = adjacencyMatrix[nearestVertex][vertexIndex];

	if (edgeDistance > 0 && shortestDistance + edgeDistance < shortestDistances[vertexIndex]) {
		parents[vertexIndex] = nearestVertex;
		shortestDistances[vertexIndex] = shortestDistance + edgeDistance;
	}
	}
}

printSolution(startVertex, shortestDistances, parents);
}

// A utility function to print the constructed distances array and shortest paths
function printSolution(startVertex, distances, parents) {
const nVertices = distances.length;
console.log("Vertex\t Distance\tPath");

for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	if (vertexIndex !== startVertex) {
	process.stdout.write(`\n ${startVertex} -> ${vertexIndex}\t\t ${distances[vertexIndex]}\t\t`);
	printPath(vertexIndex, parents);
	}
}
}

// Function to print shortest path from source to currentVertex using parents array
function printPath(currentVertex, parents) {
// Base case: Source node has been processed
if (currentVertex === NO_PARENT) {
	return;
}

printPath(parents[currentVertex], parents);
process.stdout.write(`${currentVertex} `);
}

// Driver code

const adjacencyMatrix = [ [0, 4, 0, 0, 0, 0, 0, 8, 0],
[4, 0, 8, 0, 0, 0, 0, 11, 0],
[0, 8, 0, 7, 0, 4, 0, 0, 2],
[0, 0, 7, 0, 9, 14, 0, 0, 0],
[0, 0, 0, 9, 0, 10, 0, 0, 0],
[0, 0, 4, 14, 10, 0, 2, 0, 0],
[0, 0, 0, 0, 0, 2, 0, 1, 6],
[8, 11, 0, 0, 0, 0, 1, 0, 7],
[0, 0, 2, 0, 0, 0, 6, 7, 0]
];

dijkstra(adjacencyMatrix, 0);
