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
