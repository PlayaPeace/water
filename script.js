'use strict';

let numBuildings;
let numSections;
let numFloors;
let floorHeight;
let population;
let numDevices;

let Htr;
let Hnt;

let formulaHtrResult;
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

            if (this.hasAttribute('data-num-floors')) {
                numFloors = this.value;
                //allValue('[data-num-floors]', numFloors);
            }
            if (numFloors) {
                Htr = 10+4*(numFloors-1);
                formulaHtrResult = `H_тр = 10+4*(${numFloors}-1) = ${Htr} м`;
                hiddenFormulaCont = 'hiddenFormulaHtr';
                formulaCont='formulaHtr';
                canvasCont='canvasHtr';
                calculate(formulaHtrResult, hiddenFormulaCont,formulaCont,canvasCont);
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