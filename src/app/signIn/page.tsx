const SignIn = () => {
    const info = [
        {
            title: 'اطلاعات خود را وارد کنید',
            id: 1,
            buttonText: "ورود",
            inf: [
                {
                    title: "نام کاربری",
                    placeholder: "نام کاربری خود را وارد کنید.",
                    id: 1
                },
                {
                    title: "رمز عبور",
                    placeholder: "رمز عبور خود را وارد کنید.",
                    id: 3
                }
            ]
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {info.map((items: any) => (
                <div
                    className="text-center space-y-6 bg-black p-8 rounded-md border-2 border-color4 w-full max-w-sm sm:max-w-md aspect-square flex flex-col justify-center"
                    key={items.id}
                >
                    <h1 className="text-2xl md:text-3xl font-primaryDemibold text-center text-color3 mb-6">
                        {items.title}
                    </h1>
                    <form className="space-y-4">
                        {items.inf.map((item: any) => (
                            <div key={item.id}>
                                <label className="block mb-2 text-lg font-primaryMedium text-color2">
                                    {item.title}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-color4 font-primaryMedium bg-color1 text-color3"
                                    placeholder={item.placeholder}
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full bg-color4 text-color1 py-2 text-lg rounded-md hover:bg-color5 hover:text-color4 transition font-primaryMedium"
                        >
                            {items.buttonText}
                        </button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default SignIn;
