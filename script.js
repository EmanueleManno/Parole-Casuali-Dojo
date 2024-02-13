// Recupero il bottone dal DOM:
const generateButton = document.getElementById("btn");
const resetButton = document.getElementById("btn-reset");
const word = document.getElementById("random_word");

generateButton.addEventListener("click", function () {
  // Cerco 'random_word'. Se esiste, restituisce il suo valore in formato stringa. Se non esiste, restituisce null.
  // Con JSON.parse viene presa la stringa in formato JSON e convertita in un oggetto JavaScript:
  let random_word = JSON.parse(localStorage.getItem("random_word")) || [];

  // Viene messo nel GET l'url della chiamata API:
  axios
    .get("https://flynn.boolean.careers/exercises/api/random/word")
    .then(function (response) {
      // Console log di prova per vedere la risposta e se tutto ok:
      console.log(response.data.response);

      // Setto la risposta come parola singola:
      let single_word = response.data.response;

      // Inserisco tale parola nell'array:
      random_word.push(single_word);

      // Salvo la stringa JSON nello storage locale con la chiave 'random_word'.
      // Converto l’array random_word in una stringa di testo in formato JSON:
      localStorage.setItem("random_word", JSON.stringify(random_word));
    })
    .catch(function (error) {
      // Console log per vedere gli errori:
      console.log(error);
    });

  // Trasformazione dell'array in una stringa unica separando con uno spazio:
  let phrase = random_word.join(" ");

  // Viene preso l'elemento con id random_word e con innerHTML ci stampo un valore:
  document.getElementById("random_word").innerHTML = phrase;

  // Console Log finale:
  console.log(random_word);
});

// Bottone che mi svuota il campo dove ci sono scritte le parole:
resetButton.addEventListener("click", function () {
  localStorage.removeItem("random_word");
});
