import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <Image src={"/assets/logo.png"} width={58} height={50} alt="logo" />
    </div>
  );
};

export default Logo;
