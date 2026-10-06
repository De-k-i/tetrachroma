export type GlossaryCategory = 'CÂMARAS' | 'MECÂNICAS' | 'HIERARQUIA' | 'MISTICISMO';

export interface GlossaryTerm {
  key: string;
  name: string;
  category: GlossaryCategory;
  shortDefinition: string;
  fullDefinition: string;
  referenceIcon: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    key: 'tetracromacia',
    name: 'Tetracromacia (A Quarta Cor)',
    category: 'MISTICISMO',
    shortDefinition: 'A faculdade mística de enxergar além do espectro visível (100 milhões de tonalidades).',
    fullDefinition: 'A habilidade sensorial e transcendental que permite aos iniciados perceberem a "quarta cor", invisível aos olhos comuns. É o objetivo supremo buscado por aqueles que ingressam e sobrevivem aos ritos das câmaras.',
    referenceIcon: '👁️'
  },
  {
    key: 'horologia',
    name: 'Horologia',
    category: 'MECÂNICAS',
    shortDefinition: 'A ciência inflexível dos relógios e pêndulos que regem o tempo limite de confinamento.',
    fullDefinition: 'Sistema de engrenagens de bronze e cronômetros implacáveis que determinam a duração do rito. Se os mecanismos não forem desarmados antes do tempo expirar, a câmara é lacrada definitivamente.',
    referenceIcon: '⏱️'
  },
  {
    key: 'hierofante',
    name: 'O Hierofante',
    category: 'HIERARQUIA',
    shortDefinition: 'A autoridade suprema e autocrática que supervisiona os confinamentos e emite as diretrizes.',
    fullDefinition: 'Líder teocrático que dita as leis de provação nas muralhas de Polygondwanaland. Observa os participantes através dos visores superiores e autentica a liberação dos sobreviventes.',
    referenceIcon: '👑'
  },
  {
    key: 'sudito',
    name: 'Súdito / Iniciado',
    category: 'HIERARQUIA',
    shortDefinition: 'O participante que ingressa na câmara para ser submetido ao teste de fuga e ascensão.',
    fullDefinition: 'Qualquer indivíduo ou grupo que submete seu manifesto à ordem para enfrentar os quebra-cabeças e provações das câmaras herméticas sob juramento de cooperação.',
    referenceIcon: '👤'
  },
  {
    key: 'inner-cell',
    name: 'Inner Cell (Câmara Interna)',
    category: 'CÂMARAS',
    shortDefinition: 'Masmorras subterrâneas onde todo estímulo exterior é revogado para teste de silêncio e percepção.',
    fullDefinition: 'Primeira fase do confinamento ritualístico. Os participantes são isolados no silêncio da rocha mineral, precisando identificar padrões sutis na alvenaria bruta para desbloquear o primeiro portal.',
    referenceIcon: '🧱'
  },
  {
    key: 'loyalty',
    name: 'Loyalty (Provação de Lealdade)',
    category: 'CÂMARAS',
    shortDefinition: 'Teste de renúncia individual onde a sobrevivência exige atuação coordenada e síncrona.',
    fullDefinition: 'Setor onde os enigmas são fisicamente separados por abismos. Nenhuma alavanca pode ser acionada sozinha; a confiança recíproca é a única engrenagem que impede a armadilha de disparar.',
    referenceIcon: '⚖️'
  },
  {
    key: 'crumbling-castle',
    name: 'Crumbling Castle (Castelo em Colapso)',
    category: 'CÂMARAS',
    shortDefinition: 'Fortaleza cósmica em deterioração temporal onde a criatura do abismo aguarda na masmorra.',
    fullDefinition: 'O setor de maior complexidade e letalidade. As estruturas vibram à beira do colapso aquático e temporal, exigindo dos iniciados decodificações em múltiplos níveis de pressão.',
    referenceIcon: '🏰'
  },
  {
    key: 'arg',
    name: 'ARG (Alternate Reality Game)',
    category: 'MECÂNICAS',
    shortDefinition: 'Sinais, cifras e coordenadas ocultas na interface que liberam descontos e passagens secretas.',
    fullDefinition: 'Camada investigativa estendida que transcende o agendamento comum. Ao inspecionar os dossiês e decodificar os segredos no terminal, a equipe obtém chaves de redução de tributo e acessos privilegiados.',
    referenceIcon: '🔑'
  },
  {
    key: 'deserted-dunes',
    name: 'Deserted Dunes (Dunas Desérticas)',
    category: 'CÂMARAS',
    shortDefinition: 'O perímetro vulcânico de areia quente e fornalhas subterrâneas na base da pirâmide.',
    fullDefinition: 'Região inóspita onde rios de lava e pedra incandescente circundam as fundações das câmaras, acolhendo os pés cansados daqueles que peregrinam em busca da verdade.',
    referenceIcon: '🌋'
  },
  {
    key: 'tributo',
    name: 'Tributo de Iniciação',
    category: 'MECÂNICAS',
    shortDefinition: 'A taxa sagrada de reserva por membro para prover materiais e manutenção das engrenagens.',
    fullDefinition: 'Contribuição calculada por número de integrantes da equipe para viabilizar a experiência imersiva e a operação técnica dos mecanismos de confinamento.',
    referenceIcon: '🪙'
  }
];
