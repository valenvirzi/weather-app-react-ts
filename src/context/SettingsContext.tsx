import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Type definitions

export type CurrentSettings = {
  tempUnit: string;
  speedUnit: string;
  dateFormat: string;
  language: string;
};

// Default settings
const defaultSettings: CurrentSettings = {
  tempUnit: "K",
  speedUnit: "m/s",
  dateFormat: "DD/MM",
  language: "en",
};

// Define the shape of the context
type SettingsContextType = {
  currentSettings: CurrentSettings;
  setCurrentSettings: React.Dispatch<React.SetStateAction<CurrentSettings>>;
};

// Create the context
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

// Provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentSettings, setCurrentSettings] = useState<CurrentSettings>(
    () => {
      const storedValues = localStorage.getItem("settings");
      return storedValues ? JSON.parse(storedValues) : defaultSettings;
    },
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(currentSettings));
  }, [currentSettings]);

  return (
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
