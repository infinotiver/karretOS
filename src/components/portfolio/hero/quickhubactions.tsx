import React from "react";
import { Button } from "@/components/ui/button";
import { GithubLogoIcon } from "@phosphor-icons/react";
const QuickHubActions: React.FC = () => {
  return (
    <a
      href="https://github.com/infinotiver"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <Button>
      
        <GithubLogoIcon/>
        GitHub
      </Button>
    </a>
  );
};

export default QuickHubActions;
