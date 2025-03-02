import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color1':'#1C1C1C',
        'color2':'#FFFFFF',
        'color3':'#E4E4E7',
        'color4':'#CAFF33',
        'color5':'#262626'
      },
    },
    fontFamily: {
      primaryLight:['Light'],
      primaryRegular:['Regular'],
      primaryMedium:['Medium'],
      primaryDemibold:['DemiBold'],
      primaryBold:['Bold']
    }
  },
  plugins: [],
} satisfies Config;
