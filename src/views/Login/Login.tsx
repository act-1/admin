import { Button } from 'antd';
import { signInWithGoogle } from '../../firebase';

function Login() {
  return (
    <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div style={{ gridColumn: '2 / 3' }}>
        <Button size="large" type="primary" onClick={signInWithGoogle}>
          התחברות גוגל
        </Button>
      </div>
    </main>
  );
}

export default Login;
