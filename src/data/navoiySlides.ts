export type SlideLayoutVariant =
  | 'hero-portrait'
  | 'editorial-split'
  | 'architectural-plate'
  | 'khamsa-explorer'
  | 'works-catalog'
  | 'legacy-verses';

export type WorkCategory = 'Barchasi' | 'Nazm' | 'Tilshunoslik' | 'Tarix va axloq';

export interface KhamsaEpic {
  id: string;
  order: string;
  title: string;
  subtitle: string;
  year: string;
  couplets: number;
  meter: string;
  synopsis: string;
  coupletOriginal: string;
  coupletMeaning: string;
}

export interface LiteraryWork {
  id: string;
  title: string;
  year: string;
  category: Exclude<WorkCategory, 'Barchasi'>;
  language: string;
  description: string;
}

export interface PoeticWisdom {
  id: string;
  source: string;
  theme: string;
  original: string;
  meaning: string;
  context: string;
}

export interface SlideHighlight {
  label: string;
  value: string;
}

export interface NavoiySlide {
  id: string;
  index: number;
  folio: string;
  era: string;
  location: string;
  navGroup: 'prologue' | 'chronicle' | 'khamsa' | 'legacy';
  shortTitle: string;
  title: string;
  subtitle: string;
  variant: SlideLayoutVariant;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  accessionCode: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  quote: {
    text: string;
    attribution: string;
  };
  highlights: SlideHighlight[];
  speakerNotes: string;
}

export const KHAMSA_EPICS: KhamsaEpic[] = [
  {
    id: 'hayrat',
    order: '01',
    title: 'Hayrat ul-Abror',
    subtitle: 'Yaxshi kishilarning hayrati',
    year: '1483',
    couplets: 3988,
    meter: 'Sari‘',
    synopsis:
      'Yigirma maqolatdan iborat falsafiy-axloqiy doston bo‘lib, unda insoniy kamolot, adolatli boshqaruv, halollik, kamtarlik va xalq dardiga hamdardlik g‘oyalari teran tahlil etiladi.',
    coupletOriginal:
      'Odam ersang demagil odami, / Onikim yo‘q xalq g‘amidin g‘ami.',
    coupletMeaning:
      'Agar xalqning g‘am-tashvishiga sherik bo‘lmasang, o‘zingni haqiqiy inson deb atama.',
  },
  {
    id: 'farhod',
    order: '02',
    title: 'Farhod va Shirin',
    subtitle: 'Fidokorona mehnat va muhabbat dostoni',
    year: '1484',
    couplets: 5782,
    meter: 'Hazaj',
    synopsis:
      'Navoiy an’anaviy qissani tubdan yangilab, Farhodni ilm-ma’rifatli, hunarmand shahzoda sifatida tasvirlaydi: u o‘z mehnati bilan tosh kesib, el-yurt manfaati uchun ariq va kanallar qaziydi.',
    coupletOriginal:
      'Hunarni asrabon netkumdur oxir, / Olib tufroqqamu ketgumdur oxir.',
    coupletMeaning:
      'Hunar va bilimni xalqqa ulashmay yashirib, oxiri qaro yerga olib ketishdan ne foyda?',
  },
  {
    id: 'layli',
    order: '03',
    title: 'Layli va Majnun',
    subtitle: 'Ilohiy va pok ishq qissasi',
    year: '1484',
    couplets: 3622,
    meter: 'Hazaj',
    synopsis:
      'Turkiy tilda yuksak badiiy nafosat bilan bitilgan ushbu doston sadoqat, ruhan poklanish va haqiqiy ishqning inson qalbini yuksaltiruvchi qudratini kuylaydi.',
    coupletOriginal:
      'Ishq o‘ti ko‘ngulda sho‘la chekti, / Jon mulkiga g‘am sipohi yetti.',
    coupletMeaning:
      'Ishq alangasi ko‘ngil uyini yoritdi; ruhiyat mulkiga esa hijron va iztirob qo‘shini kirib keldi.',
  },
  {
    id: 'sabai',
    order: '04',
    title: 'Sab‘ai Sayyor',
    subtitle: 'Yetti sayyoh hikoyati',
    year: '1484',
    couplets: 5009,
    meter: 'Khafif',
    synopsis:
      'Shoh Bahrom va yetti iqlimdan kelgan sayyohlarning yetti qasrdagi hikoyalari orqali davlat adolati, vafo, san’atning qudrati hamda hukmdor mas’uliyati ochib beriladi.',
    coupletOriginal:
      'Jahon bo‘stonida har rang bir gul, / Ko‘ngilga bir sado berur bu bulbul.',
    coupletMeaning:
      'Dunyo bo‘stonidagi har bir rang o‘zgacha gul, har bir bulbul esa ko‘ngilga o‘z ohangini olib kiradi.',
  },
  {
    id: 'saddi',
    order: '05',
    title: 'Saddi Iskandariy',
    subtitle: 'Iskandar devori va odil podshoh timsoli',
    year: '1485',
    couplets: 7215,
    meter: 'Mutaqarib',
    synopsis:
      '“Xamsa”ning yakuniy va eng yirik dostoni bo‘lib, unda Iskandar Arastu kabi donishmandlar bilan kengashib, ilm-fan, qonun ustuvorligi va tinchlikka asoslangan ideal davlat barpo etadi.',
    coupletOriginal:
      'Adolat bilan mulk obod erur, / Zulum birla olam barbod erur.',
    coupletMeaning:
      'Adolat tufayli mamlakat obod bo‘ladi, zulm va zo‘ravonlik esa butun olamni xarob etadi.',
  },
];

