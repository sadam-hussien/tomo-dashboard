import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import {getMonth, getYear} from "date-fns";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({disabled}) => {
  const calRef = React.useRef();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const years = range(1990, getYear(new Date()) + 100, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div>
      <ReactDatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          increaseYear,
          decreaseYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header"
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
                </button>
                <select
                value={months[getMonth(date)]}
                onChange={({target: {value}}) =>
                    changeMonth(months.indexOf(value))
                }
                >
                {months.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
                <button style={{fontSize:"1.2rem",fontWeight:"bolder"}} onClick={increaseMonth} disabled={prevMonthButtonDisabled}>
                {">"}
                </button>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <button style={{fontSize:"1.2rem",fontWeight:"bolder"}} onClick={decreaseYear} disabled={nextMonthButtonDisabled}>
                {"<"}
                </button>
                <select
                value={getYear(date)}
                onChange={({target: {value}}) => changeYear(value)}
                >
                {years.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>

                <button style={{fontSize:"1.2rem",fontWeight:"bolder"}} onClick={increaseYear} disabled={nextMonthButtonDisabled}>
                {">"}
                </button>
            </div>
          </div>
        )}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
        setDateRange(update);
        }}
        dateFormatCalendar="MMMM yyyy"
        showMonthDropdown
        showYearDropdown
        ref={calRef}
        shouldCloseOnSelect={false}
        withPortal
        placeholderText="التاريخ"
        dateFormat="MMMM d, yyyy h:mm aa"
        disabled = {disabled}
        >
        <div className="confirm-buttons">
            <button
                onClick={() => {
                setDateRange([null, null]);
                calRef.current.setOpen(false);
                }}
            >
                الغاء
            </button>
            <button
                onClick={() => {
                calRef.current.setOpen(false);
                }}
            >
                تاكيد
            </button>
        </div>
        </ReactDatePicker>
    </div>
  );
};

export default DatePicker;
