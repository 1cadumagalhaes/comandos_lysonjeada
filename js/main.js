function xhrSuccess() { this.callback.apply(this, this.arguments); }

function xhrError() { console.error(this.statusText); }

function loadFile(sURL, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.arguments = Array.prototype.slice.call(arguments, 2);
  oReq.onload = xhrSuccess;
  oReq.onerror = xhrError;
  oReq.open("get", sURL, true);
  oReq.send(null);

}

function createRow(comando, descricao) {
  var item = document.createElement("tr");
  item.innerHTML = `
  <td>
    <p class="comando">
      ${comando}
    </p>
  </td>
  <td class="descricao">
    ${descricao}
  </td>`
  return item;
}


var $ = function (...args) {
  var t = document.querySelectorAll(...args);
  if (t.length == 1) return t[0];
  return t
};

document.addEventListener("DOMContentLoaded", async function (event) {
  loadFile("./data/comandos.json", function () {
    let comandos = JSON.parse(this.responseText);
    console.log(comandos);
    comandos.forEach(function (item) {
      let { comando, descricao } = item;
      $("#table-body").appendChild(createRow(comando, descricao))

    });

  });
  loadFile("./data/sociais.json", function () {
    let sociais = JSON.parse(this.responseText);
    console.log(sociais);
    sociais.forEach(function (item) {
      let { titulo, link } = item;
      console.log({ titulo, link });
      $("#" + titulo).href = link
    });

  });
});