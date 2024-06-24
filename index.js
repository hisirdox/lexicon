function searchDictionary() {
  var word = document.getElementById("word").value.trim();

  $.ajax({
    url: "https://api.dicionario-aberto.net/word/" + encodeURIComponent(word),
    type: "GET",
    dataType: "json",

    success: function(response) {
      if (response.length > 0) {
        var xmlString = response[0].xml;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlString, "text/xml");
        var definition = xmlDoc.getElementsByTagName("def")[0].textContent;
        document.getElementById("response").innerHTML = "<p><strong>Definição:</strong><br><br>" + definition + "</p>";
      } else {
        document.getElementById("response").innerHTML = "<p><em>Palavra não encontrada.</em></p>";
      }
    },
    error: function() {
      document.getElementById("response").innerHTML = "<p><em>Erro ao buscar definição.</em></p>";
    }
  });
}
