// Dados de exemplo das vagas (no projeto real viriam de um servidor)
const VAGAS = [
  { id: 1, titulo: 'Desenvolvedor Front-end Júnior', empresa: 'Tech Solutions', cidade: 'Patos, PB', modelo: 'Híbrido', salario: 'R$ 2.500 – R$ 3.500', area: 'Tecnologia', tags: ['Tecnologia', 'CLT', 'PCD', 'Júnior'] },
  { id: 2, titulo: 'Designer Gráfico', empresa: 'Studio Criativo', cidade: 'Remoto', modelo: 'Remoto', salario: 'R$ 2.000 – R$ 3.000', area: 'Design', tags: ['Design', 'PJ', 'Júnior'] },
  { id: 3, titulo: 'Estágio em Tecnologia da Informação', empresa: 'InnovaTech', cidade: 'Patos, PB', modelo: 'Presencial', salario: 'R$ 900 – R$ 1.200', area: 'Tecnologia', tags: ['TI', 'Estágio'] },
  { id: 4, titulo: 'Desenvolvedor Júnior', empresa: 'InnovaTech', cidade: 'Campina Grande, PB', modelo: 'Híbrido', salario: 'R$ 900 – R$ 1.200', area: 'Tecnologia', tags: ['Jornada flexível', 'Ambiente com baixa estimulação'] },
  { id: 5, titulo: 'Auxiliar Administrativo', empresa: 'Casa Nova Distribuidora', cidade: 'Campina Grande, PB', modelo: 'Presencial', salario: 'R$ 1.600 – R$ 1.900', area: 'Administrativo', tags: ['Administrativo', 'CLT', 'Primeiro emprego'] },
  { id: 6, titulo: 'Assistente de Atendimento', empresa: 'Conecta Serviços', cidade: 'Patos, PB', modelo: 'Presencial', salario: 'R$ 1.500 – R$ 1.800', area: 'Atendimento', tags: ['Atendimento', 'CLT', 'PCD'] }
];

const textoLocal = v => (v.cidade === 'Remoto' ? 'Remoto' : v.cidade + ' - ' + v.modelo);

// Guarda no navegador os ids das vagas que já receberam currículo
function lerCandidaturas() {
  try { return JSON.parse(localStorage.getItem('candidaturas')) || []; }
  catch (e) { return []; }
}

// Cartão de vaga (usado nas duas páginas)
function htmlVaga(v) {
  return '<h2>' + v.titulo + '</h2>' +
    '<p>' + v.empresa + '</p>' +
    '<p>' + textoLocal(v) + '</p>' +
    '<p>' + v.salario + '</p>' +
    '<ul class="tags">' + v.tags.map(t => '<li>' + t + '</li>').join('') + '</ul>';
}

// Botão flutuante: aumenta o tamanho do texto
const btnAcess = document.getElementById('acess');
if (btnAcess) {
  btnAcess.addEventListener('click', () => {
    const ativo = document.documentElement.classList.toggle('texto-grande');
    btnAcess.setAttribute('aria-pressed', ativo);
  });
}