// ================================
// Dados simulados
// ================================
var persons = {
    Dias: {
      Name: 'João Vitor Dias',
      DayOff: "1",
      MonthDayOff: "11",
      DayOffs: [],
      Double: true,
      Times: ["F,F,1,1,3,1,1,1,F,1,2,3,1,1,1,F,F,1,1,3,1,1,1,F,3,3,1,3,1,1,F"],
      Vacation: false
    },
    Soares: {
        Name: 'João Vitor Soares',
        DayOff: "7",
        MonthDayOff: "11",
        DayOffs: [],
        Double: true,
        Times: ["1,1,1,1,1,1,F,F,1,1,1,1,1,1,F,1,1,1,1,1,1,F,F,1,1,1,1,1,1,F,1"],
        Vacation: false
      },
    Eduardo: {
      Name: 'Eduardo Amorim',
      DayOff: "6",
      MonthDayOff: "11",
      DayOffs: [],
      Double: false,
      Times:  ["3,3,1,2,2,F,2,2,3,3,3,1,F,F,3,3,2,2,1,1,F,1,2,1,3,3,1,F,F,2,3"],
      Vacation: false
    },
    Pedro: {
      Name: 'Pedro Henrique',
      DayOff: "7",
      MonthDayOff: "11",
      DayOffs: [],
      Double: true,
      Times:  ["2,1,2,3,3,1,F,F,1,3,1,1,3,3,F,3,1,2,2,1,1,F,F,3,2,2,2,1,2,F,1"],
      Vacation: false
    },
    Flavio: {
      Name: 'Flavio Lourenço',
      DayOff: "1",
      MonthDayOff: "11",
      DayOffs: [],
      Double: true,
      Times:  ["F,F,1,1,1,2,1,1,F,1,1,2,3,3,1,F,F,1,3,3,1,1,1,F,1,1,3,1,1,1,F"],
      Vacation: false
    },
    Ramon: {
      Name: 'Ramon Mendonça',
      DayOff: "3",
      MonthDayOff: "11",
      DayOffs: [],
      Double: false,
      Times:  ["1,2,F,3,1,1,1,1,2,F,F,3,1,2,1,1,1,F,3,2,2,2,1,2,F,F,3,1,1,1,2"],
      Vacation: false
    },
    Marya: {
      Name: 'Marya Eduarda',
      DayOff: "4",
      MonthDayOff: "11",
      DayOffs: [],
      Double: true,
      Times:  ["3,3,3,F,F,3,3,3,3,1,3,F,2,1,3,1,3,3,F,F,3,3,3,1,1,1,F,3,3,3,3"],
      Vacation: false
    },
    Giovanna: {
      Name: 'Giovanna dos Anjos',
      DayOff: "4",
      MonthDayOff: "11",
      DayOffs: [],
      Double: true,
      Times: ["1,1,3,F,F,3,3,3,1,2,2,F,1,1,2,2,3,3,F,F,3,3,3,3,1,1,F,2,3,3,1"],
      Vacation: false
    },
  };

let btnTimesShow = document.getElementById("btnTimesShow")
let btnItineraryShow = document.getElementById("btnItineraryShow")

let showTime = document.getElementById("showTime")
let showDayOff = document.getElementById("showDayOffs")

btnTimesShow.addEventListener("click",function() {
  changePage()

})

btnItineraryShow.addEventListener("click",function() {
  changePage()
})

function changePage() {
  if (showTime.classList.contains("hidden")) {
    showTime.classList.remove("hidden")
    showDayOff.classList.add("hidden")

    btnItineraryShow.style.background = 'none'
    btnTimesShow.style.background = 'rgb(0, 60, 121)'
  }else {
    showTime.classList.add("hidden")
    showDayOff.classList.remove("hidden")

    btnItineraryShow.style.background = 'rgb(0, 60, 121)'
    btnTimesShow.style.background = 'none'
  }
}

// ================================
// Configuração
// ================================
const horarios = {
  "1": "H1 (17:00 às 23:00)",
  "2": "H2 (18:00 às 00:00)",
  "3": "H3 (18:45 às 00:45)",
  "F": "Folga"
};

// ================================
// Funções principais
// ================================

// Pega data de SP
function getSaoPauloDate() {
  const now = new Date();
  const options = { timeZone: 'America/Sao_Paulo' };
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  const parts = formatter.formatToParts(now);
  
  const day = parseInt(parts.find(p => p.type === 'day').value);
  const month = parseInt(parts.find(p => p.type === 'month').value);
  const year = parseInt(parts.find(p => p.type === 'year').value);
  
  return { day, month, year };
}

