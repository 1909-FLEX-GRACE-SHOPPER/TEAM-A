import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/products'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';
import { render } from 'react-dom';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
    const dispatch = useDispatch()
    const [queryStr, editQueryStr] = useState('')

    const handleChange = (category, isChecked) => {
        if (isChecked) {
            if (!queryStr.includes(category)) {
                const newQueryStr = queryStr.concat(`&cat=${category}`)
                editQueryStr(newQueryStr)
            }
        } else {
            if (queryStr.includes(category)) {
                const startidx = queryStr.indexOf(category);
                const firstHalf = queryStr.slice(0, startidx - 5)
                const secondHalf = queryStr.slice(startidx + category.length)
                const newQueryStr = firstHalf.concat(secondHalf)
                editQueryStr(newQueryStr)
            }
        }
        // props.history.push(`/${queryStr}`)
        dispatch(fetchProducts(null, queryStr))
    }
    return (
        <React.Fragment>
            <Autocomplete
                multiple
                id="favorite"
                options={productCategories}
                disableCloseOnSelect
                getOptionLabel={option => option.category}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            onChange={ev => handleChange(option.category, ev.target.checked)}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.category}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Categories"
                        placeholder="Chose Categories"
                        fullWidth
                    />
                )}
            />
        </React.Fragment>
    );
}
const productCategories = [
    { category: 'apparel' },
    { category: 'noms' },
    { category: 'gadgets' },
    { category: 'home' },
    { category: 'leisure' },
];