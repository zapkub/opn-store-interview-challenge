import React, { ComponentType } from "react";

type TabbarPropTypes = {
  items: Array<{
    /**
     * label on the tabbar must be
     * a character maximum length ~2
     */
    label: string;
  }>;
  onChange: (index: number) => void;
  selectedIndex: number;
};
export const Tabbar: ComponentType<TabbarPropTypes> = (props) => {
  const { items, selectedIndex } = props;

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div
            className={`tabbar__item--${
              selectedIndex === index ? "active" : "inactive"
            }`}
            key={index}
          >
            Patient
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
