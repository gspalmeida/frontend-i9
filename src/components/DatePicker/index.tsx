import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ptBrLocale from "date-fns/locale/pt-BR";

import { DatePicker } from "./styles";

interface IBasicDateTimePicker {
  value: Date | null;
  placeholder: string;
  handleChange: (date: any) => void;
  style?: React.CSSProperties;
}

const BasicDateTimePicker: React.FC<IBasicDateTimePicker> = ({
  value,
  placeholder,
  handleChange,
  style,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
      <DatePicker
        style={style}
        clearable
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

export default BasicDateTimePicker;
