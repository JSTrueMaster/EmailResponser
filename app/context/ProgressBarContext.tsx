"use client";
import React, {
  Dispatch,
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import {
  Group,
  Code,
  LoadingOverlay,
  Box,
  Overlay,
  RingProgress,
  Text,
  Flex,
  Container,
  Center,
  Progress,
} from "@mantine/core";
import { number } from "yup";
interface IProgressContext {
  isLoading: boolean;
  showProgressBar: () => void;
  hideProgressBar: () => void;
  progressValue: number;
  setProgressValue: Dispatch<SetStateAction<number>>;
}

export const ProgressBarContext = createContext<IProgressContext>({
  isLoading: false,
  showProgressBar: () => {},
  hideProgressBar: () => {},
  progressValue: 0,
  setProgressValue: (val) => {
    val;
  },
});

export const useProgressBar = () => useContext(ProgressBarContext);

interface ProgressBarProviderProps {
  children: ReactNode; // Define the type of children prop
}
export const ProgressBarProvider = ({ children }: ProgressBarProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(-1);
  //  const [showPercent, setShowPercent] = useState(false);

  const showProgressBar = () => setIsLoading(true);
  const hideProgressBar = () => setIsLoading(false);

  // const showPercentProgress = () => setShowPercent(true);
  // const hidePercentProgress = () => setShowPercent(false);

  const obj = { isLoading, showProgressBar, hideProgressBar };
  return (
    <ProgressBarContext.Provider
      value={{
        isLoading,
        showProgressBar,
        hideProgressBar,
        progressValue,
        setProgressValue,
      }}
    >
      <Box>
        <LoadingOverlay visible={isLoading}></LoadingOverlay>
        <Overlay
          style={{ position: "fixed" }}
          display={progressValue > -1 ? "block" : "none"}
        >
          <Progress
            value={progressValue}
            size="lg"
            transitionDuration={200}
            animated
          />
        </Overlay>
        {children}
      </Box>
    </ProgressBarContext.Provider>
  );
};
