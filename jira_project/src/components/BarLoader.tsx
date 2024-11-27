const BarLoader = () => {
  return (
    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative">
      <div className="h-full bg-blue-600 animate-loading-bar"></div>
    </div>
  );
};

export default BarLoader;
