
const carTypeInput = document.getElementById("carType");
const carAgeInput = document.getElementById("carAge");
const driverAgeInput = document.getElementById("driverAge");
const insuranceForm = document.getElementById("insurance-form");

const estimatedMonthlyPremiumOutput = document.getElementById("estimatedMonthlyPremium");
const estimatedAnnualPremiumOutput = document.getElementById("estimatedAnnualPremium");

const BASE_ANNUAL_PREMIUM = 600;

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function updatePremiumResults(monthlyPremium, annualPremium) {
  estimatedMonthlyPremiumOutput.textContent = formatCurrency(monthlyPremium);
  estimatedAnnualPremiumOutput.textContent = formatCurrency(annualPremium);
}

function resetPremiumResults() {
  updatePremiumResults(0, 0);
}

function calculateInsurancePremium() {
  const carType = carTypeInput ? carTypeInput.value : "";
  const carAge = carAgeInput ? carAgeInput.value : "";
  const driverAge = Number.parseInt(driverAgeInput?.value ?? "", 10);

  if (
    !carType ||
    !carAge ||
    !Number.isInteger(driverAge) ||
    driverAge < 16
  ) {
    resetPremiumResults();
    return;
  }

  let annualPremium = BASE_ANNUAL_PREMIUM;

  if (carType === "suv") {
    annualPremium *= 1.15;
  } else if (carType === "luxury") {
    annualPremium *= 1.3;
  }

  if (carAge === "brand-new") {
    annualPremium *= 1.1;
  } else if (carAge === "5-plus-years") {
    annualPremium *= 0.85;
  }

  if (driverAge < 25) {
    annualPremium *= 1.25;
  } else if (driverAge > 60) {
    annualPremium *= 1.1;
  }

  const monthlyPremium = annualPremium / 12;

  if (!Number.isFinite(monthlyPremium) || !Number.isFinite(annualPremium)) {
    resetPremiumResults();
    return;
  }

  updatePremiumResults(monthlyPremium, annualPremium);
}

if (insuranceForm) {
  insuranceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateInsurancePremium();
  });
}