export const LITERARY_WORKS: LiteraryWork[] = [
  {
    id: 'khazoyin',
    title: 'Xazoyin ul-Maoniy (Ma’nolar xazinasi)',
    year: '1491–1498',
    category: 'Nazm',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Inson umrining to‘rt fasli — bolalik, yigitlik, yetuklik va keksalik davrlariga moslab tuzilgan to‘rt devon (“G‘aroyib us-sig‘ar”, “Navodir ush-shabob”, “Badoye’ ul-vasat”, “Favoyid ul-kibar”), jami 45 ming misradan ortiq.',
  },
  {
    id: 'muhokamat',
    title: 'Muhokamat ul-Lug‘atayn (Ikki til muhokamasi)',
    year: '1499',
    category: 'Tilshunoslik',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Turkiy va fors tillarining lug‘at boyligi, fe’l nozikliklari va badiiy imkoniyatlarini qiyosiy tahlil qilib, o‘zbek adabiy tilining betakror qudratini ilmiy isbotlagan shoh asar.',
  },
  {
    id: 'lison',
    title: 'Lison ut-Tayr (Qushlar tili)',
    year: '1499',
    category: 'Nazm',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Farididdin Attorning “Mantiq ut-tayr” asariga javoban Foniy taxallusi bilan bitilgan falsafiy-irfoniy doston; Simurg‘ni izlash orqali insonning o‘z-o‘zini anglash yo‘lini yoritadi.',
  },
  {
    id: 'majolis',
    title: 'Majolis un-Nafois (Nafis majlislar)',
    year: '1491',
    category: 'Tarix va axloq',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Turkiy tildagi ilk tazkira bo‘lib, Xuroson va Movarounnahrda yashab ijod etgan 459 nafar shoir hamda adibning hayoti va ijodiy merosi haqida qimmatli ma’lumotlar beradi.',
  },
  {
    id: 'mezon',
    title: 'Mezon ul-Avzon (Vaznlar o‘lchovi)',
    year: '1492',
    category: 'Tilshunoslik',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Aruz vazni qonuniyatlari hamda xalq og‘zaki ijodidagi tuyuq, qo‘shiq, chiston kabi turkiy she’riy janrlarning nazariy asoslarini tizimlashtirgan ilmiy risola.',
  },
  {
    id: 'mahbub',
    title: 'Mahbub ul-Qulub (Qalblar mahbubi)',
    year: '1500',
    category: 'Tarix va axloq',
    language: 'Chig‘atoy turkiy tili',
    description:
      'Mutafakkir umrining so‘nggi yilida yozilgan nasriy vasiyatnoma bo‘lib, jamiyatning barcha tabaqalari, axloqiy mezonlar, saxiylik va adolat haqidagi hayotiy xulosalarni jamlaydi.',
  },
];

