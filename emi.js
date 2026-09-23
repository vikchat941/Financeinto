
const principalInput = document.getElementById("principal");
const annualRateInput = document.getElementById("annualRate");
const tenureMonthsInput = document.getElementById("tenureMonths");
const emiForm = document.getElementById("emi-form");

const monthlyEmiValue = document.getElementById("monthlyEmiValue");
const totalInterestValue = document.getElementById("totalInterestValue");
const totalAmountValue = document.getElementById("totalAmountValue");

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function updateResults(monthlyEmi, totalInterest, totalAmount) {
  monthlyEmiValue.textContent = formatCurrency(monthlyEmi);
  totalInterestValue.textContent = formatCurrency(totalInterest);
  totalAmountValue.textContent = formatCurrency(totalAmount);
}

function resetResults() {
  updateResults(0, 0, 0);
}

function calculateEmi() {
  const principal = Number.parseFloat(principalInput.value);
  const annualRate = Number.parseFloat(annualRateInput.value);
  const tenureMonths = Number.parseFloat(tenureMonthsInput.value);

  const hasInvalidInput =
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isInteger(tenureMonths) ||
    principal <= 0 ||
    annualRate < 0 ||
    tenureMonths <= 0;

  if (hasInvalidInput) {
    resetResults();
    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  let monthlyEmi;

  if (monthlyRate === 0) {
    monthlyEmi = principal / tenureMonths;
  } else {
    const rateFactor = (1 + monthlyRate) ** tenureMonths;
    monthlyEmi = (principal * monthlyRate * rateFactor) / (rateFactor - 1);
  }

  const totalAmount = monthlyEmi * tenureMonths;
  const totalInterest = totalAmount - principal;

  if (
    !Number.isFinite(monthlyEmi) ||
    !Number.isFinite(totalInterest) ||
    !Number.isFinite(totalAmount)
  ) {
    resetResults();
    return;
  }

  updateResults(monthlyEmi, totalInterest, totalAmount);
}

if (emiForm) {
  emiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateEmi();
  });
}
