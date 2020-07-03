const form = document.querySelector("form");
const ul = document.querySelector("ul");
const beWarn = "必要!";
const li = document.querySelectorAll("li");
const now = new Date();
const search = document.querySelector("#searchSection input");
const unshow = document.querySelector("#searchSection .unshowbutton");
const show = document.querySelector("#searchSection .showbutton");



form.addEventListener("submit", e => {

    e.preventDefault();

    //const test = form.mekaname.value;
    //const date = form.date.valueAsDate.toDateString();


    if (form.itemname.value.length) {

        makeTemplate();
        //form.reset();
    };


});


const makeTemplate = () => {

    if (form.needorder.value === beWarn) {


        const displayingPlate =

            `<li class="list-group-item border border-warning">
    
        <span> ${now.toDateString()} &nbsp;&nbsp; お客様:&nbsp;${form.customername.value}様 &nbsp;&nbsp; 商品:&nbsp;${form.mekaname.value} &nbsp;&nbsp; ${form.itemname.value.toUpperCase()} &nbsp;&nbsp; 数量:&nbsp;${form.numbers.value} &nbsp;&nbsp; SIZE:&nbsp;${form.size.value.toUpperCase()}  &nbsp;&nbsp; カラー:&nbsp;${form.color.value.toUpperCase()}
                 <br>
                 発注${form.needorder.value}&nbsp;&nbsp;納期:&nbsp;${form.deadline.valueAsDate.toDateString()} &nbsp;&nbsp; 他店確認:&nbsp;${form.othermic.value} &nbsp;&nbsp; 担当:&nbsp;${form.staffs.value}さん &nbsp;&nbsp; ${form.visitshop.value} &nbsp;&nbsp; 備考欄:&nbsp;${form.remarks.value}<br></span>

               <i class="fas fa-cart-arrow-down iorder">Order</i>
               <i class="fas fa-clipboard-check ifinish">Finish</i>
               <i class="fas fa-trash-alt idelete">Delete</i>

        </li>`;

        ul.innerHTML += displayingPlate;
    } else {

        const displayingP =

            `<li class="list-group-item border border-success">
    
        <span> ${now.toDateString()} &nbsp;&nbsp; お客様:&nbsp;${form.customername.value}様 &nbsp;&nbsp; 商品:&nbsp;${form.mekaname.value} &nbsp;&nbsp; ${form.itemname.value.toUpperCase()} &nbsp;&nbsp; 数量:&nbsp;${form.numbers.value} &nbsp;&nbsp; SIZE:&nbsp;${form.size.value.toUpperCase()}  &nbsp;&nbsp; カラー:&nbsp;${form.color.value.toUpperCase()}
                 <br>
                 発注${form.needorder.value}&nbsp;&nbsp;納期:&nbsp;${form.deadline.valueAsDate.toDateString()} &nbsp;&nbsp; 他店確認:&nbsp;${form.othermic.value} &nbsp;&nbsp; 担当:&nbsp;${form.staffs.value}さん &nbsp;&nbsp; ${form.visitshop.value} &nbsp;&nbsp; 備考欄:&nbsp;${form.remarks.value}<br></span>

               <i class="fas fa-cart-arrow-down iorder"> Order</i>
               <i class="fas fa-clipboard-check ifinish"> Finish</i>
               <i class="fas fa-trash-alt idelete"> Delete</i>

        </li>`;

        ul.innerHTML += displayingP;

    };


    localStorage.setItem("savedList", ul.innerHTML);

};


//console.log(li);


//add event listener to ul and remove li

ul.addEventListener("click", (d) => {

    //console.log(d, d.target);

    if (d.target.classList.contains("iorder")) {

        d.target.classList.toggle("green");

    } else if (d.target.classList.contains("ifinish")) {

        d.target.parentElement.classList.toggle("textline");
        d.target.classList.toggle("green");

    } else if (d.target.parentElement.classList.contains("textline") && d.target.classList.contains("idelete")) {

        d.target.parentElement.remove();

    }

    localStorage.setItem("savedList", ul.innerHTML);

});


//search orderlist

const filterlists = terms => {

    //console.log(ul.children);

    Array.from(ul.children).filter((everyli) => {
        return !everyli.textContent.includes(terms);
    }).forEach((eachreturn) => {
        eachreturn.classList.add("filtered");
    });



    Array.from(ul.children).filter((everyli) => {
        return everyli.textContent.includes(terms);
    }).forEach((eachreturn) => {
        eachreturn.classList.remove("filtered");
    });

};



//keyup value

search.addEventListener("keyup", () => {

    const terms = search.value.trim().toUpperCase();

    filterlists(terms);
});


//unshow finished

unshow.addEventListener("click", () => {
    
    Array.from(ul.children).filter((everyli) => {
        return everyli.classList.contains("textline")
    }).forEach((eachreturn) => {
        eachreturn.classList.add("filteredSec");
    });  

});

show.addEventListener("click", () => {
    
    Array.from(ul.children).filter((everyli) => {
        return everyli.classList.contains("filteredSec")
    }).forEach((eachreturn) => {
        eachreturn.classList.remove("filteredSec");
    });  

});


if(localStorage.getItem("savedList")){
    ul.innerHTML = localStorage.getItem("savedList");
};