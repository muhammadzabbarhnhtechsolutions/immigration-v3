
// import flowbite from "flowbite-react/tailwind";

// import { Flowbite } from "flowbite-react/tailwind";
// import flowbite
const config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // flowbite.content(),

  ],
  
  plugins: [
    require('flowbite/plugin')  // ✅ CORRECT plugin path
  ],
  
};
export default config;
