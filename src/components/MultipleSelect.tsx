import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 30;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type Props = {
    handleOnChange: (event: SelectChangeEvent<string[]>) => void,
    value: string[],
    options: string[],
    label: string
}

export default function MultipleSelect({ handleOnChange, value, options, label }: Props) {

    return (
        <FormControl sx={{ width: 250 }} size="small">
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={value}
                onChange={handleOnChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.join(', ')}
                sx={{ backgroundColor: 'white' }}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={value.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}