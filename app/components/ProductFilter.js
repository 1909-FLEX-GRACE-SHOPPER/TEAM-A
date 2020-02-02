
import React, {useState} from 'react';
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
const [selectedCategories, setSelectedCategories] = useState({
    apparel:false,
    noms:false,
    gadgets:false,
    home:false,
    leisure: false
})

handleChange = (value) =>{
selectedCategories[value] = !selectedCategories[value]
}

generateQuery = (categoriesObj) => {
    let queryStr = ""
    for (let key in categoriesObj){
        if (categoriesObj[key]){
            queryStr += `&cat=${categoriesObj[key]}`
        }
    }
    return queryStr;
}

handleSubmit = () => {
    const queryStr = generateQuery(selectedCategories)
    
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
                        onChange={(value) => handleChange(value)}
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
        <Button variant="contained" color="primary" > 
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