export const metaDefaults : Record<string, any> = {
  restaurants: {
    cuisine: "",
    hours: {
    "mon-sun": ""
  },
    dishes: [
    { category: "", name: "" }
  ],
  },

  hotels: {
    amenities: [""],
    rooms: [
      {
        type: "",
        price: "",
      },
    ],
  },

  jets: {
    aircraft: [""],
  },

  flights: {
    open_hours: "24/7 Concierge Support",
    languages: ["English"],
    service_area: "",
    seat_types: ["Economy"],
    popular_routes: [""],
  },

  car_driver: {
    car_basic: {
      doors: "",
      seats: "",
      fuel: "",
    },
    chauffeur: {
      name: "",
      contact: "",
    },
  },
  car_renting: {
    vehicle_type: "",
    daily_rate: "",
    currency: "SAR",

    specifications: {
      doors: "",
      seats: "",
      fuel_type: "",
      transmission: "",
      engine: "",
      horsepower: "",
      acceleration: "",
      top_speed: "",
    },

    features: [""],
    services_included: [""],

    policies: {
      minimum_age: "",
      deposit_required: false,
      deposit_amount: "",
      cancellation: "",
      fuel_policy: "",
    },
  },
};
