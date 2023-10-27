import { useFormik } from "formik";

function CalculatorForm(props) {

    const operationMethods = ["sum", "subtraction", "multiplication", "division"];

    validateForm = (values) => {
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
            // const formData = new FormData();

            // formData.append("firstNumber", values.firstNumber)
            // formData.append("secondNumber", values.secondNumber)
        }
    })
}




export default CalculatorForm;