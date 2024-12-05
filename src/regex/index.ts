const emptyFieldsRegex = /^\s*$/; // Detecta campos vazios ou só com espaços
const tagRegex = /^.{0,3}$|^[^-]+$/; // Detecta strings com menos de 4 chars ou sem hífen
const emailRegex = /@/; // Detecta se possui @ na string

export const regex = (option: string, word: string): boolean | void => {
  if (option == "void") {
    return emptyFieldsRegex.test(word);
  } else if (option == "tag") {
    return tagRegex.test(word);
  } else if (option == "email") {
    return emailRegex.test(word);
  } else {
    return;
  }
};
