import Link from "next/link";

export default function UpgradeSubscriptionPanel() {
    const tiers = [
        {
            name: "نقره ای",
            price: "150000",
            features: [
                "امکان اضافه کردن 2 نفر به پنل چت",
                "پشتیبانی 24 ساعته",
                "ابزارهای پایه",
            ],
            cta: "شروع کنید",
            featured: false,
        },
        {
            name: "حرفه‌ای",
            price: "290000",
            features: [
                "امکان اضافه کردن تا 5 عضو به پروژه",
                "پشتیبانی VIP",
                "ابزارهای پیشرفته",
                "سین خوردن آنلاین کاربران ",
            ],
            cta: "ارتقا دهید",
            featured: true,
        },
    ];

    return (
        <div className="dark:bg-color1 bg-light-color1 py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-16 text-center">
                    <h2 className="font-primaryDemibold dark:text-color2 text-light-color2 text-3xl">
                        پلن‌های اشتراک
                    </h2>
                    <p className="mt-4 font-primaryRegular dark:text-color7 text-light-color7 max-w-2xl mx-auto">
                        پلن مناسب کسب و کار خود را انتخاب کنید و به جمع هزاران فریلنسر حرفه‌ای بپیوندید
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`dark:bg-color5 bg-light-color5 rounded-xl p-8 shadow-lg ${
                                tier.featured
                                    ? "border-2 border-color4 dark:border-color4"
                                    : "border dark:border-color6 border-light-color6"
                            }`}
                        >
                            <div className="mb-8">
                                <h3 className="font-primaryMedium dark:text-color2 text-light-color2 text-2xl">
                                    {tier.name}
                                </h3>
                                <div className="mt-4">
                  <span className="font-primaryBold dark:text-color4 text-light-color4 text-4xl">
                    {tier.price}
                  </span>
                                    {tier.price !== "رایگان" && tier.price !== "خاص" && (
                                        <span className="font-primaryRegular dark:text-color7 text-light-color7">
                      /ماهانه
                    </span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {tier.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center font-primaryRegular dark:text-color7 text-light-color7"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2 text-color4 dark:text-color4 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Link
                                    href="#"
                                    className={`w-full block text-center py-3 px-6 rounded-lg font-primaryMedium transition-colors ${
                                        tier.featured
                                            ? "bg-color4 dark:bg-color4 hover:bg-color8 text-color1"
                                            : "dark:bg-color6 bg-light-color6 hover:bg-opacity-80 dark:text-color2 text-light-color2"
                                    }`}
                                >
                                    {tier.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="font-primaryRegular dark:text-color7 text-light-color7 text-sm">
                        امکان لغو اشتراک در هر زمان وجود دارد. برای پلن سازمانی با ما{" "}
                        <a
                            href="#"
                            className="text-color4 dark:text-color4 hover:underline font-primaryMedium"
                        >
                            تماس بگیرید
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}