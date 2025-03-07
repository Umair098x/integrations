"use client";

import React, { useEffect, useState } from "react";
import { ObjectID } from "bson";
import { useMediaQuery } from "react-responsive";
import { showAlert } from "@/store/alert";
import { removeAllLoaders } from "@/store/loader";
import ApiFrontend from "./apiFrontend";
import { useTheme } from "./theme/page";

export function getObjectId() {
  return new ObjectID().toString();
}

export default function GlobalFunctions() {
  return <div></div>;
}

export function ViewPoint(value) {
  const response = useMediaQuery({ maxWidth: value });
  return response;
}

export const newDate = new Date().toISOString().slice(0, 10);

export function convertToTime(value) {
  const totalSeconds = parseInt(value, 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (hours > 0) {
    return `${hours} hr`;
  } else if (minutes > 0) {
    return `${minutes} m`;
  } else if (seconds > 0) {
    return `${seconds} s`;
  } else {
    return "0 s";
  }
}

export function createCancellationToken() {
  let isCancelled = false;
  function cancel() {
    isCancelled = true;
  }
  return {
    isCancelled: () => isCancelled,
    cancel: cancel,
  };
}

export const handleSelectPlan = async (
  dispatch,
  price_id,
  payment_mode,
  id
) => {
  try {
    const response = await ApiFrontend({
      method: "post",
      url: "payment/create-checkout-session",
      data: { price_id, payment_mode },
      fieldId: id,
    });
    if(response?.success?.url)
    window.location.href = response?.success?.url;
  } catch (error) {
    dispatch(removeAllLoaders());
    dispatch(showAlert("Error updating plan", "error"));
  }
};

export const useScrollWatcher = (scrollRanges, targetTheme) => {
  const [scrollState, setScrollState] = useState({
    isWithinRange: false,
    scrollPosition: 0,
  });
  const currentTheme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const withinRange = scrollRanges.some(
        ({ start, end }) => currentScrollY >= start && currentScrollY < end
      );

      if (targetTheme) {
        setScrollState({
          isWithinRange: currentTheme === targetTheme && withinRange,
          scrollPosition: currentScrollY,
        });
      } else {
        setScrollState({
          isWithinRange: withinRange,
          scrollPosition: currentScrollY,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentTheme, scrollRanges, targetTheme]);

  return scrollState;
};