export const POETIC_WISDOM: PoeticWisdom[] = [
  {
    id: 'humanity',
    source: 'Hayrat ul-Abror (1483)',
    theme: 'Insonparvarlik',
    original:
      'Odam ersang demagil odami, / Onikim yo‘q xalq g‘amidin g‘ami.',
    meaning:
      'Xalq dardiga qayg‘urmaydigan, el tashvishiga befarq kimsani chinakam inson deb atama.',
    context:
      'Navoiy insoniy qadr-qimmatni nasl-nasab yoki boylik bilan emas, balki jamiyat oldidagi hamdardlik va mas’uliyat bilan o‘lchagan.',
  },
  {
    id: 'speech',
    source: 'Nazm ul-Javohir (1485)',
    theme: 'So‘z qudrati',
    original:
      'So‘z guharidurki, bahridur ko‘ngul, / Ham bu guhardin erur azim yo‘l.',
    meaning:
      'So‘z shunday gavharki, uning dengizi inson ko‘nglidir; buyuk ma’naviy yo‘l ham ana shu gavhar orqali ochiladi.',
    context:
      'Navoiy jonli turkiy tilni saroy va ilm-fan darajasiga ko‘tarib, o‘zbek adabiy tilining poydevorini mustahkamladi.',
  },
  {
    id: 'generosity',
    source: 'Mahbub ul-Qulub (1500)',
    theme: 'Saxovat va muruvvat',
    original:
      'Saxovat — insoniyat bog‘ining mevasi, muruvvat — ul daraxtning soyasi.',
    meaning:
      'Saxovat — insoniylik bog‘ining eng shirin mevasi, muruvvat esa o‘sha daraxtning hammaga orom beruvchi soyasidir.',
    context:
      'O‘zining butun umri davomida shifoxonalar, madrasalar, ko‘priklar va rabotlar qurdirgan mutafakkirning hayotiy shiori.',
  },
];

