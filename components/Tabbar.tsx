import React, { ComponentType } from "react";

type TabbarPropTypes = {
  items: Array<{
    /**
     * label on the tabbar must be
     * a character maximum length ~2
     */
    label: string;
  }>;
  onChange: (index: number, evt: React.MouseEvent) => void;
  onAddButtonClick: (evt: React.MouseEvent) => void;
  selectedIndex: number;
};
export const Tabbar: ComponentType<TabbarPropTypes> = (props) => {
  const { items, selectedIndex } = props;

  const onChange = (idx: number) => (_: React.MouseEvent) =>
    props.onChange(idx, _);

  return (
    <div className={"Tabbar"}>
      <div className="Tabbar__Content">
        <div className="Tabbar__Content__Scroll">
          {items.map((item, index) => {
            return (
              <div
                className={`Tabbar__Item Tabbar__Item--${
                  selectedIndex === index ? "active" : "inactive"
                }`}
                onClick={onChange(index)}
                key={index}
              >
                <label>Patient</label>
                <div className="Tabbar__Item__Value">{item.label}</div>
              </div>
            );
          })}
        </div>
        <div onClick={props.onAddButtonClick} className="Tabbar__Item__Add">
          +
        </div>
      </div>
    </div>
  );
};
