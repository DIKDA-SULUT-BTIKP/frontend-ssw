const Footer = () => {
  return (
    <header className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <p className="text-sm text-right">
          Copyright 2022 - {new Date().getFullYear()} Dinas Pendidikan Daerah
          Provinsi Sulawesi Utara
        </p>
      </div>
    </header>
  );
};

export default Footer;