// Gera o HTML do bloco de um dia
function gerarBlocoDia(dia, mes, listaPorHorario) {
  const bloco = document.createElement('div');
  bloco.classList.add('day-block');
  
  const titulo = document.createElement('h2');
  titulo.textContent = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
  bloco.appendChild(titulo);
  
  for (const [codigo, Names] of Object.entries(listaPorHorario)) {
    const section = document.createElement('div');
    section.classList.add('time-group');
    
    const tituloHorario = document.createElement('h3');
    tituloHorario.textContent = horarios[codigo] || `Horário ${codigo}`;
    section.appendChild(tituloHorario);
    
    if (Names.length === 0) {
      const vazio = document.createElement('p');
      vazio.textContent = "Ninguém neste horário";
      section.appendChild(vazio);
    } else {
      Names.forEach(Name => {
        const p = document.createElement('p');
        p.textContent = Name;
        section.appendChild(p);
      });
    }
    
    bloco.appendChild(section);
  }
  
  return bloco;
}

// Função principal para montar o calendário de horários
function montarShowTime() {
  const { day: diaAtual, month: mesAtual, year: anoAtual } = getSaoPauloDate();
  const showTime = document.getElementById("showTime");
  showTime.innerHTML = ""; // Limpa antes de recriar

  // Determinar quantos dias tem o mês atual
  const ultimoDiaDoMes = new Date(anoAtual, mesAtual, 0).getDate();
  
  // Agrupa todos os funcionários por dia
  for (let d = diaAtual; d <= ultimoDiaDoMes; d++) {
    const listaPorHorario = { "1": [], "2": [], "3": [], "F": [] };
    
    for (const key in persons) {
      const p = persons[key];
      if (p.Vacation) continue; // pula quem está de férias
      
      const timeArray = p.Times[0].split(",");
      const codigo = timeArray[d - 1];
      
      if (!codigo) continue; // dia inexistente
      
      if (listaPorHorario[codigo]) {
        listaPorHorario[codigo].push(p.Name);
      } else {
        listaPorHorario[codigo] = [p.Name];
      }
    }
    
    const bloco = gerarBlocoDia(d, mesAtual, listaPorHorario);
    showTime.appendChild(bloco);
  }

  generateCopyClick()

}

function generateCopyClick() {
  document.querySelectorAll('.day-block').forEach(block => {
    block.addEventListener('click', () => {
      // Pega o texto interno (já formatado com quebras de linha)
      const texto = block.innerText.trim();
  
      // Copia pro clipboard
      navigator.clipboard.writeText(texto)
        .then(() => {
          alert('Texto copiado!');
        })
        .catch(err => {
          console.error('Erro ao copiar:', err);
        });
    });
  });
}

// ================================
// Inicialização
// ================================
document.addEventListener("DOMContentLoaded", montarShowTime);

// ================================
// Take Time
// ================================

// Função para obter a hora atual em São Paulo
function getSPTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  const formatter = new Intl.DateTimeFormat('pt-BR', options)
  const parts = formatter.formatToParts(now)

  const year = parts.find(part => part.type === 'year').value
  const month = parts.find(part => part.type === 'month').value - 1 // mês em JavaScript é 0-indexado
  const day = parts.find(part => part.type === 'day').value
  const hour = parts.find(part => part.type === 'hour').value
  const minute = parts.find(part => part.type === 'minute').value
  const second = parts.find(part => part.type === 'second').value

  return new Date(year, month, day, hour, minute, second)
}


// ================================
// DayOffs
// ================================

let itinerary = 6

