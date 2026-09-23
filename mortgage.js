
const homeValueInput = document.getElementById("homeValue");
const downPaymentInput = document.getElementById("downPayment");
const loanTermYearsInput = document.getElementById("loanTermYears");
const annualInterestRateInput = document.getElementById("annualInterestRate");
const mortgageForm = document.getElementById("mortgage-form");

const principalLoanAmountOutput = document.getElementById("principalLoanAmount");
const monthlyPrincipalInterestOutput = document.getElementById("monthlyPrincipalInterest");
const monthlyPropertyTaxOutput = document.getElementById("monthlyPropertyTax");
const totalMonthlyPaymentOutput = document.getElementById("totalMonthlyPayment");

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function updateOutputs(principalLoanAmount, monthlyPrincipalInterest, monthlyPropertyTax, totalMonthlyPayment) {
  principalLoanAmountOutput.textContent = formatCurrency(principalLoanAmount);
  monthlyPrincipalInterestOutput.textContent = formatCurrency(monthlyPrincipalInterest);
  monthlyPropertyTaxOutput.textContent = formatCurrency(monthlyPropertyTax);
  totalMonthlyPaymentOutput.textContent = formatCurrency(totalMonthlyPayment);
}

function resetOutputs() {
  updateOutputs(0, 0, 0, 0);
}

function calculateMortgage() {
  const homeValue = Number.parseFloat(homeValueInput.value);
  const downPayment = Number.parseFloat(downPaymentInput.value);
  const loanTermYears = Number.parseFloat(loanTermYearsInput.value);
  const annualInterestRate = Number.parseFloat(annualInterestRateInput.value);

  const hasInvalidInput =
    !Number.isFinite(homeValue) ||
    !Number.isFinite(downPayment) ||
    !Number.isInteger(loanTermYears) ||
    !Number.isFinite(annualInterestRate) ||
    homeValue <= 0 ||
    downPayment < 0 ||
    loanTermYears <= 0 ||
    annualInterestRate < 0 ||
    downPayment >= homeValue;

  if (hasInvalidInput) {
    resetOutputs();
    return;
  }

  const principalLoanAmount = homeValue - downPayment;
  const loanTermMonths = loanTermYears * 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  let monthlyPrincipalInterest;
  if (monthlyInterestRate === 0) {
    monthlyPrincipalInterest = principalLoanAmount / loanTermMonths;
  } else {
    const rateFactor = (1 + monthlyInterestRate) ** loanTermMonths;
    monthlyPrincipalInterest =
      (principalLoanAmount * monthlyInterestRate * rateFactor) / (rateFactor - 1);
  }

  const monthlyPropertyTax = (homeValue * 0.012) / 12;
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax;

  if (
    !Number.isFinite(monthlyPrincipalInterest) ||
    !Number.isFinite(monthlyPropertyTax) ||
    !Number.isFinite(totalMonthlyPayment)
  ) {
    resetOutputs();
    return;
  }

  updateOutputs(
    principalLoanAmount,
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    totalMonthlyPayment,
  );
}

if (mortgageForm) {
  mortgageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateMortgage();
  });
}
