// ThemeProvider.js
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.mode);
  const backgroundColors = {
    light: "bg-white",
    dark: "bg-gray-900",
  };

  return (
    <div className={`${backgroundColors[theme]} text-black dark:text-white`}>
      {children}
    </div>
  );
};

export default ThemeProvider;
