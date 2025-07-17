interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <img 
      src="/lovable-uploads/c5defca9-8493-4ae4-b38e-83b1afccea66.png"
      alt="NeuroInnova - Innovación en Salud Mental"
      className={className}
    />
  );
};