import type {
  AppearanceOptionKey,
  AppearanceOptionSet,
  AppearanceVisualOption,
  CharacterAppearance,
  Faction,
  Gender
} from './types';

const createVisualOptions = (
  category: string,
  labels: string[],
  prefix: string
): AppearanceVisualOption[] => {
  return labels.map((label, index) => ({
    id: `${prefix}-${String(index + 1).padStart(2, '0')}`,
    label,
    thumbnailSrc: `/images/appearance/${category}.svg`,
    layerSrc: `/images/appearance/${category}.svg`
  }));
};

const mergeVisualOptionLists = (
  ...lists: AppearanceVisualOption[][]
): AppearanceVisualOption[] => {
  const seen = new Set<string>();
  const merged: AppearanceVisualOption[] = [];
  lists.forEach((list) => {
    list.forEach((option) => {
      if (!seen.has(option.id)) {
        seen.add(option.id);
        merged.push(option);
      }
    });
  });
  return merged;
};

const baseAppearanceOptions: AppearanceOptionSet = {
  hairStyle: createVisualOptions('hair-style', [
    'Длинные косы',
    'Короткие пряди',
    'Хвост',
    'Распущенные волосы',
    'Уложенные локоны'
  ], 'hair-style'),
  hairColor: createVisualOptions(
    'hair-color',
    ['Светлые', 'Русые', 'Темные', 'Медные', 'Чёрные'],
    'hair-color'
  ),
  faceShape: createVisualOptions('face-shape', ['Овальное', 'Квадратное', 'Треугольное', 'Круглое'], 'face-shape'),
  eyeShape: createVisualOptions('eye-shape', ['Миндалевидные', 'Круглые', 'Узкие'], 'eye-shape'),
  eyeColor: createVisualOptions(
    'eye-color',
    ['Серые', 'Карие', 'Синие', 'Зелёные', 'Ореховые'],
    'eye-color'
  ),
  nose: createVisualOptions('nose', ['Прямой', 'Орлиный', 'Курносый'], 'nose'),
  lips: createVisualOptions('lips', ['Тонкие', 'Полные', 'Средние'], 'lips'),
  accessory: createVisualOptions(
    'accessory',
    ['Без украшений', 'Торс с амулетом', 'Лобная повязка', 'Серьги', 'Шрам на щеке'],
    'accessory'
  )
};

