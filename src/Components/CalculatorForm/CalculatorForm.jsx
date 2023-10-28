'use client';
import { apiUrls } from "@/assets/api/apiUrls";
import { useFormik } from "formik";
import TextInput from "../NumberInput/TextInput";
import "./calculatorForm.css";
import Button from "../Button/Button";
import { useState, useRef } from "react";

function CalculatorForm(props) {

    const operationMethods = ["sum", "subtraction", "multiplication", "division"];
    
    const messageRef = useRef();

    const [value, setValue] = useState(0);

    function validateForm (values) {
        const errors = {}

        if (!values.firstNumber || !values.secondNumber) {
            errors.form = "Należy podać 2 liczby!";
        }

        if (values.firstNumber && /^\d+$/.test(values.firstNumber) == false) {
            errors.firstNumber = "Pierwsza wartość nie jest liczbą";
        }
        

        if (values.secondNumber && /^\d+$/.test(values.secondNumber) == false) {
            errors.secondNumber = "Druga wartość nie jest liczbą";
        }

        if (!operationMethods.includes(values.operation)) {
            errors.operation = "Nie wybrano żadnej operacji matematycznej"
        }

        if (Object.keys(errors).length > 0 ) {
            messageRef.current.innerText = errors[Object.keys(errors)[0]];
            messageRef.current.classList.add("show")
        } else {
            messageRef.current.innerText = null;
            messageRef.current.classList.remove("show")
        }

        return errors;

    } 
    const calculatorForm = useFormik({
        initialValues: {
            'firstNumber' : "",
            'secondNumber' : "",
            'operation' : ""
        },
        validateOnChange: false,
        validate: validateForm,
        onSubmit: (values, actions) => {
            const formData = new FormData();

            formData.append("firstNumber", values.firstNumber)
            formData.append("secondNumber", values.secondNumber)

            setTimeout(() => {
                fetch(apiUrls.base + apiUrls[values.operation], {
                    method: 'POST',
                    body: formData
                })
                .then((res) => res.json())
                .then((json) => {
                    if (!json.error) setValue(json.result)
                })
            }, 200)
        }
    })

    return (
        <div className={"formWrapper"}>
            <div className="displayResult">
                {value}
            </div>
            <form onSubmit={calculatorForm.handleSubmit} className="form">
                <div className={"inputsWrapper"}>
                    <TextInput
                        text = {"Pierwsza liczba"}
                        type = {"number"}
                        name = {"firstNumber"}
                        className = {"textInput"}
                        formikData = {calculatorForm}
                    />
                    <TextInput
                        text = {"Druga liczba"}
                        type = {"number"}
                        name = {"secondNumber"}
                        className = {"textInput"}
                        formikData = {calculatorForm}
                    />
                    <div className={"submit"}>
                        <Button 
                            styles = {"countButton"}
                            type = "submit"
                            img = "https://img.icons8.com/external-flat-icons-inmotus-design/67/external-equals-mathematics-geometry-flat-icons-inmotus-design.png"
                        />
                    </div>
                </div>
                <div className={"operationList"}>
                    <Button
                        styles = {"operationButton" + (calculatorForm.values["operation"] === "sum" ? " active" : "")}
                        type = "button"
                        img = "https://img.icons8.com/ios-filled/50/plus-math.png"
                        onClick ={() => calculatorForm.setFieldValue("operation", "sum")}
                    />
                    <Button
                        styles = {"operationButton" + (calculatorForm.values["operation"] === "subtraction" ? " active" : "")}
                        type = "button"
                        img = "https://img.icons8.com/ios-filled/50/minus-math.png"
                        onClick ={() => calculatorForm.setFieldValue("operation", "subtraction")}
                    />
                    <Button
                        styles = {"operationButton" + (calculatorForm.values["operation"] === "multiplication" ? " active" : "")}
                        type = "button"
                        img = "https://img.icons8.com/ios-filled/50/multiply.png"
                        onClick ={() => calculatorForm.setFieldValue("operation", "multiplication")}
                    />
                    <Button
                        styles = {"operationButton" + (calculatorForm.values["operation"] === "division" ? " active" : "")}
                        type = "button"
                        img = "https://img.icons8.com/ios-filled/50/divide.png"
                        onClick ={() => calculatorForm.setFieldValue("operation", "division")}
                    />
                </div>
            </form>
            <p className={"errorMessage"} ref={messageRef}></p>

        </div>
    )
}




export default CalculatorForm;