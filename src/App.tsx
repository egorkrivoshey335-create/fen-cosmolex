import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './App.css'

const ScrollHint = lazy(() => import('./ScrollHint'))

type HeaderSlide = {
  id: string
  place: string
  title: string
  title2: string
  description: string
  image: string
  buyUrl: string
  accent: string
}

type HeroStorySlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  note: string
  seoTerms: string[]
}

type PainSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  background: string
}

type BenefitsSlide = {
  id: string
  eyebrow: string
  title: string
  meta: string
  description: string
  tags: string[]
  rotation: number
  note?: string
}

type AttachmentSlide = {
  id: string
  navLabel: string
  eyebrow: string
  title: string
  description: string
  fit: string
  note?: string
}

type HairProfileSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  detail: string
  note?: string
  galleryOffset: number
}

type ComfortSlide = {
  id: string
  navLabel: string
  eyebrow: string
  title: string
  description: string
  detail: string
  note?: string
  intro?: boolean
  backgroundDesktop?: string
  backgroundMobile?: string
  videoDesktop?: string
  videoMobile?: string
}

type GiftSlide = {
  id: string
  navLabel: string
  eyebrow: string
  title: string
  description: string
  detail: string
  note?: string
  intro?: boolean
  backgroundDesktop?: string
  backgroundMobile?: string
  videoDesktop?: string
  videoMobile?: string
}

type ComparisonPair = {
  ordinary: string
  cosmolex: string
}

type ComparisonSlide = {
  id: string
  navLabel: string
  eyebrow: string
  title: string
  description: string
  summary?: string
  intro?: boolean
  accent?: 'ordinary' | 'cosmolex'
  backgroundDesktop?: string
  backgroundMobile?: string
  videoDesktop?: string
  videoMobile?: string
}

type PackageTimelineItem = {
  id: string
  text: string
}

type SpecificationItem = {
  id: string
  label: string
  value: string
}

type FaqItem = {
  id: string
  question: string
  answer: string
}

type FinalCtaCard = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  description: string
  buyUrl: string
  accent: string
  backgroundDesktop: string
  backgroundMobile: string
  videoDesktop: string
  videoMobile: string
}

type ActiveSurface =
  | 'header'
  | 'hero-story'
  | 'pain'
  | 'benefits'
  | 'attachments'
  | 'hair-types'
  | 'comfort'
  | 'comparison'
  | 'package'
  | 'specs'
  | 'gift'
  | 'faq'
  | 'final-cta'
const headerSlides: HeaderSlide[] = [
  {
    id: 'black',
    place: 'Чёрный',
    title: 'BLACK',
    title2: 'EDITION',
    description:
      'Глубокий чёрный Cosmolex Super Air — фен-стайлер 5 в 1 с магнитными насадками, ионизацией и холодным обдувом для быстрой сушки, гладкости и аккуратной укладки дома.',
    image: 'https://assets.codepen.io/3685267/timed-cards-1.jpg',
    buyUrl: 'https://cosmolex.ru/product/fen-dlya-volos-professionalnyy-stayler-s-nasadkami',
    accent: '#242426',
  },
  {
    id: 'pink',
    place: 'Розовый',
    title: 'PINK',
    title2: 'EDITION',
    description:
      'Розовый Cosmolex Super Air для мягкого beauty-образа каждый день. Фен для волос с ионизацией помогает уменьшить пушение, сделать волосы более гладкими, послушными и ухоженными после сушки.',
    image: 'https://assets.codepen.io/3685267/timed-cards-2.jpg',
    buyUrl: 'https://cosmolex.ru/product/fen-dlya-volos-professionalnyy-stayler-s-nasadkami-2',
    accent: '#efcdba',
  },
  {
    id: 'violet',
    place: 'Фиолетовый',
    title: 'VIOLET',
    title2: 'EDITION',
    description:
      'Фиолетовая версия Cosmolex Super Air для тех, кто любит заметные детали. 5 насадок, 4 режима работы и холодный обдув помогают сушить, укладывать и фиксировать форму.',
    image: 'https://assets.codepen.io/3685267/timed-cards-3.jpg',
    buyUrl: 'https://cosmolex.ru/product/fen-dlya-volos-professionalnyy-stayler-s-nasadkami-fioletovyy',
    accent: '#c3b8ef',
  },
  {
    id: 'tiffany',
    place: 'Тиффани',
    title: 'TIFFANY',
    title2: 'EDITION',
    description:
      'Cosmolex Super Air в оттенке тиффани — свежий акцент в коллекции. Один компактный фен-стайлер для сушки, прикорневого объёма, гладкости, локонов и повседневной укладки.',
    image: 'https://assets.codepen.io/3685267/timed-cards-4.jpg',
    buyUrl: 'https://cosmolex.ru/product/fen-dlya-volos-professionalnyy-stayler-s-nasadkami-zelyonyy',
    accent: '#9ee8de',
  },
]

const logoUrl =
  'https://static.insales-cdn.com/files/1/5753/124204665/original/%D0%9D%D0%BE%D0%B2%D1%8B%D0%B9_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82__4___1_.webp'

const heroStoryVideoUrl =
  'https://static.insales-cdn.com/files/1/5169/124187697/original/14571370_1920_1080_60fps.mp4'

const heroStoryMobileVideoUrl =
  'https://static.insales-cdn.com/files/1/1865/124331849/original/0_Field_Wheat_720x1280.mp4'

const benefitsDesktopVideoUrl =
  'https://static.insales-cdn.com/files/1/5169/124187697/original/14571370_1920_1080_60fps.mp4'

const benefitsMobileVideoUrl =
  'https://static.insales-cdn.com/files/1/1865/124331849/original/0_Field_Wheat_720x1280.mp4'

const heroStorySlides: HeroStorySlide[] = [
  {
    id: 'intro',
    eyebrow: '01 / Cosmolex Super Air',
    title: 'Фен-стайлер для укладки как после салона — каждый день',
    description:
      'Cosmolex Super Air — мощный фен для волос 1600 Вт с ионизацией, холодным обдувом и 5 магнитными насадками. Он быстро сушит, бережно укладывает, помогает уменьшить пушение и сохранить гладкость волос без ощущения пересушенной длины.',
    note: 'Быстро. Бережно. Под контролем.',
    seoTerms: ['фен-стайлер', 'фен стайлер', 'мощный фен 1600 Вт', 'фен для укладки волос'],
  },
  {
    id: 'attachments',
    eyebrow: '02 / 5 насадок в комплекте',
    title: 'Один фен-стайлер — несколько сценариев укладки дома',
    description:
      'Пять магнитных насадок помогают сушить волосы, вытягивать пряди, оформлять локоны, создавать прикорневой объём и работать с непослушной длиной. Не нужно держать дома отдельный набор приборов для каждой укладки.',
    note: 'Один прибор вместо нескольких устройств для волос.',
    seoTerms: ['фен с насадками', 'фен для волос', 'профессиональный фен', 'фен для объёма волос'],
  },
  {
    id: 'ionization',
    eyebrow: '03 / Ионизация против пушения',
    title: 'Волосы после сушки выглядят более гладкими, мягкими и послушными',
    description:
      'Функция ионизации помогает уменьшить статическое электричество, снизить пушение и сделать ежедневную укладку комфортнее. Особенно заметно на пористых, сухих, окрашенных и непослушных волосах.',
    note: 'Меньше электризации, больше гладкости и естественного блеска.',
    seoTerms: ['фен с ионизацией', 'гладкость волос', 'антистатический эффект', 'меньше пушения'],
  },
  {
    id: 'modes',
    eyebrow: '04 / 4 режима и холодный обдув',
    title: 'Настройте сушку под свои волосы, а не под одну температуру',
    description:
      'Четыре режима работы и холодный обдув помогают выбрать комфортный сценарий: быстрая сушка после мытья, более деликатная работа с длиной или финальная фиксация укладки холодным воздухом.',
    note: 'Подходит для ежедневной бережной укладки и фиксации формы.',
    seoTerms: ['фен с холодным обдувом', '4 режима работы', 'бережная сушка волос', 'фен с регулировкой температуры'],
  },
  {
    id: 'lifestyle',
    eyebrow: '05 / Дом, поездки, подарок',
    title: 'Компактный фен для дома и поездок, который приятно купить себе или в подарок',
    description:
      'Cosmolex Super Air подходит для ежедневной укладки дома, поездок и подарочного сценария. А 4 стильных цвета помогают выбрать не просто фен для волос, а красивый beauty-tech прибор под свой вкус.',
    note: 'Чёрный, розовый, фиолетовый и тиффани — одна модель в четырёх оттенках.',
    seoTerms: ['компактный фен', 'фен для дома', 'фен в подарок женщине', 'фен для путешествий'],
  },
]

