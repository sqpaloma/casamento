"use client";

import { useEffect, useRef } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { isAuthenticated } = useConvexAuth();
  const ensureCurrent = useMutation(api.users.ensureCurrent);
  const synced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      synced.current = false;
      return;
    }
    if (synced.current) return;
    synced.current = true;
    ensureCurrent({}).catch((err) => {
      console.error("Falha ao sincronizar usuário", err);
      synced.current = false;
    });
  }, [isAuthenticated, ensureCurrent]);

  return null;
}
