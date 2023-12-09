import * as React from "react";

interface Props {
  name: string;
  selected: boolean;
}

export const RadioSelect: React.FC<Props> = ({
  name,
  selected,
}) => {
  return (
    <>
      <div className="w-5 h-5 border border-blue rounded-[50%] grid place-items-center">
        {selected && <div className="w-2 h-2 bg-blue rounded-[50%]"></div>}
      </div>
      <span>{name}</span>
    </>
  );
};
