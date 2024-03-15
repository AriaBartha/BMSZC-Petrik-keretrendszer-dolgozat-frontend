import { useRef } from "react";
import PropTypes from "prop-types";

function KeyboardForm(props) {
    const nameRef = useRef(null);
    const typeRef = useRef(null);
    const layoutRef = useRef(null);
    const widthRef = useRef(null);
    const wirelessRef = useRef(null);
    const {onSubmit} = props;

    const createKeyboard = async () => {
        const keyboard = {
            name: nameRef.current.value,
            type: typeRef.current.value,
            layout: layoutRef.current.value,
            width: widthRef.current.value,
            wireless: wirelessRef.current.value,
        };
        const success = await onSubmit(keyboard);
        if (success) {
            resetForm();
        }
    }

    const resetForm = () => {
             nameRef.current.value = "";
             typeRef.current.value = "";
             layoutRef.current.value = "";
             widthRef.current.value = "";
             wirelessRef.current.value = "";
    }

    return ( <form onSubmit={event => {event.preventDefault(); createKeyboard();}}> 
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Name" ref={nameRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="type" className="form-label">Type:</label>
            <input type="text" className="form-control" id="type" placeholder="Type" ref={typeRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="layout" className="form-label">Layout:</label>
            <input type="text" className="form-control" id="layout" placeholder="Layout" ref={layoutRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="width" className="form-label">Width (cm):</label>
            <input type="number" placeholder="20.0" step="0.01" min="20" max="50" className="form-control" id="width" ref={widthRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="wireless" className="form-label">Wireless (Only accept: yes/no):</label>
            <input type="text" className="form-control" id="wireless" placeholder="yes/no" ref={wirelessRef}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form> );
}

KeyboardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default KeyboardForm;