function calculateDayOff(nextPeriod, itinerary, person) {
  let actualDate = getSPTime()
  let dayoffs = []

  let dayInitDayOff = persons[person].DayOff
  let monthInitDayOff = persons[person].MonthDayOff
  let double = persons[person].Double
  let initDateDayOff = new Date(
    actualDate.getFullYear(),
    monthInitDayOff - 1,
    dayInitDayOff
  )

  let lastDayOffs = []

  // Ajuste inicial para garantir que a data de início seja correta, incluindo datas anteriores
  while (initDateDayOff <= actualDate) {
    lastDayOffs.push(initDateDayOff.toDateString())

    if (double) {
      let dateDayOff2 = new Date(initDateDayOff)
      dateDayOff2.setDate(initDateDayOff.getDate() + 1)
      lastDayOffs.push(dateDayOff2.toDateString())
    }

    initDateDayOff.setDate(
      initDateDayOff.getDate() + itinerary + 1 + (double ? 1 : 0)
    )
    double = !double // Alternar entre folga simples e double
  }

  // Pegar apenas as últimas 2 dayoffs anteriores
  lastDayOffs = lastDayOffs.slice(-2)

  // Loop para calcular dayoffs para o próximo período
  while (dayoffs.length < nextPeriod) {
    let dateDayOff1 = new Date(initDateDayOff)
    dayoffs.push(dateDayOff1.toDateString())

    if (double) {
      let dateDayOff2 = new Date(initDateDayOff)
      dateDayOff2.setDate(initDateDayOff.getDate() + 1)
      dayoffs.push(dateDayOff2.toDateString())
    }

    // Atualizar a data de início para a próxima folga
    initDateDayOff.setDate(
      initDateDayOff.getDate() + itinerary + 1 + (double ? 1 : 0)
    )
    double = !double // Alternar entre folga simples e double
  }

  return [...lastDayOffs, ...dayoffs]
}

// Função para verificar se hoje é um dia de folga
function isDayOffToday(daysDayOff) {
  let actualDate = getSPTime().toDateString()
  return daysDayOff.includes(actualDate)
}

// Atualizando dayoffs com base na data atual
function updateDayOff(persons, itinerary) {
  Object.keys(persons).forEach(Name => {
    let dayoffs = calculateDayOff(80, itinerary, Name)
    persons[Name].Folga = isDayOffToday(dayoffs)
    persons[Name].Folgas = dayoffs // Atualiza o array Folgas no objeto de cada pessoa
  })
}

// Função para mostrar dayoffs
function showDayOffs() {
  let Name = document.getElementById('personName').value
  let Quantity = document.getElementById('quantity').value
  if (!Name) {
    return
  }

  if (!Quantity) {
    return
  }

  // Atualizar as dayoffs antes de mostrar
  updateDayOff(persons, itinerary)

  let dayoffs = calculateDayOff(Quantity, itinerary, Name)

  // Checkagem de duplicatas
  const uniqueDayOff = [...new Set(dayoffs)]

  // Limpar calendário anterior
  let listaDeFolgas = document.getElementById('listaDeFolgas')
  listaDeFolgas.innerHTML = ''

  // Agrupar dayoffs por mês e ano
  const folgasPorMesEAno = uniqueDayOff.reduce((acc, folga) => {
    const data = new Date(folga)
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const dia = data.getDate()

    if (!acc[ano]) {
      acc[ano] = {}
    }
    if (!acc[ano][mes]) {
      acc[ano][mes] = []
    }
    acc[ano][mes].push(dia)

    return acc
  }, {})

  // Criar calendários para os meses que possuem dayoffs
  for (const ano in folgasPorMesEAno) {
    for (const mes in folgasPorMesEAno[ano]) {
      const mesIndex = parseInt(mes, 10)
      const NameMes = new Date(ano, mesIndex).toLocaleString('pt-BR', {
        month: 'long'
      })

      let mesDiv = document.createElement('div')
      mesDiv.classList.add('mes')

      let tituloMes = document.createElement('div')
      tituloMes.classList.add('mes-titulo')
      tituloMes.textContent = `${
        NameMes.charAt(0).toUpperCase() + NameMes.slice(1)
      } ${ano}`
      mesDiv.appendChild(tituloMes)

      let calendario = document.createElement('div')
      calendario.classList.add('calendario')

      const diasNames = new Date(ano, mesIndex + 1, 0).getDate()
      const folgasNames = folgasPorMesEAno[ano][mes]

      // Adicionar dias ao calendário
      for (let dia = 1; dia <= diasNames; dia++) {
        let dataStr = `${ano}-${(mesIndex + 1)
          .toString()
          .padStart(2, '0')}-${dia.toString().padStart(2, '0')}`
        let diaElemento = document.createElement('div')
        diaElemento.classList.add('dia')

        // Verificação da folga no mês correto
        if (folgasNames.includes(dia)) {
          diaElemento.classList.add('folga')
        }

        // Adicionar inicial do dia da semana
        const diasDaSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
        const data = new Date(dataStr)
        const diaSemana = diasDaSemana[data.getDay()]
        diaElemento.innerHTML = `<h2>${diaSemana}</h2>
        <h2>${dia.toString().padStart(2, '0')}</h2>
         `
        calendario.appendChild(diaElemento)
      }

      mesDiv.appendChild(calendario)
      listaDeFolgas.appendChild(mesDiv)
    }
  }
}














