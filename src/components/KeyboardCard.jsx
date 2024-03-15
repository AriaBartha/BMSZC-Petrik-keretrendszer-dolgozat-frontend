import PropTypes from "prop-types";

function KeyboardCard(props) {
    const {keyboard, updateClick, deleteClick} = props;
    return (
        <div className="col">
            <div className="card border-dark h-100">
                <div className="card-header text-bg-secondary">
                    {keyboard.name}
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Type</th>
                                <td>{keyboard.type}</td>
                            </tr>
                            <tr>
                                <th>Layout</th>
                                <td>{keyboard.layout}</td>
                            </tr>
                            <tr>
                                <th>Width</th>
                                <td>{keyboard.width}</td>
                            </tr>
                            <tr>
                                <th>Wireless</th>
                                <td>{keyboard.wireless}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-grid gap-1">
                            <button className="btn btn-warning" onClick={() => {updateClick(keyboard.id)}}>Update</button>
                            <button className="btn btn-danger" onClick={() => {deleteClick(keyboard.id)}}>Delete</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

KeyboardCard.propTypes = {
    keyboard: PropTypes.object.isRequired,
    updateClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired
}

export default KeyboardCard;