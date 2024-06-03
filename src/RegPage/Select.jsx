/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
const Select = ({ list, setValue, placeHolder, value }) => {
  return (
    <select
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="form-select"
    >
      <option value={""} disabled>
        {placeHolder}
      </option>
      {list && list.length > 0 ? (
        list.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))
      ) : (
        <option disabled>No Data found</option>
      )}
    </select>
  );
};

export default Select;
