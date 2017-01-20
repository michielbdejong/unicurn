function getBasket() {
 // data from https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)#Lists, left column:
  var gdp = {
    USD: 18561930,
    EUR: 17110523,
    CNY: 11391619,
    JPY:  4730300,
    GBP:  2649890,
    INR:  2250990,
    BRL:  1769600,
    CAD:  1532340,
    KRW:  1404380,
    RUB:  1267750,
    AUD:  1256640,
    MXN:  1063610,
  };
  // retrieved on 20 jan 2017 from https://www.google.com/finance?q=usdeur
  var perusd = {
    USD:  1.0000,
    EUR: 0.9389,
    CNY:  6.8744,
    JPY:  115.021,
    GBP: 0.8139,
    INR:  68.1324,
    BRL:  3.1949,
    CAD:  1.3366,
    KRW:  1175.36,
    RUB:  59.8109,
    AUD:  1.3257,
    MXN:  21.9407,
  };
  var totalGdp=0;
  var basket = {};
  for (var curr in gdp) {
    totalGdp += gdp[curr];
  }
  var totalVal = 0;
  var value = totalGdp/100000000;
  for (var curr in gdp) {
    basket[curr] = gdp[curr]*perusd[curr]*value/totalGdp;
    if (basket[curr] > 1000) {
      basket[curr] = Math.floor(basket[curr] * 1 + .5)/1;
    } else if (basket[curr] > 100) {
      basket[curr] = Math.floor(basket[curr] * 10 + .5)/10;
    } else if (basket[curr] > 10) {
      basket[curr] = Math.floor(basket[curr] * 100 + .5)/100;
    } else if (basket[curr] > 1) {
      basket[curr] = Math.floor(basket[curr] * 1000 + .5)/1000;
    } else {
      basket[curr] = Math.floor(basket[curr] * 10000 + .5)/10000;
    }
    totalVal += basket[curr]/perusd[curr];
  }
  console.log(`Basket value in usd: ${totalVal}`);
  console.log(`Basket value in eur: ${totalVal*perusd.EUR}`);
  return basket;
}

// ...
var basket = getBasket();
for (var curr in basket) {
  console.log(`<li>${basket[curr]} ${curr}</li>`);
}
