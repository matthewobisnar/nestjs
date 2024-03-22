import { SwaggerTheme } from "swagger-themes";
import { SwaggerThemeNameEnum } from "swagger-themes/build/enums/swagger-theme-name";

const theme = new SwaggerTheme();


export const swaggerThemeOptions = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};