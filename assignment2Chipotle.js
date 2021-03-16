const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    SAUCE: Symbol("sauce"),
    SALAD:  Symbol("salad"),
    QUANTITY: Symbol("quantity"),
    PAYMENT: Symbol("payment")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sSauce = "";
        this.sSalad = "";
        this.sItem = "chipotle";
        this.sPrice = 10;
        this.sQuantity = "";
        this.sSaucePrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE
                aReturn.push("Welcome to kunj's Chipotle.");
                aReturn.push("What size would you like?");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;
            case OrderState.SIZE:                
                this.sSize = sInput;
              if(this.sSize == "small" || this.sSize == "large" || this.sSize == "medium"){
                this.stateCur = OrderState.TOPPINGS
                  if(this.sSize == "small"){
                    this.sPrice += 2;
                  }
                  if(this.sSize == "medium"){
                    this.sPrice += 5;
                  }
                  if(this.sSize == "large"){
                    this.sPrice += 7;
                  }
                  aReturn.push("What toppings would you like?");
                }
                else{             
                  aReturn.push("Please enter valid Size(large, medium, small)");
                  this.stateCur = OrderState.SIZE
                }                 
               
                break;
            case OrderState.TOPPINGS:
              this.stateCur = OrderState.SAUCE
              this.sToppings = sInput;
              aReturn.push("Which Sauce would you like?");
              break;
          case OrderState.SAUCE:
              this.sSauce = sInput;
              if(this.sSauce == "mayo" || this.sSauce == "ranch" || this.sSauce == "sweet onion"){
                this.stateCur = OrderState.QUANTITY            
                if(this.sSauce== "mayo"){
                    this.sPrice += 2;
                    this.sSaucePrice = 2;
                }
                if(this.sSauce = "ranch"){
                    this.sPrice += 3;
                    this.sSaucePrice = 3;
                }
                if(this.sSauce == "sweet onion"){
                    this.sPrice += 4;
                    this.sSaucePrice = 4;
                }
                aReturn.push("How many Sauces you want?");    
              }
              else{             
                aReturn.push("Please select from avilable sauce (mayo, ranch and sweet onion)");
                this.stateCur = OrderState.SAUCE
              } 
                                 
              break;
          case OrderState.QUANTITY:                      
              this.sQuantity = sInput;
              if(!isNaN(sInput)){
                this.stateCur = OrderState.SALAD  
                this.sPrice += this.sSaucePrice*parseInt(sInput);
                aReturn.push("Would you like Salad with that?");
              }
              else{             
                aReturn.push("Please enter valid intiger");
                this.stateCur = OrderState.QUANTITY
              } 
              break;
          case OrderState.SALAD:
              this.sSalad = sInput;  
              this.isDone(true);
              if(sInput.toLowerCase() == "no" || sInput.toLowerCase() == "yes"){
                this.stateCur = OrderState.PAYMENT
                if(sInput.toLowerCase() != "no"){  
                  this.sPrice += 10;
                }   
            
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and ${this.sSauce} Sauce `); 
                  if(this.sSalad){
                      aReturn.push(`and Salad`);
                  }
                aReturn.push(`Your Total Amount is ${this.sPrice}$`)
                aReturn.push(`Please pay for your order here`);
                
              }
              else{
                aReturn.push("Please enter valid answer");
                this.stateCur = OrderState.SALAD
              }
              break;
          case OrderState.PAYMENT:
              //console.log(sInput);
              this.isDone(true);    
              let d = new Date(); 
              d.setMinutes(d.getMinutes() + 20);
              aReturn.push(`your order will be ready at ${d.toTimeString()}`);
              aReturn.push(`Your order will be deliverd at ${sInput.address_line_1} , ${sInput.admin_area_2}, ${sInput.admin_area_1}, ${sInput.postal_code}, ${sInput.country_code}.`)
              
              
              break;
      }
      return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      const sClientID = process.env.SB_CLIENT_ID || 'AXklKxoR4elag4ukHw9Jki8dKLC5RPkDTcenADRxXGrpky1BCF3-o7POTaIg9qeSqHPGrajOQEqyeGbc'
      return(`
      <html>

      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c2 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c1 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c0 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c0">
          <p class="c1"><span class="c2">Hello How&rsquo;s Going !!!!!!!!!!!!!!!!!!!!!!!!! Zalak jdffcfeg</span></p>
      </body>
      
      </html>`);
  
    }
  }