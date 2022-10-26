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
