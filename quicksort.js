swaps=[];
const num = 20;
const array = [];
function partitionTheArray(array, start,end)
{
    pivot = array[start]
    leftpointer = start;
    rightpointer = end;
    while(leftpointer <= rightpointer)
    {
        while(array[leftpointer] <= pivot)
        {
            leftpointer++;
        }
        while(array[rightpointer] > pivot)
        {
            rightpointer--;
        }
        if(leftpointer < rightpointer)
        {
            swaps.push([leftpointer,rightpointer]);
            temp = array[rightpointer];
            array[rightpointer] = array[leftpointer];
            array[leftpointer] = temp;
        }
    } 
    swaps.push([start,rightpointer]);
    temp = array[start];
    array[start] = array[rightpointer];
    array[rightpointer] = temp;
    return {rightpointer,swaps};
}

function quicksort(array, start, end)
{  
    swapsatleft= [];
    swapsatright = [];
    if(start < end)
    {
        j = partitionTheArray(array,start, end)
        quicksort(array,start, j.rightpointer-1);
        quicksort(array,j.rightpointer+1, end);
    }
    // allswaps = [...j.swaps];
    return j.swaps;
}   

function new_array()
{
    for(let i = 0;i < num;i++)
    {
        array[i]= Math.random().toPrecision(1);
    }
    displayBars();
}

function animateSwaps(swaps)
{
    if(swaps.length == 0)
    {
        return;
    }
    const [leftpointer, rightpointer] = swaps.shift();
    [array[leftpointer], array[rightpointer]] = [array[rightpointer], array[leftpointer]];
    displayBars([leftpointer, rightpointer]);
    setTimeout(function(){
        animateSwaps(swaps);
    }, 500);
}

function play()
{
    const copy = [...array];
    const swaps = quicksort(copy,0, copy.length-1);
    animateSwaps(swaps);
}

function displayBars(indices)
{
    container.innerHTML="";
    for(let i = 0 ; i < num; i++)
    {
        container.style.border="10px solid black"
        const bar = document.createElement("div");
        bar.style.height = array[i]*45+"%";
        bar.textContent = array[i];
        bar.style.width = "1vmax";
        bar.style.backgroundColor = "green";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="burlywood";
        }
        container.appendChild(bar);
    }
}