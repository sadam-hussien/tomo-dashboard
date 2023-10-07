import { Link } from "react-router-dom";

export default function Tabs({
  className,
  style,
  itemClassName,
  itemStyle,
  data,
  element,
  active,
  link = true,
  changeTab,
}) {
  return (
    <div
      className={`d-flex align-items-center flex-wrap gap-2 global-tabs ${className}`}
      style={style}
    >
      {data.map((item, index) =>
        link ? (
          <Link
            key={"program-type" + index}
            to={item.path}
            className={`${
              active === item.id ? "active" : ""
            } ${itemClassName} global-tabs-item`}
            style={itemStyle}
          >
            {element(item, index)}
          </Link>
        ) : (
          <button
            key={"program-type" + index}
            type="button"
            className={`${
              active === item.id ? "active" : ""
            } ${itemClassName} global-tabs-item bg-transparent border-0 py-0 pe-0`}
            style={itemStyle}
            onClick={() => changeTab(item.id)}
          >
            {element(item, index)}
          </button>
        )
      )}
    </div>
  );
}
