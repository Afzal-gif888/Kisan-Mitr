import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/lib/translations';
import { SoilType } from '@/lib/types';

export type Screen = "home" | "location" | "weather" | "soil" | "recommendation" | "guidance";

interface AppContextType {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  district: string;
  setDistrict: (district: string) => void;
  soil: SoilType;
  setSoil: (soil: SoilType) => void;
  weatherResult: any;
  setWeatherResult: (result: any) => void;
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState<Language>('en');
  const [district, setDistrict] = useState('');
  const [soil, setSoil] = useState<SoilType>('Red Loamy Soil');
  const [weatherResult, setWeatherResult] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState('');

  return (
    <AppContext.Provider value={{
      screen, setScreen,
      language, setLanguage,
      district, setDistrict,
      soil, setSoil,
      weatherResult, setWeatherResult,
      selectedCrop, setSelectedCrop
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
