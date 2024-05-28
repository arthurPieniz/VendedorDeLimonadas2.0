// parte do carregamanto da página

class Person{
    constructor(names, moneys, stMarketings, prices, priceSTs, vendass){
        this.name = names;
        this.money = moneys;
        this.stMarketing = stMarketings;
        this.price = prices;
        this.priceST = priceSTs;
        this.vendas = vendass;
    }
}

// const personData = sessionStorage.getItem('person');
const personData = localStorage.getItem('person');

if (personData) {} 

else {
    alert("Usuário não encontrado")
    window.location = "index.html";
}

const person = JSON.parse(personData);

console.log(person.name)

var dinheiro = person.money;
var stMarketing = person.stMarketing
var price = person.price;
var money = document.getElementById("money");
var img = document.getElementById("img");

// var upMarketing=[400,3500];
// var upPrice=[400,5];
var priceST = person.priceST;
var vendas = person.vendas;

var btnMark = document.getElementById("btnMark");
var btnMelh = document.getElementById("btnMelh");

money.innerHTML = "Dinheiro: " + dinheiro;
document.getElementById("vMark").innerHTML = "Vendas(3seg): " + vendas
document.getElementById("vMelh").innerHTML = "Preço: " + price;

btnMark.innerHTML = "Upgrade (" + 2**(Number(stMarketing-1)) * 300 + ")"
btnMelh.innerHTML = "Upgrade (" + 2**(Number(priceST-1)) * 300 + ")"

var sound = document.getElementById("sound");
sound.loop = true
sound.play();
sound.volume = 0.65


// parte do funcinamento do código

function loadPerson() {
    const personData = localStorage.getItem('person');
    if (personData) {
        return JSON.parse(personData);
    } else {
        return new Person('João', 30); // Valores padrão
    }
}


function updMarketing(){
    
    if(
        dinheiro >= 2**(Number(stMarketing-1)) * 300 
        && stMarketing < 10
    ){
        dinheiro -= 2**(Number(stMarketing-1)) * 300
        money.innerHTML = "Dinheiro: " + dinheiro
        vendas += 1
        document.getElementById("vMark").innerHTML = "Vendas(3seg): " + vendas

        stMarketing += 1;
        
        btnMark.innerHTML = "Upgrade (" + 2**(Number(stMarketing-1)) * 300 + ")"

        btnMark.style.padding = "4px 11px";
        btnMark.style.transition = "0.1s";
        setTimeout(()=>{
            btnMark.style.padding = "5px 12px";
        },200)
        
        document.getElementById("soundBtn").play()
    }

}

function updMelhorias(){
    
    if(dinheiro >= 2**(Number(priceST-1)) * 300){
       
        dinheiro -= 2**(Number(priceST-1)) * 300
        money.innerHTML = "Dinheiro: " + dinheiro
        
        priceST += 1
        if(priceST > 2){
            price = (priceST-1) * 5
        }else{
            price = 5
        }

        document.getElementById("vMelh").innerHTML = "Preço: " + price;

        btnMelh.innerHTML = "Upgrade (" + 2**(Number(priceST-1)) * 300 + ")"

        btnMelh.style.padding = "4px 11px";
        btnMelh.style.transition = "0.1s";
        setTimeout(()=>{
            btnMelh.style.padding = "5px 12px";
        },200)

        document.getElementById("soundBtn").play()
    }

}


function venda(){
    dinheiro += price;
    money.innerHTML="Dinheiro: " + dinheiro;
    img.style.width = "95%";
    img.style.transition = "0.1s"
    setTimeout(()=>{
        img.style.width = "100%";
    },200)
    // person.update(dinheiro,stMarketing,price)

    // sessionStorage.setItem('person',JSON.stringify())
}


setInterval( ()=>{
    dinheiro += price*vendas;
    money.innerHTML="Dinheiro: " + dinheiro;
    img.style.width = "95%";
    img.style.transition = "0.1s"
    setTimeout(()=>{
        img.style.width = "100%";
    },200)

},2000);


// const personDatas = sessionStorage.getItem('person');
const personDatas = localStorage.getItem('person');
var persons = JSON.parse(personDatas);

console.log(persons)

setInterval(()=>{
    if(stMarketing<10){

        if(dinheiro < 2**(Number(stMarketing-1)) * 300){
            btnMark.style.background = "gray"
        } else{
            btnMark.style.backgroundImage = "linear-gradient(90deg, rgb(138, 187, 4), green)"
        }
    
    }else{
        btnMark.style.background = "gray"
    }

    if(dinheiro < 2**(Number(priceST-1)) * 300){
        btnMelh.style.background = "gray"
    } else{
        btnMelh.style.backgroundImage = "linear-gradient(90deg, rgb(138, 187, 4), green)"
    }

    persons.money = dinheiro;
    persons.stMarketing = stMarketing;
    persons.price = price;
    persons.priceST = priceST;
    persons.vendas = vendas;

    // sessionStorage.setItem("person", JSON.stringify(persons));
    localStorage.setItem("person", JSON.stringify(persons));
},500)
