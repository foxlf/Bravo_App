import React from "react";
import "./TableApp.css";

function TableApp() {
    const URL = "http://localhost:3000/";
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`${URL}data`);
            const data = await response.json();
            const obj = {};

            data.forEach((val) => {
                if (obj.hasOwnProperty(val.document)) {
                    obj[val.document]++;
                } else {
                    obj[val.document] = 1;
                }
            });
            setDocuments(Object.entries(obj).sort((a, b) => b[1] - a[1]));
        };

        fetchItems();
    }, []);

    return (
        <div className="TableApp">
            <div className="TableApp-head">
                <table>
                    <thead>
                        <tr>
                            <th>Наименование документа</th>
                            <th>Количество заявок</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="TableApp-body">
                <table>
                    <tbody>
                        {documents.map((data, i) => (
                            <tr key={i}>
                                <td>{data[0]}</td>
                                <td>{data[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableApp;
