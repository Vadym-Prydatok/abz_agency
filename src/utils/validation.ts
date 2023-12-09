export const validateName = (name: string) => {
  if (name.length < 2) {
    return "Name should contain at least 2 characters";
  }
  if (name.length > 60) {
    return "Name should contain no more than 60 characters";
  }
  return "";
};

export const validateEmail = (email: string) => {
  const minLength = 2;
  const maxLength = 100;
  const pattern = new RegExp(
    "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])$"
  );

  if (email.length < minLength) {
    return "Email should contain at least 2 characters";
  }
  if (email.length > maxLength) {
    return "Email should contain no more than 100 characters";
  }
  if (!pattern.test(email)) {
    return "Email should match the specified pattern";
  }
  return "";
};

export const validatePhone = (phone: string) => {
  const pattern = new RegExp("^[+]{0,1}380([0-9]{9})$");

  if (!pattern.test(phone)) {
    return "Phone number should start with the code of Ukraine +380 and followed by 9 digits";
  }
  return "";
};

export const validatePhoto = async (file: File): Promise<string> => {
  const validTypes = ["image/jpeg", "image/jpg"];
  const maxSize = 5 * 1024 * 1024;
  const minDimension = 70;

  if (!file) {
    return "Please upload your photo.";
  }

  if (!validTypes.includes(file.type)) {
    return "The photo format must be jpeg/jpg type.";
  }

  if (file.size > maxSize) {
    return "The photo size must not be greater than 5 Mb.";
  }

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function (this: HTMLImageElement) {
      if (this.width < minDimension || this.height < minDimension) {
        resolve("Minimum size of photo 70x70px.");
      }
      resolve("");
    };
    image.src = URL.createObjectURL(file);
  });
};
