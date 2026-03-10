import { useState } from "react";

function useUserName() {
  const [username, setUserName] = useState("User");

  return [username, setUserName] as const;
}

export default useUserName;