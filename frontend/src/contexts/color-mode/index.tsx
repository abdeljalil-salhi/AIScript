// Dependencies
import {
  FC,
  Context,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ConfigProvider, theme } from "antd";
import { RefineThemes } from "@refinedev/antd";

// Types
type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

/**
 * Color mode context
 *
 * @type {Context<ColorModeContextType>}
 */
export const ColorModeContext: Context<ColorModeContextType> =
  createContext<ColorModeContextType>({} as ColorModeContextType);

/**
 * Color mode context provider;
 * This provider sets the color mode of the app.
 *
 * @param {PropsWithChildren} { children }
 * @returns {JSX.Element} - Color mode context provider
 * @exports ColorModeContextProvider
 */
export const ColorModeContextProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState<string>(
    colorModeFromLocalStorage || systemPreference
  );

  // Set color mode to local storage
  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  // This function sets the color mode to the opposite of the current color mode
  const setColorMode = (): void => {
    if (mode === "light") setMode("dark");
    else setMode("light");
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // We can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Purple,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
