'use client';
import { apiUrls } from "@/assets/api/apiUrls";
import { useFormik } from "formik";
import TextInput from "../NumberInput/TextInput";
import "./calculatorForm.css";
import Button from "../Button/Button";
import { useState } from "react";

function CalculatorForm(props) {

    const operationMethods = ["sum", "subtraction", "multiplication", "division"];

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

    } 
    const calculatorForm = useFormik({
        initialValues: {
            'firstNumber' : "",
            'secondNumber' : "",
            'operation' : "sum"
        },
        validate: validateForm,
        onSubmit: (values, actions) => {
            //TODO finish form submitting
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
                    console.log(json);
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
                        styles = {"operationButton"}
                        img = "https://img.icons8.com/ios-filled/50/plus-math.png"
                    />
                    <Button
                        styles = {"operationButton"}
                        img = "https://img.icons8.com/ios-filled/50/minus-math.png"
                    />
                    <Button
                        styles = {"operationButton"}
                        img = "https://img.icons8.com/ios-filled/50/multiply.png"
                    />
                    <Button
                        styles = {"operationButton"}
                        img = "https://img.icons8.com/ios-filled/50/divide.png"
                    />
                </div>

            </form>
        </div>
    )
}




export default CalculatorForm;