import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import { useI18n } from "../../i18n";
import { optionText } from "../utils/which-options";
import InputLabel from "../components/input-label";

import Separator from "./seperator";

const CheckboxGroup = ({ onChange, value, options, commonInputProps, metaInputProps }) => {
  const i18n = useI18n();
  const [checked, setChecked] = useState([]);
  const { name, disabled } = commonInputProps;

  const handleChange = e => {
    const { value: selectedValue } = e.target;

    const newState = checked.includes(selectedValue)
      ? checked.filter(v => v !== selectedValue)
      : [...checked, selectedValue];

    setChecked(newState);
    onChange(newState);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const renderCheckboxes = () =>
    options?.map(option => {
      return (
        <>
          {option?.includeSeparator && <Separator commonInputProps={{ label: "" }} />}
          <FormControlLabel
            key={`${name}-${option.id}`}
            control={
              <Checkbox
                as={Checkbox}
                onChange={handleChange}
                value={option.id}
                checked={checked.includes(option.id)}
                disabled={disabled}
              />
            }
            label={
              <InputLabel
                text={optionText(option, i18n.locale)}
                tooltip={option?.tooltip}
                boldText={option?.boldText}
              />
            }
          />
        </>
      );
    });

  return <>{renderCheckboxes()}</>;
};

CheckboxGroup.displayName = "CheckboxGroup";

CheckboxGroup.propTypes = {
  commonInputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired
  }),
  metaInputProps: PropTypes.shape({
    includeSeparator: PropTypes.bool
  }),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  value: PropTypes.any
};

export default CheckboxGroup;
