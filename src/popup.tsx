import "~style.css";

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <a
        target="_blank"
        href="chrome-extension://npcfjbmndnhebnfdipfegbhcgmpfonjd/tabs/options.html">
        Click here to go to options
      </a>
    </div>
  );
}

export default IndexPopup;
