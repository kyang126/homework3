//document ready function
$(function(){

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){

        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };
        
        //push the new item on to the items array
        cart.items.push(newCartItem);
        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));
    });

    $('.place-order').click(function(){
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 
        var idx;
        var totalPrice;
        var signupForm = $(this);
        //select a descendant input element with the name "addr-1"
        var nameInput = signupForm.find('input[name="name"]');
        var nameValue = nameInput.val();
        if(nameValue.length > 0){
            alert('you forgot');

        }else {
            return false;
        }

        for(idx=0; idx<cart.items.length; idx++) {
            totalPrice += this.cart.items[idx].price; 
        }
        if (totalPrice < 20) {
                alert('You need to order at least 20 dollars');
                    return false;
        }
        postCart(cart, $('.cart-form'));

    });
    

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {

    var idx, item;
    var total = 0;
    var subtotal = 0;
    var tax = 0;
    var instance;
    var template = $('.cart-footer');
    var itemName='';
    //empty the container of whatever is there currently

    container.empty();

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        instance = template.clone();
        item = cart.items[idx];
        subtotal += +item.price;
        tax += +item.price*0.095;
        //TODO: code to render the cart item
        itemName += item.name + "<br>"; 
        instance.find('.itemNames').html(itemName);
        
    } //for each cart item
    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total

    total = +subtotal + +tax;
    total = total.toFixed(2);
    subtotal = subtotal.toFixed(2);
    tax = tax.toFixed(2);
    instance.find('.total-price').html(total);
    instance.find('.subtotal-price').html(subtotal);
    instance.find('.tax-price').html(tax);
    instance.removeClass('template');
    instance.removeClass('cart-footer');
    container.append(instance);
    container.fadeIn(1000);
    
} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()