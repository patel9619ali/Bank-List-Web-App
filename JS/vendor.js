const account1 = {
  owner: 'Patel Mohammed Ali',
  interestRate: 1.2, 
  pin: 1111,
  movement: [123,-123,31,21313,-132]
};

const account2 = {
  owner: 'Mohammed Saif Patel',
  interestRate: 1.5,
  pin: 2222,
  movement: [123,13,-3,-213,132],
};

const account3 = {
  owner: 'Mohammed Kaif Patel',
  interestRate: 0.7,
  pin: 3333,
  movement: [1,2,3,4,5,-12],
};

const account4 = {
  owner: 'Mohammed Fahad Patel',
  interestRate: 1,
  pin: 4444,
  movement: [1,2,3,4,5,-12,123323],
};
const account5 = {
  owner: 'Mohammed Azeem Siddique',
  interestRate: 1,
  pin: 5555,
  movement: [1,2,3,321324,5,-121232,21],
};

const conversion = {
  inrRiyal : 0.045,
  inrDollar: 0.012,
  inrEuro : 0.018, 
}

const account = [account1,account2,account3,account4,account5];
let accountFind;
let username = function(accountName){
  let mapAccount = accountName.owner.toLowerCase().split(' ').map(function(initials){
      return initials[0];
  });
  let usernameOfAccount = mapAccount.join('');
 accountName.username = usernameOfAccount;
}
account.forEach(function(allAccount){
  username(allAccount);
});

let requestLoanInput = document.querySelector('.request_loan_input');
let formButtonLoan = document.querySelector('.form__btn--loan');
let loginButton = document.querySelector('.login_botton');
let userNameValue = document.querySelector('.user_name_value');
let userPinValue = document.querySelector('.user_pin_value');
let appDisplay = document.querySelector('.app_display_wrapper');
// SignUp Button
let signUpButton = document.querySelector('.signup_botton');
let createFullName = document.querySelector('.create_full_name');
let createUserName = document.querySelector('.create_user_name');
let createPin = document.querySelector('.create_your_pin');
let confirmPin = document.querySelector('.confirm_pin');
let signUpWrapper = document.querySelector('.sign_up_wrapper');
let currentAmount = document.querySelector('.amount_have');
let accountHistory = document.querySelector('.account_history');
let historyButton = document.querySelector('.history_button');
let mainAccountHistory = document.querySelector('.account_history_main');
let debitInfo = document.querySelector('.debitInfo');
let creditInfo = document.querySelector('.creditInfo');
let withDrawMoney = document.querySelector('.withdraw_money_input');
let withDrawSubmit = document.querySelector('.form__btn--withdraw');
let currentBalance = document.querySelector('.amount_have');
let convertingMoney = document.querySelectorAll('.currency_value');
let transferBtn = document.querySelector('.form__btn--transfer');
let transfer_account = document.querySelector('.transfer_account');
let amountTransfer = document.querySelector('.amount_transfer');
let confirmUserName = document.querySelector('.close_user_name');
let confirmUserPin = document.querySelector('.close_user_pin');
let closeAccount = document.querySelector('.form__btn--close');

let movement;


const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
const formattedToday = day + '/' + month + '/' + year;
let movementsInTheAccount = document.querySelector('.movements_in_the_account');
let displayAccountInfo = function(movement){
      let balance = movement.reduce(function(accum,currentValue,i){
          return accum + Number(currentValue);  
      });
      if (Number(balance) >= 0) {
        currentBalance.innerHTML = `₹${balance}`;
        const type = (movement.slice(-1))>0 ? 'Credited' : `Debited`;
            let html = `
            <div class="row movements">
                            <div class="col-md-4 col-6">
                                <p class="amount_movement credited_movment">${movement.length} ${type}</p>
                            </div>
                            <div class="col-md-4 col-6">
                                <p class="date_movement">${formattedToday}</p>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="exact_amount">₹${Math.abs(movement.slice(-1))}</p>
                            </div>
                        </div>
                        `;
            movementsInTheAccount.insertAdjacentHTML('afterbegin', `${html}`);
            if(type === "Credited"){
              creditInfo.insertAdjacentHTML('afterbegin', `${html}`);
            }
            else if(type === "Debited"){
              debitInfo.insertAdjacentHTML('afterbegin', `${html}`);
            }
          }
        }
        
        let currenyConvertor = function(valueOfMoneyMovement){
          convertingMoney.forEach(function(valueOfMoney){
            valueOfMoney.addEventListener('click',function(){
              if(valueOfMoney.value === `inrRiyal`){
                let riyalMoney = valueOfMoneyMovement.map(element => element * conversion[valueOfMoney.value]).reduce((acc,curr) => acc+curr);
                currentAmount.innerHTML = `﷼${riyalMoney}`;
                console.log(riyalMoney);
                console.log(valueOfMoneyMovement);
                console.log(currentAmount);
              }
              else if(valueOfMoney.value === `inrDollar`){
                let dollarMoney = valueOfMoneyMovement.map(element => element * conversion[valueOfMoney.value]).reduce((acc,curr) => acc+curr);
                currentAmount.innerHTML = `$${dollarMoney}`;
                console.log(dollarMoney);
                console.log(currentAmount);
              }
              else if(valueOfMoney.value === `inrEuro`){
                let euroMoney = valueOfMoneyMovement.map(element => element * conversion[valueOfMoney.value]).reduce((acc,curr) => acc+curr);
                currentAmount.innerHTML = ` €${euroMoney}`;
              }
              else if(valueOfMoney.value === `indianRupees`){
                let indianRupees = valueOfMoneyMovement.reduce((acc,curr) => acc + Number(curr));
                currentAmount.innerHTML = `₹${indianRupees}`;
              }
            })
          })
        }
