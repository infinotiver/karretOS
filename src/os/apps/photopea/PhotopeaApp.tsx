export default function PhotopeaApp() {
  return (
    <div>
      <iframe
        src="https://www.photopea.com/"
        className="w-full h-screen border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-presentation"
        style={{ overflow: "auto" }}
      ></iframe>
    </div>
  );
}
