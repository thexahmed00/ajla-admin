import { time } from "console";
import { Star } from "lucide-react";

export const metaDefaults : Record<string, any> = {
  restaurants: {
    cuisine: "",
    hours: [
      {name:"",time:""}
    ],
    courses:[
      {
        name: "",
        dishes:[
          {name:"",image:"",price:""}
        ]
      }
    ]
  },

  hotels: {
    star_rating: 5,
    check_in: "",
    check_out: "",
    amenities: [
      {
        name: "",
        icon:"",
        subtitle:"",
      }
    ],
    nearby_attractions: [
      {
        name: "",
        distance: "",
        icon:"",
        category:""
      }
    ],
    rooms: [
      {
        name: "",
        price: "",
        image:"",
        description:"",
        capacity:"",
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
