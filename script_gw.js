const grenzen = {
  frequenz: { min: 100, max: 6000 },
  datenrate: { min: 0.1, max: 100 },
  reichweite: { min: 1, max: 1000 },
  latenz: { min: 0, max: 100 },
  verfügbarkeit: { min: 90, max: 100 },
  störanfälligkeit: { min: 1, max: 5 }
};

document.getElementById("pruefenBtn").addEventListener("click", () => {
  let alleGueltig = true;
  let resultDiv = document.getElementById("result");

  Object.keys(grenzen).forEach(id => {
    const input = document.getElementById(id);
    const value = parseFloat(input.value);
    const { min, max } = grenzen[id];

    if (isNaN(value) || value < min || value > max) {
      input.classList.remove("valid");
      input.classList.add("invalid");
      alleGueltig = false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
  });

  if (alleGueltig) {
    resultDiv.textContent = "✅ Eingabe lässt Funkanwendung i.d.R. zu.";
    resultDiv.style.color = "green";
    document.getElementById("weiterBtn").disabled = false;
  } else {
    resultDiv.textContent = "❌ Nicht für Funk-Technologie geeignet.";
    resultDiv.style.color = "red";
    document.getElementById("weiterBtn").disabled = true;
  }
});
