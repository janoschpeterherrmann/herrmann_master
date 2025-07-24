function berechneKategorie(button) {
  const section = button.closest("section");
  const gewichtung = parseFloat(section.dataset.kategoriegewicht);
  const table = section.querySelector("table");
  const ergebnisDiv = section.querySelector(".result");
  const funkSpan = ergebnisDiv.querySelector(".funk-wert");
  const drahtSpan = ergebnisDiv.querySelector(".draht-wert");

  let nutzwertFunk = 0;
  let nutzwertDraht = 0;
  let gewichtSumme = 0;
  let fehlerGefunden = false;

  table.querySelectorAll("tbody tr").forEach(row => {
    const [gewichtInput, funkInput, drahtInput] = row.querySelectorAll("input");
    const gewicht = parseFloat(gewichtInput.value);
    const funk = parseFloat(funkInput.value);
    const draht = parseFloat(drahtInput.value);

    funkInput.classList.remove("fehler");
    drahtInput.classList.remove("fehler");

    let funkFehler = isNaN(funk) || funk < 1 || funk > 5;
    let drahtFehler = isNaN(draht) || draht < 1 || draht > 5;

    if (funkFehler) {
      funkInput.classList.add("fehler");
      fehlerGefunden = true;
    }
    if (drahtFehler) {
      drahtInput.classList.add("fehler");
      fehlerGefunden = true;
    }

    if (!funkFehler && !drahtFehler) {
      nutzwertFunk += (gewicht / 100) * funk;
      nutzwertDraht += (gewicht / 100) * draht;
      gewichtSumme += gewicht;
    }
  });

  if (fehlerGefunden) {
    alert("Bitte nur Werte zwischen 1 und 5 eingeben.");
    return;
  }

  nutzwertFunk = Math.round(nutzwertFunk * 100) / 100;
  nutzwertDraht = Math.round(nutzwertDraht * 100) / 100;

  funkSpan.textContent = nutzwertFunk;
  drahtSpan.textContent = nutzwertDraht;

  section.dataset.nutzwertFunk = nutzwertFunk;
  section.dataset.nutzwertDraht = nutzwertDraht;

  berechneGesamtwert();
}

function berechneGesamtwert() {
  let gesamtFunk = 0;
  let gesamtDraht = 0;

  document.querySelectorAll("section").forEach(section => {
    const gewichtung = parseFloat(section.dataset.kategoriegewicht);
    const funk = parseFloat(section.dataset.nutzwertFunk || 0);
    const draht = parseFloat(section.dataset.nutzwertDraht || 0);

    gesamtFunk += (gewichtung / 100) * funk;
    gesamtDraht += (gewichtung / 100) * draht;
  });

  gesamtFunk = Math.round(gesamtFunk * 100) / 100;
  gesamtDraht = Math.round(gesamtDraht * 100) / 100;

  document.getElementById("gesamt-nutzwert").innerHTML =
    `<strong>Gesamt-Nutzwert:</strong><br>Funk: ${gesamtFunk} | Drahtgebunden: ${gesamtDraht}`;
}



