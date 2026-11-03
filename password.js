function isStrongPassword(password) {
   const hasMinimumLength = password.length >= 12;
   const hasUppercase = /[A-Z]/.test(password);
   const hasLowercase = /[a-z]/.test(password);
   const hasNumber = /[0-9]/.test(password);
   const specialCharacters = "!@#$%^&*()_+{}[]|/<>?";
   const hasSpecialCharacter = password
      .split("")
      .some((character) => specialCharacters.includes(character));
   const doesNotContainPassword = !password.toLowerCase().includes("password");

   const isStrong = hasMinimumLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialCharacter &&
      doesNotContainPassword;

   if (isStrong) {
      console.log("Strong Password");
   } else {
      console.log("Weak Password");
   }

   return isStrong;
}

const password = prompt("Enter a password:") || "";
isStrongPassword(password);