const factionsData: Faction[] = [
  {
    id: 'varyagi',
    name: 'Варяги',
    description:
      'Скандинавские мореходы и торговцы, которые сыграли важную роль в становлении ранней Руси.',
    modernEquivalent: 'Современные скандинавы и жители северных регионов России.',
    avatarEmoji: '🛡️',
    portraitSrc: '/images/factions/varyagi.svg',
    traits: [
      'Навигация по северным морям и торговые экспедиции',
      'Сочетание воинской силы и дипломатии',
      'Скандинавские ритуалы и уважение к старейшинам'
    ],
    maleNames: ['Рюрик', 'Игорь', 'Олег', 'Трувор', 'Гельмонд'],
    femaleNames: ['Ольга', 'Рогнеда', 'Инга', 'Сигрид', 'Хельга'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Меховой плащ', 'Льняной кафтан', 'Кожаная куртка'],
      'varyagi-clothing'
    ),
    optionsExtension: {
      appearance: {
        hairColor: createVisualOptions('hair-color', ['Пшеничные', 'Пепельные', 'Рыжие'], 'varyagi-hair-color'),
        accessory: createVisualOptions(
          'accessory',
          ['Рунный амулет', 'Меховой ворот', 'Кольчуга'],
          'varyagi-accessory'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Кольчужный доспех', 'Плащ с фибулой'],
        'varyagi-clothing-extra'
      )
    }
  },
  {
    id: 'prusy',
    name: 'Пруссы',
    description:
      'Западнобалтийские племена, известные своим ремеслом и сопротивлением тевтонским рыцарям.',
    modernEquivalent: 'Наследие в культурах жителей Калининградской области и северной Польши.',
    avatarEmoji: '🪓',
    portraitSrc: '/images/factions/prusy.svg',
    traits: [
      'Янтарные украшения и развитое ремесло',
      'Сопротивление тевтонскому натиску',
      'Общинные советы и культ лесных духов'
    ],
    maleNames: ['Вайде', 'Главис', 'Довспрунк', 'Ромовид', 'Судовит'],
    femaleNames: ['Видарна', 'Глобе', 'Милда', 'Девина', 'Вайделотка'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Тканый плащ', 'Короткий жупан', 'Плетёная безрукавка'],
      'prusy-clothing'
    ),
    optionsExtension: {
      appearance: {
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённые косы', 'Полувоздушные локоны'],
          'prusy-hair-style'
        ),
        accessory: createVisualOptions(
          'accessory',
          ['Янтарное ожерелье', 'Головная лента'],
          'prusy-accessory'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Янтарный плащ', 'Жупан с вышивкой'],
        'prusy-clothing-extra'
      )
    }
  },
  {
    id: 'zemaites',
    name: 'Жемайты',
    description: 'Средневековые жители западной части Литвы, известные своей стойкостью.',
    modernEquivalent: 'Часть современного литовского народа.',
    avatarEmoji: '🛶',
    portraitSrc: '/images/factions/zemaites.svg',
    traits: [
      'Горные святилища и почитание Перкунаса',
      'Воинские дружины против крестоносцев',
      'Упрямый характер и общинная взаимовыручка'
    ],
    maleNames: ['Миндаугас', 'Витаутас', 'Таутис', 'Жигимантас', 'Лауринас'],
    femaleNames: ['Аустея', 'Юрате', 'Гражина', 'Даиня', 'Рута'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Льняная туника', 'Пояс с орнаментом'],
      'zemaites-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Венок из трав', 'Орнаментированный пояс'],
          'zemaites-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённая корона', 'Свободные волны'],
          'zemaites-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Плащ с этническим узором'],
        'zemaites-clothing-extra'
      )
    }
  },
  {
    id: 'kurshi',
    name: 'Курши',
    description:
      'Балтийские мореходы и воины, контролировавшие побережье Балтики в раннем Средневековье.',
    modernEquivalent: 'Часть культурного наследия Латвии.',
    avatarEmoji: '⚓',
    portraitSrc: '/images/factions/kurshi.svg',
    traits: [
      'Прибрежное пиратство и морская торговля',
      'Деревянные ладьи с резным декором',
      'Культ моря и предков-воинов'
    ],
    maleNames: ['Ламес', 'Имантс', 'Вилис', 'Гинтс', 'Осис'],
    femaleNames: ['Лайма', 'Гуна', 'Даце', 'Мара', 'Агнесе'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Морской плащ', 'Плотная куртка'],
      'kurshi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Морской амулет', 'Торговая сумка'],
          'kurshi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Подбритые виски', 'Длинная челка'],
          'kurshi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Плащ с меховой отделкой', 'Кожаный пояс с подвесками'],
        'kurshi-clothing-extra'
      )
    }
  },
  {
    id: 'latgaly',
    name: 'Латгалы',
    description:
      'Племена восточной Латвии, известные своей земледельческой культурой и торговыми связями.',
    modernEquivalent: 'Вклад в формирование латышского народа.',
    avatarEmoji: '🌾',
    portraitSrc: '/images/factions/latgaly.svg',
    traits: [
      'Развитые земледельческие традиции',
      'Торговые связи с Готландом и Новгородом',
      'Праздники солнцестояния и хороводные песни'
    ],
    maleNames: ['Райтис', 'Эдвинс', 'Артурс', 'Янис', 'Алдис'],
    femaleNames: ['Илзе', 'Лигита', 'Марис', 'Анете', 'Дайга'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Полотняная рубаха', 'Льняной сарафан'],
      'latgaly-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Бисерная гирлянда', 'Тканый головной убор'],
          'latgaly-accessory'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Жемчужная накидка'],
        'latgaly-clothing-extra'
      )
    }
  },
  {
    id: 'yotvingi',
    name: 'Ятвяги',
    description:
      'Воины западнобалтийского происхождения, которые жили между Литвой и Польшей.',
    modernEquivalent: 'Влияние заметно в культурах Подляшья и Сувалков.',
    avatarEmoji: '🏹',
    portraitSrc: '/images/factions/yotvingi.svg',
    traits: [
      'Тяжёлая кавалерия с длинными копьями',
      'Воинские татуировки и боевые краски',
      'Сильная родовая аристократия'
    ],
    maleNames: ['Скуманд', 'Кумед', 'Сирпутис', 'Войшелк', 'Гинтарас'],
    femaleNames: ['Бируте', 'Судина', 'Мильда', 'Аушра', 'Иева'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Боевой плащ', 'Кожаная броня'],
      'yotvingi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Боевые краски', 'Защитный браслет'],
          'yotvingi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённый гребень', 'Высокий пучок'],
          'yotvingi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Кожаный нагрудник', 'Шерстяной плащ'],
        'yotvingi-clothing-extra'
      )
    }
  },
  {
    id: 'polyane',
    name: 'Поляне',
    description:
      'Восточнославянское племя средней Надднепрянщины, чья культура легла в основу древнерусской государственности.',
    modernEquivalent: 'Современные жители Киевщины и центральной Украины.',
    avatarEmoji: '🏞️',
    portraitSrc: '/images/factions/polyane.svg',
    traits: [
      'Земледельцы Днепровских берегов',
      'Дружины князей Киевской земли',
      'Христианские и языческие традиции бок о бок'
    ],
    maleNames: ['Святослав', 'Владимир', 'Ярополк', 'Борис', 'Всеволод'],
    femaleNames: ['Малуша', 'Ярослава', 'Предслава', 'Добромила', 'Любавка'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Вышитая рубаха', 'Плащ с фибулой', 'Поясная перевязь'],
      'polyane-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Серебряное кольцо', 'Кийский амулет'],
          'polyane-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Кичка с лентами', 'Плетёная коса с подвесками'],
          'polyane-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Парчовый плащ', 'Льняной сарафан'],
        'polyane-clothing-extra'
      )
    }
  },
  {
    id: 'lyakhi',
    name: 'Ляхи',
    description:
      'Раннесредневековое западнославянское племя, давшее начало польскому народу.',
    modernEquivalent: 'Современные поляки и жители Малой Польши.',
    avatarEmoji: '🦅',
    portraitSrc: '/images/factions/lyakhi.svg',
    traits: [
      'Сильная шляхетская культура',
      'Городища на Висле и торговля солью',
      'Культ орла как символа власти'
    ],
    maleNames: ['Мешко', 'Казимир', 'Болеслав', 'Лешек', 'Пшемыслав'],
    femaleNames: ['Данута', 'Ядвига', 'Ванда', 'Бронислава', 'Станислава'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Суконный жупан', 'Поясная плащаница'],
      'lyakhi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Орлиная брошь', 'Россыпь бус'],
          'lyakhi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Оплетённый венец', 'Высокий чепец'],
          'lyakhi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Жупан с гербовой вышивкой', 'Плащ с меховой опушкой'],
        'lyakhi-clothing-extra'
      )
    }
  },
  {
    id: 'greki',
    name: 'Греки',
    description:
      'Византийцы, принёсшие в славянские земли христианство, ремесла и торговые традиции.',
    modernEquivalent: 'Греки Причерноморья и Средиземноморья.',
    avatarEmoji: '🏛️',
    portraitSrc: '/images/factions/greki.svg',
    traits: [
      'Византийская дипломатия и обряды',
      'Мозаики, иконы и развитая письменность',
      'Торговые колонии на побережье Черного моря'
    ],
    maleNames: ['Константин', 'Никифор', 'Андроник', 'Феодор', 'Мануил'],
    femaleNames: ['Анна', 'Ирина', 'Феофания', 'Зоя', 'Евдокия'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Хитон', 'Плащ-хламида', 'Золототканый пояс'],
      'greki-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Иконический кулон', 'Золотая диадема'],
          'greki-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Кудри с лентами', 'Уложенные локоны'],
          'greki-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Пурпурный гиматий', 'Парадный кафтан'],
        'greki-clothing-extra'
      )
    }
  },
  {
    id: 'danube_bulgars',
    name: 'Дунайские болгары',
    description:
      'Тюркско-славянское объединение, сформировавшее Первое Болгарское царство на Дунае.',
    modernEquivalent: 'Современные болгары и жители Балкан.',
    avatarEmoji: '🛡️',
    portraitSrc: '/images/factions/danube_bulgars.svg',
    traits: [
      'Ламеллярные доспехи и конная армия',
      'Союз тюркских и славянских традиций',
      'Строительство укреплённых столиц на Дунае'
    ],
    maleNames: ['Аспарух', 'Тервел', 'Крум', 'Омуртаг', 'Борис'],
    femaleNames: ['Севина', 'Пламена', 'Елена', 'Дара', 'Златина'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Льняной кафтан', 'Воинский ламеллярный доспех'],
      'danube-bulgars-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Тюркский амулет', 'Шлем с маской'],
          'danube-bulgars-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Подбритый затылок', 'Косичка-оселедец'],
          'danube-bulgars-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Кожаный доспех', 'Парадный плащ царя'],
        'danube-bulgars-clothing-extra'
      )
    }
  },
  {
    id: 'khazary',
    name: 'Хазары',
    description:
      'Народ многонационального Хазарского каганата, контролировавшего торговые пути Евразии.',
    modernEquivalent: 'Наследие в культурах народов Нижней Волги и Кавказа.',
    avatarEmoji: '🕌',
    portraitSrc: '/images/factions/khazary.svg',
    traits: [
      'Контроль Великого шёлкового пути',
      'Толерантность к религиям и мультикультурность',
      'Гвардия кагана и степные всадники'
    ],
    maleNames: ['Булан', 'Ханук', 'Сабриель', 'Менамер', 'Обадия'],
    femaleNames: ['Серах', 'Дебора', 'Рахиль', 'Мириам', 'Адела'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Шёлковый кафтан', 'Куртка с лампасами'],
      'khazary-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Степной тюрбан', 'Торговый талар'],
          'khazary-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённые виски', 'Собранный пучок'],
          'khazary-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Золотошвейный плащ', 'Степная броня'],
        'khazary-clothing-extra'
      )
    }
  },
  {
    id: 'volga_bulgars',
    name: 'Булгары',
    description:
      'Народ Волго-Камской Булгарии, процветавший на пересечении торговых путей Востока и Руси.',
    modernEquivalent: 'Современные татары и чуваши.',
    avatarEmoji: '🕌',
    portraitSrc: '/images/factions/volga_bulgars.svg',
    traits: [
      'Развитая торговля с Востоком и Русью',
      'Мусульманская учёность и ремёсла',
      'Речной флот на Каме и Волге'
    ],
    maleNames: ['Алмуш', 'Габдулла', 'Илдар', 'Айдар', 'Самат'],
    femaleNames: ['Булгара', 'Алсу', 'Гульнара', 'Лейла', 'Земфира'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Тюбетейка', 'Вышитый камзол'],
      'volga-bulgars-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Лунный амулет', 'Зернь на висках'],
          'volga-bulgars-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Коса с монетами', 'Уложенный тюрбан'],
          'volga-bulgars-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Парчовый камзол', 'Короткий бешмет'],
        'volga-bulgars-clothing-extra'
      )
    }
  },
  {
    id: 'pechenegi',
    name: 'Печенеги',
    description:
      'Кочевники степей Причерноморья, наводившие страх на соседние княжества.',
    modernEquivalent: 'Наследие в культурах тюркских народов степной Евразии.',
    avatarEmoji: '🏇',
    portraitSrc: '/images/factions/pechenegi.svg',
    traits: [
      'Молниеносные набеги конных стрелков',
      'Степная дипломатия и союзы',
      'Кочевые шатры и шаманские обряды'
    ],
    maleNames: ['Куря', 'Илдек', 'Гелу', 'Сары', 'Байдар'],
    femaleNames: ['Алтун', 'Йылдыз', 'Тумар', 'Айнура', 'Бозай'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Степной кафтан', 'Меховой тулуп'],
      'pechenegi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Колчан с орнаментом', 'Степная подвеска'],
          'pechenegi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённая гривка', 'Свисающие косы'],
          'pechenegi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Шкурный плащ', 'Кожаный панцирь'],
        'pechenegi-clothing-extra'
      )
    }
  },
  {
    id: 'torki',
    name: 'Торки',
    description:
      'Тюркские наёмники XI века, служившие в дружинах русских князей.',
    modernEquivalent: 'Наследие в культурах ногайцев и других тюркских народов.',
    avatarEmoji: '⚔️',
    portraitSrc: '/images/factions/torki.svg',
    traits: [
      'Наёмные дружины в службе князей',
      'Смешение тюркских и славянских традиций',
      'Боевые песнопения перед сражением'
    ],
    maleNames: ['Атрак', 'Балык', 'Аяз', 'Карач', 'Торкун'],
    femaleNames: ['Айша', 'Сауле', 'Тюльпан', 'Гайша', 'Казына'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Кольчужная рубаха', 'Куртка из сафьяна'],
      'torki-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Наёмничий знак', 'Кистень на поясе'],
          'torki-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Подбритая макушка', 'Заплетённый хвост'],
          'torki-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Кольчуга с пластинами', 'Шапка с меховой околышкой'],
        'torki-clothing-extra'
      )
    }
  },
  {
    id: 'kumany',
    name: 'Куманы',
    description:
      'Кыпчакские кочевники, господствовавшие в причерноморских степях в XI–XIII веках.',
    modernEquivalent: 'Казахи, карачаевцы и другие потомки кипчаков.',
    avatarEmoji: '🏹',
    portraitSrc: '/images/factions/kumany.svg',
    traits: [
      'Лёгкая конница кипчакского типа',
      'Покровительство шаманов и сказителей',
      'Союзы с русскими князьями и венграми'
    ],
    maleNames: ['Кончак', 'Тугоркан', 'Сулей', 'Боняк', 'Отрок'],
    femaleNames: ['Сарыклы', 'Айкыз', 'Томирис', 'Кызай', 'Наргиз'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Степная чепрага', 'Куртка из войлока'],
      'kumany-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Туранский амулет', 'Птичье перо'],
          'kumany-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Свободные косы', 'Подбритый висок'],
          'kumany-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Лёгкий ламеллярный доспех', 'Праздничный камзол'],
        'kumany-clothing-extra'
      )
    }
  },
  {
    id: 'chud',
    name: 'Чудь',
    description:
      'Финно-угорские племена северо-западной Руси, известные своими ремеслами и торговлей.',
    modernEquivalent: 'Предки современных эстонцев и сету.',
    avatarEmoji: '🌲',
    portraitSrc: '/images/factions/chud.svg',
    traits: [
      'Мастера по бересте и костяным изделиям',
      'Лесные тропы и тайные торговые пути',
      'Сочетание языческих верований и раннего христианства'
    ],
    maleNames: ['Тарвас', 'Яакко', 'Урмас', 'Илмар', 'Лаури'],
    femaleNames: ['Айну', 'Кайса', 'Лийза', 'Туула', 'Хелена'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Шерстяная накидка', 'Орнаментированный сарафан'],
      'chud-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Серебряные фибулы', 'Берестяной амулет'],
          'chud-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Коса с лентами', 'Уложенный венец'],
          'chud-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный костюм с бисером', 'Шерстяной плащ'],
        'chud-clothing-extra'
      )
    }
  },
  {
    id: 'merya',
    name: 'Меря',
    description:
      'Финно-угорское племя междуречья Волги и Клязьмы, взаимодействовавшее с восточными славянами.',
    modernEquivalent: 'Историческое наследие в культурах центральной России.',
    avatarEmoji: '💧',
    portraitSrc: '/images/factions/merya.svg',
    traits: [
      'Речные охотники и рыбаки',
      'Ткание с бисером и пестрым орнаментом',
      'Мирные союзы с восточными славянами'
    ],
    maleNames: ['Тороп', 'Атяр', 'Саво', 'Юхо', 'Ияр'],
    femaleNames: ['Ава', 'Сайна', 'Лийса', 'Марина', 'Окса'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Длинная понёва', 'Берестяной плащ'],
      'merya-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Волнистое ожерелье', 'Речной амулет'],
          'merya-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Разделённая коса', 'Низкий узел'],
          'merya-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Северный плат', 'Вышитая рубаха с бисером'],
        'merya-clothing-extra'
      )
    }
  },
  {
    id: 'ves',
    name: 'Весь',
    description:
      'Финно-угорское племя, обитавшее вдоль Белого моря и Северной Двины.',
    modernEquivalent: 'Наследие в традициях северных русских и коми-ижемцев.',
    avatarEmoji: '❄️',
    portraitSrc: '/images/factions/ves.svg',
    traits: [
      'Северное морское рыболовство',
      'Меховые промыслы и торговля',
      'Обряды почитания духов тундры'
    ],
    maleNames: ['Унти', 'Сийми', 'Олав', 'Тойво', 'Тари'],
    femaleNames: ['Сийна', 'Туули', 'Пирко', 'Майя', 'Кайса'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Меховая парка', 'Тёплая понёва'],
      'ves-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Бубенцы на поясе', 'Плетёная тесьма'],
          'ves-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Подпоясанные косы', 'Закрученные пучки'],
          'ves-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничная малица', 'Лесной плащ'],
        'ves-clothing-extra'
      )
    }
  },
  {
    id: 'muroma',
    name: 'Мурома',
    description:
      'Финно-угорское племя по Оке, ассимилировавшееся восточными славянами.',
    modernEquivalent: 'Наследие в традициях жителей Владимирской и Нижегородской областей.',
    avatarEmoji: '🏞️',
    portraitSrc: '/images/factions/muroma.svg',
    traits: [
      'Пограничники на Оке и Клязьме',
      'Берестяные грамоты и летописные связи',
      'Женские обряды плодородия'
    ],
    maleNames: ['Олеш', 'Сергий', 'Анзий', 'Мирон', 'Торвальд'],
    femaleNames: ['Акулина', 'Марица', 'Илона', 'Василиса', 'Ольда'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Льняной сарафан', 'Тёплый каптан'],
      'muroma-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Речной талисман', 'Вышитый обруч'],
          'muroma-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Плетёный венец', 'Свободная волна'],
          'muroma-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничная понёва', 'Окольный плащ'],
        'muroma-clothing-extra'
      )
    }
  },
  {
    id: 'perm',
    name: 'Пермь',
    description:
      'Предки коми-пермяков, контролировавшие торговлю пушниной и металлургию на северо-востоке Руси.',
    modernEquivalent: 'Коми-пермяки и жители Пермского края.',
    avatarEmoji: '⛰️',
    portraitSrc: '/images/factions/perm.svg',
    traits: [
      'Торговля пушниной и металлами',
      'Медвежьи и оленьи тотемы',
      'Раннее христианство в сочетании с шаманизмом'
    ],
    maleNames: ['Микулай', 'Яром', 'Пама', 'Егма', 'Онни'],
    femaleNames: ['Ашка', 'Майа', 'Лани', 'Таня', 'Параска'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Меховой зипун', 'Орнаментированный кафтан'],
      'perm-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Медный оберег', 'Пояс с подвесками'],
          'perm-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Уложенные косы под кокошник', 'Северный обруч'],
          'perm-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный сарафан', 'Шкура северного зверя'],
        'perm-clothing-extra'
      )
    }
  },
  {
    id: 'komi',
    name: 'Коми',
    description:
      'Финно-угорский народ северо-востока Европы, отличающийся самобытной письменностью и культурой.',
    modernEquivalent: 'Современный народ коми.',
    avatarEmoji: '🧭',
    portraitSrc: '/images/factions/komi.svg',
    traits: [
      'Письменность анбур и собственные хроники',
      'Промыслы Севера и сплав по рекам',
      'Песенная традиция и эпосы о Пера Богда'
    ],
    maleNames: ['Пётр', 'Илья', 'Кан', 'Юрий', 'Мику'],
    femaleNames: ['Нев', 'Юла', 'Сима', 'Пелысь', 'Рая'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Парка с орнаментом', 'Тёплый пояс'],
      'komi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Берестяная диадема', 'Северные серьги'],
          'komi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Коса с лентой', 'Пучок под повойник'],
          'komi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный панар', 'Узорчатая безрукавка'],
        'komi-clothing-extra'
      )
    }
  },
  {
    id: 'karely',
    name: 'Карелы',
    description:
      'Финно-угорский народ лесов и озёр Северо-Запада, славящийся эпическими песнями.',
    modernEquivalent: 'Современные карелы России и Финляндии.',
    avatarEmoji: '🌲',
    portraitSrc: '/images/factions/karely.svg',
    traits: [
      'Карельские руны и эпос Калевала',
      'Озерные рыболовные поселения',
      'Ткачество с геометрическими узорами'
    ],
    maleNames: ['Антти', 'Лемми', 'Тапио', 'Вяйне', 'Юкка'],
    femaleNames: ['Айно', 'Марья', 'Лайма', 'Кайса', 'Синикка'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Оленья накидка', 'Валеная куртка'],
      'karely-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Гусли на ремне', 'Берёзовая подвеска'],
          'karely-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Свободные косы', 'Плетёный венок'],
          'karely-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный костюм Калевалы', 'Тёплый плащ с вышивкой'],
        'karely-clothing-extra'
      )
    }
  },
  {
    id: 'iudei',
    name: 'Иудеи',
    description:
      'Еврейские общины Хазарского каганата и купеческие караимы Причерноморья.',
    modernEquivalent: 'Современные еврейские общины Восточной Европы.',
    avatarEmoji: '✡️',
    portraitSrc: '/images/factions/iudei.svg',
    traits: [
      'Караимские торговые караваны',
      'Книжная традиция и изучение Торы',
      'Умение договариваться с правителями соседей'
    ],
    maleNames: ['Исаак', 'Давид', 'Яков', 'Самуил', 'Ханан'],
    femaleNames: ['Сара', 'Ривка', 'Лея', 'Эстер', 'Хава'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Мантия с талитом', 'Тканый кафтан'],
      'iudei-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Кипа', 'Мешочек с мезузой'],
          'iudei-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Пейсы и кудри', 'Собранный платок'],
          'iudei-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный талес', 'Купеческая накидка'],
        'iudei-clothing-extra'
      )
    }
  },
  {
    id: 'siveriane',
    name: 'Северяне',
    description:
      'Племена лесостепной Левобережной Украины, известные земледелием и ремеслом.',
    modernEquivalent: 'Часть восточнославянского населения северо-восточной Украины.',
    avatarEmoji: '🍂',
    portraitSrc: '/images/factions/siveriane.svg',
    traits: [
      'Плетение корзин и обработка лозы',
      'Укреплённые селения в лесостепи',
      'Осенние обряды благодарения'
    ],
    maleNames: ['Черниг', 'Олбег', 'Бран', 'Мал', 'Лют'],
    femaleNames: ['Милолика', 'Янка', 'Славина', 'Рогнеда', 'Веста'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Льняная рубаха', 'Пояс с пряжкой'],
      'siveriane-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Берестяная коробочка', 'Венок из дубовых листьев'],
          'siveriane-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Две косы через плечо', 'Кокошник с лентами'],
          'siveriane-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Плащ с орнаментом', 'Тёплая свита'],
        'siveriane-clothing-extra'
      )
    }
  },
  {
    id: 'radimichi',
    name: 'Радимичи',
    description:
      'Племя верховьев Сожа, славившееся ремеслом и торговлей янтарем.',
    modernEquivalent: 'Часть белорусского народа.',
    avatarEmoji: '🌀',
    portraitSrc: '/images/factions/radimichi.svg',
    traits: [
      'Янтарные украшения и торговые пути',
      'Родовые союзы и почитание предков',
      'Знаменитые кузнецы и резчики по кости'
    ],
    maleNames: ['Радим', 'Волод', 'Стемид', 'Грудо', 'Людомир'],
    femaleNames: ['Милана', 'Белослава', 'Радмила', 'Владена', 'Любава'],
    baseClothing: createVisualOptions(
      'clothing',
      ['Вышитая понёва', 'Льняной плащ'],
      'radimichi-clothing'
    ),
    optionsExtension: {
      appearance: {
        accessory: createVisualOptions(
          'accessory',
          ['Янтарные бусы', 'Поясная сумка'],
          'radimichi-accessory'
        ),
        hairStyle: createVisualOptions(
          'hair-style',
          ['Заплетённые венки', 'Свободные локоны'],
          'radimichi-hair-style'
        )
      },
      clothing: createVisualOptions(
        'clothing',
        ['Праздничный сарафан', 'Плащ с гербом рода'],
        'radimichi-clothing-extra'
      )
    }
  }
];

