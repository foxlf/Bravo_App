import React from "react";
import FormApp from "./FormApp";
import TableApp from "./TableApp";
import "./HomeApp.css";

function HomeApp() {
    const [isFormApp, setIsFormApp] = React.useState(true);
    function onFormAppButtonHandler(e) {
        setIsFormApp(true);
    }
    function onTableAppButtonHandler(e) {
        setIsFormApp(false);
    }
    return (
        <div className="App">
            <div className="App-head">
                <button className="button" onClick={onFormAppButtonHandler}>
                    Форма для заявки
                </button>
                <button className="button" onClick={onTableAppButtonHandler}>
                    Сводная таблица
                </button>
            </div>
            <div className="App-body">
            {isFormApp ? <FormApp /> : <TableApp />}
            </div>
        </div>
    );
}

export default HomeApp;
