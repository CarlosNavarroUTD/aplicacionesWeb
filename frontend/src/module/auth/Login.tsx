import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";
import { useAuth } from "./AuthContext";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = () => {
    setLoading(true);
    
    // Simulación de login — podrías aquí hacer fetch a tu backend
    setTimeout(() => {
      const fakeToken = "FAKE_TOKEN_123";
      login(fakeToken);
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title="Iniciar Sesión" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Usuario" name="username" rules={[{ required: true, message: 'Ingrese su usuario' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
