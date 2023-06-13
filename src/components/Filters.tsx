import { useState } from "react";

interface IFilterProps {
  gen: number;
  active: boolean;
  filter(gen: number): boolean;
}

export default function Filters({ gen, active, filter }: IFilterProps) {
  // const OFFSET_GEN1 = 0;
  // const OFFSET_GEN2 = 151;
  // const OFFSET_GEN3 = 251;
  // const OFFSET_GEN4 = 386;
  // const OFFSET_GEN5 = 494;
  // const OFFSET_GEN6 = 649;
  // const OFFSET_GEN7 = 721;
  // const OFFSET_GEN8 = 809;
  // const OFFSET_GEN9 = 905;
  filter(2);
  const [checked, setChecked] = useState(active);

  return (
    <input
      type="checkbox"
      id={`gen${gen}`}
      className={`filter-gen${gen}`}
      onChange={() => setChecked(!checked)}
      checked={checked}
    />
  );
  // <div className="filters">

  //   {/* <input
  //     type="checkbox"
  //     id="gen2"
  //     className="filter-gen2"
  //     onChange={() => setGen2Checked(!gen2Checked)}
  //     checked={gen2Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen3"
  //     className="filter-gen3"
  //     onChange={() => setGen3Checked(!gen3Checked)}
  //     checked={gen3Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen4"
  //     className="filter-gen4"
  //     onChange={() => setGen4Checked(!gen4Checked)}
  //     checked={gen4Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen5"
  //     className="filter-gen5"
  //     onChange={() => setGen5Checked(!gen5Checked)}
  //     checked={gen5Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen6"
  //     className="filter-gen6"
  //     onChange={() => setGen6Checked(!gen6Checked)}
  //     checked={gen6Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen7"
  //     className="filter-gen7"
  //     onChange={() => setGen7Checked(!gen7Checked)}
  //     checked={gen7Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen8"
  //     className="filter-gen8"
  //     onChange={() => setGen8Checked(!gen8Checked)}
  //     checked={gen8Checked}
  //   />
  //   <input
  //     type="checkbox"
  //     id="gen9"
  //     className="filter-gen9"
  //     onChange={() => setGen9Checked(!gen9Checked)}
  //     checked={gen9Checked}
  //   /> */}
  // </div>
}
