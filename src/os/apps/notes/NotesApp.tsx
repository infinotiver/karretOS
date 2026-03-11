import { useState } from "react";
import { WindowLayout } from "@/components/layouts/WindowLayout";

const NotesApp = () => {
  const [note, setNote] = useState(() => localStorage.getItem("note") ?? "");

  const save = (value: string) => {
    setNote(value);
    localStorage.setItem("note", value);
  };

  return (
    <WindowLayout footer={`${note.length} characters`}>
      <textarea
        className="w-full h-full resize-none bg-transparent text-sm outline-none placeholder-muted-foreground/50 p-6"
        placeholder="Start typing..."
        value={note}
        onChange={(e) => save(e.target.value)}
      />
    </WindowLayout>
  );
};

export default NotesApp;