movement = account.find(acc=>{
  displayAccountInfo(acc.movement);
    currenyConvertor(acc.movement);
});

let loanInput = function(){
  let requestValue = Number(requestLoanInput.value);
  console.log(movement);
  if(requestValue > 0){
    movement = account.find(acc=>{
      acc.movement.push(requestValue);
      displayAccountInfo(acc.movement);
        currenyConvertor(acc.movement);
    });
    // displayAccountInfo(movement);
    // currenyConvertor(movement);
  }
  requestLoanInput.value = '';  
}

let withdrawRequest = function(){
  let withdrawValue = Number(withDrawMoney.value);
  if (withdrawValue > 0 && Number(currentBalance.innerHTML.slice(1)) >= withdrawValue) {
    movement.push(`-${withdrawValue}`);
    displayAccountInfo(movement);
    currenyConvertor(movement);
    withDrawMoney.value = '';
  }
  else{
    alert(`You Don't have a Sufficient Balance`)
  }
}
let loginUsername = function(){
  movement = account.find(acc=>{
      console.log(acc.username);
      if(userNameValue.value == acc.username){
        displayAccountInfo(acc.movement);
        currenyConvertor(acc.movement);
      }
    });

  let found = false;
    for (let i = 0; i < account.length; i++) {
        const element = account[i];
        if((element.username === userNameValue.value) && (element.pin == userPinValue.value)){
            appDisplay.classList.remove('d-none');
            mainAccountHistory.classList.remove('d-none');
            signUpWrapper.classList.add('d-none');
            appDisplay.classList.add('d-block');
            found = true;
        }
      } 
      if(!found){
        alert('Please Enter valid Id');
    }    
  }
//   let loginUsername = function(){
//     let found = false;
//     account.find(acc => {
//       if((acc.username === userNameValue.value) && (acc.pin == userPinValue.value)){
//         appDisplay.classList.remove('d-none');
//         mainAccountHistory.classList.remove('d-none');
//         signUpWrapper.classList.add('d-none');
//         appDisplay.classList.add('d-block');
//       }
//     });
//     if(!found){
//         alert('Please Enter valid Id');
//     }    
//   }
let signUpNewUser = function(){
  let fullNameValue = createFullName.value;
  let createUserNameValue = createUserName.value;
  let createPinValue = createPin.value;
  let confirmPinValue = confirmPin.value;
  if((fullNameValue === '') || (createUserNameValue === '') || (createPinValue === '') || (confirmPinValue === '')){
    alert("It Cant Be empty");
  }
  else if((createPinValue !== confirmPinValue)){
    alert('Both should be Same');
  }
  else{
    let createUserAccFun = function(newAccount){
      newAccount = {};
      newAccount.owner = fullNameValue;
      newAccount.username = createUserNameValue;
      newAccount.pin = createPinValue;
      newAccount.movement = [0];
      console.log(newAccount.movement);
      account.push(newAccount);
      displayAccountInfo(newAccount.movement);
      currenyConvertor(newAccount.movement);
      appDisplay.classList.remove('d-none');
      mainAccountHistory.classList.remove('d-none');
      signUpWrapper.classList.add('d-none');
      appDisplay.classList.add('d-block');
    }
    createUserAccFun(`account${account.length+1}`);
  }
}
let accountInfo = function(){
  historyButton.classList.toggle("getClass");
}

let transferToTheAccoucnt = function(){
  let found = false;
  let accountName = transfer_account.value;
  let amountTransferValue = amountTransfer.value;
  account.find(acc=>{
    if(accountName === acc.username){
      console.log(movement);
      console.log(acc)
      found = true;
    }
  })
  if(!found){
      alert('Please Enter Valid Account User Name');
  }
}

let confirmUserCloseAccount = function(){
  // console.log(confirmUserName.value);
  // console.log(confirmUserPin.value);
  accountFind = account.find(accountName =>{
      if(confirmUserName.value == accountName.username && confirmUserPin.value == accountName.pin){
         console.log(accountName);
         console.log(account);
         let index = account.findIndex(accountName=>{
          return account;
         })
         console.log(index)
      }
  })
  // console.log(accountFind)
}

formButtonLoan.addEventListener('click',loanInput);
loginButton.addEventListener('click',loginUsername);
signUpButton.addEventListener('click',signUpNewUser);
accountHistory.addEventListener('click',accountInfo);
withDrawSubmit.addEventListener('click',withdrawRequest);
transferBtn.addEventListener('click',transferToTheAccoucnt);
closeAccount.addEventListener('click',confirmUserCloseAccount);