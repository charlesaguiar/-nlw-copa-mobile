export const getUsernameInitials = (username?: string): string => {
  if (!username) return "--";

  return username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);
};

export const getUserFirstName = (username?: string): string => {
  if (!username) return "--";

  return username.split(" ")[0];
};
