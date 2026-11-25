const $ = id => document.getElementById(id);
const LIMITE = 5 * 1024 * 1024; // 5 MB
const FORMATOS = ['pdf', 'doc', 'docx'];

const id = Number(new URLSearchParams(location.search).get('vaga'));
const vaga = VAGAS.find(v => v.id === id);
let arquivo = null;

function mostrarErro(msg) {
  $('erro').textContent = msg;
  $('erro').hidden = !msg;
}

function limparArquivo() {
  arquivo = null;
  $('arquivo').value = '';
  $('nomeArquivo').hidden = true;
}

function mostrarSucesso(jaEnviado) {
  $('formEnvio').hidden = true;
  $('sucesso').hidden = false;
  $('tituloSucesso').textContent = jaEnviado ? 'Você já enviou seu currículo' : 'Currículo enviado!';
  $('textoSucesso').textContent = 'Sua candidatura para ' + vaga.titulo + ' na ' + vaga.empresa + ' está registrada. Boa sorte!';
  $('tituloSucesso').focus();
}

// Estado inicial da página
if (!vaga) {
  $('vaga').innerHTML = '<h2>Vaga não encontrada</h2><p>Volte para a lista e escolha uma vaga.</p><a class="btn btn-roxo" href="index.html">Ver vagas</a>';
  $('formEnvio').hidden = true;
} else {
  $('vaga').innerHTML = htmlVaga(vaga);
  document.title = 'Enviar currículo | ' + vaga.titulo;
  if (lerCandidaturas().includes(vaga.id)) mostrarSucesso(true);
}

// Alternar entre "anexar arquivo" e "currículo digital"
document.querySelectorAll('input[name="tipo"]').forEach(r => {
  r.addEventListener('change', () => {
    const digital = r.value === 'digital' && r.checked;
    $('blocoArquivo').hidden = digital;
    $('blocoDigital').hidden = !digital;
    mostrarErro('');
  });
});

$('btnAnexar').addEventListener('click', () => $('arquivo').click());
$('btnRemover').addEventListener('click', limparArquivo);

$('arquivo').addEventListener('change', e => {
  const f = e.target.files[0];
  if (!f) return;
  const ext = f.name.split('.').pop().toLowerCase();
  if (!FORMATOS.includes(ext)) {
    limparArquivo();
    return mostrarErro('Formato não aceito. Envie um arquivo PDF, DOC ou DOCX.');
  }
  if (f.size > LIMITE) {
    limparArquivo();
    return mostrarErro('O arquivo tem mais de 5 MB. Envie um arquivo menor.');
  }
  arquivo = f;
  mostrarErro('');
  $('txtArquivo').textContent = f.name + ' (' + Math.max(1, Math.round(f.size / 1024)) + ' KB)';
  $('nomeArquivo').hidden = false;
});

$('formEnvio').addEventListener('submit', e => {
  e.preventDefault();
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  if (tipo === 'arquivo' && !arquivo) return mostrarErro('Anexe seu currículo para continuar.');
  mostrarErro('');

  const btn = $('btnEnviar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  // Simula o envio (no projeto real, aqui entra a chamada ao servidor)
  setTimeout(() => {
    const lista = lerCandidaturas();
    if (!lista.includes(vaga.id)) lista.push(vaga.id);
    try { localStorage.setItem('candidaturas', JSON.stringify(lista)); } catch (err) {}
    mostrarSucesso(false);
  }, 800);
});