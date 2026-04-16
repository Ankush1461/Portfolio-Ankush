import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap");
    `}
  />
);
export default Fonts;
