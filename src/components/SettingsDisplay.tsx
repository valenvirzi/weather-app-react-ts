import Settings from "./Settings";

const SettingsDisplay: React.FC = () => {
  return (
    <div className="flex flex-col gap-px">
      <div className="bg-black bg-opacity-75 p-4 text-center text-4xl md:p-5 md:text-5xl">
        <h2>Settings</h2>
      </div>
      <Settings />
    </div>
  );
};

export default SettingsDisplay;
