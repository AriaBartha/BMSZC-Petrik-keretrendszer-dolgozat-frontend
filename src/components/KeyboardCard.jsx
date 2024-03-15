import PropTypes from "prop-types";

function KeyboardCard(props) {
    const {keyboard} = props;
    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
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
                </div>
            </div>
        </div>
    );
}

KeyboardCard.propTypes = {
    keyboard: PropTypes.object.isRequired
}

export default KeyboardCard;