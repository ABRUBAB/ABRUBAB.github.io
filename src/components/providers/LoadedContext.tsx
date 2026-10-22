"use client";

import { createContext, useContext } from "react";

/**
 * True once the loading screen has lifted. Hero animations wait for it so they
 * play in view instead of behind the curtain. Defaults to true so pages
 * without a loader (404, redirects) never wait.
 */
export const LoadedContext = createContext(true);
export const useLoaded = () => useContext(LoadedContext);
