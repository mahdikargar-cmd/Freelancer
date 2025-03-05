import Link from "next/link";
const SignHead = () => {
    const link = [
        {
            "title": "ثبت نام",
            "id": 1,
            "link":"/signUp"
        },
        {
            "title": "ورود",
            "id": 2,
            "link":"/login"
        }
    ];
    return (
        <div className="hidden w-full md:flex md:w-auto md:order-1 rtl:space-x-reverse gap-2">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-primaryMedium rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0">
                {
                    link.map((item: any) => (
                        <li key={item.id}>
                            <Link
                                href={item.link}
                                className={`inline-block py-2 px-4 text-sm hover:text-color4 hover:bg-color5 rounded-full ${item.id === 2 ? "bg-color4 text-color1" : "text-color2"}`}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default SignHead;