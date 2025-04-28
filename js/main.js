//GETTING ELEMENTS
let balance=document.getElementById("Balance");
const descriptionIn=document.getElementById("description");
const amountIn=document.getElementById("amount");
const typeIn=document.getElementById("type");
const addButton=document.getElementById("button");
const transList=document.getElementById("transaction-list")
const quote=document.getElementById("quote");

//GETTING VALUE FROM THE USER

let transactions=[];
if(localStorage.getItem("transactions")){
    transactions=JSON.parse(localStorage.getItem("transactions"));
    updateUi();
}
function addTransaction(){
    let desc=descriptionIn.value;
    let amount=Number(amountIn.value);
    let type=typeIn.value;
    if(desc==""|| amount==0){
       alert("Please type description and amount");
       return;
    }
const transaction={
    description:desc,
    addedAmount:amount,
    addedType:type
};
transactions.push(transaction);

updateUi();
localStorage.setItem("transactions",JSON.stringify(transactions));
//RESET THE INPUT FEILDS
document.getElementById("description").value="";
document.getElementById("amount").value="";
document.getElementById("type").value="income";
}
//UPDATE UI
function updateUi(){
    let balance=0;
    let transList="";
    for(i=0;i<transactions.length;i++){
        const t=transactions[i];
    if(t.addedType=="income"){
        balance+=t.addedAmount;
    }
    else{
        balance-=t.addedAmount;
    }
    transList+=`<li><span id="li-gap">${t.description}</span><span id="li-gap"> | ${t.addedType} |</span><span id="li-gap">$${t.addedAmount}</span><span id="li-gap"><button id="Delete"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" >
    <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
    </svg></button></span></li>`;
}
    document.getElementById("Balance").innerText=`$${balance}`;
    document.getElementById("transaction-list").innerHTML=transList;
    showQuote(balance);
    let removebtn=document.querySelectorAll("#Delete");
removebtn.forEach(buttons=>{
buttons.addEventListener("click",function removing(index){
    transactions.splice(index,1);
    updateUi();
    localStorage.setItem("transactions",JSON.stringify(transactions));
});
});
}

//Updating Quotes
function showQuote(balance){
    const quotes=["Keep Going","Small savings today.Big rewards tomorrow","you've got controll over your money"];
    let getQuote=Math.floor(Math.random()*quotes.length)
    let quote=balance>=0 ? quotes[getQuote]:"It's Okay.You can always bounce back!";
    document.getElementById("quote").innerText=quote;
}