export const factions = factionsData;

export const getAppearanceOptions = (factionId: string): AppearanceOptionSet => {
  const faction = factions.find((item) => item.id === factionId);
  const merged: AppearanceOptionSet = {} as AppearanceOptionSet;

  (Object.keys(baseAppearanceOptions) as AppearanceOptionKey[]).forEach((key) => {
    const base = baseAppearanceOptions[key];
    const extra = faction?.optionsExtension?.appearance?.[key] ?? [];
    merged[key] = mergeVisualOptionLists(base, extra);
  });

  return merged;
};

const baseClothingOptions = createVisualOptions(
  'clothing',
  ['Базовая туника', 'Путевой плащ', 'Учебная броня'],
  'clothing-base'
);

export const getClothingOptions = (factionId: string): AppearanceVisualOption[] => {
  const faction = factions.find((item) => item.id === factionId);
  if (!faction) {
    return baseClothingOptions;
  }

  const extras = faction.optionsExtension?.clothing ?? [];
  return mergeVisualOptionLists(faction.baseClothing, extras, baseClothingOptions);
};

export const getInitialAppearance = (factionId: string): CharacterAppearance => {
  const options = getAppearanceOptions(factionId);
  return {
    hairStyle: options.hairStyle[0]?.id ?? '',
    hairColor: options.hairColor[0]?.id ?? '',
    faceShape: options.faceShape[0]?.id ?? '',
    eyeShape: options.eyeShape[0]?.id ?? '',
    eyeColor: options.eyeColor[0]?.id ?? '',
    nose: options.nose[0]?.id ?? '',
    lips: options.lips[0]?.id ?? '',
    accessory: options.accessory[0]?.id ?? ''
  };
};

export const getRandomName = (faction: Faction, gender: Gender): string => {
  const pool = gender === 'male' ? faction.maleNames : faction.femaleNames;
  if (pool.length === 0) {
    return 'Безымянный герой';
  }
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getRandomFromArray = <T,>(options: T[]): T => {
  return options[Math.floor(Math.random() * options.length)];
};
