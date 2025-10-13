'use strict';

let numBuildings;
let numSections;
let numFloors;
let floorHeight;
let population;
let numDevices;
let numApartments;

let Htr;
let Hnijt;

let U;
let Nb0;
let Nb1;
let qb0;
let qb1;

let formulaHtrResult;
let formulaHnijtResult;
let formulaResult1;
let formulaResult2;
let formulaResult3;
let formulaResult4;
let formulaResult5;
let formulaResult6;
let formulaResult7;
let formulaResult8;
let formulaResult9;
let formulaResult10;
let formulaResult11;
let formulaResult12;
let formulaResult13;
let formulaResult14;
let hiddenFormulaCont;
let formulaCont;
let canvasCont;

let sumHtr = document.querySelector('[data-sum-Htr]');

let inputs = document.querySelectorAll('input');
for (let elem = 0; elem < inputs.length; elem++){
    inputs[elem].addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            console.log('Enter pressed on input:', this);

            if (this.hasAttribute('data-num-buildings')) {
                numBuildings = this.value;
                allValue('[data-num-buildings]', numBuildings);
            }

            if (this.hasAttribute('data-num-sections')) {
                numSections = this.value;
                allValue('[data-num-sections]', numSections);
            }

            if (this.hasAttribute('data-num-floors')) {
                numFloors = this.value;
                allValue('[data-num-floors]', numFloors);
            }

            if (this.hasAttribute('data-floor-height')) {
                floorHeight = this.value;
                allValue('[data-floor-height]', floorHeight);
            }

            if (this.hasAttribute('data-population')) {
                population = this.value;
                allValue('[data-population]', population);
            }

            if (this.hasAttribute('data-num-devices')) {
                numDevices = this.value;
                allValue('[data-num-devices]', numDevices);
            }

            if (this.hasAttribute('data-num-apartments')) {
                numApartments = this.value;
                allValue('[data-num-apartments]', numApartments);
            }

            if (numFloors) {
                Htr = 10+4*(numFloors-1);
                formulaHtrResult = `H_тр = 10+4*(${numFloors}-1) = ${Htr} м`;
                hiddenFormulaCont = 'hiddenFormulaHtr';
                formulaCont='formulaHtr';
                canvasCont='canvasHtr';
                calculate(formulaHtrResult, hiddenFormulaCont,formulaCont,canvasCont);

                Hnijt = 2+3*(numFloors-1);
                formulaHnijtResult = `H_ниж.т. = 2+3*(${numFloors}-1) = ${Hnijt} м.вод.столба`;
                hiddenFormulaCont = 'hiddenFormulaHnijt';
                formulaCont='formulaHnijt';
                canvasCont='canvasHnijt';
                calculate(formulaHnijtResult, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (numBuildings && numSections && numFloors && numApartments && population) {
                U = parseFloat(numBuildings) + parseFloat(numSections) + parseFloat(numFloors) + parseFloat(numApartments) + parseFloat(population);
                qb0 = 250*U/1000;
                qb0 = Math.ceil(qb0)
                qb1 = 165*U/1000;
                qb1 = Math.ceil(qb1)
                U = Math.ceil(U)

                let uCalculate = numBuildings + " + " + numSections + " + " + numFloors + " + " + numApartments + " + " + population + " = " + U.toString();
                allValue('[u-calculate]', uCalculate)
                allValue('[u]', U.toString() + " чел")
                allValue('[u-3]', U.toString() + " чел. (количество водопотребителей в жилом доме)")

                let qb0Calculate = "250 * " + U + " /1000" + " = " + qb0.toString();
                allValue('[qb0-calculate]', qb0Calculate)
                let qb1Calculate = "165 * " + U + " /1000" + " = " + qb1.toString();
                allValue('[qb1-calculate]', qb1Calculate)
            }

            if (numSections && numFloors && numDevices && numApartments) {
                Nb0 = parseFloat(numSections) + parseFloat(numFloors) + parseFloat(numDevices) + parseFloat(numApartments);
                Nb0 = Math.ceil(Nb0)
                Nb1 = parseFloat(numSections) + parseFloat(numFloors) + parseFloat(numDevices) + parseFloat(numApartments);
                Nb1 = Math.ceil(Nb1)
                let Nb0Calculate = numSections + " + " + numFloors + " + " + numDevices + " + " + numApartments + " = " + Nb0.toString();
                let Nb1Calculate = numSections + " + " + numFloors + " + " + numDevices + " + " + numApartments + " = " + Nb1.toString();
                allValue('[Nb0-calculate]', Nb0Calculate + " шт")
                allValue('[Nb1-calculate]', Nb1Calculate + " шт")
            }
        }
    });
}

function allValue(item, value) {
    let items = document.querySelectorAll(item);
    for (let i = 0; i < items.length; i++){
        const span = document.createElement('span');
        span.textContent = value;
        items[i].parentElement.append(span);
        items[i].remove();
    }
}

function calculate(formulaResult, hiddenFormulaCont, formulaCont, canvasCont) {
//  var value = document.getElementById('value').value;
    var hiddenFormulaDiv = document.getElementById(hiddenFormulaCont);

    hiddenFormulaDiv.innerHTML = `$$${formulaResult}$$`;
    MathJax.typesetPromise([hiddenFormulaDiv]).then(() => {
        var svg = hiddenFormulaDiv.querySelector('svg');
        var canvas = document.getElementById(canvasCont);
        if (svg) {
            var xml = new XMLSerializer().serializeToString(svg);
            var svg64 = btoa(unescape(encodeURIComponent(xml)));
            var img64 = 'data:image/svg+xml;base64,' + svg64;
            var img = new Image();
            img.onload = function() {
                // Увеличение разрешения и уменьшение размера
                var scaleFactor = 1.2;
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                var ctx = canvas.getContext('2d');
                ctx.scale(scaleFactor, scaleFactor);
                ctx.drawImage(img, 0, 0);
                var png = canvas.toDataURL("image/png");

                var formulaDiv = document.getElementById(formulaCont);
//		var formulaDivT = document.getElementById('testf');
                document.getElementById(formulaCont).innerHTML = '';

                var pngImg = document.createElement('img');
                pngImg.src = png;
                pngImg.style.maxWidth = "80%"; // Ограничение ширины изображения
                formulaDiv.appendChild(pngImg);
                document.getElementById(hiddenFormulaCont).innerHTML = '';
            };
            img.src = img64;

        }
    }).catch(err => console.error(err));
}