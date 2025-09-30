interface AvatarProps {
  user: {
    name: string;
    avatar?: string;
  };
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({
  user,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
    xl: "w-32 h-32 text-3xl",
  };

  const fallbackClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-3xl",
  };

  return (
    <div
      className={`bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-white font-medium ${
                fallbackClasses[size]
              }">${user.name.charAt(0).toUpperCase()}</span>`;
            }
          }}
        />
      ) : (
        <span className={`text-white font-medium ${fallbackClasses[size]}`}>
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
