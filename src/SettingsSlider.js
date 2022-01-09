import React from "react";
import ParamsRender from "./ParamsRender";
// import { useControlsState, useControlsActions } from "./ControlsContext";

// const initParamsList = [
//   {
//     base: 10,
//     base_side: 1,
//     bound: 0,
//     digits_mode: 1,
//     first_int_available_numbers: 1,
//     interval: 1,
//     mode: 1,
//     numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
//     over: 1,
//     second_int_available_numbers: 1,
//     section: 5,
//     sign: 0,
//     steps: 3,
//     under: 1
//   },
//   {
//     base: 10,
//     base_side: 1,
//     bound: 0,
//     digits_mode: 1,
//     first_int_available_numbers: 1,
//     interval: 1,
//     mode: 1,
//     numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
//     over: 1,
//     second_int_available_numbers: 1,
//     section: 5,
//     sign: 0,
//     steps: 3,
//     under: 1
//   }
// ];

function SettingsSlider({ params, handleChange }) {
  const [indexParams, setIndexParams] = React.useState(0);
  const [paramsList, setParamsList] = React.useState(params);

  // const { setParams } = useControlsActions();

  const handleChangeList = (index, key, value) => {
    let newParamsList = [...paramsList];
    newParamsList[index] = {
      ...newParamsList[index],
      [key]: value
    };
    setParamsList(newParamsList);
  };

  React.useEffect(() => {
    setParamsList(params);
    // const randomKey = Math.floor(Math.random() * params.length);
    // setIndexParams(randomKey);
  }, [params]);

  React.useEffect(() => {
    handleChange(indexParams, paramsList);
  }, [paramsList, indexParams]);

  console.count("SettingsSlider");
  console.log("SettingsSlider", { paramsList });

  return (
    <div>
      {paramsList.map((params, index) => {
        return (
          <ParamsRender
            key={index}
            index={index}
            handleChange={(key, value) => handleChangeList(index, key, value)}
            params={params}
          />
        );
      })}
    </div>
  );
}

export default SettingsSlider;
