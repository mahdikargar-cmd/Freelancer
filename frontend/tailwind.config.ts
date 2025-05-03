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
        'color1': '#1C1C1C',
        'color2': '#FFFFFF',
        'color3': '#E4E4E7',
        'color4': '#CAFF33',
        'color5': '#262626',
        'color6': '#1A1A1A',
        'color7': '#BFBFBF',
        'color8': '#A4E600',
        'color9': '#8FD400',
        //light
        'light-color1': '#FFFFFF',      // پس‌زمینه اصلی (سفید خالص برای تم تمیز)
        'light-color2': '#1F1F1F',      // متن اصلی – مشکی نرم (نه کاملاً سیاه)
        'light-color3': '#3C3C3C',      // متن ثانویه – خاکستری تیره برای زیرتیتر و جزئیات
        'light-color4': '#10B981',      // سبز اصلی – زنده، مدرن و کاربرپسند
        'light-color5': '#F9FAFB',      // باکس‌ها و نواحی متفاوت – خاکستری خیلی روشن
        'light-color6': '#E5E7EB',      // بردرها – خاکستری روشن و واضح
        'light-color7': '#6B7280',      // متن خاکستری – خوب برای زیرنویس یا توضیحات
        'light-color8': '#22C55E',      // رنگ جایگزین سبز – حالت Hover یا CTA
        'light-color9': '#16A34A',      // رنگ سبز تیره‌تر – برای دکمه فعال یا تاکید

      },
    },
    fontFamily: {
      primaryLight: ['Light'],
      primaryRegular: ['Regular'],
      primaryMedium: ['Medium'],
      primaryDemibold: ['DemiBold'],
      primaryBold: ['Bold']
    }
  },
  plugins: [],
} satisfies Config;
