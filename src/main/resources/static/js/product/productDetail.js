document.querySelector("#plus-btn").addEventListener('click', (e) => {
    e.preventDefault();
    const product_quantity = document.querySelector("#product-quantity")
    product_quantity.value = parseInt(product_quantity.value) + 1;
});

document.querySelector("#minus-btn").addEventListener('click', (e) => {
    e.preventDefault();
    const product_quantity = document.querySelector("#product-quantity")
    if(product_quantity.value != 1){
        product_quantity.value = parseInt(product_quantity.value) - 1;
    }
});

// select 요소에 change 이벤트 핸들러를 추가합니다.
// selectElement.addEventListener('change', function() {
if(document.querySelector("#selectOption") != null){
    document.querySelector("#selectOption").addEventListener('change', (e) => {

        const selOptVal = e.target.value;
        const stringArr = selOptVal.split('#');
        const optionCost = stringArr[1];

        const optionHiddenCostEle = document.querySelector('#refOptionCost');
        optionHiddenCostEle.value = parseInt(optionCost);


        const product_quantityEle = document.querySelector("#product-quantity");
        const product_quantity = parseInt(product_quantityEle.value);

        const productApplyPriceEle = document.querySelector('#product-applyPrice');
        const productApplyPrice = parseInt(productApplyPriceEle.innerText);

        const refOptionCostEle = document.querySelector("#refOptionCost");
        const refOptionCostPrice = parseInt(refOptionCostEle.value);

        const productTotalPriceEle = document.querySelector('#product-totalPrice');
        productTotalPriceEle.value = (productApplyPrice + refOptionCostPrice) * product_quantity;
    });
}

document.querySelectorAll(".quantity-btn").forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product_quantityEle = document.querySelector("#product-quantity");
        // const product_quantity = parseInt(product_quantityEle.innerText); // innerHTML 대신 innerText 사용
        const product_quantity = parseInt(product_quantityEle.value);

        const productApplyPriceEle = document.querySelector('#product-applyPrice');
        const productApplyPrice = parseInt(productApplyPriceEle.innerText);
        // const productSellPrice = parseInt(productSellPriceEle.value);

        const refOptionCostEle = document.querySelector("#refOptionCost");
        const refOptionCostPrice = parseInt(refOptionCostEle.value);

        const productTotalPriceEle = document.querySelector('#product-totalPrice');
        productTotalPriceEle.value = (productApplyPrice + refOptionCostPrice) * product_quantity;
    });
});

document.querySelector("#product-quantity").addEventListener('input', (e) => {
    e.preventDefault();
    const product_quantityEle = document.querySelector("#product-quantity");
    if(parseInt(product_quantityEle.value) < 1){
        product_quantityEle.value = 1;
    }
    const product_quantity = parseInt(product_quantityEle.value);

    const productApplyPriceEle = document.querySelector('#product-applyPrice');
    const productApplyPrice = parseInt(productApplyPriceEle.innerText);

    const productTotalPriceEle = document.querySelector('#product-totalPrice');
    if(isNaN(parseInt(product_quantityEle.value))){
        productTotalPriceEle.value = productApplylPrice;
    }
    else{
        productTotalPriceEle.value = productApplyPrice * product_quantity;
    }
});

document.querySelectorAll("tr[data-product-id]").forEach((tr) => {
    tr.addEventListener('click', (e) => {
        const td = e.target;
        const tr = td.parentElement;
        const {productId} = tr.dataset;
        location.href = `${contextPath}product/productQna.do?id=${productId}`;
    });
});

function submitForm(action) {
    let form = document.getElementById('myForm');

    // 액션에 따라 폼의 액션을 설정합니다.
    if (action === 'purchase') {
        form.action = contextPath + 'product/productPurchaseInfo.do';
    } else if (action === 'cart') {
        form.action = contextPath + 'product/productCart.do';
    }

    // 폼을 서버로 전송합니다.
    form.submit();
}