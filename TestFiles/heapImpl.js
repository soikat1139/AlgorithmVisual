
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
            

            console.log(this.heap[i][0])



            while (2*i < this.heap.length){
                
                if(((2*i)+1<this.heap.length) && (this.heap[2*i+1][0] < this.heap[2*i][0]) && (this.heap[i][0] > this.heap[(2*i)+1][0])){
                    
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
                else if( this.heap[(2*i)+1][0] == this.heap[2*i][0]){
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

let heap=new Heap()

heap.heappush([10,9])
heap.heappush([3,9])
heap.heappush([2,9])
heap.heappush([4,9])
heap.heappush([3,9])
heap.heappush([6,9])
heap.heappush([11,9])

// heap.heappush(9)
// heap.heappush(30)
// heap.heappush(4)
// heap.heappush(8)
// heap.heappush(7)
// heap.heappush(15)
// heap.heappush(16)

console.log(heap)

console.log(heap.heappop())
console.log(heap.heappop())
console.log(heap.heappop())
console.log(heap.heappop())
console.log(heap.heappop())
console.log(heap.heappop())
// console.log(heap.heappop())
console.log(heap)










// let array=[1,2,3]

// console.log(Array.isArray(array))

