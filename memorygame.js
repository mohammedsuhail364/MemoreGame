const cardsarray=
[{
    name:'hippo',
    // icon:'<i class="fa-solid fa-hippo"></i>'
    icon:"A"

},
{
    name:'bat',
    // icon:'<i class="fa-duotone fa-bat"></i>'
    icon:"B"
},
{
    name:'alicorn',
    // icon:'<i class="fa-sharp fa-solid fa-alicorn"></i>'
    icon:"C"  
},
{
    name:'deer',
    // icon:'<i class="fa-sharp fa-regular fa-deer"></i>'
    icon:"D"
},
{
    name:'ram',
    // icon:'<i class="fa-sharp fa-regular fa-ram"></i>'
    icon:"E"
},
{
    name:'monkey',
    // icon:'<i class="fa-sharp fa-regular fa-monkey"></i>'
    icon:"F"
},
{
    name:'hippo',
    // icon:'<i class="fa-solid fa-hippo"></i>'
    icon:"A"

},
{
    name:'bat',
    // icon:'<i class="fa-duotone fa-bat"></i>'
    icon:"B"
},
{
    name:'alicorn',
    // icon:'<i class="fa-sharp fa-solid fa-alicorn"></i>'   
    icon:"C" 
},
{
    name:'deer',
    // icon:'<i class="fa-sharp fa-regular fa-deer"></i>'
    icon:"D"
},
{
    name:'ram',
    // icon:'<i class="fa-sharp fa-regular fa-ram"></i>'
    icon:"E"
},
{
    name:'monkey',
    // icon:'<i class="fa-sharp fa-regular fa-monkey"></i>'
    icon:"F"
}
]
let flippedcards=[];
let matchedpairs=0;
shufflecards();
const gameboard=document.getElementById('gameboard');
displaycards();
function shufflecards()
{
    for (let i=cardsarray.length-1;i>=0;i--)
    {
        const randindex=Math.floor(Math.random()*(i+1));
        [cardsarray[i],cardsarray[randindex]]=[cardsarray[randindex],cardsarray[i]]
    }
}
function displaycards()
{
    cardsarray.forEach((curr,index,arr)=>
    {
        const card=document.createElement('div');
        card.setAttribute('id',index);
        card.classList.add('cardback');
        card.classList.add('active');
        gameboard.append(card); 
        card.addEventListener('click',flipcard);
    })
}
function flipcard()
{
    if (flippedcards.length<2 && this.classList.contains('active'))
    {
        let cardid=this.getAttribute('id');
        // console.log(this);
        flippedcards.push(this);
        this.classList.remove('cardback');
        // console.log(cardsarray[cardid].icon);
        this.innerHTML = cardsarray[cardid].icon;
    }
    if(flippedcards.length==2)
    {
        setTimeout(checkmatch,1000);
    }
}
function checkmatch()
{
    const card1id=flippedcards[0].getAttribute('id')
    const card2id=flippedcards[1].getAttribute('id');
    if(cardsarray[card1id].name===cardsarray[card2id].name)
    {
        flippedcards[0].style.border='none';
        flippedcards[0].style.backgroundColor='#f5e8ba'
        flippedcards[0].innerHTML='';
        flippedcards[0].classList.remove('active');
        flippedcards[1].style.border='none';
        flippedcards[1].style.backgroundColor='#f5e8ba'
        flippedcards[1].innerHTML=''
        flippedcards[1].classList.remove('active');
        matchedpairs++;
        gameover();
    }
    else
    {
        flippedcards[0].innerHTML='';
        flippedcards[0].classList.add('cardback');
        flippedcards[1].innerHTML='';
        flippedcards[1].classList.add('cardback');
    }
    flippedcards=[];

}
function gameover()
{
    if (matchedpairs == cardsarray.length/2)
    {
        while (gameboard.firstChild)
        {
            gameboard.removeChild(gameboard.firstChild);
        }
        gameboard.innerHTML="YOU WON";
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
    }
}