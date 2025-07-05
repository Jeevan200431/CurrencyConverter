const BASEURL="https://api.frankfurter.app/latest?";
const dropdown=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const exchangeicon=document.querySelector(".dropdown i");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
});


for(let select of dropdown){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" &&currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" &&currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}


const updateflag=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();    
});

exchangeicon.addEventListener("click",()=>{
    let temp=fromcurr.value;
    fromcurr.value=tocurr.value;
    tocurr.value=temp;

    updateflag(fromcurr);
    updateflag(tocurr);
});


const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
    if(amountvalue===""||amountvalue<1){
        amountvalue=1;
        amount.value="1";
    }
    const URL=`${BASEURL}?amount=${amountvalue}&from=${fromcurr.value}&to=${tocurr.value}`;

    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.rates[tocurr.value];
    let finalamount=amountvalue*rate;

    msg.innerText=` ${amountvalue} ${fromcurr.value} = ${finalamount.toFixed(3)} ${tocurr.value} `
}
