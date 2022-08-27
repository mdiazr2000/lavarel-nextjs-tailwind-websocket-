import {useState} from "react";

const AlertComponent = (props) => {

    const [typeAlert, setTypeAlert] = useState(props.type);

    return (
        <div>
            {typeAlert === 'danger' &&
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                     role="alert">
                    <span className="font-medium">{props.message}</span>
                </div>
            }
            {typeAlert === 'notification' &&
                <div
                    className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                    role="alert">
                    <span className="font-medium">{props.message}</span>
                </div>
            }
        </div>
    )
}

export default AlertComponent;