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
let Psb0;
let Psb1;
let NP1;
let NP2;
let a1;
let a2;
let qb0s;
let qb1s;
let NP3;
let NP4;
let a3;
let a4;
let Phb0;
let Phb1;
let qb0h;
let qb1h;

let formulaHtrResult;
let formulaHnijtResult;
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
                formulaHtrResult = `H_{\\text{тр}} = 10+4*(${numFloors}-1) = ${Htr} м (1.1)`;
                hiddenFormulaCont = 'hiddenFormulaHtr';
                formulaCont='formulaHtr';
                canvasCont='canvasHtr';
                calculate(formulaHtrResult, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (numFloors && floorHeight) {
                Hnijt = 2+floorHeight*(numFloors-1);
                Hnijt = Number(Hnijt.toFixed(1));
                formulaHnijtResult = `H_{\\text{ниж.т.}} = 2+${floorHeight}*(${numFloors}-1) = ${Hnijt} {\\text{м.вод.столба}}`;
                hiddenFormulaCont = 'hiddenFormulaHnijt';
                formulaCont='formulaHnijt';
                canvasCont='canvasHnijt';
                calculate(formulaHnijtResult, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (numBuildings && numSections && numFloors && numApartments && population) {
                U = parseFloat(numBuildings) * parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numApartments) * parseFloat(population);
                U = Number(U.toFixed(2));
                let uCalculate = numBuildings + " * " + numSections + " * " + numFloors + " * " + numApartments + " * " + population + " = " + U;
                allValue('[u-calculate]', uCalculate)
                U = Math.ceil(U);
                allValue('[u]', U.toString() + " чел")
                allValue('[u-3]', U.toString() + " чел. (количество водопотребителей)")

                qb0 = 180*U/1000;
                qb0 = Number(qb0.toFixed(2)); //to fixed
                qb1 = 110*U/1000;
                qb1 = Number(qb1.toFixed(2)); //to fixed
                let qb0Calculate = "180 * " + U + " /1000" + " = " + qb0;
                allValue('[qb0-calculate]', qb0Calculate);
                let qb1Calculate = "110 * " + U + " /1000" + " = " + qb1;
                allValue('[qb1-calculate]', qb1Calculate);
            }

            if (U && qb0) {
                let formulaQb0Text = `q^{\\text{b0}}_{\\text{сут}} = \\frac{q^{\\text{B0}}_{\\text{сут}} * U}{1000} = \\frac{180 * ${U}}{1000} = ${qb0} \\frac{\\text{м³}}{\\text{сут}}`;
                hiddenFormulaCont = 'hiddenFormulaQb0';
                formulaCont='formulaQb0';
                canvasCont='canvasQb0';
                calculate(formulaQb0Text, hiddenFormulaCont,formulaCont,canvasCont);

                let qB0mh = Number((qb0/24).toFixed(2));
                let formulaQB0mhText = `q^{\\text{B0}}_{\\text{ср час}} = \\frac{${qb0}}{24} = ${qB0mh} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQB0mh';
                formulaCont='formulaQB0mh';
                canvasCont='canvasQB0mh';
                calculate(formulaQB0mhText, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0mhTableElement = document.getElementById('Qb0mh-table');
                if (Qb0mhTableElement) Qb0mhTableElement.textContent = qB0mh.toString();
                allValue('Qb0mh-table', qB0mh);

                const Qb0dTableElement = document.getElementById('Qb0d-table');
                if (Qb0dTableElement) Qb0dTableElement.textContent = qb0;
                allValue('Qb0d-table', qb0);
            }

            if(U && qb1) {
                let formulaQb1Text = `q^{\\text{b1}}_{\\text{сут}} = \\frac{q^{\\text{B1}}_{\\text{сут}} * U}{1000} = \\frac{110 * ${U}}{1000} = ${qb1} \\frac{\\text{м³}}{\\text{сут}}`;
                hiddenFormulaCont = 'hiddenFormulaQb1';
                formulaCont='formulaQb1';
                canvasCont='canvasQb1';
                calculate(formulaQb1Text, hiddenFormulaCont,formulaCont,canvasCont);

                let qB1mh = Number((qb1/24).toFixed(2));
                let formulaQB1mhText = `q^{\\text{B1}}_{\\text{ср час}} = \\frac{${qb1}}{24} = ${qB1mh} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQB1mh';
                formulaCont='formulaQB1mh';
                canvasCont='canvasQB1mh';
                calculate(formulaQB1mhText, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1mhTableElement = document.getElementById('Qb1mh-table');
                if (Qb1mhTableElement) Qb1mhTableElement.textContent = qB1mh.toString();
                allValue('Qb1mh-table', qB1mh);

                const Qb1dTableElement = document.getElementById('Qb1d-table');
                if (Qb1dTableElement) Qb1dTableElement.textContent = qb1;
                allValue('Qb1d-table', qb1);
            }

            if (numSections && numFloors && numDevices && numApartments && numBuildings) {
                Nb0 = parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numDevices) * parseFloat(numApartments) * parseFloat(numBuildings);
                Nb0 = Math.ceil(Nb0)
                Nb1 = parseFloat(numSections) * parseFloat(numFloors) * parseFloat(numDevices) * parseFloat(numApartments) * parseFloat(numBuildings);
                Nb1 = Math.ceil(Nb1)
                let Nb0Calculate = numSections + " * " + numFloors + " * " + numDevices + " * " + numApartments + " * " + numBuildings + " = " + Nb0;
                let Nb1Calculate = numSections + " * " + numFloors + " * " + numDevices + " * " + numApartments + " * " + numBuildings + " = " + Nb1;
                allValue('[Nb0-calculate]', Nb0Calculate + " шт")
                allValue('[Nb1-calculate]', Nb1Calculate + " шт")
            }

            if (U && Nb0) {
                Psb0 = (11.6*U)/(3600*Nb0*0.3);
                Psb0 = Number(Psb0.toFixed(6));
                let Pb0Calculate = "(11.6 * " + U + `)/(3600*${Nb0}*0.3) = ` + Psb0;
                allValue('[Pb0-calculate]', Pb0Calculate);

                let formulaPB0sText = `\\text{1)} P_{\\text{сек}}^{\\text{BO}} = \\frac{11.6 * ${U}}{3600*${Nb0}*0.3} = ${Psb0}`;
                hiddenFormulaCont = 'hiddenFormulaPB0s';
                formulaCont='formulaPB0s';
                canvasCont='canvasPB0s';
                calculate(formulaPB0sText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (U && Nb1) {
                Psb1 = (5.1*U)/(3600*Nb1*0.2);
                Psb1 = Number(Psb1.toFixed(6));
                let Pb1Calculate = "(5.1 * " + U + ")/(3600*${Nb1}*0.2) = " + Psb1;
                allValue('[Pb1-calculate]', Pb1Calculate);

                let formulaPB1sText = `\\text{2)} P_{\\text{сек}}^{\\text{B1}} = \\frac{5.1 * ${U}}{3600*${Nb1}*0.2} = ${Psb1}`;
                hiddenFormulaCont = 'hiddenFormulaPB1s';
                formulaCont='formulaPB1s';
                canvasCont='canvasPB1s';
                calculate(formulaPB1sText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Nb0 && Psb0) {
                //NP0 = Number((Nb0 * Number(Pb0.toFixed(1))).toFixed(3));
                NP1 = Number((Nb0 * Psb0).toFixed(3));
                allValue('[NP0-calculate]', NP1)

                let formulaA1NPText = `\\text{α(N}\\text{P}_с^\\text{B0}\\text{)} = α(${Nb0} * ${Psb0}) = α(${NP1})`;
                hiddenFormulaCont = 'hiddenFormulaA1NP';
                formulaCont='formulaA1NP';
                canvasCont='canvasA1NP';
                calculate(formulaA1NPText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (NP1) {
                let a = findAlphaByNP(NP1);
                a = Number(a.toFixed(3));
                allValue('[a1-calculate]', a);
                qb0s = Number((5*a*0.3).toFixed(4));
                let qb0sCalculate = "5 * " + a + " * 0.3 = " + qb0s + " л/с";
                allValue('[qb0s-calculate]', qb0sCalculate);

                let formulaQsB0Text = `q_{\\text{сек}}^{\\text{B0}} = 5 * ${a} * 0.3 = ${qb0s} \\frac{\\text{л}}{\\text{с}}`;
                hiddenFormulaCont = 'hiddenFormulaQsB0';
                formulaCont='formulaQsB0';
                canvasCont='canvasQsB0';
                calculate(formulaQsB0Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0maxsTableElement = document.getElementById('Qb0maxs-table');
                if (Qb0maxsTableElement) Qb0maxsTableElement.textContent = qb0s;
                allValue('Qb0maxs-table', qb0s);

                const NP1Element = document.getElementById('NP1-result');
                if (NP1Element) NP1Element.textContent = NP1;
            }

            if (Nb1 && Psb1) {
                NP2 = Number((Nb1 * Psb1).toFixed(3));
                allValue('[NP1-calculate]', NP2)

                let formulaA2NPText = `\\text{α(N}\\text{P}_с^\\text{B1}\\text{)} = α(${Nb1} * ${Psb1}) = α(${NP2})`;
                hiddenFormulaCont = 'hiddenFormulaA2NP';
                formulaCont='formulaA2NP';
                canvasCont='canvasA2NP';
                calculate(formulaA2NPText, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (NP2) {
                let a = findAlphaByNP(NP2);
                a = Number(a.toFixed(3));
                allValue('[a2-calculate]', a);
                qb1s = Number((5*a*0.2).toFixed(4));
                let qb1sCalculate = "5 * " + a + " * 0.2 = " + qb1s + " л/с";
                allValue('[qb1s-calculate]', qb1sCalculate);

                let formulaQsB1Text = `q_{\\text{сек}}^{\\text{B1}} = 5 * ${a} * 0.2 = ${qb1s} \\frac{\\text{л}}{\\text{с}}`;
                hiddenFormulaCont = 'hiddenFormulaQsB1';
                formulaCont='formulaQsB1';
                canvasCont='canvasQsB1';
                calculate(formulaQsB1Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1maxsTableElement = document.getElementById('Qb1maxs-table');
                if (Qb1maxsTableElement) Qb1maxsTableElement.textContent = qb1s;
                allValue('Qb1maxs-table', qb1s);

                const NP2Element = document.getElementById('NP2-result');
                if (NP2Element) NP2Element.textContent = NP2;
            }

            if (Psb0) {
                Phb0 = (3600*0.3*Psb0)/300;
                Phb0 = Number(Phb0.toFixed(6));
                let Pb0Calculate = "(3600 * 0.3 * " + Psb0 + ")/300 = " + Phb0;
                allValue('[Phb0-calculate]', Pb0Calculate);

                let formulaPhb0Text = `\\text{1)} P_{\\text{ч}}^{\\text{BO}} = \\frac{3600 * 0.3 * ${Psb0}}{300} = ${Phb0}`;
                hiddenFormulaCont = 'hiddenFormulaPhB0';
                formulaCont='formulaPhB0';
                canvasCont='canvasPhB0';
                calculate(formulaPhb0Text, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Phb0 && Nb0) {
                NP3 = Number((Nb0 * Phb0).toFixed(3));
                allValue('[NP3-calculate]', NP3)

                let formulaA3NPText = `\\text{α(N}\\text{P}_ч^\\text{B0}\\text{)} = α(${Nb0} * ${Phb0}) = α(${NP3})`;
                hiddenFormulaCont = 'hiddenFormulaA3NP';
                formulaCont='formulaA3NP';
                canvasCont='canvasA3NP';
                calculate(formulaA3NPText, hiddenFormulaCont,formulaCont,canvasCont);

                const Phb0Element = document.getElementById('Phb0-result');
                const Nb0Element = document.getElementById('Nb0-result');

                if (Phb0Element) Phb0Element.textContent = Phb0;
                if (Nb0Element) Nb0Element.textContent = Nb0;
            }

            if (NP3) {
                let a = findAlphaByNP(NP3);
                a = Number(a.toFixed(3));
                allValue('[a3-calculate]', a);
                qb0h = Number((0.005*a*300).toFixed(4));
                let qb0hCalculate = "0.005 * " + a + " * 300 = " + qb0h + " м³/час;";//³
                allValue('[qb0h-calculate]', qb0hCalculate);

                let formulaQhB0Text = `q_{\\text{ч}}^{\\text{B0}} = 0.005 * ${a} * 300 = ${qb0h} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQhB0';
                formulaCont='formulaQhB0';
                canvasCont='canvasQhB0';
                calculate(formulaQhB0Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb0maxhTableElement = document.getElementById('Qb0maxh-table');
                if (Qb0maxhTableElement) Qb0maxhTableElement.textContent = qb0h;
                allValue('Qb0maxh-table', qb0h);

                const NP3Element = document.getElementById('NP3-result');
                if (NP3Element) NP3Element.textContent = NP3;
            }

            if (Psb1) {
                Phb1 = (3600*0.2*Psb1)/200;
                Phb1 = Number(Phb1.toFixed(6));
                let Pb1Calculate = "(3600 * 0.2 * " + Psb1 + ")/200 = " + Phb1;
                allValue('[Phb1-calculate]', Pb1Calculate);

                let formulaPhb1Text = `\\text{2)} P_{\\text{ч}}^{\\text{B1}} = \\frac{3600 * 0.2 * ${Psb1}}{200} = ${Phb1}`;
                hiddenFormulaCont = 'hiddenFormulaPhB1';
                formulaCont='formulaPhB1';
                canvasCont='canvasPhB1';
                calculate(formulaPhb1Text, hiddenFormulaCont,formulaCont,canvasCont);
            }

            if (Phb1 && Nb1) {
                NP4 = Number((Nb1 * Phb1).toFixed(3));
                allValue('[NP4-calculate]', NP4)

                let formulaA4NPText = `\\text{α(N}\\text{P}_ч^\\text{B1}\\text{)} = α(${Nb1} * ${Phb1}) = α(${NP4})`;
                hiddenFormulaCont = 'hiddenFormulaA4NP';
                formulaCont='formulaA4NP';
                canvasCont='canvasA4NP';
                calculate(formulaA4NPText, hiddenFormulaCont,formulaCont,canvasCont);

                const Phb0Element = document.getElementById('Phb1-result');
                const Nb0Element = document.getElementById('Nb1-result');

                if (Phb0Element) Phb0Element.textContent = Phb0;
                if (Nb0Element) Nb0Element.textContent = Nb0;
            }

            if (NP4) {
                let a = findAlphaByNP(NP4);
                a = Number(a.toFixed(3));
                allValue('[a4-calculate]', a);
                qb1h = Number((0.005*a*200).toFixed(4));
                let qb1hCalculate = "0.005 * " + a + " * 200 = " + qb1h + " м³/час;";//³
                allValue('[qb1h-calculate]', qb1hCalculate);

                let formulaQhB1Text = `q_{\\text{ч}}^{\\text{B1}} = 0.005 * ${a} * 200 = ${qb1h} \\frac{\\text{м³}}{\\text{час}}`;
                hiddenFormulaCont = 'hiddenFormulaQhB1';
                formulaCont='formulaQhB1';
                canvasCont='canvasQhB1';
                calculate(formulaQhB1Text, hiddenFormulaCont,formulaCont,canvasCont);

                const Qb1maxhTableElement = document.getElementById('Qb1maxh-table');
                if (Qb1maxhTableElement) Qb1maxhTableElement.textContent = qb1h;
                allValue('Qb1maxh-table', qb1h);

                const NP4Element = document.getElementById('NP4-result');
                if (NP4Element) NP4Element.textContent = NP4;
            }
        }
    });
}

let formulaQdText = `q_{\\text{сут}} = \\frac{q_\\text{0 сут} * U}{1000}`;
hiddenFormulaCont = 'hiddenFormulaQd';
formulaCont='formulaQd';
canvasCont='canvasQd';
calculate(formulaQdText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQmhText = `q_{\\text{ср час}} = \\frac{q_\\text{сут}}{T}`;
hiddenFormulaCont = 'hiddenFormulaQmh';
formulaCont='formulaQmh';
canvasCont='canvasQmh';
calculate(formulaQmhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaPhText = `P_{\\text{ч}} = \\frac{P_{\\text{c}} * 3600 * q}{q_{\\text{0ч}}} {\\text{, где}}`;
hiddenFormulaCont = 'hiddenFormulaPh';
formulaCont='formulaPh';
canvasCont='canvasPh';
calculate(formulaPhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQdB0Text = `q_{\\text{сут}}^{\\text{B0}} = 180 \\frac{\\text{л}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaQdB0';
formulaCont='formulaQdB0';
canvasCont='canvasQdB0';
calculate(formulaQdB0Text, hiddenFormulaCont,formulaCont,canvasCont);

let formulaQdB1Text = `q_{\\text{сут}}^{\\text{B1}} = 110 \\frac{\\text{л}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaQdB1';
formulaCont='formulaQdB1';
canvasCont='canvasQdB1';
calculate(formulaQdB1Text, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQdText = `q_{\\text{сут.}} \\text{, } \\frac{\\text{м³}}{\\text{сут}}`;
hiddenFormulaCont = 'hiddenFormulaTableQd';
formulaCont='formulaTableQd';
canvasCont='canvasTableQd';
calculate(formulaTableQdText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmhText = `q_{\\text{ср. час}} \\text{, } \\frac{\\text{м³}}{\\text{час}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmh';
formulaCont='formulaTableQmh';
canvasCont='canvasTableQmh';
calculate(formulaTableQmhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmaxhText = `q_{\\text{max час}} \\text{, } \\frac{\\text{м³}}{\\text{час}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmaxh';
formulaCont='formulaTableQmaxh';
canvasCont='canvasTableQmaxh';
calculate(formulaTableQmaxhText, hiddenFormulaCont,formulaCont,canvasCont);

let formulaTableQmaxsText = `q_{\\text{max сек.}} \\text{, } \\frac{\\text{л}}{\\text{сек}}`;
hiddenFormulaCont = 'hiddenFormulaTableQmaxs';
formulaCont='formulaTableQmaxs';
canvasCont='canvasTableQmaxs';
calculate(formulaTableQmaxsText, hiddenFormulaCont,formulaCont,canvasCont);

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
                var scaleFactor = 1.1;
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


function findAlphaByNP(npValue) {
    if (npValue < 0.015) {
        return 0.200;
    }
    if (npValue >= 0.015 && npValue < 0.200) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 0.20 && npValue < 2.00) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 2.0 && npValue < 50.0) {
        return interpolation(npValue, 3);
    }
    if (npValue >= 50.0 && npValue <= 755.0) {
        return interpolation(npValue, 2);
    }

    function interpolation(x, num) {
        for (let i = 0; i < npToAlphaTable.length - 1; i++) {
            const x1 = npToAlphaTable[i].np;
            const x2 = npToAlphaTable[i + 1].np;
            const y1 = npToAlphaTable[i].alpha;
            const y2 = npToAlphaTable[i + 1].alpha;

            if (x >= x1 && x <= x2) {
                return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
            }
        }
    }
}

const npToAlphaTable = [
    // Первая часть (0.000 - 0.050)
    { np: 0.000, alpha: 0.200 }, // Менее 0,015
    { np: 0.015, alpha: 0.202 }, { np: 0.016, alpha: 0.205 }, { np: 0.017, alpha: 0.207 },
    { np: 0.018, alpha: 0.210 }, { np: 0.019, alpha: 0.212 }, { np: 0.020, alpha: 0.215 },
    { np: 0.021, alpha: 0.217 }, { np: 0.022, alpha: 0.219 }, { np: 0.023, alpha: 0.222 },
    { np: 0.024, alpha: 0.224 }, { np: 0.025, alpha: 0.226 }, { np: 0.026, alpha: 0.228 },
    { np: 0.027, alpha: 0.230 }, { np: 0.028, alpha: 0.233 }, { np: 0.029, alpha: 0.235 },
    { np: 0.030, alpha: 0.237 }, { np: 0.031, alpha: 0.239 }, { np: 0.032, alpha: 0.241 },
    { np: 0.033, alpha: 0.243 }, { np: 0.034, alpha: 0.245 }, { np: 0.035, alpha: 0.247 },
    { np: 0.036, alpha: 0.249 }, { np: 0.037, alpha: 0.250 }, { np: 0.038, alpha: 0.252 },
    { np: 0.039, alpha: 0.254 }, { np: 0.040, alpha: 0.256 }, { np: 0.041, alpha: 0.258 },
    { np: 0.042, alpha: 0.259 }, { np: 0.043, alpha: 0.261 }, { np: 0.044, alpha: 0.263 },
    { np: 0.045, alpha: 0.265 }, { np: 0.046, alpha: 0.266 }, { np: 0.047, alpha: 0.268 },
    { np: 0.048, alpha: 0.270 }, { np: 0.049, alpha: 0.271 }, { np: 0.050, alpha: 0.273 },

    // Вторая часть (0.052 - 1.60)
    { np: 0.052, alpha: 0.276 }, { np: 0.054, alpha: 0.280 }, { np: 0.056, alpha: 0.283 },
    { np: 0.058, alpha: 0.286 }, { np: 0.060, alpha: 0.289 }, { np: 0.062, alpha: 0.292 },
    { np: 0.064, alpha: 0.295 }, { np: 0.065, alpha: 0.298 }, { np: 0.068, alpha: 0.301 },
    { np: 0.070, alpha: 0.304 }, { np: 0.072, alpha: 0.307 }, { np: 0.074, alpha: 0.309 },
    { np: 0.076, alpha: 0.312 }, { np: 0.078, alpha: 0.315 }, { np: 0.080, alpha: 0.318 },
    { np: 0.082, alpha: 0.320 }, { np: 0.084, alpha: 0.323 }, { np: 0.086, alpha: 0.326 },
    { np: 0.088, alpha: 0.328 }, { np: 0.090, alpha: 0.331 }, { np: 0.092, alpha: 0.333 },
    { np: 0.094, alpha: 0.336 }, { np: 0.096, alpha: 0.338 }, { np: 0.098, alpha: 0.341 },
    { np: 0.100, alpha: 0.343 }, { np: 0.105, alpha: 0.349 }, { np: 0.110, alpha: 0.355 },
    { np: 0.115, alpha: 0.361 }, { np: 0.120, alpha: 0.367 }, { np: 0.125, alpha: 0.373 },
    { np: 0.130, alpha: 0.378 }, { np: 0.135, alpha: 0.384 }, { np: 0.140, alpha: 0.389 },
    { np: 0.145, alpha: 0.394 }, { np: 0.150, alpha: 0.399 }, { np: 0.155, alpha: 0.405 },
    { np: 0.160, alpha: 0.410 }, { np: 0.165, alpha: 0.415 }, { np: 0.170, alpha: 0.420 },
    { np: 0.175, alpha: 0.425 }, { np: 0.180, alpha: 0.430 }, { np: 0.185, alpha: 0.435 },
    { np: 0.190, alpha: 0.439 }, { np: 0.195, alpha: 0.444 }, { np: 0.200, alpha: 0.449 },
    { np: 0.210, alpha: 0.458 }, { np: 0.220, alpha: 0.467 }, { np: 0.230, alpha: 0.476 },
    { np: 0.240, alpha: 0.485 }, { np: 0.250, alpha: 0.493 }, { np: 0.260, alpha: 0.502 },
    { np: 0.270, alpha: 0.510 }, { np: 0.280, alpha: 0.518 }, { np: 0.290, alpha: 0.526 },
    { np: 0.300, alpha: 0.534 }, { np: 0.310, alpha: 0.542 }, { np: 0.320, alpha: 0.550 },
    { np: 0.330, alpha: 0.558 }, { np: 0.340, alpha: 0.565 }, { np: 0.350, alpha: 0.573 },
    { np: 0.360, alpha: 0.580 }, { np: 0.370, alpha: 0.588 }, { np: 0.380, alpha: 0.595 },
    { np: 0.390, alpha: 0.602 }, { np: 0.400, alpha: 0.610 }, { np: 0.410, alpha: 0.617 },
    { np: 0.420, alpha: 0.624 }, { np: 0.430, alpha: 0.631 }, { np: 0.440, alpha: 0.638 },
    { np: 0.450, alpha: 0.645 }, { np: 0.460, alpha: 0.652 }, { np: 0.470, alpha: 0.658 },
    { np: 0.480, alpha: 0.665 }, { np: 0.490, alpha: 0.672 }, { np: 0.500, alpha: 0.678 },
    { np: 0.520, alpha: 0.692 }, { np: 0.540, alpha: 0.704 }, { np: 0.560, alpha: 0.717 },
    { np: 0.580, alpha: 0.730 }, { np: 0.600, alpha: 0.742 }, { np: 0.620, alpha: 0.755 },
    { np: 0.640, alpha: 0.767 }, { np: 0.660, alpha: 0.779 }, { np: 0.680, alpha: 0.791 },
    { np: 0.700, alpha: 0.803 }, { np: 0.720, alpha: 0.815 }, { np: 0.740, alpha: 0.826 },
    { np: 0.760, alpha: 0.838 }, { np: 0.780, alpha: 0.849 }, { np: 0.800, alpha: 0.860 },
    { np: 0.820, alpha: 0.872 }, { np: 0.840, alpha: 0.883 }, { np: 0.860, alpha: 0.894 },
    { np: 0.880, alpha: 0.905 }, { np: 0.900, alpha: 0.916 }, { np: 0.920, alpha: 0.927 },
    { np: 0.940, alpha: 0.937 }, { np: 0.960, alpha: 0.948 }, { np: 0.980, alpha: 0.959 },
    { np: 1.000, alpha: 0.969 }, { np: 1.050, alpha: 0.995 }, { np: 1.100, alpha: 1.021 },
    { np: 1.150, alpha: 1.046 }, { np: 1.200, alpha: 1.071 }, { np: 1.250, alpha: 1.096 },
    { np: 1.300, alpha: 1.120 }, { np: 1.350, alpha: 1.144 }, { np: 1.400, alpha: 1.168 },
    { np: 1.450, alpha: 1.191 }, { np: 1.500, alpha: 1.215 }, { np: 1.550, alpha: 1.238 },
    { np: 1.600, alpha: 1.261 },

    // Третья часть (1.65 - 8.6)
    { np: 1.650, alpha: 1.283 }, { np: 1.700, alpha: 1.306 }, { np: 1.750, alpha: 1.328 },
    { np: 1.800, alpha: 1.350 }, { np: 1.850, alpha: 1.372 }, { np: 1.900, alpha: 1.394 },
    { np: 1.950, alpha: 1.416 }, { np: 2.000, alpha: 1.437 }, { np: 2.100, alpha: 1.479 },
    { np: 2.200, alpha: 1.521 }, { np: 2.300, alpha: 1.563 }, { np: 2.400, alpha: 1.604 },
    { np: 2.500, alpha: 1.644 }, { np: 2.600, alpha: 1.684 }, { np: 2.700, alpha: 1.724 },
    { np: 2.800, alpha: 1.763 }, { np: 2.900, alpha: 1.802 }, { np: 3.000, alpha: 1.840 },
    { np: 3.100, alpha: 1.879 }, { np: 3.200, alpha: 1.917 }, { np: 3.300, alpha: 1.954 },
    { np: 3.400, alpha: 1.991 }, { np: 3.500, alpha: 2.029 }, { np: 3.600, alpha: 2.065 },
    { np: 3.700, alpha: 2.102 }, { np: 3.800, alpha: 2.138 }, { np: 3.900, alpha: 2.174 },
    { np: 4.000, alpha: 2.210 }, { np: 4.100, alpha: 2.246 }, { np: 4.200, alpha: 2.281 },
    { np: 4.300, alpha: 2.317 }, { np: 4.400, alpha: 2.352 }, { np: 4.500, alpha: 2.386 },
    { np: 4.600, alpha: 2.421 }, { np: 4.700, alpha: 2.456 }, { np: 4.800, alpha: 2.490 },
    { np: 4.900, alpha: 2.524 }, { np: 5.000, alpha: 2.558 }, { np: 5.100, alpha: 2.592 },
    { np: 5.200, alpha: 2.626 }, { np: 5.300, alpha: 2.660 }, { np: 5.400, alpha: 2.693 },
    { np: 5.500, alpha: 2.726 }, { np: 5.600, alpha: 2.760 }, { np: 5.700, alpha: 2.793 },
    { np: 5.800, alpha: 2.826 }, { np: 5.900, alpha: 2.858 }, { np: 6.000, alpha: 2.891 },
    { np: 6.100, alpha: 2.924 }, { np: 6.200, alpha: 2.956 }, { np: 6.300, alpha: 2.989 },
    { np: 6.400, alpha: 3.021 }, { np: 6.500, alpha: 3.053 }, { np: 6.600, alpha: 3.085 },
    { np: 6.700, alpha: 3.117 }, { np: 6.800, alpha: 3.149 }, { np: 6.900, alpha: 3.181 },
    { np: 7.000, alpha: 3.212 }, { np: 7.100, alpha: 3.244 }, { np: 7.200, alpha: 3.275 },
    { np: 7.300, alpha: 3.307 }, { np: 7.400, alpha: 3.338 }, { np: 7.500, alpha: 3.369 },
    { np: 7.600, alpha: 3.400 }, { np: 7.700, alpha: 3.431 }, { np: 7.800, alpha: 3.462 },
    { np: 7.900, alpha: 3.493 }, { np: 8.000, alpha: 3.524 }, { np: 8.100, alpha: 3.555 },
    { np: 8.200, alpha: 3.585 }, { np: 8.300, alpha: 3.616 }, { np: 8.400, alpha: 3.646 },
    { np: 8.500, alpha: 3.677 }, { np: 8.600, alpha: 3.707 },

    // Четвертая часть (8.7 - 80)
    { np: 8.700, alpha: 3.738 }, { np: 8.800, alpha: 3.768 }, { np: 8.900, alpha: 3.798 },
    { np: 9.000, alpha: 3.828 }, { np: 9.100, alpha: 3.858 }, { np: 9.200, alpha: 3.888 },
    { np: 9.300, alpha: 3.918 }, { np: 9.400, alpha: 3.948 }, { np: 9.500, alpha: 3.978 },
    { np: 9.600, alpha: 4.008 }, { np: 9.700, alpha: 4.037 }, { np: 9.800, alpha: 4.067 },
    { np: 9.900, alpha: 4.097 }, { np: 10.000, alpha: 4.126 }, { np: 10.200, alpha: 4.185 },
    { np: 10.400, alpha: 4.244 }, { np: 10.600, alpha: 4.302 }, { np: 10.800, alpha: 4.361 },
    { np: 11.000, alpha: 4.419 }, { np: 11.200, alpha: 4.477 }, { np: 11.400, alpha: 4.534 },
    { np: 11.600, alpha: 4.592 }, { np: 11.800, alpha: 4.649 }, { np: 12.000, alpha: 4.707 },
    { np: 12.200, alpha: 4.764 }, { np: 12.400, alpha: 4.820 }, { np: 12.600, alpha: 4.877 },
    { np: 12.800, alpha: 4.934 }, { np: 13.000, alpha: 4.990 }, { np: 13.200, alpha: 5.047 },
    { np: 13.400, alpha: 5.103 }, { np: 13.600, alpha: 5.159 }, { np: 13.800, alpha: 5.215 },
    { np: 14.000, alpha: 5.270 }, { np: 14.200, alpha: 5.326 }, { np: 14.400, alpha: 5.382 },
    { np: 14.600, alpha: 5.437 }, { np: 14.800, alpha: 5.492 }, { np: 15.000, alpha: 5.547 },
    { np: 15.200, alpha: 5.602 }, { np: 15.400, alpha: 5.657 }, { np: 15.600, alpha: 5.712 },
    { np: 15.800, alpha: 5.767 }, { np: 16.000, alpha: 5.821 }, { np: 16.200, alpha: 5.876 },
    { np: 16.400, alpha: 5.930 }, { np: 16.600, alpha: 5.984 }, { np: 16.800, alpha: 6.039 },
    { np: 17.000, alpha: 6.093 }, { np: 17.200, alpha: 6.147 }, { np: 17.400, alpha: 6.201 },
    { np: 17.600, alpha: 6.254 }, { np: 17.800, alpha: 6.308 }, { np: 18.000, alpha: 6.362 },
    { np: 18.200, alpha: 6.415 }, { np: 18.400, alpha: 6.469 }, { np: 18.600, alpha: 6.522 },
    { np: 18.800, alpha: 6.575 }, { np: 19.000, alpha: 6.629 }, { np: 19.200, alpha: 6.682 },
    { np: 19.400, alpha: 6.734 }, { np: 19.600, alpha: 6.788 }, { np: 19.800, alpha: 6.840 },
    { np: 20.000, alpha: 6.893 }, { np: 21.000, alpha: 7.156 }, { np: 21.500, alpha: 7.287 },
    { np: 22.000, alpha: 7.417 }, { np: 22.500, alpha: 7.547 }, { np: 23.000, alpha: 7.677 },
    { np: 23.500, alpha: 7.806 }, { np: 24.000, alpha: 7.935 }, { np: 24.500, alpha: 8.064 },
    { np: 25.000, alpha: 8.192 }, { np: 25.500, alpha: 8.320 }, { np: 26.000, alpha: 8.447 },
    { np: 26.500, alpha: 8.575 }, { np: 27.000, alpha: 8.701 }, { np: 27.500, alpha: 8.828 },
    { np: 28.000, alpha: 8.955 }, { np: 28.500, alpha: 9.081 }, { np: 29.000, alpha: 9.207 },
    { np: 29.500, alpha: 9.332 }, { np: 30.000, alpha: 9.457 }, { np: 30.500, alpha: 9.583 },
    { np: 31.000, alpha: 9.707 }, { np: 31.500, alpha: 9.832 }, { np: 32.000, alpha: 9.957 },
    { np: 32.500, alpha: 10.08 }, { np: 33.000, alpha: 10.20 }, { np: 33.500, alpha: 10.33 },
    { np: 34.000, alpha: 10.45 }, { np: 34.500, alpha: 10.58 }, { np: 35.000, alpha: 10.70 },
    { np: 35.500, alpha: 10.82 }, { np: 36.000, alpha: 10.94 }, { np: 36.500, alpha: 11.07 },
    { np: 37.500, alpha: 11.31 }, { np: 38.000, alpha: 11.43 }, { np: 38.500, alpha: 11.56 },
    { np: 39.000, alpha: 11.68 }, { np: 39.500, alpha: 11.80 }, { np: 40.000, alpha: 11.92 },
    { np: 40.500, alpha: 12.04 }, { np: 41.000, alpha: 12.16 }, { np: 41.500, alpha: 12.28 },
    { np: 42.000, alpha: 12.41 }, { np: 42.500, alpha: 12.53 }, { np: 43.000, alpha: 12.65 },
    { np: 43.500, alpha: 12.77 }, { np: 44.000, alpha: 12.89 }, { np: 44.500, alpha: 13.01 },
    { np: 45.000, alpha: 13.13 }, { np: 45.500, alpha: 13.25 }, { np: 46.000, alpha: 13.37 },
    { np: 46.500, alpha: 13.49 }, { np: 47.000, alpha: 13.61 }, { np: 47.500, alpha: 13.73 },
    { np: 48.000, alpha: 13.85 }, { np: 48.500, alpha: 13.97 }, { np: 49.000, alpha: 14.09 },
    { np: 49.500, alpha: 14.20 }, { np: 50.000, alpha: 14.32 }, { np: 51.000, alpha: 14.56 },
    { np: 52.000, alpha: 14.80 }, { np: 53.000, alpha: 15.04 }, { np: 54.000, alpha: 15.27 },
    { np: 55.000, alpha: 15.51 }, { np: 56.000, alpha: 15.74 }, { np: 57.000, alpha: 15.98 },
    { np: 58.000, alpha: 16.22 }, { np: 59.000, alpha: 16.45 }, { np: 60.000, alpha: 16.69 },
    { np: 61.000, alpha: 16.92 }, { np: 62.000, alpha: 17.15 }, { np: 63.000, alpha: 17.39 },
    { np: 64.000, alpha: 17.62 }, { np: 65.000, alpha: 17.85 }, { np: 66.000, alpha: 18.09 },
    { np: 67.000, alpha: 18.32 }, { np: 68.000, alpha: 18.55 }, { np: 69.000, alpha: 18.79 },
    { np: 70.000, alpha: 19.02 }, { np: 71.000, alpha: 19.25 }, { np: 72.000, alpha: 19.48 },
    { np: 73.000, alpha: 19.71 }, { np: 74.000, alpha: 19.94 }, { np: 75.000, alpha: 20.18 },
    { np: 76.000, alpha: 20.41 }, { np: 77.000, alpha: 20.64 }, { np: 78.000, alpha: 20.87 },
    { np: 79.000, alpha: 21.10 }, { np: 80.000, alpha: 21.33 },

    // Пятая часть (81 - 755)
    { np: 81.000, alpha: 21.56 }, { np: 82.000, alpha: 21.69 }, { np: 83.000, alpha: 22.02 },
    { np: 85.000, alpha: 22.48 }, { np: 86.000, alpha: 22.71 }, { np: 87.000, alpha: 22.94 },
    { np: 88.000, alpha: 23.17 }, { np: 89.000, alpha: 23.39 }, { np: 90.000, alpha: 23.62 },
    { np: 91.000, alpha: 23.85 }, { np: 92.000, alpha: 24.08 }, { np: 93.000, alpha: 24.31 },
    { np: 94.000, alpha: 24.54 }, { np: 95.000, alpha: 24.77 }, { np: 96.000, alpha: 24.99 },
    { np: 97.000, alpha: 25.22 }, { np: 98.000, alpha: 25.45 }, { np: 99.000, alpha: 25.68 },
    { np: 100.000, alpha: 25.91 }, { np: 102.000, alpha: 26.36 }, { np: 104.000, alpha: 26.82 },
    { np: 106.000, alpha: 27.27 }, { np: 108.000, alpha: 27.72 }, { np: 110.000, alpha: 28.18 },
    { np: 112.000, alpha: 28.63 }, { np: 114.000, alpha: 29.09 }, { np: 116.000, alpha: 29.54 },
    { np: 138.000, alpha: 34.51 }, { np: 140.000, alpha: 34.96 }, { np: 142.000, alpha: 35.41 },
    { np: 144.000, alpha: 35.86 }, { np: 146.000, alpha: 36.31 }, { np: 148.000, alpha: 36.76 },
    { np: 150.000, alpha: 37.21 }, { np: 152.000, alpha: 37.66 }, { np: 154.000, alpha: 38.11 },
    { np: 158.000, alpha: 39.01 }, { np: 160.000, alpha: 39.46 }, { np: 162.000, alpha: 39.91 },
    { np: 164.000, alpha: 40.35 }, { np: 166.000, alpha: 40.80 }, { np: 168.000, alpha: 41.25 },
    { np: 170.000, alpha: 41.70 }, { np: 172.000, alpha: 42.15 }, { np: 174.000, alpha: 42.60 },
    { np: 176.000, alpha: 43.05 }, { np: 178.000, alpha: 43.50 }, { np: 180.000, alpha: 43.95 },
    { np: 182.000, alpha: 44.40 }, { np: 184.000, alpha: 44.84 }, { np: 186.000, alpha: 45.29 },
    { np: 188.000, alpha: 45.74 }, { np: 190.000, alpha: 46.19 }, { np: 192.000, alpha: 46.64 },
    { np: 235.000, alpha: 56.10 }, { np: 240.000, alpha: 57.19 }, { np: 245.000, alpha: 58.29 },
    { np: 250.000, alpha: 59.38 }, { np: 255.000, alpha: 60.48 }, { np: 260.000, alpha: 61.57 },
    { np: 265.000, alpha: 62.66 }, { np: 270.000, alpha: 63.75 }, { np: 275.000, alpha: 64.85 },
    { np: 280.000, alpha: 65.94 }, { np: 285.000, alpha: 67.03 }, { np: 290.000, alpha: 68.12 },
    { np: 295.000, alpha: 69.20 }, { np: 300.000, alpha: 70.29 }, { np: 305.000, alpha: 71.38 },
    { np: 315.000, alpha: 73.55 }, { np: 320.000, alpha: 74.63 }, { np: 325.000, alpha: 75.72 },
    { np: 330.000, alpha: 76.80 }, { np: 335.000, alpha: 77.88 }, { np: 340.000, alpha: 78.96 },
    { np: 345.000, alpha: 80.04 }, { np: 350.000, alpha: 81.12 }, { np: 355.000, alpha: 82.20 },
    { np: 360.000, alpha: 83.28 }, { np: 365.000, alpha: 84.36 }, { np: 370.000, alpha: 85.44 },
    { np: 425.000, alpha: 97.27 }, { np: 430.000, alpha: 98.34 }, { np: 435.000, alpha: 99.41 },
    { np: 440.000, alpha: 100.49 }, { np: 445.000, alpha: 101.56 }, { np: 450.000, alpha: 102.63 },
    { np: 455.000, alpha: 103.70 }, { np: 460.000, alpha: 104.77 }, { np: 465.000, alpha: 105.84 },
    { np: 470.000, alpha: 106.91 }, { np: 475.000, alpha: 107.98 }, { np: 480.000, alpha: 109.05 },
    { np: 485.000, alpha: 110.11 }, { np: 490.000, alpha: 111.18 }, { np: 495.000, alpha: 112.25 },
    { np: 500.000, alpha: 113.32 }, { np: 505.000, alpha: 114.38 }, { np: 510.000, alpha: 115.45 },
    { np: 515.000, alpha: 116.52 }, { np: 520.000, alpha: 117.58 }, { np: 525.000, alpha: 118.65 },
    { np: 535.000, alpha: 120.78 }, { np: 540.000, alpha: 121.84 }, { np: 545.000, alpha: 122.91 },
    { np: 550.000, alpha: 123.97 }, { np: 555.000, alpha: 125.04 }, { np: 560.000, alpha: 126.10 },
    { np: 615.000, alpha: 137.78 }, { np: 620.000, alpha: 138.84 }, { np: 625.000, alpha: 139.90 },
    { np: 630.000, alpha: 140.96 }, { np: 635.000, alpha: 142.02 }, { np: 640.000, alpha: 143.08 },
    { np: 645.000, alpha: 144.14 }, { np: 650.000, alpha: 145.20 }, { np: 655.000, alpha: 146.25 },
    { np: 660.000, alpha: 147.31 }, { np: 665.000, alpha: 148.37 }, { np: 670.000, alpha: 149.43 },
    { np: 675.000, alpha: 150.49 }, { np: 685.000, alpha: 152.60 }, { np: 690.000, alpha: 153.66 },
    { np: 695.000, alpha: 154.72 }, { np: 700.000, alpha: 155.77 }, { np: 705.000, alpha: 156.83 },
    { np: 710.000, alpha: 157.89 }, { np: 715.000, alpha: 158.94 }, { np: 720.000, alpha: 160.00 },
    { np: 725.000, alpha: 161.06 }, { np: 730.000, alpha: 162.11 }, { np: 735.000, alpha: 163.17 },
    { np: 740.000, alpha: 164.22 }, { np: 745.000, alpha: 165.28 }, { np: 755.000, alpha: 167.39 }
];

// for (let i = 0.000; i <= 0.195; i += 0.001) {
//     let id = Number(i.toFixed(3));
//     console.log(id, findAlphaByNP(id));
// }
// for (let i = 0; i <= 755; i += 1) {
//     let id = Number(i.toFixed(3));
//     console.log(id, findAlphaByNP(id));
// }