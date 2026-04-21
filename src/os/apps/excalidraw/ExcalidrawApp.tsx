export default function ExcalidrawApp() {
  return (
    <div>
      <iframe
        src="https://excalidraw.com/"
        className="w-full h-screen border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-presentation"
        style={{ overflow: "auto" }}
      ></iframe>
    </div>
  );
}
