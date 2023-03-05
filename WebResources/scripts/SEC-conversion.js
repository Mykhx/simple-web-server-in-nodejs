const inputEnergy = document.querySelector("#inputEnergyField");
const inputEnergyUnit = document.querySelector("#inputEnergyUnit");

const textValueInEV = document.querySelector("#textValueInEV");
const textValueInNM = document.querySelector("#textValueInNM");
const textValueInCMMO = document.querySelector("#textValueInCMMO");
const textValueInAU = document.querySelector("#textValueInAU");

const outputPrecision = 4;

let energyInEV = 0;
let energyInNM = 0;
let energyInCMMO = 0;
let energyInAU = 0;

function recalculateEnergies() {
    energyInEV = (inputEnergyUnit.value !== "ev") ? getEnergyInEV() : Number(inputEnergy.value);

    energyInNM = (inputEnergyUnit.value !== "nm") ? convertEVToNM() : Number(inputEnergy.value);
    energyInCMMO = (inputEnergyUnit.value !== "cmmo") ? convertEVToCMMO() : Number(inputEnergy.value);
    energyInAU = (inputEnergyUnit.value !== "au") ? convertEVToAU() : Number(inputEnergy.value);

    updateEnergyValues();
}


function updateEnergyValues() {
    textValueInEV.textContent = energyInEV.toPrecision(outputPrecision) + " eV";
    textValueInNM.textContent = energyInNM.toPrecision(outputPrecision) + " nm";
    textValueInCMMO.textContent = energyInCMMO.toPrecision(outputPrecision) + " cm**-1";
    textValueInAU.textContent = energyInAU.toPrecision(outputPrecision) + " Hartree";
}

function getEnergyInEV() {
    console.log("InputEnergyUnit " + inputEnergyUnit.value)
    // TODO Max 2023-01-16 should use same accuracy for all conversions
    switch (inputEnergyUnit.value) {
        case "ev":
            return;
        case "nm":
            return 1240 / inputEnergy.value;
        case "cmmo":
            return inputEnergy.value * 0.000124;
        case "au":
            return inputEnergy.value * 27.211397;
        default:
            throw new Error("Unknown unit for conversion.");
    }
}

function convertEVToNM() {
    return 1240 / energyInEV;
}

function convertEVToCMMO() {
    return energyInEV / 0.000124;
}

function convertEVToAU() {
    return energyInEV / 27.211397;
}

inputEnergy.addEventListener("keypress", recalculateEnergies);
inputEnergyUnit.addEventListener("change", recalculateEnergies);