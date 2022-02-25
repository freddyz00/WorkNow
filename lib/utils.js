import { lightColors, darkColors } from "../styles/colors";

class randomColorGenerator {
  constructor(colors) {
    this.allColors = colors;
    this.availableColors = [...colors];
  }

  generate() {
    if (this.availableColors.length > 0) {
      return this.availableColors.pop();
    } else {
      console;
      this.availableColors = [...this.allColors];
      return this.availableColors.pop();
    }
  }
}

export const lightColorGenerator = new randomColorGenerator(lightColors);
export const darkColorGenerator = new randomColorGenerator(darkColors);
