import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";

export const LanguageSwitcher = () => {
  const { currentLanguage, switchLanguage, availableLanguages } = useLanguageSwitcher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-glass-gradient backdrop-blur-glass border-glass-border">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code as 'pt-BR' | 'en-US')}
            className={`cursor-pointer ${
              currentLanguage === lang.code 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-primary/5'
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};