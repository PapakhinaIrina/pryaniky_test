import { useState, FormEvent } from "react";
import { Button, TextField, Alert } from "@mui/material";
import { URL } from "../../url/base_url";
import classNames from "classnames";
import styles from "./authorization.module.scss";

export const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(URL.auth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        <Alert severity="error">
          Ошибка авторизации. Проверьте логин и пароль.
        </Alert>;
      }
      if (response.ok) {
      }
    } catch (err) {
      <Alert severity="error">{`error`}</Alert>;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classNames(styles["auth_container"])}>
      <div className={classNames(styles["auth_box"])}>
        <h1>Авторизация</h1>
        <form
          onSubmit={handleSubmit}
          className={classNames(styles["auth_wrapper"])}
        >
          <TextField
            label="Имя пользователя"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ width: "150px" }}
          >
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
};
