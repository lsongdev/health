import { ready } from 'https://lsong.org/scripts/dom/index.js';

// Utility function to get form values
function getFormValues(formId) {
  const form = document.getElementById(formId);
  return Object.fromEntries(new FormData(form));
}

// Utility function to display results
function displayResult(elementId, result) {
  document.getElementById(elementId).textContent = result;
}

// Utility function to set input value
function setInputValue(elementId, value) {
  document.getElementById(elementId).value = value;
}

// BMI calculation
export function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Body fat percentage calculation (using BMI method for simplicity)
export function calculateBodyFatPercentage(bmi, age, gender) {
  const genderFactor = gender.toLowerCase() === 'male' ? 1 : 0;
  return (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
}

// Blood pressure category
export function getBloodPressureCategory(systolic, diastolic) {
  if (systolic < 120 && diastolic < 80) return "Normal";
  if (systolic < 130 && diastolic < 80) return "Elevated";
  if (systolic < 140 || diastolic < 90) return "High Blood Pressure (Stage 1)";
  if (systolic >= 140 || diastolic >= 90) return "High Blood Pressure (Stage 2)";
  if (systolic > 180 || diastolic > 120) return "Hypertensive Crisis";
  return "Unable to determine";
}

export function calculateBMR(weight, height, age, gender) {
  const genderFactor = gender.toLowerCase() === 'male' ? 5 : -161;
  return (10 * weight) + (6.25 * height) - (5 * age) + genderFactor;
}

// TDEE calculation
export function calculateTDEE(bmr, activityLevel) {
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  return bmr * activityFactors[activityLevel];
}

// WHR calculation
export function calculateWHR(waist, hip) {
  return waist / hip;
}

// Event handlers
export function setupEventListeners() {
  // BMI form
  document.getElementById('bmi').addEventListener('submit', (e) => {
    e.preventDefault();
    const { weight, height } = getFormValues('bmi');
    const bmi = calculateBMI(parseFloat(weight), parseFloat(height));
    displayResult('bmi-result', `Your BMI is ${bmi.toFixed(2)}`);

    // Auto-fill the BMI input in the body fat form
    setInputValue('bmi-input', bmi.toFixed(2));
  });

  // Body fat percentage form
  document.getElementById('body-fat').addEventListener('submit', (e) => {
    e.preventDefault();
    const { bmi, age, gender } = getFormValues('body-fat');
    const bodyFat = calculateBodyFatPercentage(parseFloat(bmi), parseInt(age), gender);
    displayResult('body-fat-result', `Your estimated body fat percentage is ${bodyFat.toFixed(2)}%`);
  });

  // Blood pressure form
  document.getElementById('blood-pressure').addEventListener('submit', (e) => {
    e.preventDefault();
    const { systolic, diastolic } = getFormValues('blood-pressure');
    const category = getBloodPressureCategory(parseInt(systolic), parseInt(diastolic));
    displayResult('blood-pressure-result', `Your blood pressure category: ${category}`);
  });

  // BMR and TDEE form
  document.getElementById('bmr-tdee').addEventListener('submit', (e) => {
    e.preventDefault();
    const { weight, height, age, gender, activityLevel } = getFormValues('bmr-tdee');
    const bmr = calculateBMR(parseFloat(weight), parseFloat(height), parseInt(age), gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    displayResult('bmr-result', `Your Basal Metabolic Rate (BMR) is ${bmr.toFixed(0)} calories/day`);
    displayResult('tdee-result', `Your Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(0)} calories/day`);
  });

  // WHR form
  document.getElementById('whr').addEventListener('submit', (e) => {
    e.preventDefault();
    const { waist, hip } = getFormValues('whr');
    const whr = calculateWHR(parseFloat(waist), parseFloat(hip));
    displayResult('whr-result', `Your Waist-to-Hip Ratio (WHR) is ${whr.toFixed(2)}`);
  });
}

ready(() => {
  setupEventListeners();
});