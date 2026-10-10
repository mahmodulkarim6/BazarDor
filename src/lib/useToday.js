"use client";
import { useEffect, useState } from "react";
import { banglaDate } from "./bn";

export function useToday() {
  const [d, setD] = useState("");
  useEffect(() => setD(banglaDate()), []);
  return d;
}