
const monthlyInvestmentInput = document.getElementById("monthlyInvestment");
const expectedReturnRateInput = document.getElementById("expectedReturnRate");
const timePeriodYearsInput = document.getElementById("timePeriodYears");
const sipForm = document.getElementById("sip-form");

const totalInvestedValue = document.getElementById("totalInvestedValue");
const wealthGainedValue = document.getElementById("wealthGainedValue");
const maturityValueValue = document.getElementById("maturityValueValue");

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function updateResults(totalInvested, wealthGained, maturityValue) {
  totalInvestedValue.textContent = formatCurrency(totalInvested);
  wealthGainedValue.textContent = formatCurrency(wealthGained);
  maturityValueValue.textContent = formatCurrency(maturityValue);
}

function resetResults() {
  updateResults(0, 0, 0);
}

function calculateSip() {
  const monthlyInvestment = Number.parseFloat(monthlyInvestmentInput.value);
  const annualRate = Number.parseFloat(expectedReturnRateInput.value);
  const years = Number.parseFloat(timePeriodYearsInput.value);

  const hasInvalidInput =
    !Number.isFinite(monthlyInvestment) ||
    !Number.isFinite(annualRate) ||
    !Number.isInteger(years) ||
    monthlyInvestment <= 0 ||
    annualRate < 0 ||
    years <= 0;

  if (hasInvalidInput) {
    resetResults();
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;

  let maturityValue;
  if (monthlyRate === 0) {
    maturityValue = totalInvested;
  } else {
    maturityValue =
      monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const wealthGained = maturityValue - totalInvested;

  if (
    !Number.isFinite(maturityValue) ||
    !Number.isFinite(wealthGained) ||
    !Number.isFinite(totalInvested)
  ) {
    resetResults();
    return;
  }

  updateResults(totalInvested, wealthGained, maturityValue);
}

if (sipForm) {
  sipForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateSip();
  });
}
