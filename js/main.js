let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let total = document.querySelector('#total');
let submit = document.querySelector('#submit');
let search = document.querySelector('#search');
let deleteAllProduct = document.querySelector('#deleteAll');
let mood = 'create';
let helpI;


// get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
}

// window.onload =title.focus()
// create product

let dataProduct;
if (localStorage.Product != null) {
    dataProduct = JSON.parse(localStorage.Product);
} else {
    dataProduct = [];
}
submit.addEventListener('click', function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total: total.innerHTML,
    }

    // count ,,,, mood === create
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[helpI] = newProduct;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }else{
        alert('Pleas Enter Your Form')
    }

    // save localStorage--
    localStorage.setItem('Product', JSON.stringify(dataProduct));
    // --------------------------------

    getTotal();
    showData();
});

// clear data 
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
};

// reda data
function showData() {
    let table = ' ';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="update" onclick='updateProduct(${i})'>Update</button></td>
        <td><button id="delete" onclick='deleteProduct(${i})'>Delete</button></td>
        </tr>
        `;
    };
    document.querySelector('#tbody').innerHTML = table;
    // delete all Product
    if (dataProduct.length > 0) {
        deleteAllProduct.innerHTML = `
     <button onclick='deleteAll()'> DELETE ALL (${dataProduct.length})</button>
     `
    } else {
        deleteAllProduct.innerHTML = '';
    };

};
showData();

//function of delete Product 
function deleteProduct(i) {
    dataProduct.splice(i, 1);
    localStorage.Product = JSON.stringify(dataProduct);
    showData();
}

// delete all Product
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();

};

// update Product 
function updateProduct(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    helpI = i;
    getTotal();
    scroll({
        top: 0,
        behavior: "smooth"
    });

};

// search product
let searchMood = 'title';
function getSearchMood(id) {
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = `Search By ${searchMood}`

    search.focus();
    search.value = '';
    showData();
}

function searchProduct(value) {
    let table;
    for (let i = 0; i < dataProduct.length; i++) {

        if (searchMood == 'title') {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
                <td><button id="delete" onclick='deleteProduct(${i})'>DELETE</button></td>
                </tr>
                `;
            }
        } else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button id="update" onclick='updateProduct(${i})'>update</button></td>
                <td><button id="delete" onclick='deleteProduct(${i})'>DELETE</button></td>
                </tr>
                `;
            };
        };
    };
    document.querySelector('#tbody').innerHTML = table;
};

//