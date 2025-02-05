import "~style.css";

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-28 plasmo-w-56 plasmo-flex-col plasmo-bg-slate-100">
      <h1 className="plasmo-text-lg plasmo-mb-3">Jack's Website Blocker</h1>
      <a
        className="plasmo-bg-blue-600 plasmo-p-3 plasmo-text-white plasmo-rounded-md"
        target="_blank"
        href="chrome-extension://npcfjbmndnhebnfdipfegbhcgmpfonjd/tabs/options.html">
        Click here to go to options
      </a>
    </div>
  );
}

export default IndexPopup;
