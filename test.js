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

make2dArray(12,12)
console.log(pathStore)

const [r1,c1] = pathStore["1110"]

console.log(r1)
console.log(c1)