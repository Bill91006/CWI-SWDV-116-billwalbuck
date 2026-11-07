function validateSearch() {
   const searchForm = document.querySelector(".rental-search-form");
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
