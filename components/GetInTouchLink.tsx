"use client";

type Props = Omit<React.ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  location: string;
};

export function GetInTouchLink({
  location,
  children = "Get in touch",
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href="mailto:hello@studiomanfred.com"
      onClick={() => {
        window.manfred?.("Get in touch", {
          props: { location, page: window.location.pathname },
        });
      }}
    >
      {children}
    </a>
  );
}
