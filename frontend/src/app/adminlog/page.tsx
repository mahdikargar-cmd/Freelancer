
const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-light-color1 dark:bg-color1">
            <div className="w-full max-w-md bg-light-color5 dark:bg-color5 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-light-color2 dark:text-color2 mb-6 text-center">
ممد ادمین گنگ ددلاین                </h2>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-light-color2 dark:text-color2"
                        >
                            ایمیل
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="ایمیل خود را وارد کنید"
                            className="mt-1 block w-full px-3 py-2 bg-light-color1 dark:bg-color1 border border-light-color6 dark:border-color6 rounded-md shadow-sm placeholder-light-color7 dark:placeholder-color7 focus:outline-none focus:ring-light-color8 dark:focus:ring-color8 focus:border-light-color8 dark:focus:border-color8"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-light-color2 dark:text-color2"
                        >
                            رمز عبور
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="رمز عبور خود را وارد کنید"
                            className="mt-1 block w-full px-3 py-2 bg-light-color1 dark:bg-color1 border border-light-color6 dark:border-color6 rounded-md shadow-sm placeholder-light-color7 dark:placeholder-color7 focus:outline-none focus:ring-light-color8 dark:focus:ring-color8 focus:border-light-color8 dark:focus:border-color8"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-light-color5 dark:text-color5 bg-light-color4 dark:bg-color4 hover:bg-light-color8 dark:hover:bg-color8 focus:outline-none"
                        >
                            ورود
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;
