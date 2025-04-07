import { Col } from 'reactstrap';

const Check = ({ list, setValue, value, selValue,colSize = 3 }) => {
    const handleClick = (e) => {
        const { name, checked } = e.target;
        selValue({ name: name, checked: checked });
        setValue([...value, name]);
        if (!checked) {
            setValue(value.filter((item) => item !== name));
        }
    };
    return list.map((name, i) => {
        return (
            <Col md={colSize} key={i}>
                <div className="mb-2">
                    <input
                        name={name}
                        type="checkbox"
                        className="mx-2 w-auto"
                        onChange={(e) => handleClick(e)}
                        checked={value.includes(name)}
                        id={name}
                    />
                    <label htmlFor={name} className="my-auto mx-3">
                        {name}
                    </label>
                </div>
            </Col>
        );
    });
};

export default Check;
