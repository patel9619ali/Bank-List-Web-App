const account1 = {
    owner: 'Patel Mohammed Ali',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Mohammed Saif Patel',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Mohammed Kaif Patel',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Mohammed Fahad Patel',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
const account = [account1,account2,account3,account4];
console.log(account);


let requestLoanInput = document.querySelector('.request_loan_input');
let formButtonLoan = document.querySelector('.form__btn--loan');
console.log(formButtonLoan)
let movement = [];
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
const formattedToday = day + '/' + month + '/' + year;
let movementsInTheAccount = document.querySelector('.movements_in_the_account');
console.log(movementsInTheAccount);
let displayAccountInfo = function(movement){
    movement.forEach((amount,i) => {
        const type = amount>0 ? 'Deposited' : `Withdrawed`;
            let html = `
            <div class="row movements">
                            <div class="col-md-4 col-6">
                                <p class="amount_movement credited_movment">${i+1} ${type}</p>
                            </div>
                            <div class="col-md-4 col-6">
                                <p class="date_movement">${formattedToday}</p>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="exact_amount">$${Math.abs(amount)}</p>
                            </div>
                        </div>
                        `;
            movementsInTheAccount.insertAdjacentHTML('afterbegin', `${html}`);
    });
}

let loanInput = function(){
    movement.push(requestLoanInput.value);
    displayAccountInfo(movement.slice(-1));
}



formButtonLoan.addEventListener('click',loanInput);
