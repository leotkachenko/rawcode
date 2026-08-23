import Image from "next/image";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// No headshots exist yet — until one is dropped in public/team/, this renders the
// person's initials rather than a stock photo of someone who isn't them.
export function Avatar({
  name,
  photo,
  size = 64,
}: {
  name: string;
  photo?: string;
  size?: number;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={size}
        height={size}
        className="flex-none rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex flex-none items-center justify-center rounded-full border border-accent bg-accent-soft font-medium text-accent"
      style={{ width: size, height: size, fontSize: size / 2.8 }}
    >
      {initials(name)}
    </span>
  );
}
