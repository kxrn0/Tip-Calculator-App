const bill = document.getElementById("bill-input");
const percentage = document.querySelectorAll(".tip-percentage input[type='checkbox']");
const custom = document.querySelector(".tip-percentage input[type='number']");
const peoples = document.getElementById("people-input");
const reset = document.querySelector(".right .reset");
const tipPerPerson = document.querySelector(".tip-amount .value");
const totalPerPerson = document.querySelector(".total-per-person .value");
const errr = document.querySelector(".errr");

const radios = [...document.querySelectorAll(".tip-percentage input[type='radio']")];

let initialBill, totalBill, totalTip, tipPercentage, pepes;

reset.addEventListener("click", init);

init();

function init() {
    initialBill = 0;
    totalBill = 0;
    totalTip = 0;
    tipPercentage = .15;
    pepes = 0;

    bill.value = '';
    peoples.value = '';
    custom.value = '';

    radios[radios.findIndex(radio => radio.dataset.percentage == "15")].checked = true;
    reset.classList.add("inactive");
    tipPerPerson.innerText = "$0.00";
    totalPerPerson.innerText = "$0.00";
}

radios.forEach(radio => radio.addEventListener("click", () => {
    tipPercentage = Number(radio.dataset.percentage) / 100;
    custom.value = '';

    compute_tip();
}));

custom.addEventListener("input", () => {
    tipPercentage = custom.value;

    if (tipPercentage < 0) {
        tipPercentage *= -1;
        custom.value = tipPercentage;
    }
    radios.forEach(radio => radio.checked = false);
    tipPercentage /= 100;

    compute_tip();
});

custom.addEventListener("focusout", () => {
    if (!custom.value && radios.every(radio => !radio.checked))
        custom.value = 0;
    check_reset_state();
});

bill.addEventListener("input", () => {
    check_reset_state();
    initialBill = Number(bill.value);
    if (initialBill < 0) {
        initialBill *= -1;
        bill.value = initialBill;
    }
    if (pepes == 0) {
        errr.classList.remove("hidden");
        peoples.classList.add("errorified");
        return;
    }

    compute_tip();
});

peoples.addEventListener("input", () => {
    pepes = peoples.value;
    if (pepes < 0) {
       pepes *= -1;
       peoples.value = pepes; 
    }

    if (pepes != 0) {
        errr.classList.add("hidden");
        peoples.classList.remove("errorified");

        compute_tip();
    }
    else {
        errr.classList.remove("hidden");
        peoples.classList.add("errorified");
        tipPerPerson.innerText = "$0.00";
        totalPerPerson.innerText = "$0.00";
    }

    check_reset_state();
});

function check_reset_state() {
    if (!bill.value && !custom.value && !peoples.value)
        reset.classList.add("inactive");
    else
        reset.classList.remove("inactive");
}

function compute_tip() {
    if (!pepes)
        return;

    totalTip = tipPercentage * initialBill;
    totalBill = initialBill + totalTip;

    tipPerPerson.innerText = `$${(totalTip / pepes).toFixed(2)}`;
    totalPerPerson.innerText = `$${(totalBill / pepes).toFixed(2)}`;
}