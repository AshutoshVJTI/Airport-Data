import React, { useState } from "react";
import { AutocompleteProps, option, AirportData } from '../../types/@types';
import "./autocomplete.css";

const Autocomplete = (props: AutocompleteProps) => {
  const [active, setActive] = useState<number>(0);
  const [options, setOptions] = useState<option[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { label, data, setValue, placeholder } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    if (input === "") {
      setOptions([]);
      setInput("")
      return;
    }
    function isPresent(searchData: string) {
      return searchData.includes(input.toLowerCase());
    }
    const result = data.filter((item: AirportData) => {
      const dataTosearch = JSON.parse(JSON.stringify(item));
      return dataTosearch.search.some(isPresent);
    });
    const option = result.map((item: AirportData) => {
      return {
        value: `${item.code}-${item.name}`,
        label: `${item.code}-${item.name}`,
      };
    });
    setOptions(option);
    setActive(0);
    setOptions(option);
    setIsShow(true);
    setInput(input);
  };
  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setValue(e.currentTarget.innerText);
    setActive(0);
    setOptions([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (options.length) {
        return (
          <ul className="autocomplete">
            {options.map((option, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={option.value} onClick={onClick}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="fields">
      <span>{label}</span>
      <div className="field">
        <input
          type="text"
          onChange={onChange}
          value={input}
          placeholder={placeholder}
        />
        {renderAutocomplete()}
      </div>
    </div>
  );
};
export default Autocomplete;
