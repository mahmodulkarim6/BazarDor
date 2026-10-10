export default function Avatar({ user, size = 36, radius = "rounded-[10px]", text = "text-sm" }) {
  const initial = (user?.name || user?.email || "U").trim()[0]?.toUpperCase();
  return user?.image ? (
    <img src={user.image} alt={user.name || "avatar"} referrerPolicy="no-referrer" style={{ width: size, height: size }} className={`${radius} shrink-0 object-cover`}/>
  ):(
  <span style={{ width: size, height: size }} className={`${radius} ${text} inline-flex shrink-0 items-center justify-center bg-primary font-bold text-primary-content`}>
  {initial}</span>
  );
}
