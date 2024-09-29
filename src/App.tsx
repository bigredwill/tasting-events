import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import "./App.css";
import Home from "./Home";
import { MainNav } from "./components/main-nav";

interface AppLayoutProps {
  children: React.ReactNode;
}

function App({ children }: AppLayoutProps) {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <header>
        <div className="flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
            </div>
          </div>
        </div>
      </header>
      {children}
      <Home />
    </ThemeProvider>
  );
}

export default App;
