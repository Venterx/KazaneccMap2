export const kazanPlacemarks = [
  {
    id: 1,
    title: "Казанский Кремль",
    category: "culture",
    coordinates: [55.7986, 49.1053], // Координаты Кремля
    description: "Объект Всемирного наследия ЮНЕСКО",
    rating: 4.9,
    price: "Бесплатно",
    address: "Кремль, Казань",
    image: "https://example.com/kremlin.jpg",
    tags: ["история", "архитектура", "ЮНЕСКО"],
    phone: "+7 (843) 567-80-01",
    workingHours: "8:00-22:00"
  },
  {
    id: 2,
    title: "Мечеть Кул-Шариф",
    category: "culture",
    coordinates: [55.7981, 49.1050],
    description: "Главная мечеть Татарстана",
    rating: 4.8,
    price: "Бесплатно",
    address: "тер. Кремль, Казань",
    image: "https://example.com/kul-sharif.jpg",
    tags: ["религия", "архитектура"],
    phone: "+7 (843) 567-80-02",
    workingHours: "9:00-19:00"
  },
  {
    id: 3,
    title: "Башня Сююмбике",
    category: "history",
    coordinates: [55.8012, 49.1067],
    description: "Падающая башня высотой 58 метров",
    rating: 4.7,
    price: "Бесплатно",
    address: "Кремль, Казань",
    image: "https://example.com/suyumbike.jpg",
    tags: ["памятник", "фото"],
    phone: "",
    workingHours: "Круглосуточно"
  },
  {
    id: 4,
    title: "Улица Баумана",
    category: "shopping",
    coordinates: [55.7904, 49.1224],
    description: "Пешеходная улица-музей",
    rating: 4.6,
    price: "Бесплатно",
    address: "ул. Баумана, Казань",
    image: "https://example.com/baumana.jpg",
    tags: ["шоппинг", "кафе"],
    phone: "",
    workingHours: "Круглосуточно"
  },
  {
    id: 5,
    title: "Дворец земледельцев",
    category: "architecture",
    coordinates: [55.7953, 49.1069],
    description: "Архитектурная достопримечательность",
    rating: 4.7,
    price: "Бесплатно",
    address: "ул. Федосеевская, 36",
    image: "https://example.com/palace.jpg",
    tags: ["архитектура", "фото"],
    phone: "+7 (843) 221-76-00",
    workingHours: "Круглосуточно"
  }
];

export const categories = [
  { id: "all", name: "Все", color: "#E84236" },
  { id: "culture", name: "Культура", color: "#526ED3" },
  { id: "history", name: "История", color: "#4AC99B" },
  { id: "shopping", name: "Шоппинг", color: "#FFC700" },
  { id: "architecture", name: "Архитектура", color: "#FF7043" }
];