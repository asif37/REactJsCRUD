 
let lastId = 0;
export function newId(prefix = 'id') {
    lastId++;
    return `${prefix}${lastId}`;
}

//
// https://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
export function serialize(form) {
    var field, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;
        var i;//
        for (i = 0; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                if (field.type == 'select-multiple') {
                    var j;//
                    for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                        if (field.options[j].selected)
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                }
            }
        }
    }
    return s.join('&').replace(/%20/g, '+');
}

 
const isValidElement = element => {
    return element.name && element.value;
};
 
const isValidValue = element => {
    return (['checkbox', 'radio'].indexOf(element.type) == -1 || element.checked);
};

 
const isCheckbox = element => element.type === 'checkbox';

 
const isMultiSelect = element => element.options && element.multiple;

 
const getSelectValues = options => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
}, []);

 
export const formToJson = elements => [].reduce.call(elements, (data, element) => {
    console.log('formToJson()', element)
    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element)) {

        
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value); 
        } else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element); 
        } else {
            data[element.name] = element.value;
        }
    }

    return data;
}, {});

export default newId;