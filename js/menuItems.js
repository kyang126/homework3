//This function passes the arrays containing the information about pizzas, desserts, and drinks to the render function
$(function() {
  // Document is ready
  render(com.dawgpizza.menu.pizzas, $('.menuItems'), $('.pizzaMenu'));
  render(com.dawgpizza.menu.drinks, $('.drinks'), $('.drinksMenu'));
  render(com.dawgpizza.menu.desserts, $('.desserts'), $('.dessertsMenu'));

});

//This function takes the information about the pizzas, desserts, and drinks and puts them onto the web
function render(entries, template, container) {
    var instance;
    container.hide();
    container.empty();



    $.each(entries, function(){
        instance = template.clone();
        for (property in this) {
                 instance.find('.' + property);
                 if (property == 'prices') {
                        instance.find('.' + property).html(this.prices[0] + '/' + this.prices[1] + '/' + this.prices[2]);
                        $('#small').attr('data-price', this.prices[0]);
                        $('#med').attr('data-price', this.prices[1]);          
                        $('#large1').attr('data-price', this.prices[2]);  
                 } else {
                         instance.find('.' + property).html(this[property]);
                         $('#small').attr('data-name', this.name);
                 }
        }
        instance.removeClass('template');
        container.append(instance);
        container.fadeIn(1000);
    });
}

