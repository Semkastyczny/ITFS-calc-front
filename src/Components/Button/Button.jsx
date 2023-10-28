import "./button.css"
function Button(props) {
    return (
        <button
            className = {props.styles}
            onClick={props?.onClick}
            type = {props?.type}
        >
            <img src={props.img} alt="plus-math"/>
        </button>
    )
}


export default Button