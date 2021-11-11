const { expect } = require("@jest/globals");

describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://cse110-f2021.github.io/Lab8_Website');
    //await page.goto('http://127.0.0.1:5500/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);

    // Loop through all 20 <product-item> elements
    for (let i = 0; i < 20; i++) {
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      //data = await prodItems[0].getProperty('data');
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      //console.log(`Value of i: ${i}`);
    }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
    console.log(`Final value: ${allArePopulated}`);

    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText['_remoteObject'].value to get the text value of it

    // Queries the first <product-item>
    let elem = await page.$('product-item');

    // Get the shadow root of our queried <product-item>
    let elemShadow = await elem.getProperty('shadowRoot');

    // Query the button from the shadow root
    let shadowButton = await elemShadow.$('button');
    //console.log(shadowButton);

    // Click the button
    await shadowButton.click();

    // Get the innerText of the button after it's clicked
    let textProp = await shadowButton.getProperty('innerText');
    //console.log(`Text prop: ${textProp}`);
    //console.log(textProp['_remoteObject'].value);

    // Expect the button's text to be "Remove from Cart"
    expect(textProp['_remoteObject'].value).toBe("Remove from Cart");
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20

    // Query all the <product-item> elements
    let elems = await page.$$('product-item');

    // Loop through all the <product-item> elements
    for (let i = 0; i < 20; i++) {
      // Get the shadow root from each <product-item>
      let elemShadow = await elems[i].getProperty('shadowRoot');

      // Query the button from each shadow root
      let shadowButton = await elemShadow.$('button');

      // If we're looking at the first <product-item> element, don't click it 
      // because we already clicked it in the previous step. If we're looking at
      // the other <product-item> elements, click their buttons. 
      if (i > 0) {
        await shadowButton.click();
      }
    }

    // Query the element with the #cart-count id
    let cartCount = await page.$('#cart-count');

    // Get the inner text of the element with the #cart-count id
    let cartProp = await cartCount.getProperty('innerText');

    console.log(`Cart Count: ${cartProp['_remoteObject'].value}`);

    // Expect the cart count to be 20
    expect(cartProp['_remoteObject'].value).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20

    // Reload the page
    await page.reload();

    // Query all the <product-item> elements
    let elems = await page.$$('product-item');

    // Start as true. If a button has the wrong text, this will become false
    let correctBtnText = true;

    // Loop through all the <product-item> elements
    for (let i = 0; i < 20; i++) {
      // Get the shadow root of each <product-item> element
      let elemShadow = await elems[i].getProperty('shadowRoot');

      // Query the button
      let shadowButton = await elemShadow.$('button');
      
      // Get the inner text of each button
      let textProp = await shadowButton.getProperty('innerText');

      // If the value of the inner text is not "Remove from Cart", change the 
      // value of correctBtnText to false
      if (textProp['_remoteObject'].value != "Remove from Cart") {
        correctBtnText = false;
      }
    }

    console.log(`Correct Button Text After Reload: ${correctBtnText}`);

    // Expect correctBtnText to still be true after checking the text of all the
    // buttons
    expect(correctBtnText).toBe(true);

    // Query the element with the #cart-count id
    let cartCount = await page.$('#cart-count');

    // Get the inner text property of the element with the #cart-count id
    let cartProp = await cartCount.getProperty('innerText');

    console.log(`Cart Count After Reload: ${cartProp['_remoteObject'].value}`);

    // Expect the cart count to still be 20 after a reload
    expect(cartProp['_remoteObject'].value).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is

    // Get the cart item in localStorage
    let localStore = await page.evaluate(() => localStorage.getItem("cart"));

    console.log(`Cart: ${localStore}`);

    // Expect the cart item in localStorage to be '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]'
    expect(localStore).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0

    let elems = await page.$$('product-item');

    for (let i = 0; i < 20; i++) {
      let elemShadow = await elems[i].getProperty('shadowRoot');
      let shadowButton = await elemShadow.$('button');

      // Click on each button
      await shadowButton.click();
    }

    let cartCount = await page.$('#cart-count');

    let cartProp = await cartCount.getProperty('innerText');

    console.log(`Cart Count After Removing: ${cartProp['_remoteObject'].value}`);

    // Expect the cart count to be 0 after removing all the product items
    expect(cartProp['_remoteObject'].value).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0

    await page.reload();

    let elems = await page.$$('product-item');

    let correctBtnText = true;

    for (let i = 0; i < 20; i++) {
      let elemShadow = await elems[i].getProperty('shadowRoot');
      let shadowButton = await elemShadow.$('button');
      
      let textProp = await shadowButton.getProperty('innerText');
      if (textProp['_remoteObject'].value != "Add to Cart") {
        correctBtnText = false;
      }
    }

    console.log(`Correct Button Text After Another Reload: ${correctBtnText}`);

    // Expect correctBtnText to still be true after another reload
    expect(correctBtnText).toBe(true);
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is

    let localStore = await page.evaluate(() => localStorage.getItem("cart"));

    console.log(`Cart After Removing Items: ${localStore}`);

    // Expect the cart item in localStorage to be '[]'
    expect(localStore).toBe('[]');
  });
});