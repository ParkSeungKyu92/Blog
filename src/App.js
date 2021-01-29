import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import PostPageList from './pages/PostListPage';


function App() {
  return (
    <>
    <Route component={PostPageList} path={['/@:username','/']} exact></Route>
    <Route component={LoginPage} path="/login"></Route>
    <Route component={RegisterPage} path="/register"></Route>
    <Route component={WritePage} path="/write"></Route>
    <Route component={PostPage} path="/@:username/:postId"></Route>
    {/* /@:username은 localhost/@helloworld 같은 경로에서 helloworld를 username 파라미터로 읽을 수 있게 해준다. */}
    </>
  );
}

export default App;
