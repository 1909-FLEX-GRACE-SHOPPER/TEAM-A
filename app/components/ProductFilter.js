
import React, {useState} from 'react';
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

export default function CheckboxesTags() {
const dispatch = useDispatch()

const [selectedCategories, setSelectedCategories] = useState({
    apparel:false,
    noms:false,
    gadgets:false,
    home:false,
    leisure: false
})

const handleChange = (value) =>{
    setSelectedCategories({ ...selectedCategories, value:!selectedCategories[value]})
}

const generateQuery = (categoriesObj) => {
    let queryStr = ""
    for (let key in categoriesObj){
        if (categoriesObj[key]){
            queryStr += `&cat=${key}`
        }
    }
    console.log("queryString", queryStr )
    return queryStr;
}

const handleSubmit = () => {
    const queryStr = generateQuery(selectedCategories)
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
                        onChange={(event) => handleChange(event.target.value)}
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
        <Button variant="contained" color="primary" onClick={handleSubmit} > 
                Apply Filter
      </Button>
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