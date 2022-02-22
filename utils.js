import { colors } from "./styles/colors";

class randomColorGenerator {
  constructor() {
    this.availableColors = [...colors];
  }

  generate() {
    if (this.availableColors.length > 0) {
      return this.availableColors.pop();
    } else {
      console;
      this.availableColors = [...colors];
      return this.availableColors.pop();
    }
  }
}

export default new randomColorGenerator();
