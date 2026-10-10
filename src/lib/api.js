"use client";
import { useEffect, useState } from "react";

export const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";
export const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

const cache = new Map();
const inflight = new Map();

async function request(path) {
  if (cache.has(path)) return cache.get(path);
  if (inflight.has(path)) return inflight.get(path);
  const p = (async () => {
    let lastErr;
    for (const base of [BASE_URL, BASE_URL_2]) {
      try {
        const res = await fetch(base + path);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        cache.set(path, json);
        return json;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr;
  })().finally(() => inflight.delete(path));
  inflight.set(path, p);
  return p;
}

function useApi(path) {
  const [state, setState] = useState(() => ({
    data: cache.get(path) ?? null,
    loading: !cache.has(path),
    error: null,
  }));
  useEffect(() => {
    let alive = true;
    if (cache.has(path)) {
      setState({ data: cache.get(path), loading: false, error: null });
      return;
    }
    request(path)
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }));
    return () => {
      alive = false;
    };
  }, [path]);
  return state;
}

export const useProducts = () => useApi("/products");
export const useCategories = () => useApi("/categories");
