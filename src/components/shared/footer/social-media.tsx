import Icon from "../Icon";

function SocialMedia() {
  const links = [
    {
      href: "",
      iconName: "youtube" as const,
    },
    {
      href: "https://www.linkedin.com/in/sayan-edtech/",
      iconName: "linkedin" as const,
    },
    {
      href: "https://www.instagram.com/sayan_edtech/#",
      iconName: "instagram" as const,
    },
    {
      href: "https://x.com/sayan_edtech",
      iconName: "twitter" as const,
    },
    {
      href: "",
      iconName: "facebook" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-foreground font-medium text-lg md:text-xl">
        تابعنا على وسائل التواصل
      </h3>
      <ul className="flex items-center flex-wrap gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              target="_blank"
              className="bg-[#1E02AA] hover:bg-[#009AFF] duration-200 transition-colors rounded-[8px] w-10  h-10 element-center"
            >
              <Icon
                name={link.iconName}
                size="20"
                className="w-5 h-5 text-white"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialMedia;
