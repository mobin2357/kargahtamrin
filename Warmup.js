document.addEventListener("DOMContentLoaded", () => {
  const formulaElements = document.querySelectorAll("formula");

  const valid = (number) => {
    return /^[0-9]*\.?[0-9]+$/.test(number);
  }

  formulaElements.forEach((formulaElement) => {
    const evaluator = formulaElement.getAttribute("evaluator");
    // const result = document.getElementById("result");
    const result = formulaElement.querySelector("span");
  
    const inputIds = evaluator.match(/\b\w+\b/g);

    const evaluate = () => {
        let formula = evaluator;
        var isValid = true;
        inputIds.forEach(id => {
            const inputElement = document.getElementById(id);
            const elementValue = parseFloat(inputElement.value);
            if(!valid(inputElement.value) || elementValue < 0){
                result.textContent = `Invalid Formula`;
                isValid = false;
                return;
            }
            formula = formula.replace(new RegExp(`\\b${id}\\b`, "g"), elementValue);
        });

        if(!isValid){return;}
        const resultValue = eval(formula);
        result.textContent = resultValue.toFixed(2);
    };
  
    inputIds.forEach(id => {
      const inputElement = document.getElementById(id);
      if (inputElement) {
        inputElement.addEventListener("input", evaluate);
      }
    });
  });
});
  