import "./styles.css";
import LIST from "./List";
import { useState, useMemo } from "react";

export default function App() {
  const [leftList, setLeftList] = useState(LIST);
  const [rightList, setRightList] = useState([]);

  const showSingleRight = useMemo(() => {
    return !leftList.map((el) => el.checked === true).some((el) => el === true);
  }, [leftList]);

  const showSingleLeft = useMemo(() => {
    return !rightList
      .map((el) => el.checked === true)
      .some((el) => el === true);
  }, [rightList]);

  const onCheckBoxChange = (item, type) => {
    if (type === "LEFT") {
      setLeftList((prev) => {
        let newList = [...prev];
        return newList.map((el) =>
          el.country === item.country ? { ...el, checked: !el.checked } : el
        );
      });
    } else {
      setRightList((prev) => {
        let newList = [...prev];
        return newList.map((el) =>
          el.country === item.country ? { ...el, checked: !el.checked } : el
        );
      });
    }
  };

  const transferAll = (type) => {
    if (type === "RIGHT") {
      let newLeftArray = [...leftList];
      setRightList(newLeftArray);
      setLeftList([]);
    } else {
      let newRightArray = [...rightList];
      setLeftList(newRightArray);
      setRightList([]);
    }
  };

  const transferChecked = (type) => {
    if (type === "RIGHT") {
      let leftValue = leftList.filter((el) => el.checked !== true);
      let rightValue = leftList
        .filter((el) => el.checked === true)
        .map((el) => {
          return { ...el, checked: false };
        });
      setLeftList(leftValue);
      setRightList((prev) => [...prev, ...rightValue]);
    } else {
      let rightValue = rightList.filter((el) => el.checked !== true);
      let leftValue = rightList
        .filter((el) => el.checked === true)
        .map((el) => {
          return { ...el, checked: false };
        });
      setRightList(rightValue);
      setLeftList((prev) => [...prev, ...leftValue]);
    }
  };
  return (
    <div className="App">
      <h1>Transfer List</h1>
      <div className="transfer-container">
        <div className="left-container container">
          {leftList.map((el) => {
            return (
              <div key={el.country}>
                <input
                  type="checkbox"
                  checked={el.checked}
                  onChange={() => onCheckBoxChange(el, "LEFT")}
                />
                {el.country}
              </div>
            );
          })}
        </div>
        <div className="buttons-container container">
          <button
            onClick={() => transferAll("RIGHT")}
            disabled={leftList.length === 0}
          >
            {">>"}
          </button>
          <button
            onClick={() => {
              transferChecked("RIGHT");
            }}
            disabled={showSingleRight}
          >
            {">"}
          </button>
          <button
            onClick={() => {
              transferChecked("LEFT");
            }}
            disabled={showSingleLeft}
          >
            {"<"}
          </button>
          <button
            onClick={() => transferAll("LEFT")}
            disabled={rightList.length === 0}
          >
            {"<<"}
          </button>
        </div>
        <div className="right-container container">
          {rightList.map((el) => {
            return (
              <div key={el.country}>
                <input
                  type="checkbox"
                  checked={el.checked}
                  onChange={() => onCheckBoxChange(el, "RIGHT")}
                />
                {el.country}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
