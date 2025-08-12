/* eslint-disable indent */
const Select = ({ list, setValue, placeHolder, value }) => {
  return (
    <select
      onChange={(e) => {
        const selectedVal = e.target.value;
        setValue(selectedVal); // store English value string only
      }}
      value={value || ""}
      className="form-select"
      style={{ height: "2rem", outline: "none" }}
    >
      <option value="" disabled>
        {placeHolder}
      </option>

      {list && list.length > 0 ? (
        list.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))
      ) : (
        <option disabled>No Data found</option>
      )}
    </select>
  );
};

export default Select;
