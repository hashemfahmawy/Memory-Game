document.querySelector(".control-buttons span").onclick = function () {
    
    //prompt window to ask for name 
    let yourName= prompt("What's Your Name ?");

    //if name is empty
    if (yourName== null || yourName == "")

    //Set name to Unknown
    {
        document.querySelector(".name span").innerHTML="Unknown";
    }

    //Set name to your name
    else {
        document.querySelector(".name span").innerHTML=yourName;
    }

    //Remove Spalsh Screen
    document.querySelector(".control-buttons").remove();
};

// Effect Duration
let duration= 1000;

// Select Blocks Container
let blocksContainer =document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

//create range of keys
//let orderRange= [...Array(blocks.length).keys()];

let orderRange= Array.from(Array(blocks.length).keys());


shuffle(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    block.style.order= orderRange[index];

    block.addEventListener("click",function(){

        // Trigger The Flip Block Function
        flipBlock(block);

    })
});

function flipBlock (selectedBlock) {

    selectedBlock.classList.add("isflipped");

    // Collect All Flipped Cards
    let allFlippedBlock = blocks.filter(flippedblock => flippedblock.classList.contains("isflipped"));

    // If Theres Two Selected Blocks
    if (allFlippedBlock.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);
    }
}


function stopClicking(){

    // Add Class No Clicking on Main Container

    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove("no-clicking");
        
    },duration)

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secBlock) {

    let triesElement =document.querySelector(".tries span");

    if (firstBlock.dataset.fruits === secBlock.dataset.fruits) {

        firstBlock.classList.remove("isflipped");
        secBlock.classList.remove("isflipped");

        firstBlock.classList.add("hasMatch");
        secBlock.classList.add("hasMatch");

        document.getElementById("success").play();
    }

    else {

        triesElement.innerHTML= parseInt(triesElement.innerHTML)+1;

        setTimeout(() => {

            firstBlock.classList.remove("isflipped");
            secBlock.classList.remove("isflipped");

        }, duration)

        document.getElementById("fail").play();
    }
}


function shuffle (array) {
    let current = array.length,
    temp,
    random;

    while (current > 0){

        // Get Random Number
        random= Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
}











