import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";

function Login() {
    const URL = "http://localhost:3000/";
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let validator = false;
            if (formData.email === "" && formData.password === "")
                throw Error("Неправильно введены данные");
            const response = await fetch(`${URL}users`);
            const data = await response.json();
            data.forEach((val) => {
                if (val.email === formData.email) {
                    if (val.password === formData.password) {
                        validator = true;
                    } else throw Error("Неправильно введен пароль");
                }
            });

            if (!validator) throw Error("Данного пользователя не существует");

            const optionsUnactive = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    isActive: false,
                }),
            };
            const optionsActive = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    isActive: true,
                }),
            };
            data.forEach(async (val) => {
                await apiRequest(
                    `${URL}users/${val.id}`,
                    formData.email === val.email
                        ? optionsActive
                        : optionsUnactive
                );
            });
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="Login">
            <div className="Login-body">
                <form className="Login-form" onSubmit={handleSubmit}>
                    <input
                        className="Login-form__email"
                        placeholder="Введите email"
                        type="email"
                        onChange={(e) => {
                            setError("");
                            setFormData({ ...formData, email: e.target.value });
                        }}
                        required
                    ></input>
                    <input
                        className="Login-form__password"
                        placeholder="Введите пароль"
                        type="password"
                        onChange={(e) => {
                            setError("");
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            });
                        }}
                        required
                    />
                    <button className="Login-form__submit" type="submit">
                        Войти
                    </button>
                    <label className="Login-form__label">{error}</label>
                </form>
            </div>
        </div>
    );
}

export default Login;
