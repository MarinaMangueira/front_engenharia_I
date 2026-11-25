const $ = id => document.getElementById(id);

function preencher(select, valores) {
  [...new Set(valores)].sort().forEach(v => {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v;
    select.appendChild(o);
  });
}

function cartao(v, enviadas) {
  const jaEnviou = enviadas.includes(v.id);
  return '<article class="card">' + htmlVaga(v) +
    (jaEnviou ? '<span class="enviado">✔ Currículo enviado</span>' : '') +
    '<a class="btn btn-roxo" href="enviar-curriculo.html?vaga=' + v.id + '">Ver oportunidade</a>' +
    '</article>';
}

function buscar() {
  const cidade = $('local').value;
  const area = $('area').value;
  const achadas = VAGAS.filter(v => (!cidade || v.cidade === cidade) && (!area || v.area === area));
  const enviadas = lerCandidaturas();

  $('contador').textContent = achadas.length === 1 ? '1 vaga encontrada' : achadas.length + ' vagas encontradas';
  $('lista').innerHTML = achadas.length
    ? achadas.map(v => cartao(v, enviadas)).join('')
    : '<p class="vazio">Nenhuma vaga encontrada. Tente outra localização ou área.</p>';
}

preencher($('local'), VAGAS.map(v => v.cidade));
preencher($('area'), VAGAS.map(v => v.area));
$('filtros').addEventListener('submit', e => { e.preventDefault(); buscar(); });
$('local').addEventListener('change', buscar);
$('area').addEventListener('change', buscar);
buscar();