export const NAVOIY_SLIDES: NavoiySlide[] = [
  {
    id: 'prologue',
    index: 0,
    folio: 'Lavha 01',
    era: '1441–1501',
    location: 'Hirot · Samarqand · Xuroson',
    navGroup: 'prologue',
    shortTitle: 'Muqaddima',
    title: 'Nizomiddin Mir Alisher Navoiy',
    subtitle: 'Buyuk shoir, davlat arbobi, tilshunos va Temuriylar Renessansi me’mori',
    variant: 'hero-portrait',
    imageSrc: '/src/assets/images/navoiy_hero_portrait_1794997067232.jpg',
    imageAlt:
      'Hirot kutubxonasida ko‘k chakmon va oq salla kiyib, qo‘lida qo‘lyozma tutgan Alisher Navoiyning muzey portreti.',
    imageCaption:
      '1-rasm — Nizomiddin Mir Alisher Navoiyning Hirotdagi ijodxonasida tasvirlangan portreti.',
    accessionCode: 'EXH. 1441.02.09',
    leadParagraph:
      '1441-yil 9-fevralda Hirotda tavallud topgan Alisher Navoiy Markaziy Osiyo sivilizatsiyasi tarixida o‘chmas iz qoldirdi. Oltmish yillik hayoti davomida u chig‘atoy turkiy tilini yuksak adabiy til darajasiga olib chiqdi, bosh vazir sifatida adolatli boshqaruv yuritdi va uch yuzdan ziyod obod inshootlar barpo ettirdi.',
    bodyParagraphs: [
      'Turkiy she’riyatida Navoiy (“navo — ohangdor”) hamda forsiy nazmida Foniy (“o‘tkinchi, kamtarin”) taxalluslari bilan ijod qilib, Xuroson va Movarounnahr ilm-fan muhitini yagona ma’naviy ko‘prik bilan bog‘ladi.',
    ],
    quote: {
      text: 'Odam ersang demagil odami, onikim yo‘q xalq g‘amidin g‘ami.',
      attribution: 'Hayrat ul-Abror, 1483',
    },
    highlights: [
      { label: 'Hayot yillari', value: '1441–1501' },
      { label: 'Tug‘ilgan joyi', value: 'Hirot, Xuroson' },
      { label: 'Asarlari', value: '30+ yirik asar' },
      { label: 'Bunyodkorlik', value: '370+ inshoot' },
    ],
    speakerNotes:
      'Kirish lavhasi: Alisher Navoiyni nafaqat buyuk shoir, balki XV asr Temuriylar Renessansining yetakchi qomusiy allomasi sifatida tanishtiring. Uning hayotidagi ikki asosiy ustun — turkiy adabiy tilni yuksaltirish va el-yurt farovonligi yo‘lidagi amaliy bunyodkorlik ekanini ta’kidlang.',
  },
  {
    id: 'childhood',
    index: 1,
    folio: 'Lavha 02',
    era: '1441–1464',
    location: 'Hirot · Yazd · Mashhad',
    navGroup: 'chronicle',
    shortTitle: 'Bolalik',
    title: 'Hirot va Mashhaddagi bolalik hamda tahsil yillari',
    subtitle: 'Temuriy allomalar, xattotlar va shoirlar muhitida kamol topgan iste’dod',
    variant: 'editorial-split',
    imageSrc: '/src/assets/images/herat_timurid_courtyard_1794997067035.jpg',
    imageAlt:
      'Hirotdagi XV asr Temuriylar madrasasi hovlisi: lojuvard koshinli peshtoqlar, sarv daraxtlari va hovuz.',
    imageCaption:
      '2-rasm — XV asr Hirotidagi Temuriylar madrasasi hovlisining tarixiy tasviri.',
    accessionCode: 'FOL. 1447.HR',
    leadParagraph:
      'Alisher Temuriylar saroyiga yaqin ma’rifatli oilada dunyoga keldi. Otasi G‘iyosiddin Kichkina Hirotning nufuzli amaldorlaridan bo‘lib, xonadonida she’riyat, musiqa va xattotlik kechalari muntazam o‘tkazilar edi.',
    bodyParagraphs: [
      '1447-yilda siyosiy notinchlik sabab oila Iroqi Ajamga ko‘chayotganida, olti yoshli Alisher Taft shahrida mashhur tarixchi Sharafiddin Ali Yazdiy bilan uchrashib, ulug‘ allomaning duosini oladi.',
      'Hirotga qaytgach, bo‘lajak sulton Husayn Boyqaro bilan birga tahsil ko‘radi. O‘n yoshidayoq Farididdin Attorning “Mantiq ut-tayr” dostonini yod oladi, o‘n besh yoshida esa Lutfiy va Kamol Turbatiy kabi ustozlar e’tirofiga sazovor g‘azallar bita boshlaydi.',
    ],
    quote: {
      text: 'Bolalikdan ko‘nglimda o‘sha qushlar tili dostonining cho‘g‘i yonar edi, nihoyat keksayganimda unga o‘z tilimda javob bitdim.',
      attribution: 'Lison ut-Tayr, 1499',
    },
    highlights: [
      { label: 'Tavalludi', value: '1441-yil 9-fevral' },
      { label: 'Otasi', value: 'G‘iyosiddin Kichkina' },
      { label: 'Tahsil shaharlari', value: 'Hirot va Mashhad' },
      { label: 'Ilk g‘azallari', value: '10–15 yoshda' },
    ],
    speakerNotes:
      'Husayn Boyqaro bilan bolalikdagi do‘stlikka alohida urg‘u bering — maktab yillaridagi bu do‘stlik keyinchalik Xurosonni gullab-yashnatgan sulton va bosh vazir hamkorligiga aylandi.',
  },
  {
    id: 'samarkand',
    index: 2,
    folio: 'Lavha 03',
    era: '1464–1469',
    location: 'Samarqand, Movarounnahr',
    navGroup: 'chronicle',
    shortTitle: 'Samarqand',
    title: 'Samarqand davri: Ilmiy kamolot va ijodiy yuksalish',
    subtitle: 'Mirzo Ulug‘bek ilm maktabi muhitida o‘tgan besh hal qiluvchi yil',
    variant: 'editorial-split',
    imageSrc: '/src/assets/images/samarkand_registan_scholars_1794997068541.jpg',
    imageAlt:
      'Samarqand madrasasi hujrasida panjaralar ortidan tushgan quyosh nurida qo‘lyozma va usturlob bilan mutolaa qilayotgan alloma.',
    imageCaption:
      '3-rasm — Falsafa, falakiyot va adabiyot bahslari o‘tgan Samarqand madrasasi mutolaaxonasi.',
    accessionCode: 'FOL. 1465.SM',
    leadParagraph:
      'Sulton Abu Said Mirzo hukmronligi davrida Hirotdan chetlashtirilgan Navoiy taxminan 1464-yilda Samarqandga keladi. Mashhur faqih va olim Fazlulloh Abulaysiy madrasasida kamtarona yashab, fiqh, falsafa, falakiyot, tarix hamda she’riyat ilmlarini chuqur o‘rganadi.',
    bodyParagraphs: [
      'Mirzo Ulug‘bekning ilmiy merosi barq urib turgan Samarqandda Navoiy turkiy til ham eng yuksak falsafiy va badiiy g‘oyalarni ifodalashga qodir ekaniga qat’iy ishonch hosil qiladi.',
      'Samarqand hokimi Ahmad Hojibek qo‘llab-quvvatlashi ostida uning g‘azallari butun Movarounnahrga tarqalib, Navoiy nomini mashhur shoir sifatida tanitadi.',
    ],
    quote: {
      text: 'Samarqand aqlim oynasiga sayqal berdi; u yerda har bir ilm eshigi tadqiqot uchun keng ochildi.',
      attribution: 'Samarqand tahsili xotiralaridan',
    },
    highlights: [
      { label: 'Muddat', value: '1464–1469' },
      { label: 'Ustozi', value: 'Fazlulloh Abulaysiy' },
      { label: 'Ilmlar', value: 'Fiqh, falakiyot, nazm' },
      { label: 'Taxalluslari', value: 'Navoiy va Foniy' },
    ],
    speakerNotes:
      'Samarqand davri tushkunlik emas, aksincha Navoiyning oliy akademiyasi bo‘lganini tushuntiring. Navoiy (“ohangdor”) va Foniy (“kamtarin”) taxalluslarining ma’nosini ham shu yerda izohlang.',
  },
  {
    id: 'statesman',
    index: 3,
    folio: 'Lavha 04',
    era: '1469–1488',
    location: 'Hirot · Astrobod',
    navGroup: 'chronicle',
    shortTitle: 'Davlat arbobi',
    title: 'Hirotning bosh vaziri va odil davlat arbobi',
    subtitle: 'Xurosonni adolat, diplomatiya va soliq islohoti bilan boshqarish',
    variant: 'editorial-split',
    imageSrc: '/src/assets/images/herat_timurid_courtyard_1794997067035.jpg',
    imageAlt:
      'Husayn Boyqaro davridagi Hirot saroy majmuasi va hovuz bo‘yida suhbatlashayotgan olimlar.',
    imageCaption:
      '4-rasm — Sulton Husayn Boyqaro saltanati davridagi Hirot ma’muriy markazi.',
    accessionCode: 'FOL. 1472.GV',
    leadParagraph:
      '1469-yilda bolalik do‘sti Husayn Boyqaro Hirot taxtiga o‘tirgach, Navoiy darhol poytaxtga qaytadi. Dastlab Muhrdor (1469), 1472-yilda esa Amir — Bosh vazir lavozimiga tayinlanib, “Nizomiddin” (“Din nizomi”) sharafli unvoniga sazovor bo‘ladi.',
    bodyParagraphs: [
      'Navoiy davlat mansabidan shaxsiy boylik uchun emas, balki nohaq soliqlarni bekor qilish, dehqon va hunarmandlarni himoya etish hamda ichki nizolarni tinch yo‘l bilan bartaraf qilishda foydalanadi.',
      '1487–1488-yillarda saroy hasadgo‘ylari tufayli Astrobod hokimi etib yuborilganda ham u o‘sha o‘lkani adolat bilan idora qiladi va ko‘p o‘tmay Hirotga qaytib, umrini ijod hamda xayriya ishlariga bag‘ishlaydi.',
    ],
    quote: {
      text: 'Hukmdorning haqiqiy xazinasi oltin yoki baland qal’a devorlari emas, balki oddiy fuqarolarning roziligidir.',
      attribution: 'Saddi Iskandariydagi davlatchilik hikmati',
    },
    highlights: [
      { label: 'Muhrdor', value: '1469-yil' },
      { label: 'Bosh vazir', value: '1472-yil' },
      { label: 'Astrobod', value: '1487–1488' },
      { label: 'Unvoni', value: 'Nizomiddin' },
    ],
    speakerNotes:
      'Tarixchi Xondamir guvohlik berishicha, Navoiy davlat xazinasidan o‘zi uchun maosh olmagan, aksincha shaxsiy yer-mulklaridan keladigan daromadni vaqf va xalq obodonchiligiga sarflagan.',
  },
  {
    id: 'patronage',
    index: 4,
    folio: 'Lavha 05',
    era: '1470–1498',
    location: 'Injil anhori bo‘yi, Hirot',
    navGroup: 'chronicle',
    shortTitle: 'Me’morchilik',
    title: 'Me’morchilik, ilm-fan va san’at homiysi',
    subtitle: 'Ixlosiya, Shifoiya majmualari va Temuriylar madaniy cho‘qqisi',
    variant: 'architectural-plate',
    imageSrc: '/src/assets/images/silk_road_architecture_legacy_1794997069312.jpg',
    imageAlt:
      'Oqshom chog‘ida daryo ustidagi tosh ko‘prik va chiroqlar bilan yoritilgan gumbazli kutubxona-madrasa majmuasi.',
    imageCaption:
      '5-rasm — Anhor bo‘yida barpo etilgan ko‘prik, madrasa va shifoxona majmuasi ko‘rinishi.',
    accessionCode: 'ARC. 1476.IX',
    leadParagraph:
      'Navoiy Hirotdagi Injil anhori bo‘yini ochiq osmon ostidagi ilm va ma’rifat shaharchasiga aylantirdi. Uning shaxsiy mablag‘i hisobidan Buyuk Ipak yo‘li bo‘ylab madrasalar, shifoxonalar, hammomlar, ko‘priklar, sardobalar va karvonsaroylar qurildi.',
    bodyParagraphs: [
      'Bu majmuaning markazida Ixlosiya madrasasi, bepul davolash va tibbiyot ta’limi yo‘lga qo‘yilgan Shifoiya shifoxonasi, Xalosiya xonaqohi hamda Unsiya kutubxona-turargohi joylashgan edi.',
      'Uning davrasida zamonaning eng yorqin siymolari — musavvir Kamoliddin Behzod, mutafakkir Abdurahmon Jomiy, tarixchilar Mirxond va Xondamir, xattot Sulton Ali Mashhadiy hamda sozanda Qulmuhammad ijod qilgan.',
    ],
    quote: {
      text: 'Sandiqda qulflangan boylik tuproqqa aylanadi; ko‘prik, maktab va shifo uyiga aylangan mol esa asrlar osha yashaydi.',
      attribution: 'Vaqfiya asari, 1481',
    },
    highlights: [
      { label: 'Madrasalar', value: '52 ta qurilgan' },
      { label: 'Rabot va karvonsaroy', value: '90+ ta’mirlangan' },
      { label: 'Ko‘prik va anhor', value: '16 ta ko‘prik' },
      { label: 'Buyuk zamondoshlar', value: 'Jomiy va Behzod' },
    ],
    speakerNotes:
      '1481-yilda yozilgan “Vaqfiya” hujjatiga to‘xtalib o‘ting: unda Navoiy mulklaridan tushgan mablag‘ hisobiga mudarrislar, tabiblar, talabalar va muhtojlarga qanday doimiy nafaqa ajratilgani aniq belgilab berilgan.',
  },
  {
    id: 'khamsa',
    index: 5,
    folio: 'Lavha 06',
    era: '1483–1485',
    location: 'Hirot kitobxonasi',
    navGroup: 'khamsa',
    shortTitle: 'Xamsa',
    title: 'Xamsa: Turkiy tildagi besh muhtasham doston',
    subtitle: 'Ikki yil ichida bitilgan 51 mingdan ziyod misra — turkiy tilning tengsiz tantanasi',
    variant: 'khamsa-explorer',
    imageSrc: '/src/assets/images/khamsa_illuminated_manuscript_1794997068023.jpg',
    imageAlt:
      'Oltin va lojuvard naqshlar bilan bezatilgan XV asr Xamsa qo‘lyozmasining ochilgan sahifalari.',
    imageCaption:
      '6-rasm — XV asr Hirot saroy kitobxonasi uslubida bezatilgan qo‘lyozma nusxasi.',
    accessionCode: 'MS. 1485.KH',
    leadParagraph:
      'Nizomiy Ganjaviy va Xusrav Dehlaviydan so‘ng uch asr davomida “Xamsa” (besh doston majmuasi) yaratish shoirlik mahoratining oliy mezoni sanalar va faqat fors tilida bitilar edi. 1483–1485-yillarda Navoiy ilk bor chig‘atoy turkiy tilida mukammal “Xamsa”ni yaratdi.',
    bodyParagraphs: [
      'Quyidagi bo‘limlardan birini tanlab, har bir dostonning tuzilishi, yili, hajmi hamda mashhur bayti bilan tanishing.',
    ],
    quote: {
      text: 'Forsiy ustozlar kumush ip bilan to‘qigan naqshni men turkiy tilning sof oltinida quyib yaratdim.',
      attribution: 'Xamsa muqaddimasidan, 1485',
    },
    highlights: [
      { label: 'Yaratilgan yili', value: '1483–1485' },
      { label: 'Dostonlar soni', value: '5 ta doston' },
      { label: 'Umumiy hajmi', value: '25 616 bayt' },
      { label: 'Tili', value: 'Chig‘atoy turkiy' },
    ],
    speakerNotes:
      'Interaktiv lavha: Besh dostonning har birini bosib ko‘rsating. Navoiy bunday ulkan majmuani atigi ikki yilda (1483–1485) davlat va jamoat ishlari bilan birga yozganini ta’kidlang.',
  },
  {
    id: 'linguistics',
    index: 6,
    folio: 'Lavha 07',
    era: '1490–1499',
    location: 'Hirot adabiy maktabi',
    navGroup: 'legacy',
    shortTitle: 'Asarlari',
    title: 'Turkiy Renessans va Muhokamat ul-Lug‘atayn',
    subtitle: 'To‘rt devon majmuasi hamda ona tilining ilmiy himoyasi',
    variant: 'works-catalog',
    imageSrc: '/src/assets/images/samarkand_registan_scholars_1794997068541.jpg',
    imageAlt:
      'Samarqand madrasasida qo‘lyozmalar ustida ishlayotgan alloma tasviri.',
    imageCaption:
      '7-rasm — Navoiyning umri oxiridagi lirik, tarixiy va tilshunoslik asarlari tadqiqi.',
    accessionCode: 'CAT. 1499.ML',
    leadParagraph:
      'Umrining so‘nggi o‘n yilligida Navoiy butun hayoti davomida yaratgan g‘azal va she’rlarini inson umrining to‘rt bosqichiga ko‘ra “Xazoyin ul-Maoniy” (“Ma’nolar xazinasi”) nomli to‘rt devonga jamladi.',
    bodyParagraphs: [
      '1499-yilda yozilgan “Muhokamat ul-Lug‘atayn” asarida esa turkiy tilning nozik ma’no qatlamlari, harakat va his-tuyg‘ularni ifodalashdagi beqiyos boyligini yuzlab misollar orqali isbotlab berdi.',
    ],
    quote: {
      text: 'Har ikki til haqiqatning ulug‘ xazinasi bo‘lsa-da, turkiy til boshqa hech bir tilda uchramaydigan nozik ma’no qirralariga egadir.',
      attribution: 'Muhokamat ul-Lug‘atayn, 1499',
    },
    highlights: [
      { label: 'Lirik meros', value: '45 000+ misra' },
      { label: 'Shoirlar zikri', value: '459 nafar' },
      { label: 'Tilshunoslik toji', value: '1499-yil risola' },
      { label: 'Janrlar ko‘lami', value: 'Nazm, nasr, nazariya' },
    ],
    speakerNotes:
      'O‘ng tarafdagi turkumlar filtri (Barchasi, Nazm, Tilshunoslik, Tarix va axloq) orqali Navoiy ijodining ko‘p qirraliligini namoyish eting.',
  },
  {
    id: 'legacy',
    index: 7,
    folio: 'Lavha 08',
    era: '1500–Bugun',
    location: 'Hirot · Toshkent · Jahon',
    navGroup: 'legacy',
    shortTitle: 'Meros',
    title: 'So‘nggi vasiyat va boqiy meros',
    subtitle: '“Mahbub ul-Qulub”dan (1500) besh asrlik ma’naviy barhayotlikkacha',
    variant: 'legacy-verses',
    imageSrc: '/src/assets/images/silk_road_architecture_legacy_1794997069312.jpg',
    imageAlt:
      'Oqshom suvlarida aks etayotgan ko‘hna Xuroson gumbazlari va tosh arklari.',
    imageCaption:
      '8-rasm — Hirotdagi abadiy oromgoh va Navoiy merosining umumbashariy shukuhi.',
    accessionCode: 'LEG. 1501.01.03',
    leadParagraph:
      '1500-yilda Navoiy o‘zining chuqur hayotiy kuzatishlariga boy “Mahbub ul-Qulub” asarini yakunladi. 1501-yil 3-yanvarda qariyb oltmish yoshida Hirotda vafot etdi — uning vafoti butun Xuroson ahli, sulton Husayn Boyqarodan tortib oddiy hunarmandlargacha chuqur qayg‘uga soldi.',
    bodyParagraphs: [
      'Oradan besh asrdan ko‘proq vaqt o‘tgan bo‘lsa-da, Alisher Navoiy o‘zbek adabiyotining asoschisi va jahon gumanizmining yorqin siymosi sifatida yashamoqda. Uning nodir qo‘lyozmalari Toshkent, Istanbul, Parij, London va Sankt-Peterburg xazinalarida saqlanadi; haykallari esa Toshkent, Samarqand, Hirot, Boku, Moskva va Tokioda qad rostlagan.',
    ],
    quote: {
      text: 'O‘zingdan keyin ezgu nom qolishini istasang, tiriklarning qalbiga mehr urug‘ini ek.',
      attribution: 'Mahbub ul-Qulub, 1500',
    },
    highlights: [
      { label: 'Vafot sanasi', value: '1501-yil 3-yanvar' },
      { label: 'Dafn etilgan joy', value: 'Hirot, Afg‘oniston' },
      { label: 'Maqomi', value: 'O‘zbek adabiyoti asoschisi' },
      { label: 'Jahon xazinalari', value: '20+ mamlakatda' },
    ],
    speakerNotes:
      'Yakuniy lavha: O‘ng tomondagi uchta boqiy hikmatni navbatma-navbat ochib o‘qing. Navoiyning til va insonparvarlik borasidagi g‘oyalari bugungi kunda ham dolzarb ekani bilan taqdimotni yakunlang.',
  },
];
