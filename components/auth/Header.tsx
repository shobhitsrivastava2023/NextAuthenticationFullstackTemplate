interface HeaderProps {
    label: string;
  }
const Header = ({ label }: HeaderProps) => {
    return (
      <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className=" text-4xl font-bold tracking-wide ">Artestic</h1>
        <p className="text-black font-semibold">{label}</p>
      </div>
    );
  };
  
  
export default Header;