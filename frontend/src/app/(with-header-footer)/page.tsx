import ClientHome from "@/components/ClientHome";

export const metadata = {
    title: "ددلاین | سیستم فریلنسری و انجام پروژه",
    description: "در ددلاین پروژه‌های برنامه‌نویسی، طراحی و تولید محتوا را به بهترین فریلنسرها بسپارید.",
    keywords: ["ددلاین", "freelancer", "فریلنسری", "انجام پروژه", "deadline", "پروژه دانشجویی","project","فریلنسر","فریلنسری"
    ,"طراحی","برنامه نویسی","deadlinee","deadlinee.ir"],
    alternates: {
        canonical: "https://deadlinee.ir/",
    },
    openGraph: {
        title: "ددلاین | بازار فریلنسری ایران",
        description: "بهترین مکان برای برون‌سپاری پروژه‌ها به فریلنسرهای متخصص",
        url: "https://deadlinee.ir/",
        siteName: "ددلاین",
        locale: "fa_IR",
        type: "website",
    },
};

export default function Home() {
    return <ClientHome />;
}