const painSlides: PainSlide[] = [
  {
    id: 'intro',
    eyebrow: '01 / Боль обычного фена',
    title: 'Фен вроде сушит, но волосы после него не радуют?',
    description:
      'Обычный фен часто приходится терпеть: он шумит, пересушивает длину, поднимает пушение и превращает быструю укладку в утренний марафон. Особенно если волосы густые, окрашенные, пористые, кудрявые или просто не хотят лежать так, как нужно.',
    background:
      'https://images.pexels.com/photos/2249527/pexels-photo-2249527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'dryness',
    eyebrow: '02 / Горячий воздух',
    title: 'Горячий воздух сушит не только влагу',
    description:
      'После обычной сушки кончики могут казаться жёсткими, сухими и уставшими. Волосы теряют мягкость, хуже расчёсываются и требуют больше ухода после укладки.',
    background:
      'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'frizz',
    eyebrow: '03 / Пушение после сушки',
    title: 'Пушение появляется даже после стараний',
    description:
      'Вроде бы высушили волосы аккуратно, но через несколько минут пряди начинают торчать, электризоваться и выбиваться из формы. Особенно это заметно на пористых и окрашенных волосах.',
    background:
      'https://images.pexels.com/photos/1517076/pexels-photo-1517076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'devices',
    eyebrow: '04 / Слишком много техники',
    title: 'Для укладки нужно слишком много приборов',
    description:
      'Один фен — для сушки, брашинг — для объёма, утюжок — для гладкости, отдельный стайлер — для волн. В итоге укладка занимает больше времени, а полка в ванной забита техникой.',
    background:
      'https://images.pexels.com/photos/1037996/pexels-photo-1037996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'morning',
    eyebrow: '05 / Утренний ритм',
    title: 'Утром нет времени долго стоять у зеркала',
    description:
      'Когда нужно быстро собраться, важна не только мощность фена, но и удобство: подходящий режим, насадка под задачу и возможность быстро зафиксировать результат холодным воздухом.',
    background:
      'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
]

const benefitsSlides: BenefitsSlide[] = [
  {
    id: 'intro',
    eyebrow: '01 / Что Cosmolex делает иначе',
    title: 'Не просто поток горячего воздуха',
    meta: 'а понятная система для укладки',
    description:
      'Cosmolex Super Air создан для тех, кто хочет не "как получится", а аккуратную домашнюю укладку без лишних приборов, сложных движений и ощущения пересушенных волос.',
    tags: ['1600 Вт', '5 насадок', 'Без лишних приборов'],
    rotation: -1,
  },
  {
    id: 'drying',
    eyebrow: '02 / Быстрая сушка',
    title: 'Быстрая сушка',
    meta: 'без лишней суеты',
    description:
      'Мощность 1600 Вт помогает быстрее убрать влагу после мытья и перейти к укладке. Это особенно удобно для густых, длинных и плотных волос.',
    tags: ['1600 Вт', 'После мытья', 'Для густых волос'],
    rotation: 1,
  },
  {
    id: 'modes',
    eyebrow: '03 / Режим под ваш тип волос',
    title: 'Режим под ваш тип волос',
    meta: '4 режима и 2 скорости',
    description:
      'Не нужно сушить тонкие, окрашенные и густые волосы одинаково. Можно выбрать мягкий сценарий для длины или более интенсивный поток, когда нужно быстрее собраться.',
    tags: ['4 режима', '2 скорости', 'Под разный тип волос'],
    rotation: 0,
  },
  {
    id: 'smooth',
    eyebrow: '04 / Гладкость без пушения',
    title: 'Гладкость',
    meta: 'без ощущения "одуванчика"',
    description:
      'Фен с ионизацией помогает уменьшить статическое электричество и визуальное пушение. После сушки волосы выглядят более спокойными, мягкими и послушными.',
    tags: ['Ионизация', 'Меньше пушения', 'Больше послушности'],
    rotation: 1,
  },
  {
    id: 'cool-shot',
    eyebrow: '05 / Фиксация холодным воздухом',
    title: 'Фиксация',
    meta: 'холодным воздухом',
    description:
      'Холодный обдув помогает завершить укладку: охладить пряди, закрепить форму и сделать результат более аккуратным. Это полезно и для гладкой укладки, и для объёма, и для локонов.',
    tags: ['Холодный обдув', 'Фиксация формы', 'Аккуратный финал'],
    rotation: -1,
    note:
      'Это не про сложную салонную технику. Это про нормальный фен-стайлер для волос, которым удобно пользоваться дома каждый день.',
  },
]

const attachmentSlides: AttachmentSlide[] = [
  {
    id: 'overview',
    navLabel: 'Обзор',
    eyebrow: '01 / 5 насадок в комплекте',
    title: 'Одна ручка — пять вариантов укладки',
    description:
      'В комплекте уже есть 5 магнитных насадок. Не нужно докупать аксессуары отдельно: можно сушить волосы, вытягивать пряди, создавать объём, работать с кудрями и приглаживать непослушную длину.',
    fit: 'Подходит для: повседневной сушки, смены сценариев укладки и быстрого старта без лишних аксессуаров.',
    note:
      'Магнитное крепление позволяет менять насадки быстро и без усилий — особенно удобно утром, когда каждая минута на счету.',
  },
  {
    id: 'concentrator',
    navLabel: 'Концентратор',
    eyebrow: '02 / Концентратор',
    title: 'Для точной направленной укладки',
    description:
      'Помогает вытягивать пряди на брашинг, аккуратно прорабатывать кончики и делать волосы визуально более гладкими.',
    fit: 'Подходит для: гладкой укладки, каре, длинных волос, укладки с расчёской.',
  },
  {
    id: 'diffuser',
    navLabel: 'Диффузор',
    eyebrow: '03 / Диффузор',
    title: 'Для кудрявых и волнистых волос',
    description:
      'Распределяет воздух мягче, помогает сушить завиток аккуратнее и не разбивать форму локонов.',
    fit: 'Подходит для: кудрей, волн, естественного объёма, бережной сушки.',
  },
  {
    id: 'gentle-dry',
    navLabel: 'Бережная сушка',
    eyebrow: '04 / Насадка для бережного высушивания',
    title: 'Для мягкой ежедневной сушки',
    description:
      'Хороший вариант, когда волосы тонкие, сухие, окрашенные или чувствительные к горячему воздуху.',
    fit: 'Подходит для: тонких, окрашенных, сухих и ослабленных волос.',
  },
  {
    id: 'smooth',
    navLabel: 'Непослушные волосы',
    eyebrow: '05 / Насадка для непослушных волос',
    title: 'Помогает пригладить длину и уменьшить пушение',
    description:
      'Делает волосы более аккуратными после сушки и помогает быстрее собрать спокойную, собранную форму.',
    fit: 'Подходит для: пористых, пушащихся и непослушных волос.',
  },
  {
    id: 'volume',
    navLabel: 'Объём и форма',
    eyebrow: '06 / Насадка для объёма и формы',
    title: 'Помогает приподнять волосы у корней и добавить форму',
    description:
      'Даёт воздушность и помогает собрать быструю повседневную укладку без сложных инструментов.',
    fit: 'Подходит для: прикорневого объёма, лёгкой текстуры и укладки на каждый день.',
    note:
      'Магнитное крепление позволяет менять насадки быстро и без усилий — особенно удобно утром, когда каждая минута на счету.',
  },
]

const hairProfileSlides: HairProfileSlide[] = [
  {
    id: 'intro',
    eyebrow: '01 / Для каких волос подойдёт',
    title: 'Подходит не под один "идеальный" тип волос, а под разные задачи',
    description:
      'Волосы у всех разные: кому-то нужна быстрая сушка, кому-то — гладкость, кому-то — объём, а кому-то важно не пересушить окрашенную длину. Cosmolex Super Air можно настроить под свой сценарий.',
    detail:
      'Это хороший фен для волос на каждый день: не только для "особого случая", а для обычной жизни, когда хочется выглядеть ухоженно без лишней возни.',
    galleryOffset: 0,
  },
  {
    id: 'thick',
    eyebrow: '02 / Густые и длинные волосы',
    title: 'Для густых и длинных волос',
    description:
      'Мощность 1600 Вт и направленный поток помогают быстрее справляться с плотной длиной. Не нужно стоять у зеркала бесконечно долго после каждого мытья головы.',
    detail:
      'Подходит, когда хочется сократить время сушки и быстрее перейти к укладке без ощущения бесконечного процесса.',
    galleryOffset: 3,
  },
  {
    id: 'thin-colored',
    eyebrow: '03 / Тонкие и окрашенные волосы',
    title: 'Для тонких и окрашенных волос',
    description:
      'Можно выбрать более деликатный режим и сушить волосы мягче. Это важно, если длина быстро теряет гладкость, кончики становятся сухими, а волосы чувствительны к высокой температуре.',
    detail:
      'Комфортный вариант для более бережной сушки, когда важно сохранить ощущение мягкости и не перегреть длину.',
    galleryOffset: 6,
  },
  {
    id: 'curly',
    eyebrow: '04 / Кудри и волны',
    title: 'Для кудрей и волн',
    description:
      'Диффузор помогает сушить завиток аккуратнее, сохранить форму локонов и уменьшить пушение. Хороший вариант для волнистых, кудрявых и пористых волос.',
    detail:
      'Подходит для сценариев, где важно не разбить завиток и получить более собранную, спокойную текстуру.',
    galleryOffset: 9,
  },
  {
    id: 'daily',
    eyebrow: '05 / Ежедневная укладка дома',
    title: 'Для ежедневной укладки дома',
    description:
      'Фен-стайлер подходит для быстрых утренних сборов, сушки после душа, укладки перед встречей или подготовки волос к выходу без похода в салон.',
    detail:
      'Это хороший фен для волос на каждый день: не только для "особого случая", а для обычной жизни, когда хочется выглядеть ухоженно без лишней возни.',
    note:
      'Один прибор под разные сценарии: быстрая сушка, объём, гладкость, бережный режим и аккуратная укладка без лишней техники.',
    galleryOffset: 12,
  },
]

const blockNavItems = [
  { id: 'header', number: '1', label: 'Анонс' },
  { id: 'hero-story', number: '2', label: 'Hero-блок' },
  { id: 'pain', number: '3', label: 'Блок боли' },
  { id: 'benefits', number: '4', label: 'Преимущества' },
  { id: 'attachments', number: '5', label: 'Насадки' },
  { id: 'hair-types', number: '6', label: 'Типы волос' },
  { id: 'comfort', number: '7', label: 'Комфорт' },
  { id: 'comparison', number: '8', label: 'Сравнение' },
  { id: 'package', number: '9', label: 'Комплектация' },
  { id: 'specs', number: '10', label: 'Характеристики' },
  { id: 'gift', number: '11', label: 'Подарок' },
  { id: 'faq', number: '12', label: 'FAQ' },
  { id: 'final-cta', number: '13', label: 'Финал' },
] as const

const HAIR_TYPES_STAR_CLIP =
  'polygon(50% 4%, 56% 18%, 62% 28%, 68% 32%, 72% 38%, 82% 44%, 96% 50%, 82% 56%, 72% 62%, 68% 68%, 62% 72%, 56% 82%, 50% 96%, 44% 82%, 38% 72%, 32% 68%, 28% 62%, 18% 56%, 4% 50%, 18% 44%, 28% 38%, 32% 32%, 38% 28%, 44% 18%)'
const HAIR_TYPES_RECT_CLIP =
  'polygon(0% 0%, 12.5% 0%, 25% 0%, 37.5% 0%, 50% 0%, 62.5% 0%, 75% 0%, 87.5% 0%, 100% 0%, 100% 12.5%, 100% 25%, 100% 37.5%, 100% 50%, 100% 62.5%, 100% 75%, 100% 87.5%, 100% 100%, 87.5% 100%, 75% 100%, 62.5% 100%, 50% 100%, 37.5% 100%, 25% 100%, 12.5% 100%)'

const hairGalleryImages = [
  'https://images.pexels.com/photos/10324713/pexels-photo-10324713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10533885/pexels-photo-10533885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10253213/pexels-photo-10253213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10050979/pexels-photo-10050979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1128660/pexels-photo-1128660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9699293/pexels-photo-9699293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6405575/pexels-photo-6405575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10162526/pexels-photo-10162526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4394807/pexels-photo-4394807.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6621467/pexels-photo-6621467.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7755653/pexels-photo-7755653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
] as const

const getHairGalleryColumns = (offset: number) =>
  [
    [0, 1, 2].map((index) => hairGalleryImages[(offset + index) % hairGalleryImages.length]),
    [3, 4, 5].map((index) => hairGalleryImages[(offset + index) % hairGalleryImages.length]),
    [6, 7, 8].map((index) => hairGalleryImages[(offset + index) % hairGalleryImages.length]),
  ] as const

const comfortIntroDesktopVideoUrl = 'https://www.yudiz.com/codepen/studio-r/bg-video.mp4'
const comfortIntroMobileVideoUrl = heroStoryMobileVideoUrl
const comfortFeatureDesktopVideoUrl = 'https://www.yudiz.com/codepen/studio-r/bg-video.mp4'
const comfortFeatureMobileVideoUrl = heroStoryMobileVideoUrl

const comfortSlides: ComfortSlide[] = [
  {
    id: 'intro',
    navLabel: 'Комфорт',
    eyebrow: '01 / Комфорт в использовании',
    title: 'Удобство чувствуется не в описании, а в руке',
    description:
      'Фен может быть мощным, но если им неудобно пользоваться, укладка всё равно будет раздражать. Поэтому в Cosmolex Super Air важны не только режимы и насадки, но и повседневные детали.',
    detail:
      'Фен удобно держать у зеркала, менять насадки по ходу укладки и выбирать режим под ситуацию. Кабель 170 см даёт больше свободы движения, а компактный корпус проще хранить дома и брать с собой в поездку.',
    intro: true,
    videoDesktop: comfortIntroDesktopVideoUrl,
    videoMobile: comfortIntroMobileVideoUrl,
  },
  {
    id: 'magnetic',
    navLabel: 'Магнитные насадки',
    eyebrow: '02 / Комфорт в использовании',
    title: 'Магнитные насадки меняются одним движением',
    description:
      'Переключаться между сценариями укладки можно быстро и без лишних усилий. Насадка встаёт на место чётко, поэтому не приходится тратить время на лишние манипуляции перед зеркалом.',
    detail: 'Удобно, когда утром хочется быстрее перейти от сушки к форме и не выпадать из ритма.',
    backgroundDesktop: 'https://www.yudiz.com/codepen/studio-r/bg-living.jpg',
    backgroundMobile: hairGalleryImages[1],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'cable',
    navLabel: 'Кабель 170 см',
    eyebrow: '03 / Комфорт в использовании',
    title: 'Кабель 170 см не ограничивает у зеркала',
    description:
      'Есть больше свободы движения, когда нужно повернуть фен, сменить руку или подойти ближе к зеркалу. Это особенно заметно в небольших ванных и спальнях, где каждые лишние сантиметры важны.',
    detail: 'Меньше ощущения, что прибор тянет назад или заставляет подстраиваться под розетку.',
    backgroundDesktop: 'https://www.yudiz.com/codepen/studio-r/bg-kitchen.jpg',
    backgroundMobile: hairGalleryImages[2],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'compact',
    navLabel: 'Компактный формат',
    eyebrow: '04 / Комфорт в использовании',
    title: 'Компактный формат удобно хранить дома',
    description:
      'Фен проще убрать в шкаф, ящик или на полку, не выделяя под него отдельное большое место. Он не перегружает пространство и легче вписывается в повседневный быт.',
    detail: 'Удобное решение, когда дома не хочется держать громоздкую технику на виду.',
    backgroundDesktop: 'https://www.yudiz.com/codepen/studio-r/bg-badroom.jpg',
    backgroundMobile: hairGalleryImages[3],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'travel',
    navLabel: 'Для поездок',
    eyebrow: '05 / Комфорт в использовании',
    title: 'Подходит для поездок и командировок',
    description:
      'Компактный корпус и понятный формат делают фен удобным спутником в дороге. Его проще взять с собой, чем несколько отдельных приборов под разные укладки.',
    detail: 'Когда хочется выглядеть аккуратно не только дома, но и в поездке, без лишнего объёма в багаже.',
    backgroundDesktop: 'https://www.yudiz.com/codepen/studio-r/bg-office.jpg',
    backgroundMobile: hairGalleryImages[4],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'controls',
    navLabel: 'Понятное управление',
    eyebrow: '06 / Комфорт в использовании',
    title: 'Понятное управление без сложных настроек',
    description:
      'Режимы переключаются интуитивно, поэтому не нужно каждый раз заново вспоминать, что и где включается. Пользоваться феном проще даже в спешке.',
    detail: 'Хорошо работает в повседневном сценарии, когда важно быстро начать сушку и укладку без лишних пауз.',
    backgroundDesktop: hairGalleryImages[5],
    backgroundMobile: hairGalleryImages[6],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'design',
    navLabel: 'Стильный внешний вид',
    eyebrow: '07 / Комфорт в использовании',
    title: 'Стильный внешний вид не похож на обычную бытовую технику',
    description:
      'Прибор выглядит аккуратно и современно, поэтому его приятно держать на виду и брать в руки каждый день. Визуально он воспринимается как beauty-tech, а не как случайный бытовой компромисс.',
    detail: 'Это тот случай, когда функциональность не спорит с эстетикой в повседневном использовании.',
    backgroundDesktop: hairGalleryImages[7],
    backgroundMobile: hairGalleryImages[8],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'quiet',
    navLabel: 'Тихая работа',
    eyebrow: '08 / Комфорт в использовании',
    title: 'Тихая работа до 60 дБ',
    description:
      'Сушить волосы комфортнее, когда устройство не давит шумом. Это делает повседневную укладку спокойнее и приятнее утром, вечером и в доме, где рядом есть другие люди.',
    detail: 'Меньше акустического раздражения в тех моментах, когда феном пользуются часто.',
    backgroundDesktop: hairGalleryImages[9],
    backgroundMobile: hairGalleryImages[10],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'velvet',
    navLabel: 'Velvet Touch',
    eyebrow: '09 / Комфорт в использовании',
    title: 'Покрытие Velvet Touch приятно ощущается в руке',
    description:
      'Корпус воспринимается более мягким и тактильно приятным, поэтому фен комфортнее держать во время всей укладки. Это как раз та мелочь, которая со временем начинает цениться сильнее всего.',
    detail: 'Когда прибор часто находится в руках, фактура корпуса влияет на общее ощущение сильнее, чем кажется по описанию.',
    backgroundDesktop: hairGalleryImages[10],
    backgroundMobile: hairGalleryImages[11],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'memory',
    navLabel: 'Память режима',
    eyebrow: '10 / Комфорт в использовании',
    title: 'Функция памяти режима экономит лишние движения',
    description:
      'Фен запоминает привычные настройки, чтобы не приходилось каждый раз вручную возвращаться к нужной комбинации температуры и скорости. Это делает использование более предсказуемым.',
    detail: 'Полезно, когда у вас уже есть свой привычный сценарий укладки и не хочется заново настраивать прибор.',
    backgroundDesktop: hairGalleryImages[11],
    backgroundMobile: hairGalleryImages[12],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'self-cleaning',
    navLabel: 'Самоочистка',
    eyebrow: '11 / Комфорт в использовании',
    title: 'Самоочистка помогает легче поддерживать фен в порядке',
    description:
      'Уход за прибором становится проще, а значит им комфортнее пользоваться в долгую. Это полезная повседневная деталь, о которой обычно вспоминают уже после покупки.',
    detail: 'Меньше бытовой возни вокруг обслуживания техники и больше ощущения аккуратного ухода.',
    backgroundDesktop: hairGalleryImages[12],
    backgroundMobile: hairGalleryImages[13],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'storage-bag',
    navLabel: 'Мешочек для хранения',
    eyebrow: '12 / Комфорт в использовании',
    title: 'Мешочек для хранения помогает держать всё под рукой',
    description:
      'Фен и аксессуары проще собрать в одном месте, не разбрасывая насадки по ящикам и полкам. Это удобно и дома, и в дороге, когда хочется быстро всё убрать после укладки.',
    detail: 'Хранение становится аккуратнее, а сборы в поездку занимают меньше лишних действий.',
    backgroundDesktop: hairGalleryImages[13],
    backgroundMobile: hairGalleryImages[14],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
]

const comparisonPairs: ComparisonPair[] = [
  {
    ordinary: 'Часто сушит слишком горячим воздухом',
    cosmolex: '4 режима работы для разных сценариев',
  },
  {
    ordinary: 'Волосы могут пушиться и электризоваться',
    cosmolex: 'Ионизация помогает уменьшить пушение',
  },
  {
    ordinary: 'Обычно нужен отдельный стайлер или утюжок',
    cosmolex: '5 насадок для разных вариантов укладки',
  },
  {
    ordinary: 'Насадки часто нужно докупать отдельно',
    cosmolex: 'Полный комплект уже в коробке',
  },
  {
    ordinary: 'Сложно подобрать комфортную температуру',
    cosmolex: 'Есть регулировка нагрева и воздушного потока',
  },
  {
    ordinary: 'Укладка может занимать много времени',
    cosmolex: 'Мощность 1600 Вт помогает сушить быстрее',
  },
  {
    ordinary: 'Фен только сушит',
    cosmolex: 'Сушит, укладывает, помогает создать объём и гладкость',
  },
  {
    ordinary: 'Не всегда удобно использовать каждый день',
    cosmolex: 'Компактный корпус и кабель 170 см',
  },
]

const comparisonIntroDesktopImage = hairGalleryImages[0]
const comparisonIntroMobileImage = hairGalleryImages[1]
const comparisonOrdinaryDesktopVideo = benefitsDesktopVideoUrl
const comparisonOrdinaryMobileVideo = benefitsMobileVideoUrl
const comparisonCosmolexDesktopVideo = heroStoryVideoUrl
const comparisonCosmolexMobileVideo = heroStoryMobileVideoUrl

const comparisonSlides: ComparisonSlide[] = [
  {
    id: 'intro',
    navLabel: 'Вступление',
    eyebrow: '01 / Сравнение',
    title: 'Разница ощущается с первого использования',
    description:
      'Обычный фен чаще всего просто сушит. Cosmolex Super Air помогает не только убрать влагу, но и сразу работать с формой, гладкостью, объёмом и финальной фиксацией укладки.',
    summary:
      'Cosmolex — это фен для тех, кто хочет не просто высушить волосы, а получить аккуратный результат без лишних приборов и сложной укладки.',
    intro: true,
    backgroundDesktop: comparisonIntroDesktopImage,
    backgroundMobile: comparisonIntroMobileImage,
  },
  {
    id: 'ordinary',
    navLabel: 'Обычный фен',
    eyebrow: '02 / Сравнение',
    title: 'Что чаще всего даёт обычный фен',
    description:
      'Когда фен только сушит, укладка часто требует больше времени, дополнительных приборов и постоянного компромисса между температурой, скоростью и результатом.',
    accent: 'ordinary',
    videoDesktop: comparisonOrdinaryDesktopVideo,
    videoMobile: comparisonOrdinaryMobileVideo,
  },
  {
    id: 'cosmolex',
    navLabel: 'Cosmolex Super Air',
    eyebrow: '03 / Сравнение',
    title: 'Что меняется с Cosmolex Super Air',
    description:
      'Cosmolex помогает сделать тот же ежедневный сценарий проще: сушить быстрее, уменьшать пушение и сразу работать с гладкостью, объёмом и формой без лишней техники.',
    summary:
      'Cosmolex — это фен для тех, кто хочет не просто высушить волосы, а получить аккуратный результат без лишних приборов и сложной укладки.',
    accent: 'cosmolex',
    videoDesktop: comparisonCosmolexDesktopVideo,
    videoMobile: comparisonCosmolexMobileVideo,
  },
]

const packageDesktopImage = hairGalleryImages[10]
const packageMobileImage = hairGalleryImages[11]

const packageBlockContent = {
  navLabel: 'Комплектация',
  eyebrow: '01 / Комплектация',
  title: 'В коробке уже есть всё для укладки',
  description:
    'Не нужно отдельно искать насадки или докупать аксессуары. Cosmolex Super Air сразу готов к разным сценариям: сушка, гладкость, объём, кудри и работа с непослушными волосами.',
  final:
    'Открыли коробку — и можно сразу пользоваться. Это удобно и для себя, и если вы выбираете фен в подарок женщине, девушке, маме или подруге.',
} as const

const packageTimelineItems: PackageTimelineItem[] = [
  { id: 'dryer', text: 'фен Cosmolex Super Air — 1 шт.' },
  { id: 'attachments', text: 'магнитные насадки — 5 шт.' },
  { id: 'bag', text: 'мешочек для хранения — 1 шт.' },
  { id: 'box', text: 'подарочная упаковка' },
  { id: 'manual', text: 'гарантийный талон/инструкция' },
]

const specsBlockContent = {
  navLabel: 'Характеристики',
  eyebrow: '01 / Характеристики',
  title: 'Параметры Cosmolex Super Air',
  description:
    'Всё важное — без лишней технической перегрузки. Ниже основные параметры фена-стайлера.',
} as const

const specificationItems: SpecificationItem[] = [
  { id: 'device-type', label: 'Тип устройства', value: 'фен-стайлер, фен для волос' },
  { id: 'model', label: 'Модель', value: 'Cosmolex Super Air' },
  { id: 'format', label: 'Формат', value: 'компактный, бытовой, профессиональный' },
  { id: 'power', label: 'Мощность', value: '1600 Вт' },
  { id: 'speeds', label: 'Количество скоростей', value: '2' },
  { id: 'modes', label: 'Количество режимов работы', value: '4' },
  {
    id: 'regulation',
    label: 'Регулировка',
    value: 'независимая регулировка нагрева и воздушного потока',
  },
  { id: 'ionization', label: 'Ионизация', value: 'есть' },
  { id: 'cool-air', label: 'Холодный обдув', value: 'есть' },
  { id: 'attachments-count', label: 'Количество насадок', value: '5 шт.' },
  {
    id: 'attachments',
    label: 'Насадки',
    value: 'диффузор, концентратор, для потока, сушки и выпрямления',
  },
  { id: 'cable', label: 'Длина кабеля', value: '170 см' },
  { id: 'warranty', label: 'Гарантия', value: '12 месяцев' },
  { id: 'country', label: 'Страна производства', value: 'Китай' },
  { id: 'package-size', label: 'Размер упаковки', value: '33 × 24 × 11 см' },
  { id: 'package-weight', label: 'Вес с упаковкой', value: '1,2 кг' },
  { id: 'height', label: 'Высота фена', value: '24 см' },
  { id: 'width', label: 'Ширина фена', value: '10 см' },
  { id: 'weight', label: 'Вес без упаковки', value: '900 г' },
  { id: 'colors', label: 'Цвета', value: 'чёрный, розовый, фиолетовый, тиффани' },
]

const specificationPages = [
  specificationItems.slice(0, 5),
  specificationItems.slice(5, 10),
  specificationItems.slice(10, 15),
  specificationItems.slice(15, 20),
]

const specificationMobilePages = [
  specificationItems.slice(0, 4),
  specificationItems.slice(4, 8),
  specificationItems.slice(8, 12),
  specificationItems.slice(12, 16),
  specificationItems.slice(16, 20),
]

const specsDesktopVideoUrl = benefitsDesktopVideoUrl
const specsMobileVideoUrl = benefitsMobileVideoUrl

const giftSlides: GiftSlide[] = [
  {
    id: 'intro',
    navLabel: 'Подарочный блок',
    eyebrow: '01 / Подарочный блок',
    title: 'Подарок, который не будет лежать без дела',
    description:
      'Фен для волос - вещь, которой пользуются постоянно. А красивый фен-стайлер с насадками выглядит полезно, современно и не требует угадывать размер, стиль одежды или любимый аромат.',
    detail:
      'Cosmolex Super Air можно купить себе или подарить девушке, жене, маме, сестре, подруге, коллеге. Он подходит на день рождения, 8 Марта, 14 февраля, Новый год, годовщину или просто как приятный знак внимания без повода.',
    intro: true,
    videoDesktop: comfortIntroDesktopVideoUrl,
    videoMobile: comfortIntroMobileVideoUrl,
  },
  {
    id: 'girlfriend-wife',
    navLabel: 'Девушке и жене',
    eyebrow: '02 / Подарочный блок',
    title: 'Подарок девушке, жене, подруге или коллеге',
    description:
      'Красивый фен-стайлер выглядит как продуманный подарок, но остаётся не декоративной покупкой, а техникой на каждый день.',
    detail:
      'Такой подарок не требует угадывать размер, любимый аромат или стиль одежды: им просто удобно пользоваться дома постоянно.',
    backgroundDesktop: hairGalleryImages[0],
    backgroundMobile: hairGalleryImages[1],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'mother-sister',
    navLabel: 'Маме и сестре',
    eyebrow: '03 / Подарочный блок',
    title: 'Подарок маме или сестре',
    description:
      'Это понятный и практичный вариант, когда хочется выбрать что-то современное, полезное и действительно нужное в обычной жизни.',
    detail:
      'Cosmolex Super Air помогает быстрее сушить волосы, делать аккуратную укладку и не держать под рукой сразу несколько приборов.',
    backgroundDesktop: hairGalleryImages[2],
    backgroundMobile: hairGalleryImages[3],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'march-8',
    navLabel: '8 Марта',
    eyebrow: '04 / Подарочный блок',
    title: 'Подарок на 8 Марта',
    description:
      'Праздничный beauty-tech сценарий, который выглядит уместно и ощущается полезным не только в день вручения, но и после него.',
    detail:
      'Фен-стайлер с насадками даёт ощущение красивого, современного и при этом практичного подарка без случайности.',
    backgroundDesktop: hairGalleryImages[4],
    backgroundMobile: hairGalleryImages[5],
    videoDesktop: benefitsDesktopVideoUrl,
    videoMobile: benefitsMobileVideoUrl,
  },
  {
    id: 'feb-14',
    navLabel: '14 февраля',
    eyebrow: '05 / Подарочный блок',
    title: 'Подарок на 14 февраля',
    description:
      'Когда хочется выбрать знак внимания с ощущением заботы, а не просто ещё один формальный сувенир.',
    detail:
      'Cosmolex Super Air вписывается в сценарий подарка, который каждый день напоминает о внимании и делает утренний ритуал приятнее.',
    backgroundDesktop: hairGalleryImages[6],
    backgroundMobile: hairGalleryImages[7],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: 'new-year',
    navLabel: 'Новый год',
    eyebrow: '06 / Подарочный блок',
    title: 'Подарок на Новый год',
    description:
      'Подходит для большого зимнего подарка, который выглядит солидно, красиво упаковывается и не теряет смысл после праздников.',
    detail:
      'Это удобный вариант, если хочется подарить технику, которая сразу пригодится дома и не окажется "слишком сложной" в использовании.',
    backgroundDesktop: hairGalleryImages[8],
    backgroundMobile: hairGalleryImages[9],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: comfortFeatureMobileVideoUrl,
  },
  {
    id: 'birthday',
    navLabel: 'День рождения',
    eyebrow: '07 / Подарочный блок',
    title: 'Подарок на день рождения',
    description:
      'Универсальный сценарий, когда хочется подарить что-то красивое, современное и по-настоящему применимое в ежедневном уходе.',
    detail:
      'Cosmolex Super Air подходит как подарок без повода и как вещь, которой будут пользоваться регулярно, а не вспоминать про неё раз в сезон.',
    note:
      'Это не просто техника. Это маленький ежедневный ритуал, который помогает быстрее собраться и почувствовать себя ухоженно.',
    backgroundDesktop: hairGalleryImages[10],
    backgroundMobile: hairGalleryImages[11],
    videoDesktop: benefitsDesktopVideoUrl,
    videoMobile: benefitsMobileVideoUrl,
  },
]

const faqBlockContent = {
  navLabel: 'FAQ',
  eyebrow: '01 / FAQ',
  title: 'Частые вопросы',
  description:
    'Коротко и по делу: собрали основные вопросы о Cosmolex Super Air, чтобы перед покупкой было проще понять, подойдёт ли он вам для ежедневной сушки и укладки.',
} as const

const faqItems: FaqItem[] = [
  {
    id: 'dryer-or-styler',
    question: 'Это фен или стайлер?',
    answer:
      'Cosmolex Super Air — это фен-стайлер. Он сушит волосы как фен и помогает делать разные варианты укладки с помощью насадок.',
  },
  {
    id: 'daily-use',
    question: 'Подходит ли для ежедневного использования?',
    answer:
      'Да, фен подходит для регулярной сушки и укладки дома. Главное — выбирать режим под свой тип волос: для тонких и окрашенных мягче, для густых и длинных интенсивнее.',
  },
  {
    id: 'ionization',
    question: 'Есть ли ионизация?',
    answer:
      'Да, ионизация есть. Она помогает уменьшить статическое электричество, снизить пушение и сделать волосы визуально более гладкими после сушки.',
  },
  {
    id: 'cool-shot',
    question: 'Есть ли холодный обдув?',
    answer:
      'Да, холодный обдув есть. Он помогает завершить укладку, охладить волосы после горячего потока и зафиксировать форму.',
  },
  {
    id: 'curly-hair',
    question: 'Подойдёт ли для кудрявых волос?',
    answer:
      'Да, в комплекте есть диффузор. Он подходит для кудрей и волн, помогает сушить завиток аккуратнее и не усиливать пушение.',
  },
  {
    id: 'thick-hair',
    question: 'Подойдёт ли для густых волос?',
    answer:
      'Да, мощность 1600 Вт и несколько режимов работы позволяют использовать фен для густых, длинных и плотных волос.',
  },
  {
    id: 'attachments',
    question: 'Нужно ли докупать насадки?',
    answer:
      'Нет, 5 насадок уже входят в комплект. Можно сразу использовать фен для сушки, объёма, гладкости, локонов и непослушной длины.',
  },
  {
    id: 'travel',
    question: 'Можно ли брать в поездку?',
    answer:
      'Да, фен компактный и заменяет несколько приборов для укладки. Его удобно брать с собой в отпуск, командировку или путешествие.',
  },
  {
    id: 'warranty',
    question: 'Какая гарантия?',
    answer: 'Гарантийный срок — 12 месяцев.',
  },
]

const faqPagesDesktop = [faqItems.slice(0, 3), faqItems.slice(3, 6), faqItems.slice(6, 9)]

const faqPagesMobile = [
  faqItems.slice(0, 2),
  faqItems.slice(2, 4),
  faqItems.slice(4, 6),
  faqItems.slice(6, 8),
  faqItems.slice(8, 9),
]

const faqDesktopVideoUrl = specsDesktopVideoUrl
const faqMobileVideoUrl = specsMobileVideoUrl

const finalCtaContent = {
  navLabel: 'Финальный CTA',
  eyebrow: '01 / Финальный CTA',
  title: 'Cosmolex Super Air — когда в разы проще',
  subtitle:
    'Фен-стайлер 5 в 1 с ионизацией, холодным обдувом, 4 режимами и 5 магнитными насадками. Для быстрой сушки, гладкости, объёма, локонов и аккуратной укладки дома.',
  description:
    'Хотите ухоженные волосы каждый день без лишних приборов и временных затрат? Cosmolex Super Air сушит, укладывает, уменьшает пушение и даёт полный контроль над результатом.',
  promoCode: 'COSMOLEX10%',
} as const

const finalCtaCards: FinalCtaCard[] = [
  {
    id: headerSlides[0].id,
    eyebrow: 'Black Edition',
    title: `${headerSlides[0].title} ${headerSlides[0].title2}`,
    subtitle: headerSlides[0].place,
    description: headerSlides[0].description,
    buyUrl: headerSlides[0].buyUrl,
    accent: headerSlides[0].accent,
    backgroundDesktop: hairGalleryImages[0],
    backgroundMobile: hairGalleryImages[1],
    videoDesktop: heroStoryVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: headerSlides[1].id,
    eyebrow: 'Pink Edition',
    title: `${headerSlides[1].title} ${headerSlides[1].title2}`,
    subtitle: headerSlides[1].place,
    description: headerSlides[1].description,
    buyUrl: headerSlides[1].buyUrl,
    accent: headerSlides[1].accent,
    backgroundDesktop: hairGalleryImages[2],
    backgroundMobile: hairGalleryImages[3],
    videoDesktop: comfortIntroDesktopVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: headerSlides[2].id,
    eyebrow: 'Violet Edition',
    title: `${headerSlides[2].title} ${headerSlides[2].title2}`,
    subtitle: headerSlides[2].place,
    description: headerSlides[2].description,
    buyUrl: headerSlides[2].buyUrl,
    accent: headerSlides[2].accent,
    backgroundDesktop: hairGalleryImages[4],
    backgroundMobile: hairGalleryImages[5],
    videoDesktop: comfortFeatureDesktopVideoUrl,
    videoMobile: heroStoryMobileVideoUrl,
  },
  {
    id: headerSlides[3].id,
    eyebrow: 'Tiffany Edition',
    title: `${headerSlides[3].title} ${headerSlides[3].title2}`,
    subtitle: headerSlides[3].place,
    description: headerSlides[3].description,
    buyUrl: headerSlides[3].buyUrl,
    accent: headerSlides[3].accent,
    backgroundDesktop: hairGalleryImages[6],
    backgroundMobile: hairGalleryImages[7],
    videoDesktop: benefitsDesktopVideoUrl,
    videoMobile: benefitsMobileVideoUrl,
  },
]

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const painSectionRef = useRef<HTMLElement | null>(null)
  const benefitsSectionRef = useRef<HTMLElement | null>(null)
  const attachmentsSectionRef = useRef<HTMLElement | null>(null)
  const hairTypesSectionRef = useRef<HTMLElement | null>(null)
  const comfortSectionRef = useRef<HTMLElement | null>(null)
  const comparisonSectionRef = useRef<HTMLElement | null>(null)
  const packageSectionRef = useRef<HTMLElement | null>(null)
  const specsSectionRef = useRef<HTMLElement | null>(null)
  const giftSectionRef = useRef<HTMLElement | null>(null)
  const faqSectionRef = useRef<HTMLElement | null>(null)
  const finalCtaSectionRef = useRef<HTMLElement | null>(null)
  const painTrackRef = useRef<HTMLDivElement | null>(null)
  const benefitsCardRefs = useRef<Array<HTMLDivElement | null>>([])
  const painVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const benefitsVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const heroVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const attachmentsVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const hairTypesVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const comfortVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const comfortBgRefs = useRef<Array<HTMLDivElement | null>>([])
  const comfortPanelRefs = useRef<Array<HTMLElement | null>>([])
  const comfortCopyRefs = useRef<Array<HTMLElement | null>>([])
  const comfortWindowRefs = useRef<Array<HTMLDivElement | null>>([])
  const comparisonVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const comparisonMediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const comparisonPanelRefs = useRef<Array<HTMLElement | null>>([])
  const comparisonCopyRefs = useRef<Array<HTMLElement | null>>([])
  const comparisonRowRefs = useRef<Array<Array<HTMLDivElement | null>>>([])
  const packageBgRef = useRef<HTMLDivElement | null>(null)
  const packageMediaRef = useRef<HTMLDivElement | null>(null)
  const packageCopyRef = useRef<HTMLElement | null>(null)
  const packageTimelineRef = useRef<HTMLDivElement | null>(null)
  const packageRowRefs = useRef<Array<HTMLDivElement | null>>([])
  const specsVideoRef = useRef<HTMLVideoElement | null>(null)
  const specsCopyRef = useRef<HTMLElement | null>(null)
  const specsPaginationRef = useRef<HTMLDivElement | null>(null)
  const specsPageRefs = useRef<Array<HTMLDivElement | null>>([])
  const faqVideoRef = useRef<HTMLVideoElement | null>(null)
  const faqCopyRef = useRef<HTMLElement | null>(null)
  const faqPaginationRef = useRef<HTMLDivElement | null>(null)
  const faqPageRefs = useRef<Array<HTMLDivElement | null>>([])
  const finalCtaCopyRef = useRef<HTMLElement | null>(null)
  const finalCtaOptionsRef = useRef<HTMLDivElement | null>(null)
  const finalCtaOptionRefs = useRef<Array<HTMLElement | null>>([])
  const finalCtaPanelRefs = useRef<Array<HTMLDivElement | null>>([])
  const finalCtaVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const finalCtaPopupRef = useRef<HTMLDivElement | null>(null)
  const isFinalCtaPopupOpenRef = useRef(false)
  const promoCodeTimeoutRef = useRef<number | null>(null)
  const giftVideoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const giftBgRefs = useRef<Array<HTMLDivElement | null>>([])
  const giftPanelRefs = useRef<Array<HTMLElement | null>>([])
  const giftCopyRefs = useRef<Array<HTMLElement | null>>([])
  const giftWindowRefs = useRef<Array<HTMLDivElement | null>>([])
  const hairTypesFigureRefs = useRef<Array<HTMLElement | null>>([])
  const hairTypesFigureMediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const hairTypesGalleryRefs = useRef<Array<HTMLDivElement | null>>([])
  const hairTypesCopyRefs = useRef<Array<HTMLElement | null>>([])
  const hairTypesGalleryTrackRefs = useRef<Array<Array<HTMLDivElement | null>>>([])
  const hairTypesGalleryTweenRefs = useRef<Array<Array<gsap.core.Tween | null>>>([])
  const heroSlideIndexRef = useRef(0)
  const painSlideIndexRef = useRef(0)
  const benefitsSlideIndexRef = useRef(0)
  const attachmentsSlideIndexRef = useRef(0)
  const hairTypesSlideIndexRef = useRef(0)
  const comfortSlideIndexRef = useRef(0)
  const comparisonSlideIndexRef = useRef(0)
  const specsPageIndexRef = useRef(0)
  const giftSlideIndexRef = useRef(0)
  const faqPageIndexRef = useRef(0)
  const previousHairTypesSlideIndexRef = useRef(0)
  const previousComfortSlideIndexRef = useRef(0)
  const previousComparisonSlideIndexRef = useRef(0)
  const previousSpecsPageIndexRef = useRef(0)
  const specsPageTransitionLockRef = useRef(false)
  const specsQueuedPageIndexRef = useRef<number | null>(null)
  const previousGiftSlideIndexRef = useRef(0)
  const previousFaqPageIndexRef = useRef(0)
  const faqPageTransitionLockRef = useRef(false)
  const faqQueuedPageIndexRef = useRef<number | null>(null)
  const slowHeaderEntryFromBurgerRef = useRef(false)
  const slowHeroEntryFromBurgerRef = useRef(false)
  const slowPainEntryFromBurgerRef = useRef(false)
  const slowComfortEntryFromBurgerRef = useRef(false)
  const slowComfortLastEntryFromComparisonRef = useRef(false)
  const slowComparisonEntryFromBurgerRef = useRef(false)
  const slowAttachmentsEntryFromBenefitsRef = useRef(false)
  const slowHairTypesEntryFromAttachmentsRef = useRef(false)
  const slowHairTypesLastEntryFromComfortRef = useRef(false)
  const slowGiftEntryRef = useRef(false)
  const slowGiftLastEntryFromFaqRef = useRef(false)
  const activeSurfaceRef = useRef<ActiveSurface>('header')
  const skipNextPainSurfaceIntroRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [painSlideIndex, setPainSlideIndex] = useState(0)
  const [benefitsSlideIndex, setBenefitsSlideIndex] = useState(0)
  const [attachmentsSlideIndex, setAttachmentsSlideIndex] = useState(0)
  const [hairTypesSlideIndex, setHairTypesSlideIndex] = useState(0)
  const [comfortSlideIndex, setComfortSlideIndex] = useState(0)
  const [comparisonSlideIndex, setComparisonSlideIndex] = useState(0)
  const [specsPageIndex, setSpecsPageIndex] = useState(0)
  const [giftSlideIndex, setGiftSlideIndex] = useState(0)
  const [faqPageIndex, setFaqPageIndex] = useState(0)
  const [finalCtaActiveCardIndex, setFinalCtaActiveCardIndex] = useState(0)
  const [isFinalCtaPopupOpen, setIsFinalCtaPopupOpen] = useState(false)
  const [isPromoCodeCopied, setIsPromoCodeCopied] = useState(false)
  const [activeSurface, setActiveSurface] = useState<ActiveSurface>('header')
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.innerWidth < 768)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const specsPages = isMobileViewport ? specificationMobilePages : specificationPages
  const faqPages = isMobileViewport ? faqPagesMobile : faqPagesDesktop

  const syncResponsivePageState = useCallback((nextIsMobile: boolean) => {
    const nextSpecsLastIndex = Math.max(
      0,
      (nextIsMobile ? specificationMobilePages.length : specificationPages.length) - 1,
    )
    const nextFaqLastIndex = Math.max(
      0,
      (nextIsMobile ? faqPagesMobile.length : faqPagesDesktop.length) - 1,
    )

    specsPageIndexRef.current = Math.min(specsPageIndexRef.current, nextSpecsLastIndex)
    previousSpecsPageIndexRef.current = Math.min(previousSpecsPageIndexRef.current, nextSpecsLastIndex)
    specsQueuedPageIndexRef.current =
      specsQueuedPageIndexRef.current === null
        ? null
        : Math.min(specsQueuedPageIndexRef.current, nextSpecsLastIndex)
    setSpecsPageIndex((current) => Math.min(current, nextSpecsLastIndex))

    faqPageIndexRef.current = Math.min(faqPageIndexRef.current, nextFaqLastIndex)
    previousFaqPageIndexRef.current = Math.min(previousFaqPageIndexRef.current, nextFaqLastIndex)
    faqQueuedPageIndexRef.current =
      faqQueuedPageIndexRef.current === null
        ? null
        : Math.min(faqQueuedPageIndexRef.current, nextFaqLastIndex)
    setFaqPageIndex((current) => Math.min(current, nextFaqLastIndex))
  }, [])

  const syncBenefitsCards = (
    activeIndex: number,
    options: { animate?: boolean; fromBottom?: boolean } = {},
  ) => {
    const benefits = benefitsSectionRef.current

    if (!benefits) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animate = !!options.animate && !reduceMotion
    const isMobile = window.innerWidth < 768

    const getCardState = (index: number) => {
      const relative = index - activeIndex
      const rotation = benefitsSlides[index]?.rotation ?? 0

      if (relative < 0) {
        return {
          x: relative * (isMobile ? -12 : -20),
          y: isMobile ? -180 : -260,
          scale: 0.94,
          opacity: 0,
          rotate: rotation,
          zIndex: 10,
        }
      }

      if (relative === 0) {
        return {
          x: 0,
          y: isMobile ? -8 : 0,
          scale: 1,
          opacity: 1,
          rotate: rotation,
          zIndex: isMobile ? 50 : 60,
        }
      }

      if (relative === 1) {
        return {
          x: isMobile ? 8 : 8,
          y: isMobile ? 740 : 760,
          scale: isMobile ? 0.992 : 0.99,
          opacity: 0.94,
          rotate: rotation,
          zIndex: isMobile ? 60 : 50,
        }
      }

      if (relative === 2) {
        return {
          x: isMobile ? -6 : -6,
          y: isMobile ? 812 : 820,
          scale: isMobile ? 0.986 : 0.982,
          opacity: 0.9,
          rotate: rotation,
          zIndex: isMobile ? 48 : 40,
        }
      }

      if (relative === 3) {
        return {
          x: isMobile ? 8 : 6,
          y: isMobile ? 878 : 872,
          scale: isMobile ? 0.98 : 0.974,
          opacity: 0.84,
          rotate: rotation,
          zIndex: isMobile ? 36 : 30,
        }
      }

      return {
        x: isMobile ? -4 : -4,
        y: isMobile ? 938 : 920,
        scale: isMobile ? 0.974 : 0.966,
        opacity: 0.78,
        rotate: rotation,
        zIndex: isMobile ? 24 : 24,
      }
    }

    benefitsCardRefs.current.forEach((card, index) => {
      if (!card) {
        return
      }

      const state = getCardState(index)
      const description = card.querySelector<HTMLElement>('.benefits-story__card-description')

      gsap.killTweensOf(card)
      gsap.set(card, { zIndex: state.zIndex })

      if (!animate) {
        gsap.set(card, { xPercent: -50, ...state })

        if (description) {
          gsap.set(description, { y: 0, opacity: 1, filter: 'blur(0px)' })
        }

        return
      }

      if (options.fromBottom) {
        gsap.set(card, {
          xPercent: -50,
          x: state.x,
          y: state.y + (isMobile ? 380 : 320),
          scale: state.scale * 0.98,
          rotate: state.rotate,
          opacity: index === activeIndex ? 0 : Math.max(0, state.opacity - 0.18),
        })
      }

      gsap.to(card, {
        xPercent: -50,
        x: state.x,
        y: state.y,
        scale: state.scale,
        rotate: state.rotate,
        opacity: state.opacity,
        duration: index === activeIndex ? 1.16 : 1.22,
        ease: 'power2.inOut',
        overwrite: true,
      })

      if (!description) {
        return
      }

      if (index === activeIndex) {
        if (options.fromBottom) {
          gsap.set(description, {
            y: 36,
            opacity: 0,
            filter: 'blur(8px)',
          })
        }

        gsap.to(description, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.92,
          delay: 0.14,
          ease: 'power2.out',
          overwrite: true,
        })
      } else {
        gsap.to(description, {
          y: 0,
          opacity: 0.82,
          filter: 'blur(0px)',
          duration: 0.84,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    })
  }

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobileViewport = window.innerWidth < 768
      setIsMobileViewport(nextIsMobileViewport)
      syncResponsivePageState(nextIsMobileViewport)

      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [syncResponsivePageState])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowScrollHint(true)
    }, 600)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    heroSlideIndexRef.current = heroSlideIndex
  }, [heroSlideIndex])

  useEffect(() => {
    painSlideIndexRef.current = painSlideIndex
  }, [painSlideIndex])

  useEffect(() => {
    benefitsSlideIndexRef.current = benefitsSlideIndex
  }, [benefitsSlideIndex])

  useEffect(() => {
    attachmentsSlideIndexRef.current = attachmentsSlideIndex
  }, [attachmentsSlideIndex])

  useEffect(() => {
    hairTypesSlideIndexRef.current = hairTypesSlideIndex
  }, [hairTypesSlideIndex])

  useEffect(() => {
    comfortSlideIndexRef.current = comfortSlideIndex
  }, [comfortSlideIndex])

  useEffect(() => {
    comparisonSlideIndexRef.current = comparisonSlideIndex
  }, [comparisonSlideIndex])

  useEffect(() => {
    specsPageIndexRef.current = specsPageIndex
  }, [specsPageIndex])

  useEffect(() => {
    giftSlideIndexRef.current = giftSlideIndex
  }, [giftSlideIndex])

  useEffect(() => {
    faqPageIndexRef.current = faqPageIndex
  }, [faqPageIndex])

  useEffect(() => {
    document.body.dataset.surface = activeSurface
    activeSurfaceRef.current = activeSurface
    const closeMenuFrame = window.requestAnimationFrame(() => {
      setMenuOpen(false)
    })

    return () => {
      window.cancelAnimationFrame(closeMenuFrame)
      delete document.body.dataset.surface
    }
  }, [activeSurface])

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const order = [...headerSlides.keys()]
    let detailsEven = true
    let offsetTop = 200
    let offsetLeft = 700
    let cardWidth = 200
    let cardHeight = 300
    let gap = 40
    let numberSize = 50
    let isAnimating = false
    let touchStartY = 0
    const ease = 'sine.inOut'

    const byId = <T extends Element>(id: string) => root.querySelector<T>(`#${id}`)
    const qs = <T extends Element>(selector: string) => root.querySelector<T>(selector)

    const getCard = (index: number) => byId<HTMLElement>(`card${index}`)
    const getCardContent = (index: number) => byId<HTMLElement>(`card-content-${index}`)
    const getSliderItem = (index: number) => byId<HTMLElement>(`slide-item-${index}`)

    const animate = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const setDetailContent = (selector: '#details-even' | '#details-odd', slideIndex: number) => {
      const slide = headerSlides[slideIndex]
      const details = qs<HTMLElement>(selector)

      if (!details) {
        return
      }

      const place = details.querySelector<HTMLElement>('.text')
      const title1 = details.querySelector<HTMLElement>('.title-1')
      const title2 = details.querySelector<HTMLElement>('.title-2')
      const desc = details.querySelector<HTMLElement>('.desc')
      const swatch = details.querySelector<HTMLElement>('.bookmark')
      const link = details.querySelector<HTMLAnchorElement>('.discover')

      if (place) place.textContent = slide.place
      if (title1) title1.textContent = slide.title
      if (title2) title2.textContent = slide.title2
      if (desc) desc.textContent = slide.description
      if (swatch) swatch.style.backgroundColor = slide.accent
      if (link) link.href = slide.buyUrl
    }

    const setStaticLayout = () => {
      const [active, ...rest] = order
      const detailsActive = detailsEven ? '#details-even' : '#details-odd'
      const detailsInactive = detailsEven ? '#details-odd' : '#details-even'
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768
      const previewCount = headerSlides.length - 1

      if (isMobile) {
        const sideInset = width < 425 ? 10 : 16
        gap = width < 425 ? 8 : 10
        numberSize = 34
        cardWidth = Math.max(
          72,
          Math.min(104, Math.floor((width - sideInset * 2 - gap * (previewCount - 1)) / previewCount)),
        )
        cardHeight = Math.round(cardWidth * 1.5)
        offsetTop = height - cardHeight - (width < 425 ? 128 : 118)
        offsetLeft = width - sideInset - (cardWidth * previewCount + gap * (previewCount - 1))
      } else {
        cardWidth = 200
        cardHeight = 300
        gap = 40
        numberSize = 50
        offsetTop = height - 430
        offsetLeft = width - 830
      }

      const pagination = byId<HTMLElement>('pagination')
      const nav = qs<HTMLElement>('.landing-topbar__frame')
      const indicator = qs<HTMLElement>('.indicator')
      const progress = qs<HTMLElement>('.progress-sub-foreground')

      if (pagination) {
        gsap.set(pagination, {
          top: isMobile ? height - 92 : offsetTop + 330,
          left: isMobile ? 16 : offsetLeft,
          y: 0,
          opacity: 1,
          zIndex: 60,
        })
      }

      if (nav) {
        gsap.set(nav, { y: 0, opacity: 1 })
      }

      if (indicator) {
        gsap.set(indicator, { x: -window.innerWidth })
      }

      if (progress) {
        gsap.set(progress, {
          width: (isMobile ? 160 : 500) * (1 / order.length) * (active + 1),
        })
      }

      setDetailContent('#details-even', active)
      setDetailContent('#details-odd', active)

      const activeDetailsEl = qs<HTMLElement>(detailsActive)
      const inactiveDetailsEl = qs<HTMLElement>(detailsInactive)

      if (activeDetailsEl) {
        gsap.set(activeDetailsEl, { opacity: 1, zIndex: 22, x: 0 })
      }

      if (inactiveDetailsEl) {
        gsap.set(inactiveDetailsEl, { opacity: 0, zIndex: 12 })
      }

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width,
        height,
        borderRadius: 0,
        zIndex: 20,
      })

      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })

      rest.forEach((slideIndex, index) => {
        const x = offsetLeft + index * (cardWidth + gap)

        gsap.set(getCard(slideIndex), {
          x,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: isMobile ? 14 : 10,
          scale: 1,
        })

        gsap.set(getCardContent(slideIndex), {
          x,
          y: offsetTop + cardHeight - (isMobile ? 54 : 100),
          zIndex: 40,
          opacity: 1,
        })

        gsap.set(getSliderItem(slideIndex), { x: (index + 1) * numberSize })
      })

      gsap.set(getSliderItem(active), { x: 0 })
    }

    const init = () => {
      const [active, ...rest] = order
      const detailsActive = detailsEven ? '#details-even' : '#details-odd'
      const detailsInactive = detailsEven ? '#details-odd' : '#details-even'
      const { innerHeight: height, innerWidth: width } = window
      const isMobile = width < 768
      const previewCount = headerSlides.length - 1
      const pagination = byId<HTMLElement>('pagination')
      const nav = qs<HTMLElement>('.landing-topbar__frame')
      const cover = qs<HTMLElement>('.cover')
      const progress = qs<HTMLElement>('.progress-sub-foreground')
      const indicator = qs<HTMLElement>('.indicator')
      const scrollHint = document.querySelector<HTMLElement>('.scroll-hint')

      if (isMobile) {
        const sideInset = width < 425 ? 10 : 16
        gap = width < 425 ? 8 : 10
        numberSize = 34
        cardWidth = Math.max(
          72,
          Math.min(104, Math.floor((width - sideInset * 2 - gap * (previewCount - 1)) / previewCount)),
        )
        cardHeight = Math.round(cardWidth * 1.5)
        offsetTop = height - cardHeight - (width < 425 ? 128 : 118)
        offsetLeft = width - sideInset - (cardWidth * previewCount + gap * (previewCount - 1))
      } else {
        cardWidth = 200
        cardHeight = 300
        gap = 40
        numberSize = 50
        offsetTop = height - 430
        offsetLeft = width - 830
      }

      setDetailContent('#details-even', active)
      setDetailContent('#details-odd', active)

      if (pagination) {
        gsap.set(pagination, {
          top: isMobile ? height - 92 : offsetTop + 330,
          left: isMobile ? 16 : offsetLeft,
          y: 200,
          opacity: 0,
          zIndex: 60,
        })
      }

      if (nav) {
        gsap.set(nav, { y: -200, opacity: 0 })
      }

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width,
        height,
      })

      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })
      gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 })
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 })
      gsap.set(`${detailsInactive} .text`, { y: 100 })
      gsap.set(`${detailsInactive} .title-1`, { y: 100 })
      gsap.set(`${detailsInactive} .title-2`, { y: 100 })
      gsap.set(`${detailsInactive} .desc`, { y: 50 })
      gsap.set(`${detailsInactive} .cta`, { y: 60 })

      if (progress) {
        gsap.set(progress, {
          width: (isMobile ? 160 : 500) * (1 / order.length) * (active + 1),
        })
      }

      rest.forEach((slideIndex, index) => {
        const x = offsetLeft + (isMobile ? width + 24 : 400) + index * (cardWidth + gap)

        gsap.set(getCard(slideIndex), {
          x,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: isMobile ? 14 : 10,
        })

        gsap.set(getCardContent(slideIndex), {
          x,
          zIndex: 40,
          y: offsetTop + cardHeight - (isMobile ? 54 : 100),
        })

        gsap.set(getSliderItem(slideIndex), { x: (index + 1) * numberSize })
      })

      if (indicator) {
        gsap.set(indicator, { x: -window.innerWidth })
      }

      if (scrollHint) {
        gsap.set(scrollHint, { opacity: 0, y: -18 })
      }

      const startDelay = reduceMotion ? 0 : 0.72

      if (cover) {
        gsap.to(cover, {
          x: width + 400,
          delay: 0.45,
          duration: reduceMotion ? 0 : 0.68,
          ease,
        })
      }

      rest.forEach((slideIndex, index) => {
        const x = offsetLeft + index * (cardWidth + gap)

        gsap.to(getCard(slideIndex), {
          x,
          zIndex: 30,
          ease,
          delay: startDelay,
          duration: reduceMotion ? 0 : 0.52,
        })

        gsap.to(getCardContent(slideIndex), {
          x,
          zIndex: 40,
          ease,
          delay: startDelay,
          duration: reduceMotion ? 0 : 0.52,
        })
      })

      if (pagination) {
        gsap.to(pagination, {
          y: 0,
          opacity: 1,
          ease,
          delay: startDelay,
          duration: reduceMotion ? 0 : 0.52,
        })
      }

      if (nav) {
        gsap.to(nav, {
          y: 0,
          opacity: 1,
          ease,
          delay: startDelay,
          duration: reduceMotion ? 0 : 0.52,
        })
      }

      gsap.to(detailsActive, {
        opacity: 1,
        x: 0,
        ease,
        delay: startDelay,
        duration: reduceMotion ? 0 : 0.52,
      })

      if (scrollHint) {
        gsap.to(scrollHint, {
          opacity: 0.94,
          y: 0,
          ease,
          delay: startDelay,
          duration: reduceMotion ? 0 : 0.52,
        })
      }
    }

    const revealCurrentHeader = () => {
      setStaticLayout()

      const active = order[0]
      const rest = order.slice(1)
      const shouldSlowHeaderEntry = slowHeaderEntryFromBurgerRef.current
      const detailsActive = detailsEven ? '#details-even' : '#details-odd'
      const detailsInactive = detailsEven ? '#details-odd' : '#details-even'
      const isMobile = window.innerWidth < 768
      const nav = qs<HTMLElement>('.landing-topbar__frame')
      const pagination = byId<HTMLElement>('pagination')
      const activeDetailsEl = qs<HTMLElement>(detailsActive)
      const inactiveDetailsEl = qs<HTMLElement>(detailsInactive)
      const activeCard = getCard(active)
      const previewOffset = shouldSlowHeaderEntry ? (isMobile ? 90 : 180) : isMobile ? 56 : 120
      const previewDelayStep = shouldSlowHeaderEntry ? 0.12 : 0.07
      const previewDuration = shouldSlowHeaderEntry ? 0.76 : 0.5
      const detailsDuration = shouldSlowHeaderEntry ? 0.96 : 0.6
      const detailsChildDuration = shouldSlowHeaderEntry ? 0.56 : 0.38
      const detailsMetaDuration = shouldSlowHeaderEntry ? 0.4 : 0.28

      if (nav) {
        gsap.killTweensOf(nav)
        gsap.set(nav, { y: shouldSlowHeaderEntry ? -84 : -56, opacity: 0 })
        gsap.to(nav, {
          y: 0,
          opacity: 1,
          ease,
          duration: reduceMotion ? 0 : shouldSlowHeaderEntry ? 0.88 : 0.56,
        })
      }

      if (pagination) {
        gsap.killTweensOf(pagination)
        gsap.set(pagination, { y: shouldSlowHeaderEntry ? 76 : 56, opacity: 0 })
        gsap.to(pagination, {
          y: 0,
          opacity: 1,
          ease,
          duration: reduceMotion ? 0 : shouldSlowHeaderEntry ? 0.88 : 0.56,
        })
      }

      if (activeDetailsEl) {
        gsap.killTweensOf(activeDetailsEl)
        gsap.set(activeDetailsEl, { opacity: 0, x: shouldSlowHeaderEntry ? -188 : -140, zIndex: 22 })
        gsap.set(`${detailsActive} .text`, { y: shouldSlowHeaderEntry ? 126 : 100 })
        gsap.set(`${detailsActive} .title-1`, { y: shouldSlowHeaderEntry ? 126 : 100 })
        gsap.set(`${detailsActive} .title-2`, { y: shouldSlowHeaderEntry ? 126 : 100 })
        gsap.set(`${detailsActive} .desc`, { y: shouldSlowHeaderEntry ? 72 : 50 })
        gsap.set(`${detailsActive} .cta`, { y: shouldSlowHeaderEntry ? 84 : 60 })

        gsap.to(activeDetailsEl, {
          opacity: 1,
          x: 0,
          ease,
          duration: reduceMotion ? 0 : detailsDuration,
        })
        gsap.to(`${detailsActive} .text`, {
          y: 0,
          delay: shouldSlowHeaderEntry ? 0.14 : 0.08,
          duration: reduceMotion ? 0 : detailsChildDuration,
          ease,
        })
        gsap.to(`${detailsActive} .title-1`, {
          y: 0,
          delay: shouldSlowHeaderEntry ? 0.18 : 0.1,
          duration: reduceMotion ? 0 : detailsChildDuration,
          ease,
        })
        gsap.to(`${detailsActive} .title-2`, {
          y: 0,
          delay: shouldSlowHeaderEntry ? 0.18 : 0.1,
          duration: reduceMotion ? 0 : detailsChildDuration,
          ease,
        })
        gsap.to(`${detailsActive} .desc`, {
          y: 0,
          delay: shouldSlowHeaderEntry ? 0.28 : 0.16,
          duration: reduceMotion ? 0 : detailsMetaDuration,
          ease,
        })
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: shouldSlowHeaderEntry ? 0.32 : 0.18,
          duration: reduceMotion ? 0 : detailsMetaDuration,
          ease,
        })
      }

      if (inactiveDetailsEl) {
        gsap.set(inactiveDetailsEl, { opacity: 0, zIndex: 12 })
      }

      rest.forEach((slideIndex, index) => {
        const x = offsetLeft + index * (cardWidth + gap)
        const card = getCard(slideIndex)
        const cardContent = getCardContent(slideIndex)

        if (!card || !cardContent) {
          return
        }

        gsap.killTweensOf([card, cardContent])
        gsap.set(card, {
          x: x + previewOffset,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: isMobile ? 14 : 10,
          opacity: 0,
          scale: shouldSlowHeaderEntry ? 0.96 : 1,
          filter: shouldSlowHeaderEntry ? 'blur(10px)' : 'blur(0px)',
        })
        gsap.set(cardContent, {
          x: x + previewOffset,
          y: offsetTop + cardHeight - (isMobile ? 54 : 100) + (shouldSlowHeaderEntry ? 18 : 0),
          opacity: 0,
          filter: shouldSlowHeaderEntry ? 'blur(8px)' : 'blur(0px)',
        })

        gsap.to(card, {
          x,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease,
          delay: reduceMotion ? 0 : previewDelayStep * index,
          duration: reduceMotion ? 0 : previewDuration,
        })
        gsap.to(cardContent, {
          x,
          y: offsetTop + cardHeight - (isMobile ? 54 : 100),
          opacity: 1,
          filter: 'blur(0px)',
          ease,
          delay: reduceMotion ? 0 : previewDelayStep * index,
          duration: reduceMotion ? 0 : previewDuration,
        })
      })

      if (activeCard) {
        gsap.killTweensOf(activeCard)
        gsap.set(activeCard, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          zIndex: 20,
          opacity: shouldSlowHeaderEntry ? 0 : 1,
          scale: shouldSlowHeaderEntry ? 1.035 : 1,
          filter: shouldSlowHeaderEntry ? 'blur(12px)' : 'blur(0px)',
        })

        if (shouldSlowHeaderEntry) {
          gsap.to(activeCard, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease,
            duration: reduceMotion ? 0 : 1.08,
            clearProps: 'opacity,scale,filter',
          })
        }
      }

      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })
      slowHeaderEntryFromBurgerRef.current = false
    }

    const step = () =>
      new Promise<void>((resolve) => {
        order.push(order.shift()!)
        detailsEven = !detailsEven

        const isMobile = window.innerWidth < 768
        const detailsActive = detailsEven ? '#details-even' : '#details-odd'
        const detailsInactive = detailsEven ? '#details-odd' : '#details-even'
        const active = order[0]
        const rest = order.slice(1)
        const previousActive = rest[rest.length - 1]
        const progress = qs<HTMLElement>('.progress-sub-foreground')

        setDetailContent(detailsActive, active)

        gsap.set(detailsActive, { zIndex: 22 })
        gsap.to(detailsActive, { opacity: 1, delay: 0.14, ease, duration: reduceMotion ? 0 : 0.1 })
        gsap.to(`${detailsActive} .text`, {
          y: 0,
          delay: 0.04,
          duration: reduceMotion ? 0 : 0.28,
          ease,
        })
        gsap.to(`${detailsActive} .title-1`, {
          y: 0,
          delay: 0.06,
          duration: reduceMotion ? 0 : 0.28,
          ease,
        })
        gsap.to(`${detailsActive} .title-2`, {
          y: 0,
          delay: 0.06,
          duration: reduceMotion ? 0 : 0.28,
          ease,
        })
        gsap.to(`${detailsActive} .desc`, {
          y: 0,
          delay: 0.12,
          duration: reduceMotion ? 0 : 0.18,
          ease,
        })
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: 0.14,
          duration: reduceMotion ? 0 : 0.18,
          ease,
        })
        gsap.set(detailsInactive, { zIndex: 12 })

        gsap.set(getCard(previousActive), { zIndex: 10 })
        gsap.set(getCard(active), { zIndex: 20 })

        if (!reduceMotion) {
          gsap.to(getCard(previousActive), { scale: 1.5, ease, duration: 0.32 })
        }

        gsap.to(getCardContent(active), {
          y: offsetTop + cardHeight - (isMobile ? 10 : 10),
          opacity: 0,
          duration: reduceMotion ? 0 : 0.1,
          ease,
        })
        gsap.to(getSliderItem(active), { x: 0, ease, duration: reduceMotion ? 0 : 0.24 })
        gsap.to(getSliderItem(previousActive), {
          x: -numberSize,
          ease,
          duration: reduceMotion ? 0 : 0.24,
        })

        if (progress) {
          gsap.to(progress, {
            width: (isMobile ? 160 : 500) * (1 / order.length) * (active + 1),
            ease,
            duration: reduceMotion ? 0 : 0.24,
          })
        }

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          duration: reduceMotion ? 0 : 0.32,
          onComplete: () => {
            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap)

            gsap.set(getCard(previousActive), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: isMobile ? 14 : 10,
              scale: 1,
              opacity: 0,
            })

            gsap.set(getCardContent(previousActive), {
              x: xNew,
              y: offsetTop + cardHeight - (isMobile ? 54 : 100),
              opacity: 0,
              zIndex: 40,
            })

            gsap.to(getCard(previousActive), {
              opacity: 1,
              ease,
              duration: reduceMotion ? 0 : 0.2,
            })
            gsap.to(getCardContent(previousActive), {
              opacity: 1,
              ease,
              delay: reduceMotion ? 0 : 0.03,
              duration: reduceMotion ? 0 : 0.2,
            })

            gsap.set(getSliderItem(previousActive), { x: rest.length * numberSize })

            gsap.set(detailsInactive, { opacity: 0 })
            gsap.set(`${detailsInactive} .text`, { y: 100 })
            gsap.set(`${detailsInactive} .title-1`, { y: 100 })
            gsap.set(`${detailsInactive} .title-2`, { y: 100 })
            gsap.set(`${detailsInactive} .desc`, { y: 50 })
            gsap.set(`${detailsInactive} .cta`, { y: 60 })

            resolve()
          },
        })

        rest.forEach((slideIndex, index) => {
          if (slideIndex === previousActive) {
            return
          }

          const xNew = offsetLeft + index * (cardWidth + gap)

          gsap.set(getCard(slideIndex), { zIndex: 30 })
          gsap.to(getCard(slideIndex), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: reduceMotion ? 0 : 0.03 * (index + 1),
            duration: reduceMotion ? 0 : 0.24,
          })

          gsap.to(getCardContent(slideIndex), {
            x: xNew,
            y: offsetTop + cardHeight - (isMobile ? 54 : 100),
            opacity: 1,
            zIndex: 40,
            ease,
            delay: reduceMotion ? 0 : 0.03 * (index + 1),
            duration: reduceMotion ? 0 : 0.24,
          })

          gsap.to(getSliderItem(slideIndex), {
            x: (index + 1) * numberSize,
            ease,
            duration: reduceMotion ? 0 : 0.24,
          })
        })
      })

    const stepBack = () =>
      new Promise<void>((resolve) => {
        order.unshift(order.pop()!)
        detailsEven = !detailsEven

        const isMobile = window.innerWidth < 768
        const detailsActive = detailsEven ? '#details-even' : '#details-odd'
        const detailsInactive = detailsEven ? '#details-odd' : '#details-even'
        const active = order[0]
        const rest = order.slice(1)
        const previousActive = rest[0]
        const progress = qs<HTMLElement>('.progress-sub-foreground')

        setDetailContent(detailsActive, active)

        gsap.set(detailsActive, { zIndex: 22 })
        gsap.to(detailsActive, { opacity: 1, delay: 0.12, ease, duration: reduceMotion ? 0 : 0.08 })
        gsap.to(`${detailsActive} .text`, {
          y: 0,
          delay: 0.03,
          duration: reduceMotion ? 0 : 0.24,
          ease,
        })
        gsap.to(`${detailsActive} .title-1`, {
          y: 0,
          delay: 0.05,
          duration: reduceMotion ? 0 : 0.24,
          ease,
        })
        gsap.to(`${detailsActive} .title-2`, {
          y: 0,
          delay: 0.05,
          duration: reduceMotion ? 0 : 0.24,
          ease,
        })
        gsap.to(`${detailsActive} .desc`, {
          y: 0,
          delay: 0.1,
          duration: reduceMotion ? 0 : 0.14,
          ease,
        })
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: 0.12,
          duration: reduceMotion ? 0 : 0.14,
          ease,
        })
        gsap.set(detailsInactive, { zIndex: 12 })

        gsap.set(getCard(previousActive), { zIndex: 15 })
        gsap.set(getCard(active), { zIndex: 20 })

        gsap.to(getCardContent(active), {
          y: offsetTop + cardHeight - (isMobile ? 10 : 10),
          opacity: 0,
          duration: reduceMotion ? 0 : 0.12,
          ease,
        })

        gsap.to(getSliderItem(active), { x: 0, ease, duration: reduceMotion ? 0 : 0.28 })

        if (progress) {
          gsap.to(progress, {
            width: (isMobile ? 160 : 500) * (1 / order.length) * (active + 1),
            ease,
            duration: reduceMotion ? 0 : 0.28,
          })
        }

        gsap.to(getCard(previousActive), {
          x: offsetLeft,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: isMobile ? 14 : 10,
          scale: 1,
          ease,
          duration: reduceMotion ? 0 : 0.4,
          onComplete: () => {
            gsap.set(getCard(previousActive), { zIndex: 30 })
            gsap.fromTo(
              getCard(previousActive),
              { opacity: 0.55 },
              {
                opacity: 1,
                ease,
                duration: reduceMotion ? 0 : 0.2,
              },
            )
          },
        })

        gsap.to(getCardContent(previousActive), {
          x: offsetLeft,
          y: offsetTop + cardHeight - (isMobile ? 54 : 100),
          opacity: 1,
          zIndex: 40,
          ease,
          duration: reduceMotion ? 0 : 0.28,
        })

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          ease,
          duration: reduceMotion ? 0 : 0.4,
          onComplete: () => {
            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0, zIndex: 40 })

            gsap.set(detailsInactive, { opacity: 0 })
            gsap.set(`${detailsInactive} .text`, { y: 100 })
            gsap.set(`${detailsInactive} .title-1`, { y: 100 })
            gsap.set(`${detailsInactive} .title-2`, { y: 100 })
            gsap.set(`${detailsInactive} .desc`, { y: 50 })
            gsap.set(`${detailsInactive} .cta`, { y: 60 })

            resolve()
          },
        })

        rest.forEach((slideIndex, index) => {
          if (slideIndex === previousActive) {
            gsap.to(getSliderItem(slideIndex), {
              x: numberSize,
              ease,
              duration: reduceMotion ? 0 : 0.28,
            })
            return
          }

          const xNew = offsetLeft + index * (cardWidth + gap)

          gsap.set(getCard(slideIndex), { zIndex: 30 })
          gsap.to(getCard(slideIndex), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: reduceMotion ? 0 : 0.04 * index,
            duration: reduceMotion ? 0 : 0.28,
          })

          gsap.to(getCardContent(slideIndex), {
            x: xNew,
            y: offsetTop + cardHeight - (isMobile ? 54 : 100),
            opacity: 1,
            zIndex: 40,
            ease,
            delay: reduceMotion ? 0 : 0.04 * index,
            duration: reduceMotion ? 0 : 0.28,
          })

          gsap.to(getSliderItem(slideIndex), {
            x: (index + 1) * numberSize,
            ease,
            duration: reduceMotion ? 0 : 0.28,
          })
        })
      })

    const sweepIndicator = async () => {
      const indicator = qs<HTMLElement>('.indicator')

      if (!indicator || reduceMotion) {
        return
      }

      await animate(indicator, 0.7, { x: 0 })
      await animate(indicator, 0.25, { x: window.innerWidth, delay: 0.08 })
      gsap.set(indicator, { x: -window.innerWidth })
    }

    const runStepForward = async () => {
      if (isAnimating) {
        return
      }

      isAnimating = true
      await sweepIndicator()
      await step()
      isAnimating = false
    }

    const runStepBackward = async () => {
      if (isAnimating) {
        return
      }

      isAnimating = true
      await sweepIndicator()
      await stepBack()
      isAnimating = false
    }

    const moveToHeroStory = () => {
      if (!heroSectionRef.current || isAnimating || activeSurfaceRef.current !== 'header') {
        return
      }

      isAnimating = true
      void (async () => {
        await sweepIndicator()
        setHeroSlideIndex(0)
        setActiveSurface('hero-story')
        window.setTimeout(() => {
          isAnimating = false
        }, reduceMotion ? 0 : 420)
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'header') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      if (event.deltaY > 0) {
        if (order[0] === headerSlides.length - 1) {
          event.preventDefault()
          moveToHeroStory()
          return
        }

        event.preventDefault()
        void runStepForward()
      } else {
        if (order[0] === 0) {
          return
        }

        event.preventDefault()
        void runStepBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'header') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'header') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        if (order[0] === headerSlides.length - 1) {
          moveToHeroStory()
          return
        }

        void runStepForward()
      } else if (endY - touchStartY > 30) {
        if (order[0] === 0) {
          return
        }

        void runStepBackward()
      }
    }

    const handleResize = () => {
      setStaticLayout()
    }

    const handleHeaderReveal = () => {
      revealCurrentHeader()
    }

    const handleHeaderReset = () => {
      order.length = 0
      headerSlides.forEach((_, index) => order.push(index))
      detailsEven = true
      revealCurrentHeader()
    }

    const handleHeaderJumpLast = () => {
      const lastIndex = headerSlides.length - 1
      order.length = 0
      order.push(lastIndex)
      for (let i = 0; i < lastIndex; i += 1) {
        order.push(i)
      }
      detailsEven = lastIndex % 2 === 0
      revealCurrentHeader()
    }

    root.addEventListener('wheel', handleWheel, { passive: false })
    root.addEventListener('touchstart', handleTouchStart, { passive: true })
    root.addEventListener('touchend', handleTouchEnd, { passive: true })
    root.addEventListener('header-reveal', handleHeaderReveal as EventListener)
    root.addEventListener('header-reset', handleHeaderReset as EventListener)
    root.addEventListener('header-jump-last', handleHeaderJumpLast as EventListener)
    window.addEventListener('resize', handleResize)

    init()

    return () => {
      root.removeEventListener('wheel', handleWheel)
      root.removeEventListener('touchstart', handleTouchStart)
      root.removeEventListener('touchend', handleTouchEnd)
      root.removeEventListener('header-reveal', handleHeaderReveal as EventListener)
      root.removeEventListener('header-reset', handleHeaderReset as EventListener)
      root.removeEventListener('header-jump-last', handleHeaderJumpLast as EventListener)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const hero = heroSectionRef.current
    const header = rootRef.current
    const pain = painSectionRef.current

    if (!hero || !header || !pain) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const heroIndicator = hero.querySelector<HTMLElement>('.hero-story__indicator')

    if (heroIndicator) {
      gsap.set(heroIndicator, { x: -window.innerWidth })
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const waitFrame = () =>
      new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve())
        })
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const animateTimeline = (timeline: gsap.core.Timeline) =>
      new Promise<void>((resolve) => {
        timeline.eventCallback('onComplete', () => resolve())
      })

    const getHeroText = (index: number) =>
      hero.querySelectorAll<HTMLElement>('.arch__left .arch__info')[index] ?? null

    const getHeroMedia = (index: number) =>
      hero.querySelectorAll<HTMLElement>('.hero-story__media-slide')[index] ?? null

    const moveToPainStory = () => {
      if (!pain || isLocked || activeSurfaceRef.current !== 'hero-story') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepHeroIndicator()

        if (reduceMotion) {
          setPainSlideIndex(0)
          setActiveSurface('pain')
          releaseLock(0)
          return
        }

        const painTrack = painTrackRef.current
        const firstPainPanel = pain.querySelectorAll<HTMLElement>('.pain-story__content')[0] ?? null

        gsap.killTweensOf([hero, painTrack, firstPainPanel])

        hero.style.transition = 'none'
        gsap.set(hero, {
          x: 0,
          y: 0,
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'none',
          zIndex: 45,
        })

        if (painTrack) {
          gsap.set(painTrack, { x: window.innerWidth })
        }

        if (firstPainPanel) {
          gsap.set(firstPainPanel, {
            y: 44,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(8px)',
          })
        }

        skipNextPainSurfaceIntroRef.current = true
        setPainSlideIndex(0)
        setActiveSurface('pain')
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => resolve())
          })
        })

        const tl = gsap.timeline({
          defaults: {
            ease: 'power2.out',
          },
          onComplete: () => {
            hero.style.transition = ''
            gsap.set(hero, {
              clearProps: 'x,y,opacity,visibility,pointerEvents,zIndex',
            })

            if (painTrack) {
              gsap.set(painTrack, { clearProps: 'x' })
            }

            if (firstPainPanel) {
              gsap.set(firstPainPanel, { clearProps: 'y,opacity,scale,filter' })
            }

            releaseLock(420)
          },
        })

        tl.to(
          hero,
          {
            x: -window.innerWidth,
            duration: 1.18,
            ease: 'power2.inOut',
          },
          0,
        )

        if (painTrack) {
          tl.to(
            painTrack,
            {
              x: 0,
              duration: 1.18,
            },
            0,
          )
        }

        if (firstPainPanel) {
          tl.to(
            firstPainPanel,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.02,
            },
            0.12,
          )
        }
      })()
    }

    const animateHeroIntro = async (index: number) => {
      const text = getHeroText(index)
      const media = getHeroMedia(index)

      if (!text || !media || reduceMotion) {
        return
      }

      gsap.killTweensOf([text, media])
      gsap.set(text, {
        x: -108,
        opacity: 0,
        filter: 'blur(9px)',
      })
      gsap.set(media, {
        x: 124,
        opacity: 0,
        scale: 0.982,
        filter: 'blur(9px)',
      })

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      tl.to(
        text,
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.14,
        },
        0.14,
      ).to(
        media,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.22,
        },
        0,
      )

      await animateTimeline(tl)
    }

    const animateHeroSlideChange = async (nextIndex: number) => {
      const currentIndex = heroSlideIndexRef.current

      if (nextIndex === currentIndex) {
        return
      }

      const currentText = getHeroText(currentIndex)
      const currentMedia = getHeroMedia(currentIndex)
      const nextText = getHeroText(nextIndex)
      const nextMedia = getHeroMedia(nextIndex)

      if (!currentText || !currentMedia || !nextText || !nextMedia || reduceMotion) {
        setHeroSlideIndex(nextIndex)
        await waitFrame()
        return
      }

      gsap.killTweensOf([currentText, currentMedia, nextText, nextMedia])

      const exitTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.inOut',
        },
      })

      exitTimeline
        .to(
          currentText,
          {
            x: -108,
            opacity: 0,
            filter: 'blur(9px)',
            duration: 0.74,
          },
          0,
        )
        .to(
          currentMedia,
          {
            x: 124,
            opacity: 0,
            scale: 0.982,
            filter: 'blur(9px)',
            duration: 0.78,
          },
          0,
        )

      await animateTimeline(exitTimeline)

      gsap.set(nextText, {
        x: -108,
        opacity: 0,
        filter: 'blur(9px)',
      })
      gsap.set(nextMedia, {
        x: 124,
        opacity: 0,
        scale: 0.982,
        filter: 'blur(9px)',
      })

      setHeroSlideIndex(nextIndex)
      await waitFrame()

      const enterTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      enterTimeline
        .to(
          nextText,
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
          duration: 1.14,
          },
        0.14,
        )
        .to(
          nextMedia,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          duration: 1.22,
          },
          0,
        )

      await animateTimeline(enterTimeline)
    }

    const sweepHeroIndicator = async () => {
      if (!heroIndicator || reduceMotion) {
        return
      }

      await animateIndicator(heroIndicator, 0.7, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(heroIndicator, 0.25, {
        x: window.innerWidth,
        delay: 0.08,
        ease: 'sine.inOut',
      })
      gsap.set(heroIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToHeader = () => {
      if (isLocked || activeSurfaceRef.current !== 'hero-story') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepHeroIndicator()
        slowHeaderEntryFromBurgerRef.current = true
        setActiveSurface('header')
        window.requestAnimationFrame(() => {
          header.dispatchEvent(new CustomEvent('header-jump-last'))
        })
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepHeroForward = () => {
      if (isLocked) {
        return
      }

      if (heroSlideIndexRef.current >= heroStorySlides.length - 1) {
        moveToPainStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepHeroIndicator()
        await animateHeroSlideChange(Math.min(heroStorySlides.length - 1, heroSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 360)
        isLocked = false
      })()
    }

    const stepHeroBackward = () => {
      if (isLocked) {
        return
      }

      if (heroSlideIndexRef.current === 0) {
        moveToHeader()
        return
      }

      isLocked = true
      void (async () => {
        await sweepHeroIndicator()
        await animateHeroSlideChange(Math.max(0, heroSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 360)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'hero-story') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepHeroForward()
      } else {
        stepHeroBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'hero-story') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'hero-story') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepHeroForward()
      } else if (endY - touchStartY > 30) {
        stepHeroBackward()
      }
    }

    hero.addEventListener('wheel', handleWheel, { passive: false })
    hero.addEventListener('touchstart', handleTouchStart, { passive: true })
    hero.addEventListener('touchend', handleTouchEnd, { passive: true })

    if (activeSurfaceRef.current === 'hero-story') {
      void animateHeroIntro(heroSlideIndexRef.current)
    }

    return () => {
      hero.removeEventListener('wheel', handleWheel)
      hero.removeEventListener('touchstart', handleTouchStart)
      hero.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const pain = painSectionRef.current
    const track = painTrackRef.current
    const benefits = benefitsSectionRef.current

    if (!pain || !track || !benefits) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const painIndicator = pain.querySelector<HTMLElement>('.hero-story__indicator')

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const waitFrame = () =>
      new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve())
        })
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const animateTimeline = (timeline: gsap.core.Timeline) =>
      new Promise<void>((resolve) => {
        timeline.eventCallback('onComplete', () => resolve())
      })

    const getPainPanel = (index: number) =>
      pain.querySelectorAll<HTMLElement>('.pain-story__content')[index] ?? null

    const syncTrackPosition = () => {
      gsap.set(track, { x: -painSlideIndexRef.current * window.innerWidth })
    }

    if (painIndicator) {
      gsap.set(painIndicator, { x: -window.innerWidth })
    }

    syncTrackPosition()

    const sweepPainIndicator = async () => {
      if (!painIndicator || reduceMotion) {
        return
      }

      await animateIndicator(painIndicator, 0.7, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(painIndicator, 0.25, {
        x: window.innerWidth,
        delay: 0.08,
        ease: 'sine.inOut',
      })
      gsap.set(painIndicator, { x: -window.innerWidth })
    }

    const animatePainIntro = async (index: number) => {
      const panel = getPainPanel(index)

      if (!panel || reduceMotion) {
        return
      }

      gsap.killTweensOf(panel)
      gsap.set(panel, {
        y: 44,
        opacity: 0,
        scale: 0.985,
        filter: 'blur(8px)',
      })

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      tl.to(panel, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.12,
      })

      await animateTimeline(tl)
    }

    const animatePainSlideChange = async (nextIndex: number) => {
      const currentIndex = painSlideIndexRef.current

      if (nextIndex === currentIndex) {
        return
      }

      const currentPanel = getPainPanel(currentIndex)
      const nextPanel = getPainPanel(nextIndex)

      if (!currentPanel || !nextPanel || reduceMotion) {
        setPainSlideIndex(nextIndex)
        await waitFrame()
        syncTrackPosition()
        return
      }

      gsap.killTweensOf([track, currentPanel, nextPanel])

      const exitTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.inOut',
        },
      })

      exitTimeline.to(currentPanel, {
        y: -26,
        opacity: 0,
        scale: 0.982,
        filter: 'blur(8px)',
        duration: 0.58,
      })

      await animateTimeline(exitTimeline)

      setPainSlideIndex(nextIndex)
      await waitFrame()

      gsap.set(nextPanel, {
        y: 44,
        opacity: 0,
        scale: 0.985,
        filter: 'blur(8px)',
      })

      const enterTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      enterTimeline
        .to(
          track,
          {
            x: -nextIndex * window.innerWidth,
            duration: 1.18,
          },
          0,
        )
        .to(
          nextPanel,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.02,
          },
          0.12,
        )

      await animateTimeline(enterTimeline)
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToHeroStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'pain') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepPainIndicator()
        slowHeroEntryFromBurgerRef.current = true
        setHeroSlideIndex(heroStorySlides.length - 1)
        setActiveSurface('hero-story')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToBenefitsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'pain') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepPainIndicator()
        setBenefitsSlideIndex(0)
        setActiveSurface('benefits')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepPainForward = () => {
      if (isLocked) {
        return
      }

      if (painSlideIndexRef.current >= painSlides.length - 1) {
        moveToBenefitsStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepPainIndicator()
        await animatePainSlideChange(Math.min(painSlides.length - 1, painSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 360)
        isLocked = false
      })()
    }

    const stepPainBackward = () => {
      if (isLocked) {
        return
      }

      if (painSlideIndexRef.current === 0) {
        moveToHeroStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepPainIndicator()
        await animatePainSlideChange(Math.max(0, painSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 360)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'pain') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepPainForward()
      } else {
        stepPainBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'pain') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'pain') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepPainForward()
      } else if (endY - touchStartY > 30) {
        stepPainBackward()
      }
    }

    const handleResize = () => {
      syncTrackPosition()
    }

    pain.addEventListener('wheel', handleWheel, { passive: false })
    pain.addEventListener('touchstart', handleTouchStart, { passive: true })
    pain.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('resize', handleResize)

    if (activeSurfaceRef.current === 'pain') {
      void animatePainIntro(painSlideIndexRef.current)
    }

    return () => {
      pain.removeEventListener('wheel', handleWheel)
      pain.removeEventListener('touchstart', handleTouchStart)
      pain.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const benefits = benefitsSectionRef.current

    if (!benefits) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const benefitsIndicator = benefits.querySelector<HTMLElement>('.hero-story__indicator')

    if (benefitsIndicator) {
      gsap.set(benefitsIndicator, { x: -window.innerWidth })
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const sweepBenefitsIndicator = async () => {
      if (!benefitsIndicator || reduceMotion) {
        return
      }

      await animateIndicator(benefitsIndicator, 0.7, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(benefitsIndicator, 0.25, {
        x: window.innerWidth,
        delay: 0.08,
        ease: 'sine.inOut',
      })
      gsap.set(benefitsIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToPainStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'benefits') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepBenefitsIndicator()

        if (reduceMotion) {
          setPainSlideIndex(painSlides.length - 1)
          setActiveSurface('pain')
          releaseLock(0)
          return
        }

        const pain = painSectionRef.current
        const painTrack = painTrackRef.current
        const lastPainIndex = painSlides.length - 1
        const lastPainPanel = pain?.querySelectorAll<HTMLElement>('.pain-story__content')[lastPainIndex] ?? null

        gsap.killTweensOf([benefits, painTrack, lastPainPanel])

        benefits.style.transition = 'none'
        gsap.set(benefits, {
          x: 0,
          y: 0,
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'none',
          zIndex: 55,
        })

        if (painTrack) {
          gsap.set(painTrack, { x: -lastPainIndex * window.innerWidth - window.innerWidth })
        }

        if (lastPainPanel) {
          gsap.set(lastPainPanel, {
            y: 44,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(8px)',
          })
        }

        skipNextPainSurfaceIntroRef.current = true
        setPainSlideIndex(lastPainIndex)
        setActiveSurface('pain')
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => resolve())
          })
        })

        const tl = gsap.timeline({
          defaults: {
            ease: 'power2.out',
          },
          onComplete: () => {
            gsap.set(benefits, {
              clearProps: 'x,y,zIndex',
              opacity: 0,
              visibility: 'hidden',
              pointerEvents: 'none',
            })

            requestAnimationFrame(() => {
              gsap.set(benefits, {
                clearProps: 'opacity,visibility,pointerEvents',
              })
              benefits.style.transition = ''
            })

            if (painTrack) {
              gsap.set(painTrack, { x: -lastPainIndex * window.innerWidth })
            }

            if (lastPainPanel) {
              gsap.set(lastPainPanel, { clearProps: 'y,opacity,scale,filter' })
            }

            releaseLock(420)
          },
        })

        tl.to(
          benefits,
          {
            x: window.innerWidth,
            duration: 1.18,
            ease: 'power2.inOut',
          },
          0,
        )

        if (painTrack) {
          tl.to(
            painTrack,
            {
              x: -lastPainIndex * window.innerWidth,
              duration: 1.18,
            },
            0,
          )
        }

        if (lastPainPanel) {
          tl.to(
            lastPainPanel,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.02,
            },
            0.12,
          )
        }
      })()
    }

    const moveToAttachmentsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'benefits') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepBenefitsIndicator()
        slowAttachmentsEntryFromBenefitsRef.current = true
        setAttachmentsSlideIndex(0)
        setActiveSurface('attachments')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepBenefitsForward = () => {
      if (isLocked) {
        return
      }

      if (benefitsSlideIndexRef.current >= benefitsSlides.length - 1) {
        moveToAttachmentsStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepBenefitsIndicator()
        setBenefitsSlideIndex(Math.min(benefitsSlides.length - 1, benefitsSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 1320)
        isLocked = false
      })()
    }

    const stepBenefitsBackward = () => {
      if (isLocked) {
        return
      }

      if (benefitsSlideIndexRef.current === 0) {
        moveToPainStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepBenefitsIndicator()
        setBenefitsSlideIndex(Math.max(0, benefitsSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 1320)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'benefits') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepBenefitsForward()
      } else {
        stepBenefitsBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'benefits') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'benefits') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepBenefitsForward()
      } else if (endY - touchStartY > 30) {
        stepBenefitsBackward()
      }
    }

    const handleResize = () => {
      syncBenefitsCards(benefitsSlideIndexRef.current)
    }

    syncBenefitsCards(benefitsSlideIndexRef.current)

    benefits.addEventListener('wheel', handleWheel, { passive: false })
    benefits.addEventListener('touchstart', handleTouchStart, { passive: true })
    benefits.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('resize', handleResize)

    if (activeSurfaceRef.current === 'benefits') {
      syncBenefitsCards(benefitsSlideIndexRef.current, { animate: true, fromBottom: true })
    }

    return () => {
      benefits.removeEventListener('wheel', handleWheel)
      benefits.removeEventListener('touchstart', handleTouchStart)
      benefits.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const attachments = attachmentsSectionRef.current

    if (!attachments) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const attachmentsIndicator = attachments.querySelector<HTMLElement>('.hero-story__indicator')

    if (attachmentsIndicator) {
      gsap.set(attachmentsIndicator, { x: -window.innerWidth })
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const sweepAttachmentsIndicator = async () => {
      if (!attachmentsIndicator || reduceMotion) {
        return
      }

      await animateIndicator(attachmentsIndicator, 0.7, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(attachmentsIndicator, 0.25, {
        x: window.innerWidth,
        delay: 0.08,
        ease: 'sine.inOut',
      })
      gsap.set(attachmentsIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToBenefitsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'attachments') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepAttachmentsIndicator()
        setBenefitsSlideIndex(benefitsSlides.length - 1)
        setActiveSurface('benefits')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToHairTypesStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'attachments') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepAttachmentsIndicator()
        slowHairTypesEntryFromAttachmentsRef.current = true
        setHairTypesSlideIndex(0)
        setActiveSurface('hair-types')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepAttachmentsForward = () => {
      if (isLocked) {
        return
      }

      if (attachmentsSlideIndexRef.current >= attachmentSlides.length - 1) {
        moveToHairTypesStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepAttachmentsIndicator()
        setAttachmentsSlideIndex(
          Math.min(attachmentSlides.length - 1, attachmentsSlideIndexRef.current + 1),
        )
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const stepAttachmentsBackward = () => {
      if (isLocked) {
        return
      }

      if (attachmentsSlideIndexRef.current === 0) {
        moveToBenefitsStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepAttachmentsIndicator()
        setAttachmentsSlideIndex(Math.max(0, attachmentsSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'attachments') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepAttachmentsForward()
      } else {
        stepAttachmentsBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'attachments') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'attachments') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepAttachmentsForward()
      } else if (endY - touchStartY > 30) {
        stepAttachmentsBackward()
      }
    }

    attachments.addEventListener('wheel', handleWheel, { passive: false })
    attachments.addEventListener('touchstart', handleTouchStart, { passive: true })
    attachments.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      attachments.removeEventListener('wheel', handleWheel)
      attachments.removeEventListener('touchstart', handleTouchStart)
      attachments.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const hairTypes = hairTypesSectionRef.current

    if (!hairTypes) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const hairTypesIndicator = hairTypes.querySelector<HTMLElement>('.hero-story__indicator')

    if (hairTypesIndicator) {
      gsap.set(hairTypesIndicator, { x: -window.innerWidth })
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const sweepHairTypesIndicator = async () => {
      if (!hairTypesIndicator || reduceMotion) {
        return
      }

      await animateIndicator(hairTypesIndicator, 1.12, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(hairTypesIndicator, 0.42, {
        x: window.innerWidth,
        delay: 0.16,
        ease: 'sine.inOut',
      })
      gsap.set(hairTypesIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToAttachmentsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'hair-types') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepHairTypesIndicator()
        setAttachmentsSlideIndex(attachmentSlides.length - 1)
        setActiveSurface('attachments')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToComfortStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'hair-types') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepHairTypesIndicator()
        slowComfortEntryFromBurgerRef.current = true
        setComfortSlideIndex(0)
        setActiveSurface('comfort')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepHairTypesForward = () => {
      if (isLocked) {
        return
      }

      if (hairTypesSlideIndexRef.current >= hairProfileSlides.length - 1) {
        moveToComfortStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepHairTypesIndicator()
        setHairTypesSlideIndex(Math.min(hairProfileSlides.length - 1, hairTypesSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const stepHairTypesBackward = () => {
      if (isLocked) {
        return
      }

      if (hairTypesSlideIndexRef.current === 0) {
        moveToAttachmentsStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepHairTypesIndicator()
        setHairTypesSlideIndex(Math.max(0, hairTypesSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'hair-types') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepHairTypesForward()
      } else {
        stepHairTypesBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'hair-types') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'hair-types') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepHairTypesForward()
      } else if (endY - touchStartY > 30) {
        stepHairTypesBackward()
      }
    }

    hairTypes.addEventListener('wheel', handleWheel, { passive: false })
    hairTypes.addEventListener('touchstart', handleTouchStart, { passive: true })
    hairTypes.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      hairTypes.removeEventListener('wheel', handleWheel)
      hairTypes.removeEventListener('touchstart', handleTouchStart)
      hairTypes.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const comfort = comfortSectionRef.current

    if (!comfort) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isLocked = false
    let touchStartY = 0
    const comfortIndicator = comfort.querySelector<HTMLElement>('.hero-story__indicator')

    if (comfortIndicator) {
      gsap.set(comfortIndicator, { x: -window.innerWidth })
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: resolve,
        })
      })

    const sweepComfortIndicator = async () => {
      if (!comfortIndicator || reduceMotion) {
        return
      }

      await animateIndicator(comfortIndicator, 1.12, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(comfortIndicator, 0.42, {
        x: window.innerWidth,
        delay: 0.16,
        ease: 'sine.inOut',
      })
      gsap.set(comfortIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToHairTypesStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'comfort') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepComfortIndicator()
        slowHairTypesLastEntryFromComfortRef.current = true
        setHairTypesSlideIndex(hairProfileSlides.length - 1)
        setActiveSurface('hair-types')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToComparisonStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'comfort') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepComfortIndicator()
        setComparisonSlideIndex(0)
        setActiveSurface('comparison')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepComfortForward = () => {
      if (isLocked) {
        return
      }

      if (comfortSlideIndexRef.current >= comfortSlides.length - 1) {
        moveToComparisonStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepComfortIndicator()
        setComfortSlideIndex(Math.min(comfortSlides.length - 1, comfortSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const stepComfortBackward = () => {
      if (isLocked) {
        return
      }

      if (comfortSlideIndexRef.current === 0) {
        moveToHairTypesStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepComfortIndicator()
        setComfortSlideIndex(Math.max(0, comfortSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'comfort') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepComfortForward()
      } else {
        stepComfortBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'comfort') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'comfort') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepComfortForward()
      } else if (endY - touchStartY > 30) {
        stepComfortBackward()
      }
    }

    comfort.addEventListener('wheel', handleWheel, { passive: false })
    comfort.addEventListener('touchstart', handleTouchStart, { passive: true })
    comfort.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      comfort.removeEventListener('wheel', handleWheel)
      comfort.removeEventListener('touchstart', handleTouchStart)
      comfort.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const comparison = comparisonSectionRef.current

    if (!comparison) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const comparisonIndicator = comparison.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepComparisonIndicator = async () => {
      if (!comparisonIndicator || reduceMotion) {
        return
      }

      await animateIndicator(comparisonIndicator, 1.64, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(comparisonIndicator, 0.68, {
        x: window.innerWidth,
        delay: 0.24,
        ease: 'sine.inOut',
      })
      gsap.set(comparisonIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToPackageStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'comparison') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepComparisonIndicator()
        setActiveSurface('package')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToComfortStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'comparison') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepComparisonIndicator()
        slowComfortLastEntryFromComparisonRef.current = true
        setComfortSlideIndex(comfortSlides.length - 1)
        setActiveSurface('comfort')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepComparisonForward = () => {
      if (isLocked) {
        return
      }

      if (comparisonSlideIndexRef.current >= comparisonSlides.length - 1) {
        moveToPackageStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepComparisonIndicator()
        setComparisonSlideIndex(
          Math.min(comparisonSlides.length - 1, comparisonSlideIndexRef.current + 1),
        )
        await wait(reduceMotion ? 0 : 3380)
        isLocked = false
      })()
    }

    const stepComparisonBackward = () => {
      if (isLocked) {
        return
      }

      if (comparisonSlideIndexRef.current === 0) {
        moveToComfortStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepComparisonIndicator()
        setComparisonSlideIndex(Math.max(0, comparisonSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 3380)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'comparison') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepComparisonForward()
      } else {
        stepComparisonBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'comparison') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'comparison') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepComparisonForward()
      } else if (endY - touchStartY > 30) {
        stepComparisonBackward()
      }
    }

    comparison.addEventListener('wheel', handleWheel, { passive: false })
    comparison.addEventListener('touchstart', handleTouchStart, { passive: true })
    comparison.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      comparison.removeEventListener('wheel', handleWheel)
      comparison.removeEventListener('touchstart', handleTouchStart)
      comparison.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const packageSection = packageSectionRef.current

    if (!packageSection) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const packageIndicator = packageSection.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepPackageIndicator = async () => {
      if (!packageIndicator || reduceMotion) {
        return
      }

      await animateIndicator(packageIndicator, 1.32, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(packageIndicator, 0.56, {
        x: -window.innerWidth,
        delay: 0.18,
        ease: 'sine.inOut',
      })
      gsap.set(packageIndicator, { x: window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToSpecsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'package') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepPackageIndicator()
        setActiveSurface('specs')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToComparisonStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'package') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepPackageIndicator()
        setComparisonSlideIndex(comparisonSlides.length - 1)
        setActiveSurface('comparison')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'package') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        moveToSpecsStory()
      } else {
        moveToComparisonStory()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'package') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'package') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        moveToSpecsStory()
      } else if (endY - touchStartY > 30) {
        moveToComparisonStory()
      }
    }

    packageSection.addEventListener('wheel', handleWheel, { passive: false })
    packageSection.addEventListener('touchstart', handleTouchStart, { passive: true })
    packageSection.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      packageSection.removeEventListener('wheel', handleWheel)
      packageSection.removeEventListener('touchstart', handleTouchStart)
      packageSection.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const specsSection = specsSectionRef.current

    if (!specsSection) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const specsIndicator = specsSection.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepSpecsIndicator = async () => {
      if (!specsIndicator || reduceMotion) {
        return
      }

      await animateIndicator(specsIndicator, 1.32, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(specsIndicator, 0.56, {
        x: -window.innerWidth,
        delay: 0.18,
        ease: 'sine.inOut',
      })
      gsap.set(specsIndicator, { x: window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToPackageStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'specs') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepSpecsIndicator()
        setActiveSurface('package')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToGiftStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'specs') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepSpecsIndicator()
        slowGiftEntryRef.current = true
        setGiftSlideIndex(0)
        setActiveSurface('gift')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'specs') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        moveToGiftStory()
      } else {
        moveToPackageStory()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'specs') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'specs') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        moveToGiftStory()
      } else if (endY - touchStartY > 30) {
        moveToPackageStory()
      }
    }

    specsSection.addEventListener('wheel', handleWheel, { passive: false })
    specsSection.addEventListener('touchstart', handleTouchStart, { passive: true })
    specsSection.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      specsSection.removeEventListener('wheel', handleWheel)
      specsSection.removeEventListener('touchstart', handleTouchStart)
      specsSection.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const giftSection = giftSectionRef.current

    if (!giftSection) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const giftIndicator = giftSection.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepGiftIndicator = async () => {
      if (!giftIndicator || reduceMotion) {
        return
      }

      await animateIndicator(giftIndicator, 1.12, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(giftIndicator, 0.42, {
        x: window.innerWidth,
        delay: 0.16,
        ease: 'sine.inOut',
      })
      gsap.set(giftIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })

    const moveToSpecsStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'gift') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepGiftIndicator()
        setSpecsPageIndex(0)
        previousSpecsPageIndexRef.current = 0
        setActiveSurface('specs')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToFaqStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'gift') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepGiftIndicator()
        setFaqPageIndex(0)
        previousFaqPageIndexRef.current = 0
        setActiveSurface('faq')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const stepGiftForward = () => {
      if (isLocked) {
        return
      }

      if (giftSlideIndexRef.current >= giftSlides.length - 1) {
        moveToFaqStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepGiftIndicator()
        setGiftSlideIndex(Math.min(giftSlides.length - 1, giftSlideIndexRef.current + 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const stepGiftBackward = () => {
      if (isLocked) {
        return
      }

      if (giftSlideIndexRef.current === 0) {
        moveToSpecsStory()
        return
      }

      isLocked = true
      void (async () => {
        await sweepGiftIndicator()
        setGiftSlideIndex(Math.max(0, giftSlideIndexRef.current - 1))
        await wait(reduceMotion ? 0 : 1820)
        isLocked = false
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'gift') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        stepGiftForward()
      } else {
        stepGiftBackward()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'gift') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'gift') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        stepGiftForward()
      } else if (endY - touchStartY > 30) {
        stepGiftBackward()
      }
    }

    giftSection.addEventListener('wheel', handleWheel, { passive: false })
    giftSection.addEventListener('touchstart', handleTouchStart, { passive: true })
    giftSection.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      giftSection.removeEventListener('wheel', handleWheel)
      giftSection.removeEventListener('touchstart', handleTouchStart)
      giftSection.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const faqSection = faqSectionRef.current

    if (!faqSection) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const faqIndicator = faqSection.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepFaqIndicator = async () => {
      if (!faqIndicator || reduceMotion) {
        return
      }

      await animateIndicator(faqIndicator, 1.32, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(faqIndicator, 0.56, {
        x: -window.innerWidth,
        delay: 0.18,
        ease: 'sine.inOut',
      })
      gsap.set(faqIndicator, { x: window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToGiftStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'faq') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepFaqIndicator()
        slowGiftLastEntryFromFaqRef.current = true
        setGiftSlideIndex(giftSlides.length - 1)
        setActiveSurface('gift')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const moveToFinalCtaStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'faq') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepFaqIndicator()
        setActiveSurface('final-cta')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'faq') {
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        moveToFinalCtaStory()
      } else {
        moveToGiftStory()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'faq') {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'faq') {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (touchStartY - endY > 30) {
        moveToFinalCtaStory()
      } else if (endY - touchStartY > 30) {
        moveToGiftStory()
      }
    }

    faqSection.addEventListener('wheel', handleWheel, { passive: false })
    faqSection.addEventListener('touchstart', handleTouchStart, { passive: true })
    faqSection.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      faqSection.removeEventListener('wheel', handleWheel)
      faqSection.removeEventListener('touchstart', handleTouchStart)
      faqSection.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const finalCtaSection = finalCtaSectionRef.current

    if (!finalCtaSection) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finalCtaIndicator = finalCtaSection.querySelector<HTMLElement>('.hero-story__indicator')
    let isLocked = false
    let touchStartY = 0

    const animateIndicator = (
      target: gsap.TweenTarget,
      duration: number,
      properties: gsap.TweenVars,
    ) =>
      new Promise<void>((resolve) => {
        gsap.to(target, {
          duration,
          ...properties,
          onComplete: () => resolve(),
        })
      })

    const sweepFinalCtaIndicator = async () => {
      if (!finalCtaIndicator || reduceMotion) {
        return
      }

      await animateIndicator(finalCtaIndicator, 1.32, { x: 0, ease: 'sine.inOut' })
      await animateIndicator(finalCtaIndicator, 0.56, {
        x: window.innerWidth,
        delay: 0.18,
        ease: 'sine.inOut',
      })
      gsap.set(finalCtaIndicator, { x: -window.innerWidth })
    }

    const releaseLock = (delay: number) => {
      window.setTimeout(() => {
        isLocked = false
      }, delay)
    }

    const moveToFaqStory = () => {
      if (isLocked || activeSurfaceRef.current !== 'final-cta') {
        return
      }

      isLocked = true
      void (async () => {
        await sweepFinalCtaIndicator()
        setActiveSurface('faq')
        releaseLock(reduceMotion ? 0 : 420)
      })()
    }

    const handleWheel = (event: WheelEvent) => {
      if (activeSurfaceRef.current !== 'final-cta') {
        return
      }

      if (isFinalCtaPopupOpenRef.current) {
        event.preventDefault()
        return
      }

      if (Math.abs(event.deltaY) < 12) {
        return
      }

      event.preventDefault()

      if (event.deltaY < 0) {
        moveToFaqStory()
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'final-cta') {
        return
      }

      if (isFinalCtaPopupOpenRef.current) {
        return
      }

      touchStartY = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (activeSurfaceRef.current !== 'final-cta') {
        return
      }

      if (isFinalCtaPopupOpenRef.current) {
        return
      }

      const endY = event.changedTouches[0]?.clientY ?? 0

      if (endY - touchStartY > 30) {
        moveToFaqStory()
      }
    }

    finalCtaSection.addEventListener('wheel', handleWheel, { passive: false })
    finalCtaSection.addEventListener('touchstart', handleTouchStart, { passive: true })
    finalCtaSection.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      finalCtaSection.removeEventListener('wheel', handleWheel)
      finalCtaSection.removeEventListener('touchstart', handleTouchStart)
      finalCtaSection.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    heroVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'hero-story' && index === heroSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, heroSlideIndex, isMobileViewport])

  useEffect(() => {
    painVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'pain' && index === painSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, painSlideIndex, isMobileViewport])

  useEffect(() => {
    benefitsVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'benefits' && index === benefitsSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, benefitsSlideIndex, isMobileViewport])

  useEffect(() => {
    attachmentsVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'attachments' && index === attachmentsSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, attachmentsSlideIndex, isMobileViewport])

  useEffect(() => {
    if (
      activeSurface !== 'attachments' ||
      attachmentsSlideIndex !== 0 ||
      !slowAttachmentsEntryFromBenefitsRef.current
    ) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const attachments = attachmentsSectionRef.current
    const activeMedia = attachments?.querySelectorAll<HTMLElement>('.attachments-story__media-slide')[0]
    const activeContent = attachments?.querySelectorAll<HTMLElement>('.attachments-story__content')[0]
    const railItems = attachments
      ? Array.from(attachments.querySelectorAll<HTMLElement>('.attachments-story__rail-item'))
      : []

    if (!activeMedia || !activeContent || reduceMotion) {
      slowAttachmentsEntryFromBenefitsRef.current = false
      return
    }

    gsap.killTweensOf([activeMedia, activeContent, ...railItems])

    gsap.set(activeMedia, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(14px)',
      transformOrigin: 'center center',
    })
    gsap.set(activeContent, {
      opacity: 0,
      y: 96,
      filter: 'blur(14px)',
      pointerEvents: 'none',
    })

    railItems.forEach((item) => {
      gsap.set(item, {
        opacity: 0,
        x: -24,
        filter: 'blur(8px)',
      })
    })

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(activeMedia, { clearProps: 'opacity,scale,filter,transformOrigin' })
        gsap.set(activeContent, { clearProps: 'opacity,y,filter,pointerEvents' })
        railItems.forEach((item) => {
          gsap.set(item, { clearProps: 'opacity,x,filter' })
        })
        slowAttachmentsEntryFromBenefitsRef.current = false
      },
    })

    railItems.forEach((item, index) => {
      entryTimeline.to(
        item,
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.48,
        },
        0.08 + index * 0.08,
      )
    })

    entryTimeline.to(
      activeMedia,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.34,
      },
      0,
    )

    entryTimeline.to(
      activeContent,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
        duration: 0.82,
      },
      0.5,
    )

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface, attachmentsSlideIndex])

  useEffect(() => {
    comfortVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'comfort' && index === comfortSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, comfortSlideIndex, isMobileViewport])

  useEffect(() => {
    comparisonVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'comparison' && index === comparisonSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, comparisonSlideIndex, isMobileViewport])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const backgroundRadius = window.innerWidth < 768 ? 22 : 28
    const openClip = `inset(0% 0% 0% 0% round ${backgroundRadius}px)`
    const panelClosedClip = 'inset(100% 0% 0% 0%)'
    const panelOpenClip = 'inset(0% 0% 0% 0%)'

    const backgrounds = comfortBgRefs.current
    const panels = comfortPanelRefs.current
    const copies = comfortCopyRefs.current
    const windows = comfortWindowRefs.current
    const previousIndex = previousComfortSlideIndexRef.current
    const shouldSlowComfortEntry =
      slowComfortEntryFromBurgerRef.current &&
      activeSurface === 'comfort' &&
      comfortSlideIndex === 0
    const shouldSlowComfortLastEntry =
      slowComfortLastEntryFromComparisonRef.current &&
      activeSurface === 'comfort' &&
      comfortSlideIndex === comfortSlides.length - 1
    const involvesIntroTransition =
      comfortSlides[previousIndex]?.intro === true || comfortSlides[comfortSlideIndex]?.intro === true
    const shouldCurtainPanel = isMobileViewport || involvesIntroTransition

    const setBackgroundBase = (el: HTMLDivElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
        zIndex: visible ? 2 : 0,
      })
    }

    const setPanelBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        clipPath: panelOpenClip,
        zIndex: visible ? 2 : 0,
      })
    }

    const setCopyBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 34,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
      })
    }

    const setWindowBase = (el: HTMLDivElement | null) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: 1,
        clipPath: openClip,
      })
    }

    if (reduceMotion || activeSurface !== 'comfort') {
      backgrounds.forEach((bg, index) => setBackgroundBase(bg, activeSurface === 'comfort' && index === comfortSlideIndex))
      panels.forEach((panel, index) => setPanelBase(panel, activeSurface === 'comfort' && index === comfortSlideIndex))
      copies.forEach((copy, index) => setCopyBase(copy, activeSurface === 'comfort' && index === comfortSlideIndex))
      windows.forEach((windowEl) => setWindowBase(windowEl))
      previousComfortSlideIndexRef.current = comfortSlideIndex
      return
    }

    gsap.killTweensOf(backgrounds.filter(Boolean))
    gsap.killTweensOf(panels.filter(Boolean))
    gsap.killTweensOf(copies.filter(Boolean))
    gsap.killTweensOf(windows.filter(Boolean))

    const activeBackground = backgrounds[comfortSlideIndex]
    const previousBackground = backgrounds[previousIndex]
    const activePanel = panels[comfortSlideIndex]
    const previousPanel = panels[previousIndex]
    const activeCopy = copies[comfortSlideIndex]
    const previousCopy = copies[previousIndex]
    const activeWindow = windows[comfortSlideIndex]

    backgrounds.forEach((bg, index) => {
      if (index !== previousIndex && index !== comfortSlideIndex) {
        setBackgroundBase(bg, false)
      }
    })

    panels.forEach((panel, index) => {
      if (index !== previousIndex && index !== comfortSlideIndex) {
        setPanelBase(panel, false)
      }
    })

    copies.forEach((copy, index) => {
      if (index !== previousIndex && index !== comfortSlideIndex) {
        setCopyBase(copy, false)
      }
    })

    windows.forEach((windowEl, index) => {
      if (index !== previousIndex && index !== comfortSlideIndex) {
        setWindowBase(windowEl)
      }
    })

    if (shouldSlowComfortEntry || shouldSlowComfortLastEntry) {
      if (activeBackground) {
        gsap.set(activeBackground, {
          opacity: 1,
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 3,
        })
      }

      if (activePanel) {
        gsap.set(activePanel, {
          opacity: 1,
          pointerEvents: 'auto',
          clipPath: shouldCurtainPanel ? panelClosedClip : panelOpenClip,
          zIndex: 2,
        })
      }

      setCopyBase(activeCopy, false)
      setWindowBase(activeWindow)

      const introTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          backgrounds.forEach((bg, index) => setBackgroundBase(bg, index === comfortSlideIndex))
          panels.forEach((panel, index) => setPanelBase(panel, index === comfortSlideIndex))
          copies.forEach((copy, index) => setCopyBase(copy, index === comfortSlideIndex))
          windows.forEach((windowEl) => setWindowBase(windowEl))
          previousComfortSlideIndexRef.current = comfortSlideIndex
          slowComfortEntryFromBurgerRef.current = false
          slowComfortLastEntryFromComparisonRef.current = false
        },
      })

      if (activeBackground) {
        introTimeline.to(
          activeBackground,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.56,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      if (activePanel && shouldCurtainPanel) {
        introTimeline.to(
          activePanel,
          {
            clipPath: panelOpenClip,
            duration: 1.56,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      if (activeCopy) {
        introTimeline.to(
          activeCopy,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.14,
          },
          1.02,
        )
      }

      return () => {
        introTimeline.kill()
      }
    }

    if (previousIndex === comfortSlideIndex) {
      setBackgroundBase(activeBackground, true)
      setPanelBase(activePanel, true)
      setCopyBase(activeCopy, true)
      setWindowBase(activeWindow)
      previousComfortSlideIndexRef.current = comfortSlideIndex
      return
    }

    if (previousBackground) {
      gsap.set(previousBackground, {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        zIndex: 1,
      })
    }

    if (previousPanel) {
      gsap.set(previousPanel, {
        opacity: 1,
        pointerEvents: 'none',
        clipPath: 'inset(0% 0% 0% 0%)',
        zIndex: 4,
      })
    }

    if (activeBackground) {
      gsap.set(activeBackground, {
        opacity: 1,
        clipPath: 'inset(100% 0% 0% 0%)',
        zIndex: 3,
      })
    }

    if (activePanel) {
      gsap.set(activePanel, {
        opacity: 1,
        pointerEvents: 'auto',
        clipPath: shouldCurtainPanel ? panelClosedClip : panelOpenClip,
        zIndex: 2,
      })
    }

    setCopyBase(previousCopy, true)
    setCopyBase(activeCopy, false)
    setWindowBase(activeWindow)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        backgrounds.forEach((bg, index) => setBackgroundBase(bg, index === comfortSlideIndex))
        panels.forEach((panel, index) => setPanelBase(panel, index === comfortSlideIndex))
        copies.forEach((copy, index) => setCopyBase(copy, index === comfortSlideIndex))
        windows.forEach((windowEl) => setWindowBase(windowEl))
        previousComfortSlideIndexRef.current = comfortSlideIndex
      },
    })

    if (activeBackground) {
      timeline.to(
        activeBackground,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (previousPanel) {
      timeline.to(
        previousPanel,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (activePanel && shouldCurtainPanel) {
      timeline.to(
        activePanel,
        {
          clipPath: panelOpenClip,
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (activeCopy) {
      timeline.to(
        activeCopy,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.86,
        },
        0.82,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [activeSurface, comfortSlideIndex, isMobileViewport])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mediaSlides = comparisonMediaRefs.current
    const panels = comparisonPanelRefs.current
    const copies = comparisonCopyRefs.current
    const rowGroups = comparisonRowRefs.current
    const previousIndex = previousComparisonSlideIndexRef.current
    const shouldSlowComparisonEntry =
      slowComparisonEntryFromBurgerRef.current &&
      activeSurface === 'comparison' &&
      comparisonSlideIndex === 0

    const setMediaBase = (el: HTMLDivElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 1.04,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        zIndex: visible ? 2 : 0,
      })
    }

    const setPanelBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 24,
        filter: visible ? 'blur(0px)' : 'blur(8px)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: visible ? 3 : 0,
      })
    }

    const setCopyBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 30,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
      })
    }

    const setRowsBase = (rows: Array<HTMLDivElement | null> = [], visible: boolean) => {
      rows.forEach((row) => {
        if (!row) {
          return
        }

        const item = row.querySelector<HTMLElement>('.comparison-story__item')
        const node = row.querySelector<HTMLElement>('.comparison-story__node')
        const offsetX = row.classList.contains('comparison-story__row--left') ? -54 : 54

        if (item) {
          gsap.set(item, {
            opacity: visible ? 1 : 0,
            x: visible ? 0 : offsetX,
            filter: visible ? 'blur(0px)' : 'blur(10px)',
          })
        }

        if (node) {
          gsap.set(node, {
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.45,
          })
        }
      })
    }

    if (reduceMotion || activeSurface !== 'comparison') {
      mediaSlides.forEach((media, index) =>
        setMediaBase(media, activeSurface === 'comparison' && index === comparisonSlideIndex),
      )
      panels.forEach((panel, index) =>
        setPanelBase(panel, activeSurface === 'comparison' && index === comparisonSlideIndex),
      )
      copies.forEach((copy, index) =>
        setCopyBase(copy, activeSurface === 'comparison' && index === comparisonSlideIndex),
      )
      rowGroups.forEach((rows, index) => setRowsBase(rows, activeSurface === 'comparison' && index === comparisonSlideIndex))
      previousComparisonSlideIndexRef.current = comparisonSlideIndex
      return
    }

    mediaSlides.forEach((slide) => slide && gsap.killTweensOf(slide))
    panels.forEach((panel) => panel && gsap.killTweensOf(panel))
    copies.forEach((copy) => copy && gsap.killTweensOf(copy))
    rowGroups.forEach((rows) => rows.forEach((row) => row && gsap.killTweensOf(row.querySelectorAll('*'))))

    const activeMedia = mediaSlides[comparisonSlideIndex]
    const previousMedia = mediaSlides[previousIndex]
    const activePanel = panels[comparisonSlideIndex]
    const previousPanel = panels[previousIndex]
    const activeCopy = copies[comparisonSlideIndex]
    const activeRows = rowGroups[comparisonSlideIndex] ?? []

    mediaSlides.forEach((media, index) => {
      if (index !== comparisonSlideIndex && index !== previousIndex) {
        setMediaBase(media, false)
      }
    })
    panels.forEach((panel, index) => {
      if (index !== comparisonSlideIndex && index !== previousIndex) {
        setPanelBase(panel, false)
      }
    })
    copies.forEach((copy, index) => {
      if (index !== comparisonSlideIndex && index !== previousIndex) {
        setCopyBase(copy, false)
      }
    })
    rowGroups.forEach((rows, index) => {
      if (index !== comparisonSlideIndex) {
        setRowsBase(rows, false)
      }
    })

    if (previousMedia) {
      setMediaBase(previousMedia, true)
    }

    if (previousPanel) {
      setPanelBase(previousPanel, true)
      gsap.set(previousPanel, { pointerEvents: 'none' })
    }

    if (activeMedia) {
      setMediaBase(activeMedia, false)
      gsap.set(activeMedia, { zIndex: 2 })
    }

    if (activePanel) {
      setPanelBase(activePanel, false)
      gsap.set(activePanel, { zIndex: 3 })
    }

    if (activeCopy) {
      setCopyBase(activeCopy, false)
    }

    setRowsBase(activeRows, false)

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        mediaSlides.forEach((media, index) => setMediaBase(media, index === comparisonSlideIndex))
        panels.forEach((panel, index) => setPanelBase(panel, index === comparisonSlideIndex))
        copies.forEach((copy, index) => setCopyBase(copy, index === comparisonSlideIndex))
        rowGroups.forEach((rows, index) => setRowsBase(rows, index === comparisonSlideIndex))
        previousComparisonSlideIndexRef.current = comparisonSlideIndex
        slowComparisonEntryFromBurgerRef.current = false
      },
    })

    if (previousMedia && previousIndex !== comparisonSlideIndex) {
      timeline.to(
        previousMedia,
        {
          opacity: 0,
          scale: 1.04,
          filter: 'blur(10px)',
          duration: 1.14,
        },
        0,
      )
    }

    if (previousPanel && previousIndex !== comparisonSlideIndex) {
      timeline.to(
        previousPanel,
        {
          opacity: 0,
          y: -18,
          filter: 'blur(8px)',
          duration: 1.02,
        },
        0,
      )
    }

    if (activeMedia) {
      timeline.to(
        activeMedia,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: shouldSlowComparisonEntry ? 2.58 : 1.92,
        },
        0,
      )
    }

    if (activePanel) {
      timeline.to(
        activePanel,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: shouldSlowComparisonEntry ? 1.96 : 1.48,
        },
        shouldSlowComparisonEntry ? 0.34 : 0.22,
      )
    }

    if (activeCopy) {
      timeline.to(
        activeCopy,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: shouldSlowComparisonEntry ? 1.72 : 1.32,
        },
        shouldSlowComparisonEntry ? 0.88 : 0.62,
      )
    }

    activeRows.forEach((row, rowIndex) => {
      if (!row) {
        return
      }

      const item = row.querySelector<HTMLElement>('.comparison-story__item')
      const node = row.querySelector<HTMLElement>('.comparison-story__node')
      const startAt = shouldSlowComparisonEntry ? 1.26 + rowIndex * 0.2 : 1 + rowIndex * 0.16

      if (node) {
        timeline.to(
          node,
          {
            opacity: 1,
            scale: 1,
            duration: shouldSlowComparisonEntry ? 0.88 : 0.72,
          },
          startAt,
        )
      }

      if (item) {
        timeline.to(
          item,
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: shouldSlowComparisonEntry ? 1.18 : 0.98,
          },
          startAt,
        )
      }
    })

    return () => {
      timeline.kill()
    }
  }, [activeSurface, comparisonSlideIndex])

  useEffect(() => {
    hairTypesVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'hair-types' && index === hairTypesSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, hairTypesSlideIndex, isMobileViewport])

  useEffect(() => {
    const hairTypes = hairTypesSectionRef.current

    if (!hairTypes) {
      return
    }

    const figures = hairTypesFigureRefs.current
    const figureMedia = hairTypesFigureMediaRefs.current
    const copies = hairTypesCopyRefs.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 600
    const collapsedSize = isMobile ? 60 : 160
    const expandedWidth =
      window.innerWidth < window.innerHeight ? window.innerHeight : window.innerWidth
    const previousIndex = previousHairTypesSlideIndexRef.current

    if (!figures.some(Boolean) || !copies.some(Boolean)) {
      previousHairTypesSlideIndexRef.current = hairTypesSlideIndex
      return
    }


    const setStarBase = (figure: HTMLElement | null, visible = false) => {
      if (!figure) {
        return
      }

      gsap.set(figure, {
        width: collapsedSize,
        height: collapsedSize,
        xPercent: -50,
        yPercent: -50,
        clipPath: HAIR_TYPES_STAR_CLIP,
        opacity: visible ? 1 : 0,
        zIndex: visible ? 5 : 1,
      })
    }

    const setMediaBase = (media: HTMLDivElement | null, expanded = false) => {
      if (!media) {
        return
      }

      gsap.set(media, {
        yPercent: expanded ? 0 : 30,
        scale: expanded ? 1 : 1.08,
      })
    }

    const setCopyBase = (
      copy: HTMLElement | null,
      visible: boolean,
      from: 'reset' | 'kept' = 'reset',
    ) => {
      if (!copy) {
        return
      }

      gsap.set(copy, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : from === 'reset' ? 50 : -30,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        pointerEvents: visible ? 'auto' : 'none',
      })
    }

    figures.forEach((figure, index) => {
      gsap.killTweensOf(figure)

      if (figureMedia[index]) {
        gsap.killTweensOf(figureMedia[index])
      }
    })

    copies.forEach((copy) => {
      gsap.killTweensOf(copy)
    })

    if (reduceMotion || activeSurface !== 'hair-types') {
      figures.forEach((figure, index) => {
        if (!figure) {
          return
        }

        const isActive = index === hairTypesSlideIndex
        const isPreview = index === hairTypesSlideIndex + 1
        const isExpanded = isActive

        gsap.set(figure, {
          width: isExpanded ? expandedWidth : collapsedSize,
          height: isExpanded ? expandedWidth : collapsedSize,
          xPercent: -50,
          yPercent: -50,
          clipPath: isExpanded ? HAIR_TYPES_RECT_CLIP : HAIR_TYPES_STAR_CLIP,
          opacity: isActive || isPreview ? 1 : 0,
          zIndex: isActive ? 3 : isPreview ? 5 : 1,
        })
      })

      figureMedia.forEach((media, index) => setMediaBase(media, index === hairTypesSlideIndex))

      copies.forEach((copy, index) => setCopyBase(copy, index === hairTypesSlideIndex))
      previousHairTypesSlideIndexRef.current = hairTypesSlideIndex
      return
    }

    figures.forEach((figure, index) => {
      if (!figure) {
        return
      }

      if (index !== hairTypesSlideIndex && index !== previousIndex && index !== hairTypesSlideIndex + 1) {
        setStarBase(figure)
        setMediaBase(figureMedia[index])
      }
    })

    copies.forEach((copy, index) => {
      if (!copy) {
        return
      }

      if (index !== hairTypesSlideIndex && index !== previousIndex) {
        setCopyBase(copy, false)
      }
    })

    const shouldSlowFirstSlideEntry =
      slowHairTypesEntryFromAttachmentsRef.current &&
      activeSurface === 'hair-types' &&
      hairTypesSlideIndex === 0
    const goingForward = hairTypesSlideIndex > previousIndex
    const isFirstReveal = previousIndex === hairTypesSlideIndex
    const activeFigure = figures[hairTypesSlideIndex]
    const activeFigureMedia = figureMedia[hairTypesSlideIndex]
    const activeCopy = copies[hairTypesSlideIndex]
    const previousFigure = figures[previousIndex]
    const previousCopy = copies[previousIndex]
    const nextStarFigure = figures[hairTypesSlideIndex + 1]

    if (isFirstReveal && activeFigure) {
      if (shouldSlowFirstSlideEntry) {
        gsap.set(activeFigure, {
          width: collapsedSize,
          height: collapsedSize,
          xPercent: -50,
          yPercent: -50,
          clipPath: HAIR_TYPES_STAR_CLIP,
          opacity: 1,
          zIndex: 4,
        })

        setMediaBase(activeFigureMedia, false)
        setCopyBase(activeCopy, false)

        if (nextStarFigure) {
          gsap.set(nextStarFigure, {
            width: collapsedSize,
            height: collapsedSize,
            xPercent: -50,
            yPercent: -50,
            clipPath: HAIR_TYPES_STAR_CLIP,
            opacity: 0,
            zIndex: 5,
          })
          setMediaBase(figureMedia[hairTypesSlideIndex + 1])
        }

        const introTimeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            figures.forEach((figure, index) => {
              if (index === hairTypesSlideIndex) {
                return
              }

              if (index === hairTypesSlideIndex + 1 && hairTypesSlideIndex < figures.length - 1) {
                setStarBase(figure, true)
                return
              }

              setStarBase(figure)
              setMediaBase(figureMedia[index])
            })

            copies.forEach((copy, index) => setCopyBase(copy, index === hairTypesSlideIndex))
            previousHairTypesSlideIndexRef.current = hairTypesSlideIndex
            slowHairTypesEntryFromAttachmentsRef.current = false
          },
        })

        introTimeline.to(
          activeFigure,
          {
            width: expandedWidth,
            height: expandedWidth,
            clipPath: HAIR_TYPES_RECT_CLIP,
            duration: 3.6,
          },
          0,
        )

        if (activeFigureMedia) {
          introTimeline.to(
            activeFigureMedia,
            {
              yPercent: 0,
              scale: 1,
              duration: 3.6,
            },
            0,
          )
        }

        if (activeCopy) {
          introTimeline.fromTo(
            activeCopy,
            {
              opacity: 0,
              y: 64,
              filter: 'blur(12px)',
              pointerEvents: 'none',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.58,
              ease: 'power2.out',
              pointerEvents: 'auto',
            },
            2.18,
          )
        }

        if (nextStarFigure) {
          introTimeline.to(
            nextStarFigure,
            {
              opacity: 1,
              duration: 1.08,
            },
            2.84,
          )
        }

        return () => {
          introTimeline.kill()
        }
      }

      gsap.set(activeFigure, {
        width: expandedWidth,
        height: expandedWidth,
        xPercent: -50,
        yPercent: -50,
        clipPath: HAIR_TYPES_RECT_CLIP,
        opacity: 1,
        zIndex: 3,
      })

      setMediaBase(activeFigureMedia, true)
      setCopyBase(activeCopy, true)

      if (nextStarFigure) {
        gsap.set(nextStarFigure, {
          width: collapsedSize,
          height: collapsedSize,
          xPercent: -50,
          yPercent: -50,
          clipPath: HAIR_TYPES_STAR_CLIP,
          opacity: 1,
          zIndex: 4,
        })
        setMediaBase(figureMedia[hairTypesSlideIndex + 1])
      }

      previousHairTypesSlideIndexRef.current = hairTypesSlideIndex
      slowHairTypesEntryFromAttachmentsRef.current = false
      return
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        figures.forEach((figure, index) => {
          if (index === hairTypesSlideIndex) {
            return
          }

          if (index === hairTypesSlideIndex + 1 && hairTypesSlideIndex < figures.length - 1) {
            setStarBase(figure, true)
            return
          }

          setStarBase(figure)
          setMediaBase(figureMedia[index])
        })

        copies.forEach((copy, index) => setCopyBase(copy, index === hairTypesSlideIndex))
        previousHairTypesSlideIndexRef.current = hairTypesSlideIndex
        slowHairTypesEntryFromAttachmentsRef.current = false
      },
    })

    if (previousCopy && previousIndex !== hairTypesSlideIndex) {
      timeline.to(
        previousCopy,
        {
          opacity: 0,
          y: goingForward ? -32 : 36,
          filter: 'blur(8px)',
          duration: 0.46,
          pointerEvents: 'none',
        },
        0,
      )
    }

    if (goingForward) {
      if (activeFigure) {
        gsap.set(activeFigure, {
          width: collapsedSize,
          height: collapsedSize,
          xPercent: -50,
          yPercent: -50,
          clipPath: HAIR_TYPES_STAR_CLIP,
          opacity: 1,
          zIndex: 4,
        })
      }

      setMediaBase(activeFigureMedia, false)

      timeline.to(
        activeFigure,
        {
          width: expandedWidth,
          height: expandedWidth,
          clipPath: HAIR_TYPES_RECT_CLIP,
          duration: 1.4,
        },
        0,
      )

      if (activeFigureMedia) {
        timeline.to(
          activeFigureMedia,
          {
            yPercent: 0,
            scale: 1,
            duration: 1.4,
          },
          0,
        )
      }

      if (previousFigure) {
        timeline.set(
          previousFigure,
          {
            zIndex: 2,
          },
          0,
        )
      }

      if (nextStarFigure) {
        gsap.set(nextStarFigure, {
          width: collapsedSize,
          height: collapsedSize,
          xPercent: -50,
          yPercent: -50,
          clipPath: HAIR_TYPES_STAR_CLIP,
          opacity: 0,
          zIndex: 5,
        })
        setMediaBase(figureMedia[hairTypesSlideIndex + 1])

        timeline.to(
          nextStarFigure,
          {
            opacity: 1,
            duration: 0.5,
          },
          0.95,
        )
      }
    } else {
      if (previousFigure) {
        timeline.to(
          previousFigure,
          {
            width: collapsedSize,
            height: collapsedSize,
            clipPath: HAIR_TYPES_STAR_CLIP,
            duration: 1.2,
          },
          0,
        )

        if (figureMedia[previousIndex]) {
          timeline.to(
            figureMedia[previousIndex],
            {
              yPercent: 30,
              scale: 1.08,
              duration: 1.2,
            },
            0,
          )
        }

        timeline.to(
          previousFigure,
          {
            opacity: 0,
            duration: 0.34,
          },
          1.04,
        )
      }

      if (activeFigure) {
        gsap.set(activeFigure, {
          width: expandedWidth,
          height: expandedWidth,
          xPercent: -50,
          yPercent: -50,
          clipPath: HAIR_TYPES_RECT_CLIP,
          opacity: 1,
          zIndex: 4,
        })
      }

      setMediaBase(activeFigureMedia, true)
    }

    if (activeCopy) {
      timeline.fromTo(
        activeCopy,
        {
          opacity: 0,
          y: 56,
          filter: 'blur(12px)',
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.74,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        goingForward ? 0.6 : 0.36,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [activeSurface, hairTypesSlideIndex, isMobileViewport])

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    hairTypesGalleryTrackRefs.current.forEach((slideTracks, slideIndex) => {
      hairTypesGalleryTweenRefs.current[slideIndex] = []

      slideTracks.forEach((track, columnIndex) => {
        if (!track) {
          return
        }

        const items = Array.from(track.children) as HTMLElement[]

        gsap.killTweensOf(track)
        gsap.killTweensOf(items)
        gsap.set(track, { clearProps: 'transform' })

        const columnHeight = track.clientHeight
        const travel = columnHeight * 0.5
        const direction = columnIndex % 2 !== 0 ? '+=' : '-='

        if (!travel || items.length === 0) {
          return
        }

        items.forEach((item) => {
          gsap.set(item, { y: 0 })

          const tween = gsap.to(item, {
            y: `${direction}${travel}`,
            duration: isMobileViewport ? 12 : 16,
            ease: 'none',
            repeat: -1,
            modifiers: {
              y: gsap.utils.unitize((value) => {
                const numeric = Number.parseFloat(value)

                return direction === '+=' ? numeric % travel : numeric % -travel
              }),
            },
          })

          hairTypesGalleryTweenRefs.current[slideIndex].push(tween)
          tweens.push(tween)
        })
      })
    })

    return () => {
      tweens.forEach((tween) => tween.kill())
    }
  }, [isMobileViewport])

  useEffect(() => {
    if (
      activeSurface !== 'hair-types' ||
      hairTypesSlideIndex !== 0 ||
      !slowHairTypesEntryFromAttachmentsRef.current
    ) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const activeGallery = hairTypesGalleryRefs.current[0]
    const activeCopy = hairTypesCopyRefs.current[0]
    const backdrop = hairTypesSectionRef.current?.querySelector<HTMLElement>('.hair-types-story__backdrop')

    if (!activeGallery || !activeCopy || reduceMotion) {
      slowHairTypesEntryFromAttachmentsRef.current = false
      return
    }

    gsap.killTweensOf([activeGallery, activeCopy, backdrop])

    gsap.set(activeGallery, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(10px)',
      transformOrigin: 'center center',
    })
    gsap.set(activeCopy, {
      opacity: 0,
      y: 96,
      scale: 0.98,
      filter: 'blur(14px)',
      pointerEvents: 'none',
    })

    if (backdrop) {
      gsap.set(backdrop, { opacity: 0.22 })
    }

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(activeGallery, { clearProps: 'opacity,scale,filter,transformOrigin' })
        gsap.set(activeCopy, { clearProps: 'opacity,y,scale,filter,pointerEvents' })
        if (backdrop) {
          gsap.set(backdrop, { clearProps: 'opacity' })
        }
        slowHairTypesEntryFromAttachmentsRef.current = false
      },
    })

    entryTimeline.to(
      activeGallery,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.18,
      },
      0,
    )

    if (backdrop) {
      entryTimeline.to(
        backdrop,
        {
          opacity: 1,
          duration: 1.52,
        },
        0.1,
      )
    }

    entryTimeline.to(
      activeCopy,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
        duration: 1.22,
      },
      0.84,
    )

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface, hairTypesSlideIndex])

  useEffect(() => {
    const lastHairTypesIndex = hairProfileSlides.length - 1

    if (
      activeSurface !== 'hair-types' ||
      hairTypesSlideIndex !== lastHairTypesIndex ||
      !slowHairTypesLastEntryFromComfortRef.current
    ) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const activeGallery = hairTypesGalleryRefs.current[lastHairTypesIndex]
    const activeCopy = hairTypesCopyRefs.current[lastHairTypesIndex]
    const backdrop = hairTypesSectionRef.current?.querySelector<HTMLElement>('.hair-types-story__backdrop')

    if (!activeGallery || !activeCopy || reduceMotion) {
      slowHairTypesLastEntryFromComfortRef.current = false
      return
    }

    gsap.killTweensOf([activeGallery, activeCopy, backdrop])

    gsap.set(activeGallery, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(10px)',
      transformOrigin: 'center center',
    })
    gsap.set(activeCopy, {
      opacity: 0,
      y: 96,
      scale: 0.98,
      filter: 'blur(14px)',
      pointerEvents: 'none',
    })

    if (backdrop) {
      gsap.set(backdrop, { opacity: 0.22 })
    }

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(activeGallery, { clearProps: 'opacity,scale,filter,transformOrigin' })
        gsap.set(activeCopy, { clearProps: 'opacity,y,scale,filter,pointerEvents' })
        if (backdrop) {
          gsap.set(backdrop, { clearProps: 'opacity' })
        }
        slowHairTypesLastEntryFromComfortRef.current = false
      },
    })

    entryTimeline.to(
      activeGallery,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.18,
      },
      0,
    )

    if (backdrop) {
      entryTimeline.to(
        backdrop,
        {
          opacity: 1,
          duration: 1.52,
        },
        0.1,
      )
    }

    entryTimeline.to(
      activeCopy,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
        duration: 1.22,
      },
      0.84,
    )

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface, hairTypesSlideIndex])


  useEffect(() => {
    if (activeSurface !== 'hair-types') {
      return
    }

    const activeTweens = hairTypesGalleryTweenRefs.current[hairTypesSlideIndex] ?? []

    activeTweens.forEach((tween) => {
      if (!tween) {
        return
      }

      tween.timeScale(1.65)
      gsap.to(tween, {
        timeScale: 1,
        duration: 1.7,
        ease: 'power3.out',
        overwrite: true,
      })
    })
  }, [activeSurface, hairTypesSlideIndex])

  useEffect(() => {
    const hero = heroSectionRef.current

    if (!hero || activeSurface !== 'hero-story') {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const activeHeroSlideIndex = heroSlideIndexRef.current
    const text = hero.querySelectorAll<HTMLElement>('.arch__left .arch__info')[activeHeroSlideIndex]
    const media = hero.querySelectorAll<HTMLElement>('.hero-story__media-slide')[activeHeroSlideIndex]
    const shouldSlowHeroEntry = slowHeroEntryFromBurgerRef.current

    if (!text || !media || reduceMotion) {
      slowHeroEntryFromBurgerRef.current = false
      return
    }

    gsap.killTweensOf([text, media])
    gsap.set(text, {
      x: shouldSlowHeroEntry ? -136 : -96,
      opacity: 0,
      filter: shouldSlowHeroEntry ? 'blur(12px)' : 'blur(8px)',
    })
    gsap.set(media, {
      x: shouldSlowHeroEntry ? 156 : 116,
      opacity: 0,
      scale: shouldSlowHeroEntry ? 0.972 : 0.985,
      filter: shouldSlowHeroEntry ? 'blur(12px)' : 'blur(8px)',
    })

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out',
      },
      onComplete: () => {
        slowHeroEntryFromBurgerRef.current = false
      },
    })

    tl.to(
      text,
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: shouldSlowHeroEntry ? 1.54 : 1.08,
      },
      shouldSlowHeroEntry ? 0.2 : 0.12,
    ).to(
      media,
      {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: shouldSlowHeroEntry ? 1.68 : 1.16,
      },
      0,
    )
  }, [activeSurface])

  useEffect(() => {
    const pain = painSectionRef.current
    const track = painTrackRef.current

    if (!pain || !track || activeSurface !== 'pain') {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const activePainSlideIndex = painSlideIndexRef.current
    const panel = pain.querySelectorAll<HTMLElement>('.pain-story__content')[activePainSlideIndex]
    const slide = pain.querySelectorAll<HTMLElement>('.pain-story__slide')[activePainSlideIndex]
    const video = slide?.querySelector<HTMLElement>('.pain-story__video') ?? null
    const backdrop = slide?.querySelector<HTMLElement>('.pain-story__backdrop') ?? null
    const shouldSlowPainEntry = slowPainEntryFromBurgerRef.current && activePainSlideIndex === 0

    if (skipNextPainSurfaceIntroRef.current) {
      skipNextPainSurfaceIntroRef.current = false
      return
    }

    if (!panel || reduceMotion) {
      gsap.set(track, { x: -activePainSlideIndex * window.innerWidth })
      slowPainEntryFromBurgerRef.current = false
      return
    }

    gsap.killTweensOf([panel, video, backdrop])
    gsap.set(track, { x: -activePainSlideIndex * window.innerWidth })
    gsap.set(panel, {
      y: shouldSlowPainEntry ? 68 : 44,
      opacity: 0,
      scale: shouldSlowPainEntry ? 0.97 : 0.985,
      filter: shouldSlowPainEntry ? 'blur(12px)' : 'blur(8px)',
    })

    if (shouldSlowPainEntry && video) {
      gsap.set(video, {
        opacity: 0,
        scale: 1.06,
        filter: 'blur(12px)',
        transformOrigin: 'center center',
      })
    }

    if (shouldSlowPainEntry && backdrop) {
      gsap.set(backdrop, { opacity: 0.12 })
    }

    const introTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        if (shouldSlowPainEntry && video) {
          gsap.set(video, { clearProps: 'opacity,scale,filter,transformOrigin' })
        }

        if (shouldSlowPainEntry && backdrop) {
          gsap.set(backdrop, { clearProps: 'opacity' })
        }

        slowPainEntryFromBurgerRef.current = false
      },
    })

    if (shouldSlowPainEntry && video) {
      introTimeline.to(
        video,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2.46,
        },
        0,
      )
    }

    if (shouldSlowPainEntry && backdrop) {
      introTimeline.to(
        backdrop,
        {
          opacity: 1,
          duration: 2.08,
        },
        0.08,
      )
    }

    introTimeline.to(
      panel,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: shouldSlowPainEntry ? 1.58 : 1.12,
        overwrite: true,
      },
      0,
    )
  }, [activeSurface])

  useEffect(() => {
    if (activeSurface !== 'benefits') {
      return
    }

    syncBenefitsCards(benefitsSlideIndexRef.current, { animate: true, fromBottom: true })
  }, [activeSurface])

  useEffect(() => {
    if (activeSurfaceRef.current !== 'benefits') {
      return
    }

    syncBenefitsCards(benefitsSlideIndexRef.current, { animate: true })
  }, [benefitsSlideIndex])

  useEffect(() => {
    if (activeSurface !== 'package') {
      return
    }

    const media = packageMediaRef.current
    const bg = packageBgRef.current
    const copy = packageCopyRef.current
    const timeline = packageTimelineRef.current
    const rows = packageRowRefs.current.filter((row): row is HTMLDivElement => Boolean(row))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!media || !copy || !timeline) {
      return
    }

    const tweenTargets = [media, bg, copy, timeline, ...rows]
    gsap.killTweensOf(tweenTargets)

    rows.forEach((row) => {
      const item = row.querySelector<HTMLElement>('.package-story__item')
      const node = row.querySelector<HTMLElement>('.package-story__node')

      if (item) {
        gsap.killTweensOf(item)
      }

      if (node) {
        gsap.killTweensOf(node)
      }
    })

    if (reduceMotion) {
      gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
      if (bg) {
        gsap.set(bg, { opacity: 1, x: 0, filter: 'blur(0px)' })
      }
      gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(timeline, { opacity: 1, x: 0, filter: 'blur(0px)' })
      rows.forEach((row) => {
        const item = row.querySelector<HTMLElement>('.package-story__item')
        const node = row.querySelector<HTMLElement>('.package-story__node')

        if (item) {
          gsap.set(item, { opacity: 1, x: 0, filter: 'blur(0px)' })
        }

        if (node) {
          gsap.set(node, { opacity: 1, scale: 1 })
        }
      })
      return
    }

    gsap.set(media, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(14px)',
      transformOrigin: 'center center',
    })
    if (bg) {
      gsap.set(bg, {
        opacity: 0,
        x: -140,
        filter: 'blur(12px)',
      })
    }
    gsap.set(copy, { opacity: 0, x: -84, filter: 'blur(14px)' })
    gsap.set(timeline, { opacity: 0, x: 92, filter: 'blur(12px)' })

    rows.forEach((row) => {
      const item = row.querySelector<HTMLElement>('.package-story__item')
      const node = row.querySelector<HTMLElement>('.package-story__node')
      const offsetX = row.classList.contains('package-story__row--left') ? -64 : 64

      if (item) {
        gsap.set(item, { opacity: 0, x: offsetX, filter: 'blur(10px)' })
      }

      if (node) {
        gsap.set(node, { opacity: 0, scale: 0.42 })
      }
    })

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
        if (bg) {
          gsap.set(bg, { opacity: 1, x: 0, filter: 'blur(0px)' })
        }
        gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
        gsap.set(timeline, { opacity: 1, x: 0, filter: 'blur(0px)' })
        rows.forEach((row) => {
          const item = row.querySelector<HTMLElement>('.package-story__item')
          const node = row.querySelector<HTMLElement>('.package-story__node')

          if (item) {
            gsap.set(item, { opacity: 1, x: 0, filter: 'blur(0px)' })
          }

          if (node) {
            gsap.set(node, { opacity: 1, scale: 1 })
          }
        })
      },
    })

    entryTimeline.to(
      media,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.34,
      },
      0,
    )
    if (bg) {
      entryTimeline.to(
        bg,
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.86,
        },
        0.08,
      )
    }
    entryTimeline.to(
      copy,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.72,
      },
      0.22,
    )
    entryTimeline.to(
      timeline,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.58,
      },
      0.44,
    )

    rows.forEach((row, index) => {
      const item = row.querySelector<HTMLElement>('.package-story__item')
      const node = row.querySelector<HTMLElement>('.package-story__node')
      const startAt = 0.94 + index * 0.18

      if (node) {
        entryTimeline.to(
          node,
          {
            opacity: 1,
            scale: 1,
            duration: 0.72,
          },
          startAt,
        )
      }

      if (item) {
        entryTimeline.to(
          item,
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.04,
          },
          startAt + 0.04,
        )
      }
    })

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface])

  useEffect(() => {
    const pageNodes = specsPageRefs.current.slice(0, specsPages.length)
    const previousIndex = previousSpecsPageIndexRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setPageBase = (page: HTMLDivElement | null, visible: boolean) => {
      if (!page) {
        return
      }

      gsap.set(page, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 28,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: visible ? 2 : 0,
      })
    }

    const setCardsBase = (page: HTMLDivElement | null, visible: boolean) => {
      if (!page) {
        return
      }

      const cards = Array.from(page.querySelectorAll<HTMLElement>('.specs-story__spec-card'))
      cards.forEach((card) => {
        gsap.set(card, {
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 26,
          filter: visible ? 'blur(0px)' : 'blur(10px)',
        })
      })
    }

    if (reduceMotion || activeSurface !== 'specs') {
      pageNodes.forEach((page, index) => {
        const isVisible = activeSurface === 'specs' && index === specsPageIndex
        setPageBase(page, isVisible)
        setCardsBase(page, isVisible)
      })
      specsPageTransitionLockRef.current = false
      specsQueuedPageIndexRef.current = null
      previousSpecsPageIndexRef.current = specsPageIndex
      return
    }

    const activePage = pageNodes[specsPageIndex]
    const previousPage = pageNodes[previousIndex]

    pageNodes.forEach((page, index) => {
      if (index !== specsPageIndex && index !== previousIndex) {
        setPageBase(page, false)
        setCardsBase(page, false)
      }
    })

    if (!activePage) {
      specsPageTransitionLockRef.current = false
      previousSpecsPageIndexRef.current = specsPageIndex
      return
    }

    if (previousPage && previousIndex !== specsPageIndex) {
      setPageBase(previousPage, true)
      setCardsBase(previousPage, true)
    }

    if (previousIndex === specsPageIndex) {
      setPageBase(activePage, true)
      setCardsBase(activePage, true)
      specsPageTransitionLockRef.current = false
      previousSpecsPageIndexRef.current = specsPageIndex
      return
    }

    const activeCards = Array.from(activePage.querySelectorAll<HTMLElement>('.specs-story__spec-card'))
    const previousCards = previousPage
      ? Array.from(previousPage.querySelectorAll<HTMLElement>('.specs-story__spec-card'))
      : []

    gsap.killTweensOf([activePage, previousPage, ...activeCards, ...previousCards])

    setPageBase(activePage, false)
    setCardsBase(activePage, false)
    specsPageTransitionLockRef.current = true

    const timeline = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        pageNodes.forEach((page, index) => {
          const isVisible = index === specsPageIndex
          setPageBase(page, isVisible)
          setCardsBase(page, isVisible)
        })
        specsPageTransitionLockRef.current = false
        previousSpecsPageIndexRef.current = specsPageIndex

        const queuedIndex = specsQueuedPageIndexRef.current
        specsQueuedPageIndexRef.current = null

        if (queuedIndex !== null && queuedIndex !== specsPageIndex) {
          setSpecsPageIndex(queuedIndex)
        }
      },
    })

    if (previousPage) {
      timeline.to(
        previousPage,
        {
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
          duration: 0.36,
          ease: 'expo.in',
        },
        0,
      )
      previousCards.forEach((card, index) => {
        timeline.to(
          card,
          {
            opacity: 0,
            y: -14,
            filter: 'blur(10px)',
            duration: 0.24,
            ease: 'expo.in',
          },
          index * 0.03,
        )
      })
    }

    timeline.to(
      activePage,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.28,
        ease: 'expo.out',
      },
      0.34,
    )

    activeCards.forEach((card, index) => {
      timeline.to(
        card,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.02,
          ease: 'expo.out',
        },
        0.58 + index * 0.1,
      )
    })

    return () => {
      timeline.kill()
    }
  }, [activeSurface, specsPageIndex, specsPages.length])

  useEffect(() => {
    if (activeSurface !== 'specs') {
      return
    }

    const media = specsVideoRef.current
    const copy = specsCopyRef.current
    const pagination = specsPaginationRef.current
    const activePage = specsPageRefs.current.slice(0, specsPages.length)[specsPageIndexRef.current]
    const buttons = pagination
      ? Array.from(pagination.querySelectorAll<HTMLElement>('.specs-story__pagination-button'))
      : []
    const cards = activePage
      ? Array.from(activePage.querySelectorAll<HTMLElement>('.specs-story__spec-card'))
      : []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!media || !copy || !pagination || !activePage) {
      return
    }

    gsap.killTweensOf([media, copy, pagination, activePage, ...buttons, ...cards])

    if (reduceMotion) {
      gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
      gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(pagination, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(activePage, { opacity: 1, y: 0, filter: 'blur(0px)' })
      buttons.forEach((button) => gsap.set(button, { opacity: 1, scale: 1 }))
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0, filter: 'blur(0px)' }))
      return
    }

    gsap.set(media, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(14px)',
      transformOrigin: 'center center',
    })
    gsap.set(copy, { opacity: 0, x: -84, filter: 'blur(14px)' })
    gsap.set(pagination, { opacity: 0, x: 42, filter: 'blur(10px)' })
    gsap.set(activePage, { opacity: 0, y: 28, filter: 'blur(10px)' })
    buttons.forEach((button, index) => {
      gsap.set(button, { opacity: 0, scale: 0.82, y: index * 2 })
    })
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 34, filter: 'blur(10px)' })
    })

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
        gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
        gsap.set(pagination, { opacity: 1, x: 0, filter: 'blur(0px)' })
        gsap.set(activePage, { opacity: 1, y: 0, filter: 'blur(0px)' })
        buttons.forEach((button) => gsap.set(button, { opacity: 1, scale: 1, y: 0 }))
        cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0, filter: 'blur(0px)' }))
      },
    })

    entryTimeline.to(
      media,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.14,
      },
      0,
    )
    entryTimeline.to(
      copy,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.56,
      },
      0.2,
    )
    entryTimeline.to(
      pagination,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.92,
      },
      0.34,
    )
    buttons.forEach((button, index) => {
      entryTimeline.to(
        button,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
        },
        0.42 + index * 0.05,
      )
    })
    entryTimeline.to(
      activePage,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.84,
      },
      0.48,
    )
    cards.forEach((card, index) => {
      entryTimeline.to(
        card,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.66,
        },
        0.68 + index * 0.08,
      )
    })

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface, specsPages.length])

  useEffect(() => {
    const video = specsVideoRef.current

    if (!video) {
      return
    }

    if (activeSurface === 'specs') {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [activeSurface, isMobileViewport])

  useEffect(() => {
    giftVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      if (activeSurface === 'gift' && index === giftSlideIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, giftSlideIndex, isMobileViewport])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const backgroundRadius = window.innerWidth < 768 ? 22 : 30
    const openClip = `inset(0% 0% 0% 0% round ${backgroundRadius}px)`
    const panelClosedClip = 'inset(100% 0% 0% 0%)'
    const panelOpenClip = 'inset(0% 0% 0% 0%)'

    const backgrounds = giftBgRefs.current
    const panels = giftPanelRefs.current
    const copies = giftCopyRefs.current
    const windows = giftWindowRefs.current
    const previousIndex = previousGiftSlideIndexRef.current
    const shouldSlowGiftEntry =
      activeSurface === 'gift' &&
      ((slowGiftEntryRef.current && giftSlideIndex === 0) ||
        (slowGiftLastEntryFromFaqRef.current && giftSlideIndex === giftSlides.length - 1))
    const shouldCurtainPanel = true

    const setBackgroundBase = (el: HTMLDivElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
        zIndex: visible ? 2 : 0,
      })
    }

    const setPanelBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        clipPath: panelOpenClip,
        zIndex: visible ? 2 : 0,
      })
    }

    const setCopyBase = (el: HTMLElement | null, visible: boolean) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 34,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
      })
    }

    const setWindowBase = (el: HTMLDivElement | null) => {
      if (!el) {
        return
      }

      gsap.set(el, {
        opacity: 1,
        clipPath: openClip,
      })
    }

    if (reduceMotion || activeSurface !== 'gift') {
      backgrounds.forEach((bg, index) => setBackgroundBase(bg, activeSurface === 'gift' && index === giftSlideIndex))
      panels.forEach((panel, index) => setPanelBase(panel, activeSurface === 'gift' && index === giftSlideIndex))
      copies.forEach((copy, index) => setCopyBase(copy, activeSurface === 'gift' && index === giftSlideIndex))
      windows.forEach((windowEl) => setWindowBase(windowEl))
      previousGiftSlideIndexRef.current = giftSlideIndex
      return
    }

    gsap.killTweensOf(backgrounds.filter(Boolean))
    gsap.killTweensOf(panels.filter(Boolean))
    gsap.killTweensOf(copies.filter(Boolean))
    gsap.killTweensOf(windows.filter(Boolean))

    const activeBackground = backgrounds[giftSlideIndex]
    const previousBackground = backgrounds[previousIndex]
    const activePanel = panels[giftSlideIndex]
    const previousPanel = panels[previousIndex]
    const activeCopy = copies[giftSlideIndex]
    const previousCopy = copies[previousIndex]
    const activeWindow = windows[giftSlideIndex]

    backgrounds.forEach((bg, index) => {
      if (index !== previousIndex && index !== giftSlideIndex) {
        setBackgroundBase(bg, false)
      }
    })

    panels.forEach((panel, index) => {
      if (index !== previousIndex && index !== giftSlideIndex) {
        setPanelBase(panel, false)
      }
    })

    copies.forEach((copy, index) => {
      if (index !== previousIndex && index !== giftSlideIndex) {
        setCopyBase(copy, false)
      }
    })

    windows.forEach((windowEl, index) => {
      if (index !== previousIndex && index !== giftSlideIndex) {
        setWindowBase(windowEl)
      }
    })

    if (shouldSlowGiftEntry) {
      if (activeBackground) {
        gsap.set(activeBackground, {
          opacity: 1,
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 3,
        })
      }

      if (activePanel) {
        gsap.set(activePanel, {
          opacity: 1,
          pointerEvents: 'auto',
          clipPath: shouldCurtainPanel ? panelClosedClip : panelOpenClip,
          zIndex: 2,
        })
      }

      setCopyBase(activeCopy, false)
      setWindowBase(activeWindow)

      const introTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          backgrounds.forEach((bg, index) => setBackgroundBase(bg, index === giftSlideIndex))
          panels.forEach((panel, index) => setPanelBase(panel, index === giftSlideIndex))
          copies.forEach((copy, index) => setCopyBase(copy, index === giftSlideIndex))
          windows.forEach((windowEl) => setWindowBase(windowEl))
          previousGiftSlideIndexRef.current = giftSlideIndex
          slowGiftEntryRef.current = false
          slowGiftLastEntryFromFaqRef.current = false
        },
      })

      if (activeBackground) {
        introTimeline.to(
          activeBackground,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.56,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      if (activePanel && shouldCurtainPanel) {
        introTimeline.to(
          activePanel,
          {
            clipPath: panelOpenClip,
            duration: 1.56,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      if (activeCopy) {
        introTimeline.to(
          activeCopy,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.14,
          },
          1.02,
        )
      }

      return () => {
        introTimeline.kill()
      }
    }

    if (previousIndex === giftSlideIndex) {
      setBackgroundBase(activeBackground, true)
      setPanelBase(activePanel, true)
      setCopyBase(activeCopy, true)
      setWindowBase(activeWindow)
      previousGiftSlideIndexRef.current = giftSlideIndex
      return
    }

    if (previousBackground) {
      gsap.set(previousBackground, {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        zIndex: 1,
      })
    }

    if (previousPanel) {
      gsap.set(previousPanel, {
        opacity: 1,
        pointerEvents: 'none',
        clipPath: 'inset(0% 0% 0% 0%)',
        zIndex: 4,
      })
    }

    if (activeBackground) {
      gsap.set(activeBackground, {
        opacity: 1,
        clipPath: 'inset(100% 0% 0% 0%)',
        zIndex: 3,
      })
    }

    if (activePanel) {
      gsap.set(activePanel, {
        opacity: 1,
        pointerEvents: 'auto',
        clipPath: shouldCurtainPanel ? panelClosedClip : panelOpenClip,
        zIndex: 2,
      })
    }

    setCopyBase(previousCopy, true)
    setCopyBase(activeCopy, false)
    setWindowBase(activeWindow)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        backgrounds.forEach((bg, index) => setBackgroundBase(bg, index === giftSlideIndex))
        panels.forEach((panel, index) => setPanelBase(panel, index === giftSlideIndex))
        copies.forEach((copy, index) => setCopyBase(copy, index === giftSlideIndex))
        windows.forEach((windowEl) => setWindowBase(windowEl))
        previousGiftSlideIndexRef.current = giftSlideIndex
      },
    })

    if (activeBackground) {
      timeline.to(
        activeBackground,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (previousPanel) {
      timeline.to(
        previousPanel,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (activePanel && shouldCurtainPanel) {
      timeline.to(
        activePanel,
        {
          clipPath: panelOpenClip,
          duration: 1.18,
          ease: 'power3.inOut',
        },
        0,
      )
    }

    if (activeCopy) {
      timeline.to(
        activeCopy,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.86,
        },
        0.82,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [activeSurface, giftSlideIndex, isMobileViewport])

  useEffect(() => {
    const pageNodes = faqPageRefs.current.slice(0, faqPages.length)
    const previousIndex = previousFaqPageIndexRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setPageBase = (page: HTMLDivElement | null, visible: boolean) => {
      if (!page) {
        return
      }

      gsap.set(page, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 28,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: visible ? 2 : 0,
      })
    }

    const setCardsBase = (page: HTMLDivElement | null, visible: boolean) => {
      if (!page) {
        return
      }

      const cards = Array.from(page.querySelectorAll<HTMLElement>('.faq-story__faq-card'))
      cards.forEach((card) => {
        gsap.set(card, {
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 26,
          filter: visible ? 'blur(0px)' : 'blur(10px)',
        })
      })
    }

    if (reduceMotion || activeSurface !== 'faq') {
      pageNodes.forEach((page, index) => {
        const isVisible = activeSurface === 'faq' && index === faqPageIndex
        setPageBase(page, isVisible)
        setCardsBase(page, isVisible)
      })
      faqPageTransitionLockRef.current = false
      faqQueuedPageIndexRef.current = null
      previousFaqPageIndexRef.current = faqPageIndex
      return
    }

    const activePage = pageNodes[faqPageIndex]
    const previousPage = pageNodes[previousIndex]

    pageNodes.forEach((page, index) => {
      if (index !== faqPageIndex && index !== previousIndex) {
        setPageBase(page, false)
        setCardsBase(page, false)
      }
    })

    if (!activePage) {
      faqPageTransitionLockRef.current = false
      previousFaqPageIndexRef.current = faqPageIndex
      return
    }

    if (previousPage && previousIndex !== faqPageIndex) {
      setPageBase(previousPage, true)
      setCardsBase(previousPage, true)
    }

    if (previousIndex === faqPageIndex) {
      setPageBase(activePage, true)
      setCardsBase(activePage, true)
      faqPageTransitionLockRef.current = false
      previousFaqPageIndexRef.current = faqPageIndex
      return
    }

    const activeCards = Array.from(activePage.querySelectorAll<HTMLElement>('.faq-story__faq-card'))
    const previousCards = previousPage
      ? Array.from(previousPage.querySelectorAll<HTMLElement>('.faq-story__faq-card'))
      : []

    gsap.killTweensOf([activePage, previousPage, ...activeCards, ...previousCards])

    setPageBase(activePage, false)
    setCardsBase(activePage, false)
    faqPageTransitionLockRef.current = true

    const timeline = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        pageNodes.forEach((page, index) => {
          const isVisible = index === faqPageIndex
          setPageBase(page, isVisible)
          setCardsBase(page, isVisible)
        })
        faqPageTransitionLockRef.current = false
        previousFaqPageIndexRef.current = faqPageIndex

        const queuedIndex = faqQueuedPageIndexRef.current
        faqQueuedPageIndexRef.current = null

        if (queuedIndex !== null && queuedIndex !== faqPageIndex) {
          setFaqPageIndex(queuedIndex)
        }
      },
    })

    if (previousPage) {
      timeline.to(
        previousPage,
        {
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
          duration: 0.36,
          ease: 'expo.in',
        },
        0,
      )
      previousCards.forEach((card, index) => {
        timeline.to(
          card,
          {
            opacity: 0,
            y: -14,
            filter: 'blur(10px)',
            duration: 0.24,
            ease: 'expo.in',
          },
          index * 0.03,
        )
      })
    }

    timeline.to(
      activePage,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.28,
        ease: 'expo.out',
      },
      0.34,
    )

    activeCards.forEach((card, index) => {
      timeline.to(
        card,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.02,
          ease: 'expo.out',
        },
        0.58 + index * 0.1,
      )
    })

    return () => {
      timeline.kill()
    }
  }, [activeSurface, faqPageIndex, faqPages.length])

  useEffect(() => {
    if (activeSurface !== 'faq') {
      return
    }

    const media = faqVideoRef.current
    const copy = faqCopyRef.current
    const pagination = faqPaginationRef.current
    const activePage = faqPageRefs.current.slice(0, faqPages.length)[faqPageIndexRef.current]
    const buttons = pagination
      ? Array.from(pagination.querySelectorAll<HTMLElement>('.faq-story__pagination-button'))
      : []
    const cards = activePage
      ? Array.from(activePage.querySelectorAll<HTMLElement>('.faq-story__faq-card'))
      : []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!media || !copy || !pagination || !activePage) {
      return
    }

    gsap.killTweensOf([media, copy, pagination, activePage, ...buttons, ...cards])

    if (reduceMotion) {
      gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
      gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(pagination, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(activePage, { opacity: 1, y: 0, filter: 'blur(0px)' })
      buttons.forEach((button) => gsap.set(button, { opacity: 1, scale: 1 }))
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0, filter: 'blur(0px)' }))
      return
    }

    gsap.set(media, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(14px)',
      transformOrigin: 'center center',
    })
    gsap.set(copy, { opacity: 0, x: -84, filter: 'blur(14px)' })
    gsap.set(pagination, { opacity: 0, x: 42, filter: 'blur(10px)' })
    gsap.set(activePage, { opacity: 0, y: 28, filter: 'blur(10px)' })
    buttons.forEach((button, index) => {
      gsap.set(button, { opacity: 0, scale: 0.82, y: index * 2 })
    })
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 34, filter: 'blur(10px)' })
    })

    const entryTimeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(media, { opacity: 1, scale: 1, filter: 'blur(0px)' })
        gsap.set(copy, { opacity: 1, x: 0, filter: 'blur(0px)' })
        gsap.set(pagination, { opacity: 1, x: 0, filter: 'blur(0px)' })
        gsap.set(activePage, { opacity: 1, y: 0, filter: 'blur(0px)' })
        buttons.forEach((button) => gsap.set(button, { opacity: 1, scale: 1, y: 0 }))
        cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0, filter: 'blur(0px)' }))
      },
    })

    entryTimeline.to(
      media,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.14,
      },
      0,
    )
    entryTimeline.to(
      copy,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.56,
      },
      0.2,
    )
    entryTimeline.to(
      pagination,
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.92,
      },
      0.34,
    )
    buttons.forEach((button, index) => {
      entryTimeline.to(
        button,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
        },
        0.42 + index * 0.05,
      )
    })
    entryTimeline.to(
      activePage,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.84,
      },
      0.48,
    )
    cards.forEach((card, index) => {
      entryTimeline.to(
        card,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.66,
        },
        0.68 + index * 0.08,
      )
    })

    return () => {
      entryTimeline.kill()
    }
  }, [activeSurface, faqPages.length])

  useEffect(() => {
    const video = faqVideoRef.current

    if (!video) {
      return
    }

    if (activeSurface === 'faq') {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [activeSurface, isMobileViewport])

  useEffect(() => {
    isFinalCtaPopupOpenRef.current = isFinalCtaPopupOpen
  }, [isFinalCtaPopupOpen])

  useEffect(() => {
    return () => {
      if (promoCodeTimeoutRef.current !== null) {
        window.clearTimeout(promoCodeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isFinalCtaPopupOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (promoCodeTimeoutRef.current !== null) {
          window.clearTimeout(promoCodeTimeoutRef.current)
          promoCodeTimeoutRef.current = null
        }
        setIsPromoCodeCopied(false)
        setIsFinalCtaPopupOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFinalCtaPopupOpen])

  useEffect(() => {
    finalCtaVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return
      }

      const ensurePreviewFrame = () => {
        if (video.currentTime <= 0.001) {
          try {
            video.currentTime = 0.01
          } catch {
            // Ignore seek errors until the browser has buffered enough data.
          }
        }
      }

      if (video.readyState >= 2) {
        ensurePreviewFrame()
      } else {
        const handleLoadedData = () => {
          ensurePreviewFrame()
          video.removeEventListener('loadeddata', handleLoadedData)
        }

        video.addEventListener('loadeddata', handleLoadedData)
        video.load()
      }

      if (activeSurface === 'final-cta' && index === finalCtaActiveCardIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeSurface, finalCtaActiveCardIndex, isMobileViewport])

  useEffect(() => {
    if (activeSurface !== 'final-cta') {
      return
    }

    const copy = finalCtaCopyRef.current
    const options = finalCtaOptionsRef.current
    const optionNodes = finalCtaOptionRefs.current.filter((node): node is HTMLElement => Boolean(node))
    const activePanel = finalCtaPanelRefs.current[finalCtaActiveCardIndex]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!copy || !options) {
      return
    }

    gsap.killTweensOf([copy, options, ...optionNodes, activePanel])

    if (reduceMotion) {
      gsap.set(copy, { opacity: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(options, { opacity: 1, y: 0, filter: 'blur(0px)' })
      optionNodes.forEach((node) => gsap.set(node, { opacity: 1, y: 0, scale: 1 }))
      if (activePanel) {
        gsap.set(activePanel, { clearProps: 'opacity,y,filter' })
      }
      return
    }

    gsap.set(copy, { opacity: 0, y: 30, filter: 'blur(14px)' })
    gsap.set(options, { opacity: 0, y: 36, filter: 'blur(18px)' })
    optionNodes.forEach((node) => gsap.set(node, { opacity: 0, y: 24, scale: 0.96 }))
    if (activePanel) {
      gsap.set(activePanel, { opacity: 0, y: 22, filter: 'blur(12px)' })
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(copy, { opacity: 1, y: 0, filter: 'blur(0px)' })
        gsap.set(options, { opacity: 1, y: 0, filter: 'blur(0px)' })
        optionNodes.forEach((node) => gsap.set(node, { opacity: 1, y: 0, scale: 1 }))
        if (activePanel) {
          gsap.set(activePanel, { clearProps: 'opacity,y,filter' })
        }
      },
    })

    timeline.to(
      copy,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.02,
      },
      0,
    )
    timeline.to(
      options,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.18,
      },
      0.16,
    )
    optionNodes.forEach((node, index) => {
      timeline.to(
        node,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.88,
        },
        0.28 + index * 0.08,
      )
    })
    if (activePanel) {
      timeline.to(
        activePanel,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.84,
        },
        0.52,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [activeSurface, finalCtaActiveCardIndex])

  const activeBlockNavIndex =
    activeSurface === 'final-cta'
      ? 12
      : activeSurface === 'faq'
        ? 11
        : activeSurface === 'gift'
          ? 10
        : activeSurface === 'specs'
          ? 9
          : activeSurface === 'package'
            ? 8
            : activeSurface === 'comparison'
              ? 7
              : activeSurface === 'comfort'
                ? 6
                : activeSurface === 'hair-types'
                  ? 5
                  : activeSurface === 'attachments'
                    ? 4
                    : activeSurface === 'benefits'
                      ? 3
                      : activeSurface === 'pain'
                        ? 2
                        : activeSurface === 'hero-story'
                          ? 1
                          : 0
  const activeBlockNavItem = blockNavItems[activeBlockNavIndex]
  const clearPromoCodeTimeout = () => {
    if (promoCodeTimeoutRef.current !== null) {
      window.clearTimeout(promoCodeTimeoutRef.current)
      promoCodeTimeoutRef.current = null
    }
  }

  const closeFinalCtaPopup = () => {
    clearPromoCodeTimeout()
    setIsPromoCodeCopied(false)
    setIsFinalCtaPopupOpen(false)
  }

  const openFinalCtaPopup = (cardIndex: number) => {
    clearPromoCodeTimeout()
    setIsPromoCodeCopied(false)
    setFinalCtaActiveCardIndex(cardIndex)
    setIsFinalCtaPopupOpen(true)
  }

  const copyPromoCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(finalCtaContent.promoCode)
      } else {
        const tempTextArea = document.createElement('textarea')
        tempTextArea.value = finalCtaContent.promoCode
        tempTextArea.setAttribute('readonly', 'true')
        tempTextArea.style.position = 'absolute'
        tempTextArea.style.left = '-9999px'
        document.body.appendChild(tempTextArea)
        tempTextArea.select()
        document.execCommand('copy')
        document.body.removeChild(tempTextArea)
      }

      setIsPromoCodeCopied(true)
      clearPromoCodeTimeout()

      promoCodeTimeoutRef.current = window.setTimeout(() => {
        setIsPromoCodeCopied(false)
        promoCodeTimeoutRef.current = null
      }, 1800)
    } catch {
      setIsPromoCodeCopied(false)
    }
  }
  const renderTopbarNavigation = (ariaLabel: string) => (
    <div className="landing-topbar__frame">
      <div className="landing-topbar__shell">
        <a
          className="landing-topbar__brand"
          href="#header"
          aria-label="Cosmolex"
          onClick={(event) => {
            event.preventDefault()
            handleBlockNavClick('header')
          }}
        >
          <img src={logoUrl} alt="Cosmolex" />
        </a>

        <span className="landing-topbar__divider" aria-hidden="true" />

        <div className="landing-topbar__meta" aria-label={ariaLabel}>
          <span className="landing-topbar__meta-number">{activeBlockNavItem.number}</span>
          <p className="landing-topbar__meta-label">{activeBlockNavItem.label}</p>
        </div>

        <span className="landing-topbar__divider" aria-hidden="true" />

        <button
          type="button"
          className="nav-burger landing-topbar__burger"
          aria-label={menuOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="landing-topbar__menu" role="menu" aria-label={ariaLabel}>
        {blockNavItems.map((item, index) => {
          const isImplemented = index < blockNavItems.length
          const isActive = activeBlockNavItem.id === item.id

          return (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={`landing-topbar__menu-item${isActive ? ' is-active' : ''}`}
              aria-label={`Перейти к блоку ${item.number}: ${item.label}`}
              aria-disabled={!isImplemented}
              disabled={!isImplemented}
              onClick={() => {
                setMenuOpen(false)
                handleBlockNavClick(item.id)
              }}
            >
              <span className="landing-topbar__menu-number">{item.number}</span>
              <span className="landing-topbar__menu-label">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
  const handleBlockNavClick = (blockId: (typeof blockNavItems)[number]['id']) => {
    setMenuOpen(false)

    if (
      blockId !== 'header' &&
      blockId !== 'hero-story' &&
      blockId !== 'pain' &&
      blockId !== 'benefits' &&
      blockId !== 'attachments' &&
      blockId !== 'hair-types' &&
      blockId !== 'comfort' &&
      blockId !== 'comparison' &&
      blockId !== 'package' &&
      blockId !== 'specs' &&
      blockId !== 'gift' &&
      blockId !== 'faq' &&
      blockId !== 'final-cta'
    ) {
      return
    }

    const hero = heroSectionRef.current
    const pain = painSectionRef.current
    const painTrack = painTrackRef.current
    const benefits = benefitsSectionRef.current
    const attachments = attachmentsSectionRef.current
    const hairTypes = hairTypesSectionRef.current
    const comfort = comfortSectionRef.current
    const comparison = comparisonSectionRef.current
    const packageSection = packageSectionRef.current
    const specsSection = specsSectionRef.current
    const giftSection = giftSectionRef.current
    const faqSection = faqSectionRef.current
    const finalCtaSection = finalCtaSectionRef.current

    const heroMediaSlides = hero
      ? Array.from(hero.querySelectorAll<HTMLElement>('.hero-story__media-slide'))
      : []
    const heroTextSlides = hero
      ? Array.from(hero.querySelectorAll<HTMLElement>('.arch__left .arch__info'))
      : []
    const painPanels = pain
      ? Array.from(pain.querySelectorAll<HTMLElement>('.pain-story__content'))
      : []
    const benefitsCards = benefitsCardRefs.current.filter(
      (node): node is HTMLDivElement => Boolean(node),
    )
    const attachmentsMediaSlides = attachments
      ? Array.from(attachments.querySelectorAll<HTMLElement>('.attachments-story__media-slide'))
      : []
    const attachmentsContents = attachments
      ? Array.from(attachments.querySelectorAll<HTMLElement>('.attachments-story__content'))
      : []
    const hairTypesMediaSlides = hairTypes
      ? Array.from(hairTypes.querySelectorAll<HTMLElement>('.hair-types-story__figure'))
      : []
    const hairTypesContents = hairTypes
      ? Array.from(hairTypes.querySelectorAll<HTMLElement>('.hair-types-story__copy'))
      : []
    const comfortMediaSlides = comfort
      ? Array.from(
          comfort.querySelectorAll<HTMLElement>(
            '.comfort-story__bg-slide, .comfort-story__media-window, .comfort-story__intro-media',
          ),
        )
      : []
    const comfortContents = comfort
      ? Array.from(comfort.querySelectorAll<HTMLElement>('.comfort-story__panel'))
      : []
    const comparisonMediaSlides = comparison
      ? Array.from(comparison.querySelectorAll<HTMLElement>('.comparison-story__media-slide'))
      : []
    const comparisonContents = comparison
      ? Array.from(comparison.querySelectorAll<HTMLElement>('.comparison-story__panel'))
      : []
    const packageMediaSlides = packageSection
      ? Array.from(packageSection.querySelectorAll<HTMLElement>('.package-story__media-slide'))
      : []
    const packageContents = packageSection
      ? Array.from(
          packageSection.querySelectorAll<HTMLElement>(
            '.package-story__bg, .package-story__copy-shell, .package-story__timeline-shell, .package-story__row',
          ),
        )
      : []
    const specsMediaSlides = specsSection
      ? Array.from(specsSection.querySelectorAll<HTMLElement>('.specs-story__media-slide'))
      : []
    const specsContents = specsSection
      ? Array.from(
          specsSection.querySelectorAll<HTMLElement>(
            '.specs-story__copy-shell, .specs-story__page, .specs-story__pagination, .specs-story__spec-card',
          ),
        )
      : []
    const giftMediaSlides = giftSection
      ? Array.from(
          giftSection.querySelectorAll<HTMLElement>(
            '.gift-story__bg-slide, .gift-story__media-window, .gift-story__intro-video',
          ),
        )
      : []
    const giftContents = giftSection
      ? Array.from(giftSection.querySelectorAll<HTMLElement>('.gift-story__panel'))
      : []
    const faqMediaSlides = faqSection
      ? Array.from(faqSection.querySelectorAll<HTMLElement>('.faq-story__media-slide'))
      : []
    const faqContents = faqSection
      ? Array.from(
          faqSection.querySelectorAll<HTMLElement>(
            '.faq-story__copy-shell, .faq-story__page, .faq-story__pagination, .faq-story__faq-card',
          ),
        )
      : []
    const finalCtaContents = finalCtaSection
      ? Array.from(
          finalCtaSection.querySelectorAll<HTMLElement>(
            '.final-cta-story__bg-slide, .final-cta-story__intro, .final-cta-story__options, .final-cta-story__option, .final-cta-story__shadow, .final-cta-story__popup',
          ),
        )
      : []

    const hideEl = (el: HTMLElement | null) => {
      if (!el) {
        return
      }
      el.style.transition = 'none'
      gsap.set(el, {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      })
    }

    if (hero) {
      gsap.killTweensOf([hero, ...heroMediaSlides, ...heroTextSlides])
      gsap.set(hero, { clearProps: 'x,y,zIndex' })
      heroMediaSlides.forEach((slide) => gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter' }))
      heroTextSlides.forEach((slide) => gsap.set(slide, { clearProps: 'x,y,opacity,filter' }))
      if (blockId !== 'hero-story') {
        hideEl(hero)
      } else {
        hero.style.transition = ''
        gsap.set(hero, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (pain) {
      gsap.killTweensOf([pain, painTrack, ...painPanels])
      gsap.set(pain, { clearProps: 'x,y,zIndex' })
      painPanels.forEach((panel) => gsap.set(panel, { clearProps: 'y,opacity,scale,filter' }))

      if (painTrack) {
        gsap.set(painTrack, { x: 0 })
      }

      if (blockId !== 'pain') {
        hideEl(pain)
      } else {
        pain.style.transition = ''
        gsap.set(pain, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (benefits) {
      gsap.killTweensOf([benefits, ...benefitsCards])
      gsap.set(benefits, { clearProps: 'x,y,zIndex' })
      benefitsCards.forEach((card) => {
        gsap.set(card, { clearProps: 'x,y,opacity,scale,rotate,filter' })
      })

      if (blockId !== 'benefits') {
        hideEl(benefits)
      } else {
        benefits.style.transition = ''
        gsap.set(benefits, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (attachments) {
      gsap.killTweensOf([attachments, ...attachmentsMediaSlides, ...attachmentsContents])
      gsap.set(attachments, { clearProps: 'x,y,zIndex' })
      attachmentsMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter' }),
      )
      attachmentsContents.forEach((content) => gsap.set(content, { clearProps: 'x,y,opacity,filter' }))

      if (blockId !== 'attachments') {
        hideEl(attachments)
      } else {
        attachments.style.transition = ''
        gsap.set(attachments, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (hairTypes) {
      gsap.killTweensOf([hairTypes, ...hairTypesMediaSlides, ...hairTypesContents])
      gsap.set(hairTypes, { clearProps: 'x,y,zIndex' })
      hairTypesMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      hairTypesContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'hair-types') {
        hideEl(hairTypes)
      } else {
        hairTypes.style.transition = ''
        gsap.set(hairTypes, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (comfort) {
      gsap.killTweensOf([comfort, ...comfortMediaSlides, ...comfortContents])
      gsap.set(comfort, { clearProps: 'x,y,zIndex' })
      comfortMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      comfortContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'comfort') {
        hideEl(comfort)
      } else {
        comfort.style.transition = ''
        gsap.set(comfort, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (comparison) {
      gsap.killTweensOf([comparison, ...comparisonMediaSlides, ...comparisonContents])
      gsap.set(comparison, { clearProps: 'x,y,zIndex' })
      comparisonMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      comparisonContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'comparison') {
        hideEl(comparison)
      } else {
        comparison.style.transition = ''
        gsap.set(comparison, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (packageSection) {
      gsap.killTweensOf([packageSection, ...packageMediaSlides, ...packageContents])
      gsap.set(packageSection, { clearProps: 'x,y,zIndex' })
      packageMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      packageContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'package') {
        hideEl(packageSection)
      } else {
        packageSection.style.transition = ''
        gsap.set(packageSection, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (specsSection) {
      gsap.killTweensOf([specsSection, ...specsMediaSlides, ...specsContents])
      gsap.set(specsSection, { clearProps: 'x,y,zIndex' })
      specsMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      specsContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'specs') {
        hideEl(specsSection)
      } else {
        specsSection.style.transition = ''
        gsap.set(specsSection, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (giftSection) {
      gsap.killTweensOf([giftSection, ...giftMediaSlides, ...giftContents])
      gsap.set(giftSection, { clearProps: 'x,y,zIndex' })
      giftMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      giftContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'gift') {
        hideEl(giftSection)
      } else {
        giftSection.style.transition = ''
        gsap.set(giftSection, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (faqSection) {
      gsap.killTweensOf([faqSection, ...faqMediaSlides, ...faqContents])
      gsap.set(faqSection, { clearProps: 'x,y,zIndex' })
      faqMediaSlides.forEach((slide) =>
        gsap.set(slide, { clearProps: 'x,y,opacity,scale,filter,width,height,clipPath,zIndex' }),
      )
      faqContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'faq') {
        hideEl(faqSection)
      } else {
        faqSection.style.transition = ''
        gsap.set(faqSection, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    if (finalCtaSection) {
      gsap.killTweensOf([finalCtaSection, ...finalCtaContents])
      gsap.set(finalCtaSection, { clearProps: 'x,y,zIndex' })
      finalCtaContents.forEach((content) =>
        gsap.set(content, { clearProps: 'x,y,opacity,scale,filter,clipPath,pointerEvents' }),
      )

      if (blockId !== 'final-cta') {
        hideEl(finalCtaSection)
      } else {
        finalCtaSection.style.transition = ''
        gsap.set(finalCtaSection, { clearProps: 'opacity,visibility,pointerEvents' })
      }
    }

    const restoreInlineHiddenStyles = () => {
      ;[
        hero,
        pain,
        benefits,
        attachments,
        hairTypes,
        comfort,
        comparison,
        packageSection,
        specsSection,
        giftSection,
        faqSection,
        finalCtaSection,
      ].forEach((el) => {
        if (!el) {
          return
        }
        el.style.transition = ''
        gsap.set(el, { clearProps: 'opacity,visibility,pointerEvents' })
      })
    }

    skipNextPainSurfaceIntroRef.current = false
    slowHeaderEntryFromBurgerRef.current = blockId === 'header'
    slowHeroEntryFromBurgerRef.current = blockId === 'hero-story'
    slowPainEntryFromBurgerRef.current = blockId === 'pain'
    slowComfortEntryFromBurgerRef.current = blockId === 'comfort'
    slowComfortLastEntryFromComparisonRef.current = false
    slowComparisonEntryFromBurgerRef.current = blockId === 'comparison'
    slowAttachmentsEntryFromBenefitsRef.current = blockId === 'attachments'
    slowHairTypesEntryFromAttachmentsRef.current = blockId === 'hair-types'
    slowHairTypesLastEntryFromComfortRef.current = false
    slowGiftEntryRef.current = blockId === 'gift'
    slowGiftLastEntryFromFaqRef.current = false

    setHeroSlideIndex(0)
    setPainSlideIndex(0)
    setBenefitsSlideIndex(0)
    setAttachmentsSlideIndex(0)
    setHairTypesSlideIndex(blockId === 'comfort' ? hairProfileSlides.length - 1 : 0)
    setComfortSlideIndex(blockId === 'comparison' ? comfortSlides.length - 1 : 0)
    setComparisonSlideIndex(blockId === 'package' ? comparisonSlides.length - 1 : 0)
    setSpecsPageIndex(0)
    previousSpecsPageIndexRef.current = 0
    specsPageTransitionLockRef.current = false
    specsQueuedPageIndexRef.current = null
    setGiftSlideIndex(0)
    previousGiftSlideIndexRef.current = 0
    setFaqPageIndex(0)
    previousFaqPageIndexRef.current = 0
    faqPageTransitionLockRef.current = false
    faqQueuedPageIndexRef.current = null
    setFinalCtaActiveCardIndex(0)
    closeFinalCtaPopup()

    const previousSurface = activeSurfaceRef.current

    const applySurface = () => {
      setActiveSurface(blockId)

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          restoreInlineHiddenStyles()
        })
      })

      if (blockId === 'header') {
        window.requestAnimationFrame(() => {
          rootRef.current?.dispatchEvent(new CustomEvent('header-reset'))
        })
      }
    }

    if (previousSurface === blockId) {
      setActiveSurface('header')
      window.setTimeout(() => {
        applySurface()
      }, 30)
      return
    }

    applySurface()
  }

  return (
    <div className="landing-stage">
      <div ref={rootRef} className="header-root" id="header">
        <div className="indicator" />

        <nav
          aria-label="Навигация по лендингу"
          className={menuOpen ? 'menu-open' : undefined}
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </nav>

        <div id="demo">
          {headerSlides.map((slide, index) => (
            <div key={slide.id}>
              <div
                className="card"
                id={`card${index}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="card-content" id={`card-content-${index}`}>
                <div className="content-start" />
                <div className="content-place">{slide.place}</div>
                <div className="content-title-1">{slide.title}</div>
                <div className="content-title-2">{slide.title2}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="details" id="details-even">
          <div className="place-box">
            <div className="text">{headerSlides[0].place}</div>
          </div>
          <div className="title-box-1">
            <div className="title-1">{headerSlides[0].title}</div>
          </div>
          <div className="title-box-2">
            <div className="title-2">{headerSlides[0].title2}</div>
          </div>
          <div className="desc">{headerSlides[0].description}</div>
          <div className="cta">
            <div className="bookmark" style={{ backgroundColor: headerSlides[0].accent }} />
            <a
              className="discover"
              href={headerSlides[0].buyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Купить
            </a>
          </div>
        </div>

        <div className="details" id="details-odd">
          <div className="place-box">
            <div className="text">{headerSlides[0].place}</div>
          </div>
          <div className="title-box-1">
            <div className="title-1">{headerSlides[0].title}</div>
          </div>
          <div className="title-box-2">
            <div className="title-2">{headerSlides[0].title2}</div>
          </div>
          <div className="desc">{headerSlides[0].description}</div>
          <div className="cta">
            <div className="bookmark" style={{ backgroundColor: headerSlides[0].accent }} />
            <a
              className="discover"
              href={headerSlides[0].buyUrl}
              target="_blank"
              rel="noreferrer"
            >
              Купить
            </a>
          </div>
        </div>

        <div className="pagination" id="pagination">
          <div className="arrow arrow-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="arrow arrow-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className="progress-sub-container">
            <div className="progress-sub-background">
              <div className="progress-sub-foreground" />
            </div>
          </div>
          <div className="slide-numbers" id="slide-numbers">
            {headerSlides.map((slide, index) => (
              <div key={slide.id} className="item" id={`slide-item-${index}`}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="cover" />
      </div>

      <section
        ref={heroSectionRef}
        className={`hero-story ${activeSurface === 'hero-story' ? 'is-active' : ''}`}
        id="hero-story"
        aria-label="Hero-блок Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <div className="hero-story__media-layer" aria-hidden="true">
          {heroStorySlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-story__media-slide ${heroSlideIndex === index ? 'is-active' : ''}`}
            >
              <video
                key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                ref={(node) => {
                  heroVideoRefs.current[index] = node
                }}
                className="hero-story__video"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src={isMobileViewport ? heroStoryMobileVideoUrl : heroStoryVideoUrl}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </div>
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="container hero-story__container">
          <div className="arch">
            <div className="arch__left">
              {heroStorySlides.map((slide, index) => {
                const TitleTag = index === 0 ? 'h1' : 'h2'

                return (
                  <article
                    key={slide.id}
                    className={`arch__info ${heroSlideIndex === index ? 'is-active' : ''}`}
                    aria-hidden={heroSlideIndex === index ? 'false' : 'true'}
                  >
                    <div className="content">
                      <div className="hero-story__eyebrow">{slide.eyebrow}</div>
                      <TitleTag className="header">{slide.title}</TitleTag>
                      <p className="desc">{slide.description}</p>
                      <div className="hero-story__note">{slide.note}</div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="hero-story__footer">
            <span>
              {String(heroSlideIndex + 1).padStart(2, '0')} /{' '}
              {String(heroStorySlides.length).padStart(2, '0')}
            </span>
            <p>{heroStorySlides[heroSlideIndex].eyebrow.replace(/^\d+\s\/\s/, '')}</p>
          </div>
        </div>
      </section>

      <section
        ref={painSectionRef}
        className={`pain-story ${activeSurface === 'pain' ? 'is-active' : ''}`}
        id="pain"
        aria-label="Блок боли обычного фена"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="pain-story__viewport">
          <div ref={painTrackRef} className="pain-story__track">
            {painSlides.map((slide, index) => {
              const TitleTag = index === 0 ? 'h2' : 'h3'

              return (
                <article
                  key={slide.id}
                  className={`pain-story__slide ${index === 0 ? 'pain-story__slide--intro' : ''}`}
                  aria-hidden={painSlideIndex === index ? 'false' : 'true'}
                >
                  <video
                    key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                    ref={(node) => {
                      painVideoRefs.current[index] = node
                    }}
                    className="pain-story__video"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src={isMobileViewport ? benefitsMobileVideoUrl : benefitsDesktopVideoUrl}
                      type="video/mp4"
                    />
                  </video>
                  <div className="pain-story__backdrop" />

                  <div className={`pain-story__content ${painSlideIndex === index ? 'is-active' : ''}`}>
                    <div className="pain-story__eyebrow">{slide.eyebrow}</div>
                    <TitleTag className="pain-story__title">{slide.title}</TitleTag>
                    <p className="pain-story__description">{slide.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="pain-story__footer">
          <span>
            {String(painSlideIndex + 1).padStart(2, '0')} / {String(painSlides.length).padStart(2, '0')}
          </span>
          <p>{painSlides[painSlideIndex].eyebrow.replace(/^\d+\s\/\s/, '')}</p>
        </div>
      </section>

      <section
        ref={benefitsSectionRef}
        className={`benefits-story ${activeSurface === 'benefits' ? 'is-active' : ''}`}
        id="benefits"
        aria-label="Преимущества Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="benefits-story__viewport">
          <div className="benefits-story__stage">
            {benefitsSlides.map((slide, index) => {
              const TitleTag = index === 0 ? 'h2' : 'h3'

              return (
                <div
                  key={slide.id}
                  ref={(node) => {
                    benefitsCardRefs.current[index] = node
                  }}
                  className={`benefits-story__card-wrapper ${
                    benefitsSlideIndex === index ? 'is-active' : undefined
                  }`}
                  aria-hidden={benefitsSlideIndex === index ? 'false' : 'true'}
                >
                  <article className="benefits-story__card-contents">
                    <video
                      key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                      ref={(node) => {
                        benefitsVideoRefs.current[index] = node
                      }}
                      className="benefits-story__card-video"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source
                        src={isMobileViewport ? benefitsMobileVideoUrl : benefitsDesktopVideoUrl}
                        type="video/mp4"
                      />
                    </video>

                    <div className="benefits-story__card-description">
                      <div className="benefits-story__eyebrow">{slide.eyebrow}</div>
                      <TitleTag className="benefits-story__card-title">
                        {slide.title}
                        <span className="benefits-story__card-meta">{slide.meta}</span>
                      </TitleTag>

                      <p className="benefits-story__card-copy">{slide.description}</p>

                      <div className="benefits-story__card-tags">
                        {slide.tags.map((tag) => (
                          <span key={tag} className="benefits-story__card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {slide.note ? <div className="benefits-story__card-note">{slide.note}</div> : null}
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hero-story__footer benefits-story__footer">
          <span>
            {String(benefitsSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(benefitsSlides.length).padStart(2, '0')}
          </span>
          <p>{benefitsSlides[benefitsSlideIndex].eyebrow.replace(/^\d+\s\/\s/, '')}</p>
        </div>
      </section>

      <section
        ref={attachmentsSectionRef}
        className={`attachments-story ${activeSurface === 'attachments' ? 'is-active' : ''}`}
        id="attachments"
        aria-label="Насадки для разных укладок Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="attachments-story__media-layer" aria-hidden="true">
          {attachmentSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`attachments-story__media-slide ${
                attachmentsSlideIndex === index ? 'is-active' : ''
              }`}
            >
              <video
                key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                ref={(node) => {
                  attachmentsVideoRefs.current[index] = node
                }}
                className="attachments-story__video"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src={isMobileViewport ? heroStoryMobileVideoUrl : heroStoryVideoUrl}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </div>

        <div className="attachments-story__backdrop" />

        <div className="attachments-story__viewport">
          <div className="attachments-story__layout">
            <aside className="attachments-story__rail" aria-label="Навигация по насадкам">
              {attachmentSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`attachments-story__rail-item ${
                    attachmentsSlideIndex === index ? 'is-active' : ''
                  }`}
                  aria-current={attachmentsSlideIndex === index ? 'true' : undefined}
                >
                  <span className="attachments-story__rail-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="attachments-story__rail-label">{slide.navLabel}</span>
                </div>
              ))}
            </aside>

            <div className="attachments-story__content-stage">
              {attachmentSlides.map((slide, index) => {
                const TitleTag = index === 0 ? 'h2' : 'h3'

                return (
                  <article
                    key={slide.id}
                    className={`attachments-story__content ${
                      attachmentsSlideIndex === index ? 'is-active' : ''
                    }`}
                    aria-hidden={attachmentsSlideIndex === index ? 'false' : 'true'}
                  >
                    <div className="attachments-story__eyebrow">{slide.eyebrow}</div>
                    <TitleTag className="attachments-story__title">{slide.title}</TitleTag>
                    <p className="attachments-story__description">{slide.description}</p>
                    <div className="attachments-story__fit">{slide.fit}</div>
                    {slide.note ? <div className="attachments-story__note">{slide.note}</div> : null}
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div className="hero-story__footer attachments-story__footer">
          <span>
            {String(attachmentsSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(attachmentSlides.length).padStart(2, '0')}
          </span>
          <p>{attachmentSlides[attachmentsSlideIndex].navLabel}</p>
        </div>
      </section>

      <section
        ref={hairTypesSectionRef}
        className={`hair-types-story ${activeSurface === 'hair-types' ? 'is-active' : ''}`}
        id="hair-types"
        aria-label="Для каких волос подходит Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="hair-types-story__media-layer" aria-hidden="true">
          {hairProfileSlides.map((slide, index) => {
            const galleryColumns = getHairGalleryColumns(slide.galleryOffset)

            return (
              <div
                key={slide.id}
                ref={(node) => {
                  hairTypesGalleryRefs.current[index] = node
                }}
                className={`hair-types-story__gallery ${
                  hairTypesSlideIndex === index ? 'is-active' : ''
                }`}
              >
                <div className="hair-types-story__gallery-grid">
                  {galleryColumns.map((column, columnIndex) => (
                    <div
                      key={`${slide.id}-column-${columnIndex}`}
                      className={`hair-types-story__gallery-column ${
                        columnIndex === 1 ? 'is-reverse' : ''
                      }`}
                    >
                      <div
                        ref={(node) => {
                          if (!hairTypesGalleryTrackRefs.current[index]) {
                            hairTypesGalleryTrackRefs.current[index] = []
                          }

                          hairTypesGalleryTrackRefs.current[index][columnIndex] = node
                        }}
                        className="hair-types-story__gallery-track"
                      >
                        {[...column, ...column].map((imageSrc, imageIndex) => (
                          <div
                            key={`${slide.id}-image-${columnIndex}-${imageIndex}`}
                            className="hair-types-story__gallery-image"
                          >
                            <img
                              src={imageSrc}
                              alt={slide.title}
                              loading={index === 0 && imageIndex < 3 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="hair-types-story__backdrop" />

        <div className="hair-types-story__viewport">
          {hairProfileSlides.map((slide, index) => {
            const TitleTag = index === 0 ? 'h2' : 'h3'

            return (
              <article
                key={slide.id}
                ref={(node) => {
                  hairTypesCopyRefs.current[index] = node
                }}
                className={`hair-types-story__copy ${hairTypesSlideIndex === index ? 'is-active' : ''}`}
                aria-hidden={hairTypesSlideIndex === index ? 'false' : 'true'}
              >
                <div className="hair-types-story__copy-shell">
                  <div className="hair-types-story__eyebrow">{slide.eyebrow}</div>
                  <TitleTag className="hair-types-story__headline">{slide.title}</TitleTag>
                  <p className="hair-types-story__description">{slide.description}</p>
                  <p className="hair-types-story__detail">{slide.detail}</p>
                  {slide.note ? <p className="hair-types-story__note">{slide.note}</p> : null}
                </div>
              </article>
            )
          })}
        </div>

        <div className="hero-story__footer hair-types-story__footer">
          <span>
            {String(hairTypesSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(hairProfileSlides.length).padStart(2, '0')}
          </span>
          <p>{hairProfileSlides[hairTypesSlideIndex].eyebrow.replace(/^\d+\s\/\s/, '')}</p>
        </div>
      </section>

      <section
        ref={comfortSectionRef}
        className={`comfort-story ${activeSurface === 'comfort' ? 'is-active' : ''}`}
        id="comfort"
        aria-label="Комфорт в использовании Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="comfort-story__media-layer" aria-hidden="true">
          {comfortSlides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(node) => {
                comfortBgRefs.current[index] = node
              }}
              className={`comfort-story__bg-slide ${
                comfortSlideIndex === index ? 'is-active' : ''
              } ${slide.intro ? 'comfort-story__bg-slide--intro' : ''}`}
            >
              {slide.intro ? (
                <video
                  key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                  ref={(node) => {
                    comfortVideoRefs.current[index] = node
                  }}
                  className="comfort-story__intro-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={isMobileViewport ? slide.videoMobile : slide.videoDesktop}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div
                  className="comfort-story__bg-image"
                  style={{
                    backgroundImage: `url(${
                      isMobileViewport ? slide.backgroundMobile : slide.backgroundDesktop
                    })`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="comfort-story__backdrop" />

        <div className="comfort-story__viewport">
          {comfortSlides.map((slide, index) => {
            const TitleTag = index === 0 ? 'h2' : 'h3'

            return (
              <article
                key={slide.id}
                ref={(node) => {
                  comfortPanelRefs.current[index] = node
                }}
                className={`comfort-story__panel ${
                  comfortSlideIndex === index ? 'is-active' : ''
                } ${slide.intro ? 'comfort-story__panel--intro' : ''}`}
                aria-hidden={comfortSlideIndex === index ? 'false' : 'true'}
              >
                {slide.intro ? (
                  <div
                    ref={(node) => {
                      comfortCopyRefs.current[index] = node
                    }}
                    className="comfort-story__intro-copy"
                  >
                    <div className="comfort-story__eyebrow">{slide.eyebrow}</div>
                    <TitleTag className="comfort-story__title">{slide.title}</TitleTag>
                    <p className="comfort-story__description">{slide.description}</p>
                    <p className="comfort-story__detail">{slide.detail}</p>
                  </div>
                ) : (
                  <div className="comfort-story__layout">
                    <div
                      ref={(node) => {
                        comfortCopyRefs.current[index] = node
                      }}
                      className="comfort-story__copy-shell"
                    >
                      <div className="comfort-story__eyebrow">{slide.eyebrow}</div>
                      <TitleTag className="comfort-story__title">{slide.title}</TitleTag>
                      <p className="comfort-story__description">{slide.description}</p>
                      <p className="comfort-story__detail">{slide.detail}</p>
                      {slide.note ? <p className="comfort-story__note">{slide.note}</p> : null}
                    </div>

                    <div
                      ref={(node) => {
                        comfortWindowRefs.current[index] = node
                      }}
                      className="comfort-story__media-window"
                    >
                      <video
                        key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                        ref={(node) => {
                          comfortVideoRefs.current[index] = node
                        }}
                        className="comfort-story__window-video"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source
                          src={isMobileViewport ? slide.videoMobile : slide.videoDesktop}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="hero-story__footer comfort-story__footer">
          <span>
            {String(comfortSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(comfortSlides.length).padStart(2, '0')}
          </span>
          <p>{comfortSlides[comfortSlideIndex].navLabel}</p>
        </div>
      </section>

      <section
        ref={comparisonSectionRef}
        className={`comparison-story ${activeSurface === 'comparison' ? 'is-active' : ''}`}
        id="comparison"
        aria-label="Сравнение Cosmolex Super Air с обычным феном"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="comparison-story__media-layer" aria-hidden="true">
          {comparisonSlides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(node) => {
                comparisonMediaRefs.current[index] = node
              }}
              className={`comparison-story__media-slide ${
                comparisonSlideIndex === index ? 'is-active' : ''
              } ${slide.intro ? 'comparison-story__media-slide--intro' : ''}`}
            >
              {slide.intro ? (
                <div
                  className="comparison-story__intro-image"
                  style={{
                    backgroundImage: `url(${
                      isMobileViewport ? slide.backgroundMobile : slide.backgroundDesktop
                    })`,
                  }}
                />
              ) : (
                <video
                  key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                  ref={(node) => {
                    comparisonVideoRefs.current[index] = node
                  }}
                  className="comparison-story__video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={isMobileViewport ? slide.videoMobile : slide.videoDesktop}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
          ))}
        </div>

        <div className="comparison-story__backdrop" />

        <div className="comparison-story__viewport">
          {comparisonSlides.map((slide, index) => {
            const TitleTag = index === 0 ? 'h2' : 'h3'
            const isOrdinarySlide = slide.accent === 'ordinary'

            return (
              <article
                key={slide.id}
                ref={(node) => {
                  comparisonPanelRefs.current[index] = node
                }}
                className={`comparison-story__panel ${
                  comparisonSlideIndex === index ? 'is-active' : ''
                } ${slide.intro ? 'comparison-story__panel--intro' : ''}`}
                aria-hidden={comparisonSlideIndex === index ? 'false' : 'true'}
              >
                {slide.intro ? (
                  <div
                    ref={(node) => {
                      comparisonCopyRefs.current[index] = node
                    }}
                    className="comparison-story__intro-copy"
                  >
                    <div className="comparison-story__eyebrow">{slide.eyebrow}</div>
                    <TitleTag className="comparison-story__title">{slide.title}</TitleTag>
                    <p className="comparison-story__description">{slide.description}</p>
                    {slide.summary ? <p className="comparison-story__summary">{slide.summary}</p> : null}
                  </div>
                ) : (
                  <div className="comparison-story__layout">
                    <div
                      ref={(node) => {
                        comparisonCopyRefs.current[index] = node
                      }}
                      className="comparison-story__copy-shell"
                    >
                      <div className="comparison-story__eyebrow">{slide.eyebrow}</div>
                      <TitleTag className="comparison-story__title">{slide.title}</TitleTag>
                      <p className="comparison-story__description">{slide.description}</p>
                      {slide.summary ? <p className="comparison-story__summary">{slide.summary}</p> : null}
                    </div>

                    <div
                      className={`comparison-story__timeline comparison-story__timeline--${slide.accent}`}
                    >
                      <div
                        className={`comparison-story__timeline-head comparison-story__timeline-head--${slide.accent}`}
                      >
                        <span>{isOrdinarySlide ? 'Обычный фен' : 'Cosmolex Super Air'}</span>
                      </div>

                      <div className="comparison-story__timeline-rows">
                        {comparisonPairs.map((pair, rowIndex) => {
                          const point = isOrdinarySlide ? pair.ordinary : pair.cosmolex
                          const isLeftSide = rowIndex % 2 === 0

                          return (
                            <div
                              key={`${slide.id}-${rowIndex}`}
                              ref={(node) => {
                                if (!comparisonRowRefs.current[index]) {
                                  comparisonRowRefs.current[index] = []
                                }
                                comparisonRowRefs.current[index][rowIndex] = node
                              }}
                              className={`comparison-story__row comparison-story__row--${slide.accent} ${
                                isLeftSide
                                  ? 'comparison-story__row--left'
                                  : 'comparison-story__row--right'
                              }`}
                            >
                              {isLeftSide ? (
                                <>
                                  <div className={`comparison-story__item comparison-story__item--${slide.accent}`}>
                                    <p>{point}</p>
                                  </div>

                                  <span className="comparison-story__node" aria-hidden="true" />

                                  <div className="comparison-story__item-spacer" aria-hidden="true" />
                                </>
                              ) : (
                                <>
                                  <div className="comparison-story__item-spacer" aria-hidden="true" />

                                  <span className="comparison-story__node" aria-hidden="true" />

                                  <div className={`comparison-story__item comparison-story__item--${slide.accent}`}>
                                    <p>{point}</p>
                                  </div>
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="hero-story__footer comparison-story__footer">
          <span>
            {String(comparisonSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(comparisonSlides.length).padStart(2, '0')}
          </span>
          <p>{comparisonSlides[comparisonSlideIndex].navLabel}</p>
        </div>
      </section>

      <section
        ref={packageSectionRef}
        className={`package-story ${activeSurface === 'package' ? 'is-active' : ''}`}
        id="package"
        aria-label="Комплектация Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="package-story__media-layer" aria-hidden="true">
          <div
            ref={packageMediaRef}
            className="package-story__media-slide"
          >
            <div
              className="package-story__image"
              style={{
                backgroundImage: `url(${isMobileViewport ? packageMobileImage : packageDesktopImage})`,
              }}
            />
          </div>
        </div>

        <div className="package-story__backdrop" />

        <div className="package-story__viewport">
          <div
            ref={packageBgRef}
            className="package-story__bg"
            aria-hidden="true"
          />

          <div className="package-story__layout">
            <div className="package-story__copy-stage">
              <article
                ref={packageCopyRef}
                className="package-story__copy-shell"
              >
                <div className="package-story__eyebrow">{packageBlockContent.eyebrow}</div>
                <h2 className="package-story__title">{packageBlockContent.title}</h2>
                <p className="package-story__description">{packageBlockContent.description}</p>
                <p className="package-story__final">{packageBlockContent.final}</p>
              </article>
            </div>

            <div
              ref={packageTimelineRef}
              className="package-story__timeline-shell"
            >
              <div className="package-story__timeline-head">
                <span>В комплекте</span>
              </div>

              <div className="package-story__timeline-rows">
                {packageTimelineItems.map((item, index) => {
                  const isLeftSide = index % 2 === 0

                  return (
                    <div
                      key={item.id}
                      ref={(node) => {
                        packageRowRefs.current[index] = node
                      }}
                      className={`package-story__row ${
                        isLeftSide ? 'package-story__row--left' : 'package-story__row--right'
                      }`}
                    >
                      {isLeftSide ? (
                        <>
                          <div className="package-story__item">
                            <p>{item.text}</p>
                          </div>

                          <span className="package-story__node" aria-hidden="true" />

                          <div className="package-story__item-spacer" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          <div className="package-story__item-spacer" aria-hidden="true" />

                          <span className="package-story__node" aria-hidden="true" />

                          <div className="package-story__item">
                            <p>{item.text}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-story__footer package-story__footer">
          <span>01 / 01</span>
          <p>{packageBlockContent.navLabel}</p>
        </div>
      </section>

      <section
        ref={specsSectionRef}
        className={`specs-story ${activeSurface === 'specs' ? 'is-active' : ''}`}
        id="specs"
        aria-label="Параметры Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="specs-story__media-layer" aria-hidden="true">
          <div className="specs-story__media-slide">
            <video
              key={`specs-${isMobileViewport ? 'mobile' : 'desktop'}`}
              ref={specsVideoRef}
              className="specs-story__video"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src={isMobileViewport ? specsMobileVideoUrl : specsDesktopVideoUrl}
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="specs-story__backdrop" />

        <div className="specs-story__viewport">
          <div className="specs-story__layout">
            <article
              ref={specsCopyRef}
              className="specs-story__copy-shell"
            >
              <div className="specs-story__eyebrow">{specsBlockContent.eyebrow}</div>
              <h2 className="specs-story__title">{specsBlockContent.title}</h2>
              <p className="specs-story__description">{specsBlockContent.description}</p>
            </article>

            <div className="specs-story__specs-shell">
              <div className="specs-story__pages-viewport">
                {specsPages.map((pageItems, pageIndex) => (
                  <div
                    key={`specs-page-${pageIndex}`}
                    ref={(node) => {
                      specsPageRefs.current[pageIndex] = node
                    }}
                    className={`specs-story__page ${specsPageIndex === pageIndex ? 'is-active' : ''}`}
                    aria-hidden={specsPageIndex === pageIndex ? 'false' : 'true'}
                  >
                    {pageItems.map((item) => (
                      <article
                        key={item.id}
                        className="specs-story__spec-card"
                      >
                        <div className="specs-story__spec-label">{item.label}</div>
                        <p className="specs-story__spec-value">{item.value}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>

              <div
                ref={specsPaginationRef}
                className="specs-story__pagination"
                aria-label="Переключение страниц характеристик"
              >
                {specsPages.map((_, pageIndex) => (
                  <button
                    key={`specs-pagination-${pageIndex}`}
                    type="button"
                    className={`specs-story__pagination-button${
                      specsPageIndex === pageIndex ? ' is-active' : ''
                    }`}
                    aria-label={`Показать страницу характеристик ${pageIndex + 1}`}
                    onClick={() => {
                      const resolvedTargetIndex =
                        specsQueuedPageIndexRef.current ?? specsPageIndexRef.current

                      if (pageIndex === resolvedTargetIndex) {
                        return
                      }

                      if (specsPageTransitionLockRef.current) {
                        specsQueuedPageIndexRef.current = pageIndex
                        return
                      }

                      setSpecsPageIndex(pageIndex)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-story__footer specs-story__footer">
          <span>01 / 01</span>
          <p>{specsBlockContent.navLabel}</p>
        </div>
      </section>

      <section
        ref={giftSectionRef}
        className={`gift-story ${activeSurface === 'gift' ? 'is-active' : ''}`}
        id="gift"
        aria-label="Подарочный блок Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="gift-story__media-layer" aria-hidden="true">
          {giftSlides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(node) => {
                giftBgRefs.current[index] = node
              }}
              className={`gift-story__bg-slide ${
                giftSlideIndex === index ? 'is-active' : ''
              } ${slide.intro ? 'gift-story__bg-slide--intro' : ''}`}
            >
              {slide.intro ? (
                <video
                  key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                  ref={(node) => {
                    giftVideoRefs.current[index] = node
                  }}
                  className="gift-story__intro-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src={isMobileViewport ? slide.videoMobile : slide.videoDesktop}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div
                  className="gift-story__bg-image"
                  style={{
                    backgroundImage: `url(${
                      isMobileViewport ? slide.backgroundMobile : slide.backgroundDesktop
                    })`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="gift-story__backdrop" />

        <div className="gift-story__viewport">
          {giftSlides.map((slide, index) => {
            const TitleTag = index === 0 ? 'h2' : 'h3'

            return (
              <article
                key={slide.id}
                ref={(node) => {
                  giftPanelRefs.current[index] = node
                }}
                className={`gift-story__panel ${
                  giftSlideIndex === index ? 'is-active' : ''
                } ${slide.intro ? 'gift-story__panel--intro' : ''}`}
                aria-hidden={giftSlideIndex === index ? 'false' : 'true'}
              >
                {slide.intro ? (
                  <div
                    ref={(node) => {
                      giftCopyRefs.current[index] = node
                    }}
                    className="gift-story__intro-copy"
                  >
                    <div className="gift-story__eyebrow">{slide.eyebrow}</div>
                    <TitleTag className="gift-story__title">{slide.title}</TitleTag>
                    <p className="gift-story__description">{slide.description}</p>
                    <p className="gift-story__detail">{slide.detail}</p>
                  </div>
                ) : (
                  <div className="gift-story__layout">
                    <div className="gift-story__card-shell">
                      <div
                        ref={(node) => {
                          giftWindowRefs.current[index] = node
                        }}
                        className="gift-story__media-window"
                      >
                        <video
                          key={`${slide.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                          ref={(node) => {
                            giftVideoRefs.current[index] = node
                          }}
                          className="gift-story__window-video"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        >
                          <source
                            src={isMobileViewport ? slide.videoMobile : slide.videoDesktop}
                            type="video/mp4"
                          />
                        </video>
                      </div>

                      <div
                        ref={(node) => {
                          giftCopyRefs.current[index] = node
                        }}
                        className="gift-story__copy-shell"
                      >
                        <div className="gift-story__eyebrow">{slide.eyebrow}</div>
                        <TitleTag className="gift-story__title">{slide.title}</TitleTag>
                        <p className="gift-story__description">{slide.description}</p>
                        <p className="gift-story__detail">{slide.detail}</p>
                        {slide.note ? <p className="gift-story__note">{slide.note}</p> : null}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="hero-story__footer gift-story__footer">
          <span>
            {String(giftSlideIndex + 1).padStart(2, '0')} /{' '}
            {String(giftSlides.length).padStart(2, '0')}
          </span>
          <p>{giftSlides[giftSlideIndex].navLabel}</p>
        </div>
      </section>

      <section
        ref={faqSectionRef}
        className={`faq-story ${activeSurface === 'faq' ? 'is-active' : ''}`}
        id="faq"
        aria-label="Частые вопросы о Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="faq-story__media-layer" aria-hidden="true">
          <div className="faq-story__media-slide">
            <video
              key={`faq-${isMobileViewport ? 'mobile' : 'desktop'}`}
              ref={faqVideoRef}
              className="faq-story__video"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src={isMobileViewport ? faqMobileVideoUrl : faqDesktopVideoUrl}
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="faq-story__backdrop" />

        <div className="faq-story__viewport">
          <div className="faq-story__layout">
            <article
              ref={faqCopyRef}
              className="faq-story__copy-shell"
            >
              <div className="faq-story__eyebrow">{faqBlockContent.eyebrow}</div>
              <h2 className="faq-story__title">{faqBlockContent.title}</h2>
              <p className="faq-story__description">{faqBlockContent.description}</p>
            </article>

            <div className="faq-story__faqs-shell">
              <div className="faq-story__pages-viewport">
                {faqPages.map((pageItems, pageIndex) => (
                  <div
                    key={`faq-page-${pageIndex}`}
                    ref={(node) => {
                      faqPageRefs.current[pageIndex] = node
                    }}
                    className={`faq-story__page ${faqPageIndex === pageIndex ? 'is-active' : ''}`}
                    aria-hidden={faqPageIndex === pageIndex ? 'false' : 'true'}
                  >
                    {pageItems.map((item) => (
                      <article
                        key={item.id}
                        className="faq-story__faq-card"
                      >
                        <div className="faq-story__faq-label">{item.question}</div>
                        <p className="faq-story__faq-value">{item.answer}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>

              <div
                ref={faqPaginationRef}
                className="faq-story__pagination"
                aria-label="Переключение страниц FAQ"
              >
                {faqPages.map((_, pageIndex) => (
                  <button
                    key={`faq-pagination-${pageIndex}`}
                    type="button"
                    className={`faq-story__pagination-button${
                      faqPageIndex === pageIndex ? ' is-active' : ''
                    }`}
                    aria-label={`Показать страницу FAQ ${pageIndex + 1}`}
                    onClick={() => {
                      const resolvedTargetIndex =
                        faqQueuedPageIndexRef.current ?? faqPageIndexRef.current

                      if (pageIndex === resolvedTargetIndex) {
                        return
                      }

                      if (faqPageTransitionLockRef.current) {
                        faqQueuedPageIndexRef.current = pageIndex
                        return
                      }

                      setFaqPageIndex(pageIndex)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-story__footer faq-story__footer">
          <span>01 / 01</span>
          <p>{faqBlockContent.navLabel}</p>
        </div>
      </section>

      <section
        ref={finalCtaSectionRef}
        className={`final-cta-story ${activeSurface === 'final-cta' ? 'is-active' : ''}`}
        id="final-cta"
        aria-label="Финальный блок с покупкой Cosmolex Super Air"
      >
        <div className="hero-story__indicator" />
        <header
          className={`hero-story__topbar ${menuOpen ? 'menu-open' : ''}`}
          aria-label="Навигация по блокам лендинга"
        >
          {renderTopbarNavigation('Навигация по блокам лендинга')}
        </header>

        <div className="final-cta-story__media-layer" aria-hidden="true">
          {finalCtaCards.map((card, index) => (
            <div
              key={`final-bg-${card.id}`}
              className={`final-cta-story__bg-slide${
                finalCtaActiveCardIndex === index ? ' is-active' : ''
              }`}
            >
              <div
                className="final-cta-story__bg-image"
                style={{
                  backgroundImage: `url(${
                    isMobileViewport ? card.backgroundMobile : card.backgroundDesktop
                  })`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="final-cta-story__backdrop" aria-hidden="true" />

        <div className="final-cta-story__viewport">
          <div className="final-cta-story__layout">
            <article
              ref={finalCtaCopyRef}
              className="final-cta-story__intro"
            >
              <div className="final-cta-story__eyebrow">{finalCtaContent.eyebrow}</div>
              <h2 className="final-cta-story__title">{finalCtaContent.title}</h2>
              <p className="final-cta-story__subtitle">{finalCtaContent.subtitle}</p>
              <p className="final-cta-story__description">{finalCtaContent.description}</p>
            </article>

            <div
              ref={finalCtaOptionsRef}
              className="final-cta-story__options"
            >
              {finalCtaCards.map((card, index) => {
                const isActive = finalCtaActiveCardIndex === index

                return (
                  <article
                    key={card.id}
                    ref={(node) => {
                      finalCtaOptionRefs.current[index] = node
                    }}
                    className={`final-cta-story__option${isActive ? ' is-active' : ''}`}
                    onClick={() => setFinalCtaActiveCardIndex(index)}
                  >
                    <div
                      ref={(node) => {
                        finalCtaPanelRefs.current[index] = node
                      }}
                      className="final-cta-story__shadow"
                    >
                      <video
                        key={`${card.id}-${isMobileViewport ? 'mobile' : 'desktop'}`}
                        ref={(node) => {
                          finalCtaVideoRefs.current[index] = node
                        }}
                        className="final-cta-story__window-video"
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        <source
                          src={isMobileViewport ? card.videoMobile : card.videoDesktop}
                          type="video/mp4"
                        />
                      </video>

                      <div className="final-cta-story__option-label">
                        <span
                          className="final-cta-story__color-dot"
                          style={{ backgroundColor: card.accent }}
                          aria-hidden="true"
                        />
                        <div className="final-cta-story__option-meta">
                          <div className="final-cta-story__option-main">{card.title}</div>
                          <div className="final-cta-story__option-sub">{card.subtitle}</div>
                        </div>
                      </div>

                      <div className="final-cta-story__panel-copy">
                        <div className="final-cta-story__panel-eyebrow">{card.eyebrow}</div>
                        <h3 className="final-cta-story__panel-title">{card.title}</h3>
                        <p className="final-cta-story__panel-description">{card.description}</p>

                        <div className="final-cta-story__panel-actions">
                          <a
                            className="final-cta-story__buy-button"
                            href={card.buyUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Купить
                          </a>

                          <button
                            type="button"
                            className="final-cta-story__gift-button"
                            onClick={(event) => {
                              event.stopPropagation()
                              openFinalCtaPopup(index)
                            }}
                          >
                            Подарок
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={`final-cta-story__popup-shell${isFinalCtaPopupOpen ? ' is-open' : ''}`}
          aria-hidden={isFinalCtaPopupOpen ? 'false' : 'true'}
        >
          <div
            className="final-cta-story__popup-backdrop"
            onClick={closeFinalCtaPopup}
          />
          <div
            ref={finalCtaPopupRef}
            className="final-cta-story__popup"
            role="dialog"
            aria-modal="true"
            aria-label="Промокод Cosmolex"
          >
            <button
              type="button"
              className="final-cta-story__popup-close"
              aria-label="Закрыть окно с промокодом"
              onClick={closeFinalCtaPopup}
            >
              ×
            </button>

            <div className="final-cta-story__popup-eyebrow">Спасибо, что дошли до конца</div>
            <h3 className="final-cta-story__popup-title">Забирайте приятный бонус на заказ</h3>

            <div className="final-cta-story__promo-row">
              <div className="final-cta-story__promo-code">
                <span className="final-cta-story__promo-code-value">{finalCtaContent.promoCode}</span>
                <button
                  type="button"
                  className="final-cta-story__promo-copy"
                  aria-label={isPromoCodeCopied ? 'Промокод скопирован' : 'Скопировать промокод'}
                  onClick={copyPromoCode}
                >
                  <span className="final-cta-story__promo-copy-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h6A2.25 2.25 0 0 1 19.5 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25h-6A2.25 2.25 0 0 1 9 18V9.75Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.75 16.5A2.25 2.25 0 0 1 4.5 14.25V6a2.25 2.25 0 0 1 2.25-2.25h6A2.25 2.25 0 0 1 15 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <p className="final-cta-story__popup-description">
              Если вам откликается Cosmolex Super Air, введите промокод при оформлении заказа и
              получите скидку 10%.
            </p>
            <p className="final-cta-story__popup-note">
              Промокод действует при оформлении заказа на сайте.
            </p>
          </div>
        </div>

        <div className="hero-story__footer final-cta-story__footer">
          <span>01 / 01</span>
          <p>{finalCtaContent.navLabel}</p>
        </div>
      </section>

      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-hint__animation">
          {showScrollHint ? (
            <Suspense fallback={null}>
              <ScrollHint />
            </Suspense>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
