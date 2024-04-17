import React from "react";
import apiRequest from "../../api/apiRequest";
import "./FormApp.css";

function FormApp() {
    const URL = "http://localhost:3000/";
    const [documentName, setDocumentName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState("");
    const [isLoading, setIsLOading] = React.useState(true);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${URL}users`);
            const data = await response.json();
            setUsers(data);
            data.forEach((val) => {
                if (val.isActive === true) setUserName(val.name);
            });

            setIsLOading(false);
        };
        fetchUsers();
    }, []);

    function handleUserInput(e) {
        setError("");
        setUserName(e.currentTarget.value);
    }

    function handleDocumentInput(e) {
        setError("");
        setDocumentName(e.currentTarget.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}data`);
            const data = await response.json();
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: String(data.length + 1),
                    user: userName,
                    document: documentName,
                }),
            };
            data.forEach((val) => {
                if (val.user === userName && val.document === documentName)
                    throw Error(
                        "Вы уже отправляли заявку на этот документ, она уже была учтена"
                    );
            });
            const postData = await apiRequest(`${URL}data`, options);
            setError("Заявка успешно отправлена!");
        } catch (err) {
            setError(err.message);
        } finally {
            setDocumentName("");
        }
    }

    return (
        <div className="FormApp">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form className="FormApp-form" onSubmit={handleSubmit}>
                    <select
                        className="FormApp-form__select"
                        onChange={handleUserInput}
                        required
                        value={userName}
                    >
                        {users.map((user, i) => {
                            return (
                                <option
                                    className="FormApp-form__option"
                                    key={i}
                                >
                                    {user.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        className="FormApp-form__input"
                        placeholder="Название документа"
                        value={documentName}
                        onChange={handleDocumentInput}
                        required
                    />
                    <button className="FormApp-form__submit" type="submit">
                        Отправить данные
                    </button>
                    <label className="FormApp-form__label">{error}</label>
                </form>
            )}
        </div>
    );
}

export default FormApp;
