import API from "./utils/api";

interface SocialLink {
    id: number,
    name: string,
    icon: string
}

interface socialLinks {
    socialLinks: SocialLink[]
}

const SocialLinks = async () => {
    const res = await fetch(`${API}/api/footer`, { cache: "no-store" });
    const posts: socialLinks = await res.json();

    return (
        <div className="flex space-x-4 rtl:space-x-reverse">
            {posts.socialLinks.map((social) => (
                <a
                    key={social.id}
                    href={social.icon}
                    className="text-light-color2 dark:text-color2 hover:text-light-color4 dark:hover:text-color4 transition-colors duration-300"
                    aria-label={social.name}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d={social.icon} />
                    </svg>
                </a>
            ))}
        </div>
    )
}

export default SocialLinks;