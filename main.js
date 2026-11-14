const cars = [
   {
      type: "sedan",
      name: "Toyota Camry",
      description: "A comfortable midsize sedan with excellent fuel economy for everyday travel.",
      year: 2024
   },
   {
      type: "suv",
      name: "Honda CR-V",
      description: "A roomy SUV with flexible cargo space for family trips and weekend plans.",
      year: 2023
   },
   {
      type: "coupe",
      name: "Ford Mustang",
      description: "A sporty coupe with a bold design and engaging performance.",
      year: 2024
   },
   {
      type: "convertible",
      name: "Mazda MX-5 Miata",
      description: "A lightweight convertible made for scenic drives with the top down.",
      year: 2022
   },
   {
      type: "minivan",
      name: "Chrysler Pacifica",
      description: "A practical minivan with comfortable seating and space for the whole group.",
      year: 2023
   },
   {
      type: "sedan",
      name: "Honda Accord",
      description: "A refined sedan with a spacious cabin and smooth ride.",
      year: 2022
   },
   {
      type: "suv",
      name: "Subaru Outback",
      description: "A versatile SUV with generous room for passengers and outdoor gear.",
      year: 2024
   },
   {
      type: "coupe",
      name: "Chevrolet Camaro",
      description: "A sleek coupe with a powerful look and a driver-focused interior.",
      year: 2021
   },
   {
      type: "convertible",
      name: "Ford Mustang Convertible",
      description: "Enjoy open-air driving in this stylish and comfortable convertible.",
      year: 2023
   },
   {
      type: "minivan",
      name: "Toyota Sienna",
      description: "A spacious minivan designed for comfortable family travel.",
      year: 2024
   }
];

function displayCars(carArray) {
   const carList = document.querySelector(".car-list");

   if (!carList) {
      return;
   }

   carList.replaceChildren();

   carArray.forEach(function (car, index) {
      const carCard = document.createElement("article");
      carCard.className = "car-card";

      const image = document.createElement("img");
      image.src = "images/car_" + ((index % 7) + 1) + ".jpg";
      image.alt = car.name;
      image.width = 500;
      image.height = 400;
      image.loading = "lazy";

      const title = document.createElement("h3");
      title.textContent = car.year + " " + car.name;

      const description = document.createElement("p");
      description.textContent = car.description;

      carCard.append(image, title, description);
      carList.appendChild(carCard);
   });

   if (carArray.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No cars match this type.";
      carList.appendChild(emptyMessage);
   }
}

function listCars() {
   const queryString = new URLSearchParams(window.location.search);
   const selectedType = queryString.get("type");

   if (selectedType) {
      const matchingCars = cars.filter(function (car) {
         return car.type === selectedType;
      });
      displayCars(matchingCars);
   } else {
      displayCars(cars);
   }
}

function validateSearch() {
   const searchForm = document.querySelector(".rental-search-form");

   if (!searchForm) {
      return [];
   }

   const carType = searchForm.elements.type.value;
   const pickupValue = searchForm.elements.pickup.value;
   const returnValue = searchForm.elements.return.value;
   const errors = [];

   if (!carType) {
      errors.push("Please select a car type.");
   }

   if (!pickupValue) {
      errors.push("Please choose a pickup date.");
   }

   if (!returnValue) {
      errors.push("Please choose a return date.");
   }

   if (pickupValue) {
      const pickupDate = new Date(pickupValue + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (pickupDate <= today) {
         errors.push("The pickup date must be in the future.");
      }
   }

   if (pickupValue && returnValue) {
      const pickupDate = new Date(pickupValue + "T00:00:00");
      const returnDate = new Date(returnValue + "T00:00:00");

      if (returnDate <= pickupDate) {
         errors.push("The return date must be after the pickup date.");
      }
   }

   return errors;
}

const searchForm = document.querySelector(".rental-search-form");

if (searchForm) {
   const searchButton = searchForm.querySelector('button[type="submit"]');

   searchButton.addEventListener("click", function (event) {
      const errors = validateSearch();
      const oldErrorList = searchForm.querySelector(".search-errors");

      if (oldErrorList) {
         oldErrorList.remove();
      }

      if (errors.length > 0) {
         event.preventDefault();

         const errorList = document.createElement("ul");
         errorList.className = "search-errors";

         errors.forEach(function (error) {
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
         });

         searchForm.appendChild(errorList);
      }
   });
}
