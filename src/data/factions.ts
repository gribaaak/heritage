import type {
  AppearanceOptionKey,
  AppearanceOptionSet,
  CharacterAppearance,
  Faction,
  Gender
} from './types';

const baseAppearanceOptions: AppearanceOptionSet = {
  hairStyle: [
    'Длинные косы',
    'Короткие пряди',
    'Хвост',
    'Распущенные волосы',
    'Уложенные локоны'
  ],
  hairColor: ['Светлые', 'Русые', 'Темные', 'Медные', 'Чёрные'],
  faceShape: ['Овальное', 'Квадратное', 'Треугольное', 'Круглое'],
  eyeShape: ['Миндалевидные', 'Круглые', 'Узкие'],
  eyeColor: ['Серые', 'Карие', 'Синие', 'Зелёные', 'Ореховые'],
  nose: ['Прямой', 'Орлиный', 'Курносый'],
  lips: ['Тонкие', 'Полные', 'Средние'],
  accessory: ['Без украшений', 'Торс с амулетом', 'Лобная повязка', 'Серьги', 'Шрам на щеке']
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
    baseClothing: ['Меховой плащ', 'Льняной кафтан', 'Кожаная куртка'],
    optionsExtension: {
      appearance: {
        hairColor: ['Пшеничные', 'Пепельные', 'Рыжие'],
        accessory: ['Рунный амулет', 'Меховой ворот', 'Кольчуга']
      },
      clothing: ['Кольчужный доспех', 'Плащ с фибулой']
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
    baseClothing: ['Тканый плащ', 'Короткий жупан', 'Плетёная безрукавка'],
    optionsExtension: {
      appearance: {
        hairStyle: ['Заплетённые косы', 'Полувоздушные локоны'],
        accessory: ['Янтарное ожерелье', 'Головная лента']
      },
      clothing: ['Янтарный плащ', 'Жупан с вышивкой']
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
    baseClothing: ['Льняная туника', 'Пояс с орнаментом'],
    optionsExtension: {
      appearance: {
        accessory: ['Венок из трав', 'Орнаментированный пояс'],
        hairStyle: ['Заплетённая корона', 'Свободные волны']
      },
      clothing: ['Плащ с этническим узором']
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
    baseClothing: ['Морской плащ', 'Плотная куртка'],
    optionsExtension: {
      appearance: {
        accessory: ['Морской амулет', 'Торговая сумка'],
        hairStyle: ['Подбритые виски', 'Длинная челка']
      },
      clothing: ['Плащ с меховой отделкой', 'Кожаный пояс с подвесками']
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
    baseClothing: ['Полотняная рубаха', 'Льняной сарафан'],
    optionsExtension: {
      appearance: {
        accessory: ['Бисерная гирлянда', 'Тканый головной убор']
      },
      clothing: ['Жемчужная накидка']
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
    baseClothing: ['Боевой плащ', 'Кожаная броня'],
    optionsExtension: {
      appearance: {
        accessory: ['Боевые краски', 'Защитный браслет'],
        hairStyle: ['Заплетённый гребень', 'Высокий пучок']
      },
      clothing: ['Кожаный нагрудник', 'Шерстяной плащ']
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
    baseClothing: ['Вышитая рубаха', 'Плащ с фибулой', 'Поясная перевязь'],
    optionsExtension: {
      appearance: {
        accessory: ['Серебряное кольцо', 'Кийский амулет'],
        hairStyle: ['Кичка с лентами', 'Плетёная коса с подвесками']
      },
      clothing: ['Парчовый плащ', 'Льняной сарафан']
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
    baseClothing: ['Суконный жупан', 'Поясная плащаница'],
    optionsExtension: {
      appearance: {
        accessory: ['Орлиная брошь', 'Россыпь бус'],
        hairStyle: ['Оплетённый венец', 'Высокий чепец']
      },
      clothing: ['Жупан с гербовой вышивкой', 'Плащ с меховой опушкой']
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
    baseClothing: ['Хитон', 'Плащ-хламида', 'Золототканый пояс'],
    optionsExtension: {
      appearance: {
        accessory: ['Иконический кулон', 'Золотая диадема'],
        hairStyle: ['Кудри с лентами', 'Уложенные локоны']
      },
      clothing: ['Пурпурный гиматий', 'Парадный кафтан']
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
    baseClothing: ['Льняной кафтан', 'Воинский ламеллярный доспех'],
    optionsExtension: {
      appearance: {
        accessory: ['Тюркский амулет', 'Шлем с маской'],
        hairStyle: ['Подбритый затылок', 'Косичка-оселедец']
      },
      clothing: ['Кожаный доспех', 'Парадный плащ царя']
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
    baseClothing: ['Шёлковый кафтан', 'Куртка с лампасами'],
    optionsExtension: {
      appearance: {
        accessory: ['Степной тюрбан', 'Торговый талар'],
        hairStyle: ['Заплетённые виски', 'Собранный пучок']
      },
      clothing: ['Золотошвейный плащ', 'Степная броня']
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
    baseClothing: ['Тюбетейка', 'Вышитый камзол'],
    optionsExtension: {
      appearance: {
        accessory: ['Лунный амулет', 'Зернь на висках'],
        hairStyle: ['Коса с монетами', 'Уложенный тюрбан']
      },
      clothing: ['Парчовый камзол', 'Короткий бешмет']
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
    baseClothing: ['Степной кафтан', 'Меховой тулуп'],
    optionsExtension: {
      appearance: {
        accessory: ['Колчан с орнаментом', 'Степная подвеска'],
        hairStyle: ['Заплетённая гривка', 'Свисающие косы']
      },
      clothing: ['Шкурный плащ', 'Кожаный панцирь']
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
    baseClothing: ['Кольчужная рубаха', 'Куртка из сафьяна'],
    optionsExtension: {
      appearance: {
        accessory: ['Наёмничий знак', 'Кистень на поясе'],
        hairStyle: ['Подбритая макушка', 'Заплетённый хвост']
      },
      clothing: ['Кольчуга с пластинами', 'Шапка с меховой околышкой']
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
    baseClothing: ['Степная чепрага', 'Куртка из войлока'],
    optionsExtension: {
      appearance: {
        accessory: ['Туранский амулет', 'Птичье перо'],
        hairStyle: ['Свободные косы', 'Подбритый висок']
      },
      clothing: ['Лёгкий ламеллярный доспех', 'Праздничный камзол']
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
    baseClothing: ['Шерстяная накидка', 'Орнаментированный сарафан'],
    optionsExtension: {
      appearance: {
        accessory: ['Серебряные фибулы', 'Берестяной амулет'],
        hairStyle: ['Коса с лентами', 'Уложенный венец']
      },
      clothing: ['Праздничный костюм с бисером', 'Шерстяной плащ']
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
    baseClothing: ['Длинная понёва', 'Берестяной плащ'],
    optionsExtension: {
      appearance: {
        accessory: ['Волнистое ожерелье', 'Речной амулет'],
        hairStyle: ['Разделённая коса', 'Низкий узел']
      },
      clothing: ['Северный плат', 'Вышитая рубаха с бисером']
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
    baseClothing: ['Меховая парка', 'Тёплая понёва'],
    optionsExtension: {
      appearance: {
        accessory: ['Бубенцы на поясе', 'Плетёная тесьма'],
        hairStyle: ['Подпоясанные косы', 'Закрученные пучки']
      },
      clothing: ['Праздничная малица', 'Лесной плащ']
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
    baseClothing: ['Льняной сарафан', 'Тёплый каптан'],
    optionsExtension: {
      appearance: {
        accessory: ['Речной талисман', 'Вышитый обруч'],
        hairStyle: ['Плетёный венец', 'Свободная волна']
      },
      clothing: ['Праздничная понёва', 'Окольный плащ']
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
    baseClothing: ['Меховой зипун', 'Орнаментированный кафтан'],
    optionsExtension: {
      appearance: {
        accessory: ['Медный оберег', 'Пояс с подвесками'],
        hairStyle: ['Уложенные косы под кокошник', 'Северный обруч']
      },
      clothing: ['Праздничный сарафан', 'Шкура северного зверя']
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
    baseClothing: ['Парка с орнаментом', 'Тёплый пояс'],
    optionsExtension: {
      appearance: {
        accessory: ['Берестяная диадема', 'Северные серьги'],
        hairStyle: ['Коса с лентой', 'Пучок под повойник']
      },
      clothing: ['Праздничный панар', 'Узорчатая безрукавка']
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
    baseClothing: ['Оленья накидка', 'Валеная куртка'],
    optionsExtension: {
      appearance: {
        accessory: ['Гусли на ремне', 'Берёзовая подвеска'],
        hairStyle: ['Свободные косы', 'Плетёный венок']
      },
      clothing: ['Праздничный костюм Калевалы', 'Тёплый плащ с вышивкой']
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
    baseClothing: ['Мантия с талитом', 'Тканый кафтан'],
    optionsExtension: {
      appearance: {
        accessory: ['Кипа', 'Мешочек с мезузой'],
        hairStyle: ['Пейсы и кудри', 'Собранный платок']
      },
      clothing: ['Праздничный талес', 'Купеческая накидка']
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
    baseClothing: ['Льняная рубаха', 'Пояс с пряжкой'],
    optionsExtension: {
      appearance: {
        accessory: ['Берестяная коробочка', 'Венок из дубовых листьев'],
        hairStyle: ['Две косы через плечо', 'Кокошник с лентами']
      },
      clothing: ['Плащ с орнаментом', 'Тёплая свита']
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
    baseClothing: ['Вышитая понёва', 'Льняной плащ'],
    optionsExtension: {
      appearance: {
        accessory: ['Янтарные бусы', 'Поясная сумка'],
        hairStyle: ['Заплетённые венки', 'Свободные локоны']
      },
      clothing: ['Праздничный сарафан', 'Плащ с гербом рода']
    }
  }
];

export const factions = factionsData;

export const getAppearanceOptions = (factionId: string): AppearanceOptionSet => {
  const faction = factions.find((item) => item.id === factionId);
  if (!faction) {
    return baseAppearanceOptions;
  }

  const merged: AppearanceOptionSet = { ...baseAppearanceOptions };

  if (faction.optionsExtension?.appearance) {
    (Object.keys(faction.optionsExtension.appearance) as AppearanceOptionKey[]).forEach((key) => {
      const extra = faction.optionsExtension?.appearance?.[key] ?? [];
      const base = baseAppearanceOptions[key];
      merged[key] = Array.from(new Set([...base, ...extra]));
    });
  }

  return merged;
};

export const getClothingOptions = (factionId: string): string[] => {
  const faction = factions.find((item) => item.id === factionId);
  if (!faction) {
    return baseClothingOptions;
  }

  const extras = faction.optionsExtension?.clothing ?? [];
  return Array.from(new Set([...faction.baseClothing, ...extras, ...baseClothingOptions]));
};

const baseClothingOptions = ['Базовая туника', 'Путевой плащ', 'Учебная броня'];

export const getInitialAppearance = (factionId: string): CharacterAppearance => {
  const options = getAppearanceOptions(factionId);
  return {
    hairStyle: options.hairStyle[0],
    hairColor: options.hairColor[0],
    faceShape: options.faceShape[0],
    eyeShape: options.eyeShape[0],
    eyeColor: options.eyeColor[0],
    nose: options.nose[0],
    lips: options.lips[0],
    accessory: options.accessory[0]
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
