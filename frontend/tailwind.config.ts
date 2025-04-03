import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'color1':'#1C1C1C',
        'color2':'#FFFFFF',
        'color3':'#E4E4E7',
        'color4':'#CAFF33',
        'color5':'#262626',
        'color6':'#1A1A1A',
        'color7':'#BFBFBF',
        'color8':'#A4E600',
        'color9':'#8FD400',
        //light
        'light-color1': '#FFFFFF', 
        'light-color2': '#1C1C1C',
        'light-color3': '#3A3A3A',
        'light-color4': '#4CAF50', 
        'light-color5': '#F5F5F5',
        'light-color6': '#EAEAEA', 
        'light-color7': '#666666',
        'light-color8': '#66BB6A', 
        'light-color9': '#57A64A', 
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
