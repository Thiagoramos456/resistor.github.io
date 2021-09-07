function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000) + 'k';
  }else if(num > 1000000){
      return (num/1000000)+ 'm';
  }else if(num < 999){
      return num.toFixed(1).replace('.0', ''); 
  }
}

const resultDisplay = document.getElementById('result-display');
const calcButton = document.getElementById('calc-btn');

const transistorColors = [
  {color: {value: 'black', stripNumber: 0, multiplier: 1 }},
  {color: {value: 'brown', stripNumber: 1, multiplier: 10, tolerance: 1 }},
  {color: {value: 'red', stripNumber: 2, multiplier: 100, tolerance: 2 }},
  {color: {value: 'orange', stripNumber: 3, multiplier: 1000 }},
  {color: {value: 'yellow', stripNumber: 4, multiplier: 10000 }},
  {color: {value: 'green', stripNumber: 5, multiplier: 100000, tolerance: 5 }},
  {color: {value: 'blue', stripNumber: 6, multiplier: 1000000, tolerance: 25 }},
  {color: {value:'purple', stripNumber: 7, multiplier: 10000000, tolerance: 1 }},
  {color: {value: 'gray', stripNumber: 8, tolerance: 0.5 }},
  {color: {value: 'white', stripNumber: 9 }},
  {color: {value:'goldenrod', multiplier: 0.1, tolerance: 5 }},
  {color: {value: 'silver', multiplier: 0.01, tolerance: 10 }},
];

let precisionType = false;

const strips = {
  firstStrip: document.getElementById('first-strip'),
  secondStrip: document.getElementById('second-strip'),
  thirdStrip: document.getElementById('third-strip'),
  fourthStrip: document.getElementById('fourth-strip'),
  fiftStrip: document.getElementById('fift-strip'),
};

const calcResistance = () => {
  let multiplier;
  const firstValue =
    transistorColors.find((object) => object.color.value === strips.firstStrip.style.backgroundColor).color.stripNumber;
  const secondValue =
    transistorColors.find((object) => object.color.value === strips.secondStrip.style.backgroundColor).color.stripNumber;

  const tolerance = 
    transistorColors.find((object) => object.color.value === strips.fiftStrip.style.backgroundColor).color.tolerance;

  let result = `${firstValue}${secondValue}`;
  console.log(result)

  if (precisionType) {
    thirdValue =
      transistorColors.find((object) => object.color.value === strips.thirdStrip.style.backgroundColor).color.stripNumber;
    multiplier =
      transistorColors.find((object) => object.color.value === strips.fourthStrip.style.backgroundColor).color.multiplier;
    result += thirdValue;
    result *= multiplier;
  }

  else {
    multiplier =
      transistorColors.find((object) => object.color.value === strips.thirdStrip.style.backgroundColor).color.multiplier;
    result *= multiplier;
    console.log(result);
  }

  resultDisplay.innerHTML = `<p>${numFormatter(result)}Ω<p> <p>+/- ${tolerance}%<p>`;
};

calcButton.addEventListener('click', calcResistance);

$('.number').colorPick({
  allowRecent: false,
  allowCustomColor: false,
  palette: Object.values(transistorColors.filter((object) => object.color.stripNumber !== undefined)).map((object) => object.color.value),
});

$('.multiplier').colorPick({
  allowRecent: false,
  allowCustomColor: false,
  palette: Object.values(transistorColors.filter((object) => object.color.multiplier)).map((object) => object.color.value),
});

$('.tolerance').colorPick({
  allowRecent: false,
  allowCustomColor: false,
  palette: Object.values(transistorColors.filter((object) => object.color.tolerance)).map((object) => object.color.value),
});