"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutApp } from "../actions/auth";
import { getMe } from "../api/auth/auth";

interface AppContextProps {
  user: any;
  setUser: (user: any) => void;
  handleLogout: () => void;
  loadingApp: boolean;
  setLoadingApp: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("video-on-demand");
    logoutApp();
    router.push("/auth");
  };

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    if (!pathname.includes("/auth") && user === null) {
      getMe()
        .then((userInfo) => {
          setUser(userInfo.data);
        })
        .catch(() => {
          router.push("/auth");
          toast.error("Thông báo lỗi!", {
            description: "Vui lòng đăng nhập để sử dụng hệ thống!",
          });
        })
        .finally(() => {
          setLoadingApp(false);
        });
    } else {
      setLoadingApp(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        loadingApp,
        setLoadingApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
