function TextInput(props) {
    return (
        <label className="textInputWrapper">
            {props.text}
            <input 
                type = {props.type}
                name = {props.name}
                className = "textTnput"
                onChange = {props.formikData.handleChange}
                value = {props.formikData.values[props.name]}
            />
            <p>
                {props.formikData.errors[props.name]}
            </p>
        </label>
    )
}


export default TextInput