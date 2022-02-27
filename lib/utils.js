import { lightColors, darkColors } from "../styles/colors";

class randomColorGenerator {
  constructor(colors) {
    this.allColors = colors;
    this.availableColors = [...colors];
  }

  generate() {
    if (this.availableColors.length > 0) {
      const index = Math.floor(Math.random() * this.availableColors.length);
      return this.availableColors.splice(index, 1)[0];
    } else {
      this.availableColors = [...this.allColors];
      return this.availableColors.splice(index, 1)[0];
    }
  }
}

export const lightColorGenerator = new randomColorGenerator(lightColors);
export const darkColorGenerator = new randomColorGenerator(darkColors);
