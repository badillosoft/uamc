window.onload = function (argument) {
  var txt_search = document.getElementById('txt-search');

  txt_search.onkeydown = function (e) {
    if (e.keyCode == 13) {
      search(txt_search.value);
    }
  }
};

function search(q) {
  if (!q) {
    q = document.getElementById('txt-search').value;
  }

  window.location.replace('/aulas/search?q=' + q);
}
